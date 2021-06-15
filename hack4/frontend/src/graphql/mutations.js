import { gql } from '@apollo/client';

export const INSERT_MUTATION = gql`
mutation insertPeople(
    $ssn: String!
    $name: String!
    $location: LocationInput!
    $severity: Int!
) {
    insertPeople(data: {
        ssn: $ssn
        name: $name
        location: $location
        severity: $severity
    })
  }
`;

// export const INSERT_MUTATION = gql`
//     mutation(
//         $data: [PersonInput]!
//     ) {
//         Person(
//             data: $data
//         )
//     }
// `;
