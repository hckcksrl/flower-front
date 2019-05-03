import gql from "graphql-tag";

export const UpHit = gql`
  mutation UpHitFlower($id: Int!) {
    UpHitFlower(id: $id) {
      result
      error
    }
  }
`;

export const CreateRecent = gql`
  mutation CreateRecent($id: Int!) {
    CreateRecent(id: $id) {
      result
      error
    }
  }
`;
