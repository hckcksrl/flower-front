import gql from "graphql-tag";

export const GetFlower = gql`
  query GetFlower($id: Int!) {
    GetFlower(id: $id) {
      result
      error
      flower {
        id
        name
        hits
        image
        content
        type {
          id
          name
        }
        images {
          image
          content
        }
      }
      like
      like_count
    }
  }
`;

export const isLike = gql`
  mutation Like($flowerid: Int, $commentid: Int) {
    Like(flowerid: $flowerid, commentid: $commentid) {
      result
      error
    }
  }
`;

export const getComment = gql`
  query GetComment($flowersid: Int!) {
    GetComment(flowersid: $flowersid) {
      result
      error
      comment {
        id
        comment
        users {
          id
        }
        incomment {
          comment
        }
      }
    }
  }
`;
