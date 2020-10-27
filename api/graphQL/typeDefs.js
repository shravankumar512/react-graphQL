const gql = require('graphql-tag')

module.exports = gql`
type Post {
    id:ID!
    body:String!
    createdAt:String!
    username:String!        
}
type User {
    id:ID!
    email:String!
    username:String!
    createdAt:String!
    token:String!
}
input RegisterUser {
    username:String!
    password:String!
    confirmPassword:String!
    email:String!
}
type Query {
    getPosts: [Post],
    getPost(postId: ID!): Post
}
type Mutation {
    register(registerUser: RegisterUser): User!
}
`
