import gql from "graphql-tag";

export const saveFlower = gql`
  query GetSaveFlower($libraryid: Int!) {
    GetSaveFlower(libraryid: $libraryid) {
      result
      error
      saveFlower {
        id
        flowers {
          id
        }
      }
    }
  }
`;
