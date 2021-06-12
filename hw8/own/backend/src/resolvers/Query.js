const Query = {
    async users(parent, { name }, { db }, info) {
        if (!name) {
            return await db.UserModel.find({});
        }
        return await db.UserModel.find({ name: name});
    },
    async messages(parent, { sender, body }, { db }, info) {
        if (!sender || !body) {
            return await db.MessageModel.find({});
        }
        return await db.MessageModel.find({ sender: db.ObjectId(sender), body: body });
    },
    async chatbox(parent, { name }, { db }, info) {
        if (!name) {
            // console.log("name = ", name);
            // return await db.ChatBoxModel.find({});
            throw new Error("Name should not be empty!")
        }
        return await db.ChatBoxModel.findOne({ name: name });
    }
};

export default Query;