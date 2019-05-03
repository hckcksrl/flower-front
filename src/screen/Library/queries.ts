import gql from "graphql-tag";

export const GetRecent = gql`
  {
    GetRecent {
      result
      error
      recent {
        flowers {
          id
          image
          name
          type {
            id
            name
          }
        }
      }
    }
  }
`;
