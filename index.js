const {ApolloServer} = require("apollo-server")
const mongoose = require("mongoose")
require("dotenv").config()


const PORT = process.env.PORT || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

mongoose
.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    return server.listen({port: PORT})
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
})
.catch(err => {
    console.error(err)
})