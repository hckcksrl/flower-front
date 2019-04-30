import gql from "graphql-tag";

export const GetLike = gql`
  query GetLike($flowerid: Int, $commentid: Int) {
    GetLike(flowerid: $flowerid, commentid: $commentid) {
      result
      error
      like_count
    }
  }
`;

export const GetInComment = gql`
  query GetInComment($id: Int!) {
    GetInComment(id: $id) {
      comment {
        id
        users {
          nickname
        }
        createComment
        comment
        incomment {
          id
          comment
          users {
            nickname
          }
          createComment
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
