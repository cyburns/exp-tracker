import db from "./lib/fakeData.js";

export const userResolvers = {
  Query: {
    users: () => db.users,
  },
  Mutation: {},
};
