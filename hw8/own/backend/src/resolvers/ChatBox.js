const ChatBox = {
    messages(parent, args, { db }, info) {
        return Promise.all( //等每個 element 的 promise 
            parent.messages.map((mId) =>
            db.MessageModel.findById(mId)),
        ); 
    },
};

export default ChatBox;