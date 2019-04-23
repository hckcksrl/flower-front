import gql from "graphql-tag";

export const UpHit = gql`
  mutation UpHitFlower($id: Int!) {
    UpHitFlower(id: $id) {
      result
      error
    }
  }
`;
