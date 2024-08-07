export const useTypeDef = `#graphql
    type User {
        id: ID!
        username: String!
        name: String!
        password: String!
    }

    type Query {
        getUsers: [User]
        authUser: User
        user(userId: ID!): User
    }

    type Mutation {
        signUp(input: SignUpInput): User
        logIn(input: LogInInput): User
        logOut: LogOutResponse
    }

    input SignUpInput {
        username: String!
        name: String!
        password: String!
    }

    input LogInInput {
        username: String!
        password: String!
    }

    type LogOutResponse {
        message: String!
    }
`;
