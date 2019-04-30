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

export const GetCom = gql`
  query GetComment($flowersid: Int!) {
    GetComment(flowersid: $flowersid) {
      result
      error
      comment {
        id
      }
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
          nickname
        }
        incomment {
          id
          comment
          users {
            nickname
          }
          createComment
          likes {
            id
          }
        }
        createComment
        likes {
          id
        }
      }
    }
  }
`;
export const GetLibrary = gql`
  {
    GetLibrary {
      result
      error
      librarys {
        id
        name
        saveFlower {
          id
          flowers {
            id
          }
        }
      }
    }
  }
`;

export const CreateLibrary = gql`
  mutation CreateLibrary($name: String!) {
    CreateLibrary(name: $name) {
      result
      error
    }
  }
`;

export const CreateSaveFlower = gql`
  mutation CreateSaveFlower($flowerid: Int!, $libraryid: Int!) {
    CreateSaveFlower(flowerid: $flowerid, libraryid: $libraryid) {
      result
      error
    }
  }
`;

export const DeleteSave = gql`
  mutation DeleteSave($flowerid: Int!, $libraryid: Int!) {
    DeleteSave(flowerid: $flowerid, libraryid: $libraryid) {
      result
      error
    }
  }
`;
