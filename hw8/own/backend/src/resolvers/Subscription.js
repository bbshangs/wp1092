const Subscription = {
    chatbox: {
        async subscribe(parent, { name }, { db, pubsub }, info) {
            const chatbox = await db.ChatBoxModel.findOne({ name: name });
            if (!chatbox) {
                throw new Error("Chatbox doess not exist!");
            }
            return pubsub.asyncIterator(`Add message to chatbox ${name}`);
        },
    },
  };
  
  export { Subscription as default };