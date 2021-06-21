const Query = {
  async chatBox(parent, args, { db }, info) {
    const validateUser = async (name) => {
      const existing = await db.UserModel.findOne({ name });
      if (existing) return existing;
      return new db.UserModel({ name }).save();
    };
    const validateChatBox = async (name, participants) => {
      let box = await db.ChatBoxModel.findOne({ name });
      if (!box){
        consolg.log("chatBox not found")
        box = new db.ChatBoxModel({ name }).save();
      }
      return box
        .populate('users')
        .populate({ path: 'messages', populate: 'sender' })
        .execPopulate();
    };
    if (args.name){
      const chatBoxName = args.name;
      const sender = await validateUser(args.name.split("_")[0]);
      const receiver = await validateUser(args.name.split("_")[1]);
      const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
      return chatBox
    }
    return null;
  },
};

export { Query as default };
