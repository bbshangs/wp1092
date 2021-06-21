const Message = {
    sender({sender}, args, { db }, info) {
        return sender.name;
    },
    
    body({ body }, args, context, info) {
        return body;
    },
};

export { Message as default };
