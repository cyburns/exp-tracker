import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./userResolvers.js";
import { transactionResolvers } from "./transactionResolvers.js";

export const resolvers = mergeResolvers([userResolvers, transactionResolvers]);
