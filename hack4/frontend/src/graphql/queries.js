import { gql } from '@apollo/client';

export const STATCOUNT_QUERY = gql`
    query statsCount($locationKeywords:[String!]!, $severity: Int) {
        statsCount(locationKeywords: $locationKeywords, severity:$severity) 
    }
`;
