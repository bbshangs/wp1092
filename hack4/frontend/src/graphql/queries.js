import { gql } from '@apollo/client';

export const STATCOUNT_QUERY = gql`
    query statsCount($locationKeywords:[String!]!, $severity: Int) {
        statsCount(locationKeywords: $locationKeywords, severity:$severity) 
    }
`;

// export const CHATBOX_QUERY = gql`
//     query chatbox($name: String!) {
//         chatbox(name: $name) {
//             id
//             name
//             messages {
//                 id
//                 sender {
//                     id 
//                     name
//                 }
//                 body
//             }
//         }
//     }
// `;