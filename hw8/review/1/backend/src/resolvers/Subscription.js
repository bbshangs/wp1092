const Subscription = {
  messageAdded: {
    async subscribe(parent, { name }, { db, pubsub }, info) {
      const validateChatBox = async (name, participants) => {
        let box = await db.ChatBoxModel.findOne({ name });
        if (!box) {
          throw new Error("chatBox not found in subscription")
        }
      };
      console.log("subscription " + name)
      if (name){
        const chatBoxName = name;
        await validateChatBox(chatBoxName);
        return pubsub.asyncIterator(`${chatBoxName}`);
      }
    },
  },
};

export { Subscription as default };
