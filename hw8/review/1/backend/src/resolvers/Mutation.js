const Mutation = {
  async createMessage(parent, { chatBoxName, me, body}, {db, pubsub}, info){
    const validateUser = async (name) => {
      const existing = await db.UserModel.findOne({ name });
      if (existing) return existing;
      else {
        throw new Error("user not found in createMessage")
      }
    };
    const validateChatBox = async (name, participants) => {
      let box = await db.ChatBoxModel.findOne({ name });
      if (!box){
        throw new Error("chatBox not found in createMessage")
      }
      return box
        .populate('users')
        .populate({ path: 'messages', populate: 'sender' })
        .execPopulate();
    };

    const from = me;
    const to = (chatBoxName.split('_')[0] === me) ? chatBoxName.split('_')[1] : chatBoxName.split('_')[0];
    const sender = await validateUser(from);
    const receiver = await validateUser(to);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

    const newMessage = await new db.MessageModel({ sender, body });
    await newMessage.save();

    await chatBox.messages.push(newMessage);
    await chatBox.save();

    await pubsub.publish(`${chatBoxName}`, {
      messageAdded:{
        newMessage
      }
    });
    return newMessage
  }
  
}

export { Mutation as default };