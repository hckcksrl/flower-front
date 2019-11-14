import gql from "graphql-tag";

export const GetType = gql`
  {
    GetFlowerType {
      result
      error
      type {
        id
        name
      }
    }
  }
`;

export const GetCollection = gql`
  {
    GetCollection {
      result
      error
      collection {
        id
        name
        view
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
