import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
    subscription onChatbox($name: String!) {
        chatbox(name: $name) {
            mutation
            data {
                id
                name
                messages {
                    id
                    sender {
                        id
                        name
                    }
                    body
                }
            }
          }
    }
`;