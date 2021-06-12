import { gql } from '@apollo/client';

// export const USERNAME_QUERY = gql`
//     query users($name: String) {
//         users(name: $name) {
//             id
//             name
//         }
//     }
// `;

export const CHATBOX_QUERY = gql`
    query chatbox($name: String!) {
        chatbox(name: $name) {
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
`;