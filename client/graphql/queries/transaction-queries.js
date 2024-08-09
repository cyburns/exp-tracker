import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query getTransactions {
    getTransactions {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
