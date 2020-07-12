const { buildSchema } = require("graphql");

module.exports = buildSchema(`


type Project{
    _id: String!
    userId: String!
    name: String!
    ArrayLine:[Int]
    ArrayIn: [Int]
    ArrayAnd: [Int]
    ArrayOr: [Int]
    ArrayNot: [Int]
    post: Boolean
}

type User{
    _id: String!
    name: String!
    surname: String!
    email: String!
    password: String
}

type AuthData{
    userId: ID!
    token: String!
    tokenExperation: Int!
}

input EventInput{
    title: String!
    description: String!
    date: String!
}

input UserInput{
    name: String!
    surname: String!
    email: String!
    password: String!
}

input ProjectInput{
    _id: String!
    name: String!
    arryLine: [Int]!
    arryIn: [Int]!
    arryAnd: [Int]!
    arryOr: [Int]!
    arryNot: [Int]!
}


type RootQuery{
    users: [User]!
    projects: [Project]
    login(email: String!, password: String!): AuthData
    projectsById(userId: String!): [Project]
    projectsByPost: [Project]
    userById(id: String!): [User]!
}

type RootMutation{
    createUser(userInput: UserInput!): User
    createProject(projectInput: ProjectInput!): Project
    deleteProject(id: String!): Project
    updateProject(projectInput: ProjectInput!, id: String!): Project
    postProject(post: Boolean!, id: String!): Project
    updateUser(name: String!, surname: String!, id: String!): User
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`);
