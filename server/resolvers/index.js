import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./userResolvers.js";
import { transactionResolver } from "./transactionResolvers.js";

export const resolvers = mergeResolvers([userResolvers, transactionResolver]);
