export interface GetCommentResponse {
  GetComment: {
    result: boolean;
    error: string;
    comment: CommentResponse[];
  };
}

export interface GetComResponse {
  GetComment: {
    result: boolean;
    error: string;
    comment: {
      id: number;
    }[];
  };
}

export interface CommentResponse {
  id: number;
  comment: string;
  createComment: string;
  users: {
    nickname: string;
  };
  incomment: {
    id: number;
    comment: string;
    users: {
      nickname: string;
    };
    createComment: string;
  }[];
}

export interface GetFlowerResponse {
  GetFlower: {
    result: boolean;
    error?: string;
    flower: {
      id: number;
      name: string;
      hits: number;
      image: string;
      content: string;
      type: {
        id: number;
        name: string;
      };
      images: {
        image: string;
        content: string;
      }[];
    };
  };
}

export interface MyLibraryResponse {
  id: number;
  name: string;
  saveFlower: {
    id: number;
    flowers: {
      id: number;
      name: string;
      image: string;
      type: {
        id: number;
        name: string;
      };
    };
  }[];
}

export interface GetLibraryResponse {
  id: number;
  name: string;
  saveFlower: {
    id: number;
    flowers: {
      id: number;
    };
  }[];
}

export interface FlowerResponse {
  id: number;
  name: string;
  hits: number;
  image: string;
  content: string;
  type: {
    id: number;
    name: string;
  };
  images: {
    image: string;
    content: string;
  }[];
}

export interface GetLikeResponse {
  result: boolean;
  error?: string;
  like_count: number;
}
// export interface CommentResponse {
//   id: number;
//   comment: string;
//   createComment: string;
//   likes: { id: number }[];
//   users: { id: number };
//   incomment: {
//     id: number;
//     comment: string;
//     users: {
//       id: number;
//     };
//   }[];
// }

// export interface GetFlowerResponse {
//   GetFlower: {
//     result: boolean;
//     error?: string;
//     flower: {
//       id: number;
//       name: string;
//       hits: number;
//       image: string;
//       content: string;
//       type: {
//         id: number;
//         name: string;
//       };
//       images: {
//         image: string;
//         content: string;
//       }[];
//     };
//   };
// }
