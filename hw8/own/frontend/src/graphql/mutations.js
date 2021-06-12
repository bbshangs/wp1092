import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ) {
        createChatBox(data: {
            name1: $name1
            name2: $name2
        }) {
            id
            name
        }
    }
`;

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $sender: String!
        $body: String!
    ) {
        createMessage (data: {
            sender: $sender
            body: $body
        }) {
            id
            sender {
                name
            }
            body
        }
    }
`;

export const ADD_MESSAGE_MUTATION = gql`
    mutation addMessageToChatBox(
        $messageID: ID!
        $chatboxName: String!
    ) {
        addMessageToChatBox(data: {
                messageID: $messageID
                chatboxName: $chatboxName
            }) {
                id
                name
            }
    }
`;