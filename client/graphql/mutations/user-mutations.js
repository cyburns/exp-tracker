import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const LOG_IN = gql`
  mutation logIn($input: LogInInput!) {
    logIn(input: $input) {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
