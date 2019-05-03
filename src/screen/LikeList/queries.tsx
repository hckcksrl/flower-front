import gql from "graphql-tag";

export const GetUserLike = gql`
  {
    GetUserLike {
      result
      error
      likes {
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
  }
`;
