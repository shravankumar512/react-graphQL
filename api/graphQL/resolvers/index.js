const postsResolvers = require('./post');
const commentsReslovers = require('./comment');
const usersResolvers = require('./user');
const POST_ADDED = 'POST_ADDED';

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsReslovers.Mutation
    }
};