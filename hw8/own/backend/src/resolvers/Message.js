const Message = {
    async sender(parent, args, { db }, info) {
        const sender =  await db.UserModel.findById(parent.sender);
        if (!sender) {
            throw new Error("No such sender in user list!");
        }
        return sender;
    },
    // async receiver(parent, args, { db }, info) {
    //     const receiver = await db.UserModel.findById(parent.receiver);
    //     if (!receiver) {
    //         throw new Error("No such receiver in user list!");
    //     }
    //     return receiver;
    // },
};

export default Message;