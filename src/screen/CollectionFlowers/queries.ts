import gql from "graphql-tag";

export const GetFlowers = gql`
  query GetFlowers($typeid: Int!) {
    GetFlowers(typeid: $typeid) {
      result
      error
      flowers {
        id
        name
        image
        type {
          id
          name
        }
      }
    }
  }
`;
