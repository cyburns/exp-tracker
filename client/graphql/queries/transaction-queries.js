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

export const GET_SINGLE_TRANSACTION = gql`
  query getTransaction($transactionId: ID!) {
    getTransaction(transactionId: $transactionId) {
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
