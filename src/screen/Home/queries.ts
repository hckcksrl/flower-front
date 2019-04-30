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
