import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./userResolvers";
import { transactionResolvers } from "./transactionResolvers";

export const resolvers = mergeResolvers([userResolvers, transactionResolvers]);
