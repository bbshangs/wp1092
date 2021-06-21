import { Button, Input, Tag, message } from "antd";

const ChatLog = (props) => {
  // console.log("LOG");
  // console.log(props.data);
  // console.log(props.data[0]);
  const { name, body } = props.data;
  const me = props.me;
  return (
    <p style={name === me ? { textAlign: "right" } : { textAlign: "left" }}>
      <Tag color={name === me ? "blue" : "red"}>{name}</Tag> {body}
    </p>
  );
};

export default ChatLog;
