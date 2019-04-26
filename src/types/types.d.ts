export interface GetCommentResponse {
  GetComment: {
    result: boolean;
    error: string;
    comment: {
      id: number;
      comment: string;
      createComment: string;
      likes: {
        id: number;
      }[];
      users: {
        id: number;
      };
      incomment: {
        id: number;
        comment: string;
        users: {
          id: number;
        };
      }[];
    }[];
  };
}

export interface CommentResponse {
  id: number;
  comment: string;
  createComment: string;
  likes: {
    id: number;
  }[];
  users: {
    id: number;
  };
  incomment: {
    id: number;
    comment: string;
    users: {
      id: number;
    };
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
    like: boolean;
    like_count: number;
  };
}
