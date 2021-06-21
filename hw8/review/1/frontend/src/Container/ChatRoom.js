import "../App.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Tabs, Input } from "antd";
import ChatModal from "./ChatModal";
import { gql} from '@apollo/client';
import { mergeDeep } from "@apollo/client/utilities";
const { TabPane } = Tabs;

const CREATE_CHATBOX_QUERY = gql`
  query($name: String) {
     chatBox(name: $name){messages{body sender}}
  }
`;
const CREATE_MESSAGE_MUTATION = gql`
  mutation($chatBoxName: String, $me: String, $body: String) {
     createMessage(chatBoxName: $chatBoxName, me: $me, body: $body){body sender}
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription($name: String) {
     messageAdded(name: $name){body sender}
  }
`;

const ChatRoom = ({ me, displayStatus}) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [keys, setKeys] = useState([]);
  // const [messages, setMessages] = useState([]);
  const addChatBox = () => { setModalVisible(true); };
  let { data, subscribeToMore, refetch } = useQuery(
    CREATE_CHATBOX_QUERY,
    {
      variables: { name: activeKey },
    }
  );
  
  let messages = [];
  if (data != null){
    if (data.chatBox != null){
      messages = data.chatBox.messages;
    }
  }

  useEffect(()=>{
    setInterval(() => {
      refetch();
    }, 200);
  },[])

  // useEffect(() => {
  //   if (activeKey){
  //     subscribeToMore({
  //       document: MESSAGE_SUBSCRIPTION,
  //       variables: { name: activeKey },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         console.log(subscriptionData)
  //         if (subscriptionData === null) {
  //           console.log("null")
  //           return prev
  //         }
  //         const newMessage = subscriptionData;
  //         return {
  //           ...prev,
  //           messages: [...prev.messages, newMessage],
  //         };
  //       },
  //     });
  //   }
  
  // }, [subscribeToMore, activeKey]);
  const removeChatBox = (targetKey) => {
    setKeys((preKeys) => {
      const newKeys = preKeys.filter(({ key }) => key !== targetKey);
      if (newKeys.findIndex(({ key }) => key === activeKey) === -1)
        setActiveKey(newKeys[-1]);
      return newKeys;
    });
  };
  const createChatBox = (friend, me) => {
    const newKey = [friend, me].sort().join('_');
    if (keys.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    setKeys((preKeys) => {
      const newKeys = [...preKeys];
      newKeys.push({ key: newKey, friend });
      return newKeys;
    });
    setActiveKey(newKey);
  };

  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  return (
    <> <div className="App-title"><h1>{me}'s Chat Room</h1></div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
        >
          {keys.map(({ key, friend }) => {
              return (
                <TabPane tab={friend}
                  key={key} closable={true}>
                  {messages.map(({ sender, body }) => {
                      if (sender === me){
                        return (
                          <div style={{ position: "relative"}}>
                            <br></br>
                            <p style={{ fontSize: 18, overflowWrap: 'break-word', position: "absolute", right: "0px" }}>
                              <span style={{ border: "1px solid #80ffd4" }}>{body}</span>
                              &nbsp;
                              <span style={{ backgroundColor: "#80ffd4" }}>{sender}</span></p>
                            <br></br>
                          </div>
                        )
                      }
                      else{
                        return (
                          <div >
                            <p style={{ fontSize: 18, overflowWrap: 'break-word' }}>
                              <span style={{ backgroundColor: "#ffccff" }}>{sender}</span>
                              &nbsp;
                              <span style={{ border: "1px solid #ffccff" }}>{body}</span>
                            </p>
                          </div>
                        )
                      }
                    })}
                </TabPane>
            );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            createChatBox(name, me);
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) =>
          setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder=
          "Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setMessageInput("");
            return;
          }
          sendMessage({
            variables: { chatBoxName: activeKey, me: me, body: messageInput },
          });
          setMessageInput("");
        }}
      ></Input.Search>
  </>);
};
export default ChatRoom;
   