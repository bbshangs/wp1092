import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, { data }, { db }, info) {
    const userTaken = await db.UserModel.find({ name: data.name });
    if (userTaken.length) {
      throw new Error("User exists!");
    }
    const user = await db.UserModel.create({ 
      name: data.name 
    });
    return user;
  },
  async createMessage(parent, { data }, { db }, info) {
    // const sender = await db.UserModel.findById(db.ObjectId(data.sender));
    const sender = await db.UserModel.findOne({ name: data.sender});
    // const receiver = await db.UserModel.findById(db.ObjectId(data.receiver));
    if (!sender) {
      throw new Error("Unable to find sender!")
    }
    const message = await db.MessageModel.create({
      sender: sender._id,
      // receiver: db.ObjectId(data.receiver),
      body: data.body
    })
    return message;
  },
  async createChatBox(parent, { data }, { db, pubsub }, info) {
    if (!data.name1 || !data.name2) {
      throw new Error("Missing chatbox name1 or name2!");
    }

    // Add user if it doesn't exist
    const user1 = await db.UserModel.findOne({ name: data.name1 });
    const user2 = await db.UserModel.findOne({ name: data.name2 });
    if (!user1) {
      await db.UserModel.create({ 
        name: data.name1
      });
    }
    if (!user2) {
      await db.UserModel.create({ 
        name: data.name2
      });
    }
    
    // Get the chatbox name
    const compare_result = data.name1.localeCompare(data.name2);
    var chatBoxName;
    if (compare_result == 1) 
      chatBoxName = `${data.name2}_${data.name1}`;
    else
      chatBoxName = `${data.name1}_${data.name2}`;

    // Add a chat box if it doesn't exist
    const chatBoxNameTaken = await db.ChatBoxModel.findOne({ name: chatBoxName });
    if (chatBoxNameTaken) {
      console.log("Chat box exists!")
      return chatBoxNameTaken;
    }

    return await db.ChatBoxModel.create({
      name: chatBoxName,
    })
  },
  async addMessageToChatBox(parent, { data }, { db, pubsub }, info) {
    const message = await db.MessageModel.findById(data.messageID);
    const chatbox = await db.ChatBoxModel.findOne({ name: data.chatboxName });
    if (!message || !chatbox) {
      throw new Error("Message or chatbox doesn't exist!");
    } 
    await db.ChatBoxModel.update(
      { _id: chatbox._id },
      { $push: { messages: data.messageID } }
    );
    const newChatbox = await db.ChatBoxModel.findOne({ name: data.chatboxName });
    // console.log("chatbox name in mut = ", newChatbox.name);
    pubsub.publish(`Add message to chatbox ${newChatbox.name}`, {
      chatbox: {
        mutation: 'UPDATED',
        data: newChatbox,
      },
    });
    return newChatbox;
  }
};

export { Mutation as default };
