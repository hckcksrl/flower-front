import gql from "graphql-tag";

export const GetLike = gql`
  query GetLike($flowerid: Int, $commentid: Int) {
    GetLike(flowerid: $flowerid, commentid: $commentid) {
      result
      error
    }
  }
`;

export const GetInComment = gql`
  query GetInComment($id: Int!) {
    GetInComment(id: $id) {
      comment {
        id
        likes {
          id
        }
        users {
          id
        }
        createComment
        comment
        incomment {
          id
          comment
          users {
            id
          }
          createComment
          likes {
            id
          }
        }
      }
    }
  }
`;

export const CreateComment = gql`
  mutation CreateComment($comment: String!, $flowerid: Int, $commentid: Int) {
    CreateComment(
      comment: $comment
      flowerid: $flowerid
      commentid: $commentid
    ) {
      result
      error
    }
  }
`;
