import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./userTypeDefs.js";
import { transactionTypeDefs } from "./transactionTypeDefs.js";

export const typeDefs = mergeTypeDefs([userTypeDefs, transactionTypeDefs]);
