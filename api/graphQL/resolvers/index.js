const post = require('./post')
const postResolvers = require('./post')

module.exports = {
    Query: {
        ...post.Query
    }
}