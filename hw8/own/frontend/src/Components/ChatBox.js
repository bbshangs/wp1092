import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Message from './Message';

import {
    CHATBOX_QUERY,
    CHATBOX_SUBSCRIPTION
} from '../graphql';

const ChatBox = ({ me, friend, activeKey }) => {
    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: { name: activeKey }
    });

    useEffect(() => {
        try {
            subscribeToMore({
                document: CHATBOX_SUBSCRIPTION,
                variables: { name: activeKey },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const updatedChatbox = subscriptionData.data.chatbox.data;
                    return {
                        chatbox: updatedChatbox
                    }
                },
            });
        } catch (e) {}
      }, [subscribeToMore]);

    return (
        <div class="card-content chat-content">
            <div class="content">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error :(((</p>
                ) : (
                    data.chatbox.messages.map((item) => 
                        <Message
                            key={item.id}
                            me={me}
                            friend={friend}
                            senderName={item.sender.name}
                            body={item.body}
                        />
                    )
                )}
            </div>
        </div>    
        
    );
};

export default ChatBox;