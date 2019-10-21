const { ApolloServer, UserInputError, CheckResultAndHandleErrors,  gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int
  }

  type Query {
    me: User,
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String],
    ): Book,

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author,

    createUser(
      username: String!,
      favoriteGenre: String!,
    ): User,

    login(
      username: String!,
      password: String!,
    ): Token,
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0 && args.constructor === Object) {
        return await Book.find({})
      }
      if(args.genre) {
        return await Book.find({ genres: { $in: args.genre } })
      }
    },
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const author = await Author.findOne({ 'name' : args.author  })
        const bookData = {...args}

        if(author) {
          bookData.author = {...author}
        } else {
          bookData.author = new Author({
            name: args.author,
            born: null
          })
      
          try{
            await bookData.author.save()
          } catch (error) {
            throw new CheckResultAndHandleErrors(error.message, {
              invalidArgs:  args
            })
          }
        }

        try{
          const book = new Book({ ...bookData })
          await book.save()
          return book
        } catch (error) {
          throw new CheckResultAndHandleErrors(error.message, {
            invalidArgs:  args
          })
        }

      } catch (error) {
        throw new CheckResultAndHandleErrors(error.message, {
          invalidArgs:  args.author
        })
      }
    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Book: {
    author: async root => {
      const author = await Author.findOne({ '_id' : root.author  })
      return author
    }
  },
  Author: {
    bookCount: async root => {
      return await Book.find({ 'author': root._id }).countDocuments()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})