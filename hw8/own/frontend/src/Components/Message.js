import "../App.css";

const Message = ({ me, friend, senderName, body }) => {
    
    const chat_class = (me == senderName)? ("chat-message-group writer-user"):("chat-message-group");
    return (
        <div class={chat_class}>
            <div class="chat-messages">
                <div class="message">{body}</div>
                <div class="from">{senderName}</div>
            </div>
        </div>
    )
};

export default Message;