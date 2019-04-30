import gql from "graphql-tag";

export const UserFind = gql`
  query UserFind($userid: Int!) {
    UserFind(userid: $userid) {
      result
      error
      token
    }
  }
`;

export const Logins = gql`
  mutation Logins($userid: Int!, $nickname: String) {
    Logins(userid: $userid, nickname: $nickname) {
      result
      error
      token
    }
  }
`;
