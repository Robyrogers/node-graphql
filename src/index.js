const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

// const resolvers = {
//     Query: {
//         info: () => `This is the api of Hackernews Clone`,
//         feed: () => links,
//         link: (parent, args) => {
//             const result = links.find(item => item.id===args.id)
//             return result
//         }
//     },

//     Mutation: {
//         post: (parent, args) => {
//             const link = {
//                 id: `link-${idCount++}`,
//                 description: args.description,
//                 url: args.url
//             }
//             links.push(link)
//             return link
//         },
//         updateLink: (parent, args) => {
//             const {id, url, description} = args
//             let updateIndex = -1
//             const newLinks = links.map((item, index) => {
//                 if(item.id!==id){
//                     return item
//                 }else{
//                     const newLink = Object.create(item)
//                     newLink.url = url ? url : item.url
//                     newLink.description = description ? description : item.description
//                     updateIndex = index
//                     return newLink
//                 }
//             })

//             links = newLinks
//             if(updateIndex<0)
//                 return null
//             else
//                 return links[updateIndex]
//         },
//         deleteLink: (parent, args) => {
//             const {id} = args
//             let deleteIndex = -1
//             const newLinks = links.filter((item, index) => {
//                 if(item.id!==id){
//                     return true
//                 }else{
//                     deleteIndex = index
//                     return false
//                 }
//             })
//             const deletedLink = deleteIndex>=0 ? links[deleteIndex] : null
//             links = newLinks
//             return deletedLink
//         }
//     },
//     //Not needed since the resolvers are simple and graphql server can infer the values that need to be returned
//     // Link: {
//     //     id: (parent) => parent.id,
//     //     description: parent => parent.description,
//     //     url: parent => parent.url
//     // }
// }

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => ({
        ...request,
        prisma
    })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))