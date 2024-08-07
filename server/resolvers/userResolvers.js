import { users } from "../lib/data.js";

export const userResolvers = {
  Query: {
    users: async () => users,
    user: async (_, { userId }) => users.find((user) => user._id === userId),
  },
  Mutation: {},
};
