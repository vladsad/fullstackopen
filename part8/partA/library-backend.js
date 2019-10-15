const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    id: ID!,
    title: String!,
    published: Int!,
    author: String!,
    genres: [String]!,
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
  }

  type AuthorWithBooks {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int
  }

  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [AuthorWithBooks]
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
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => {
      return authors.length
      // return new Set(books.map(book => book.author)).size
    },
    allBooks: (root, args) => {
      let _books = [...books]
      if (Object.keys(args).length === 0 && args.constructor === Object) {
        return _books
      }
      if(args.genre) {
        _books = _books.filter(book => book.genres.includes(args.genre))
      }
      if(args.author) {
        _books = _books.filter(book => book.author === args.author)
      }
      return _books
    },
    allAuthors: () => {
      const _authors =  books.reduce((acc,val,index,array) => {
        if(val.author in acc) {
          acc[val.author]++
          return acc
        }
        acc[val.author] = 1
        return acc
      }, {})
      
      const result = [...authors]
      
      for (var author in _authors) {
        let index = authors.findIndex((el, ind) => {
          return el.name === author
        })
        if(index !== -1) {
          result[index] = {...result[index], 'bookCount': _authors[author]}
        } else {
          result.push({
            'name': author,
            'born': null,
            'id': uuid(),
            'bookCount': _authors[author]
          })
        }
      }

      return result

      // return books.reduce((acc, val, index, array)=>{
      //   for(let i = 0; i < acc.length; i++ ) {
      //     if(val.author === acc[i].name) {
      //       acc[i].bookCount++
      //       return acc
      //     }
      //   }
      //   acc.push({'name': val.author, 'bookCount': 1})
      //   return acc
      // }, [])
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid()}
      book.born = book.born ? book.born : null
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      let i = 0
      authors = authors.map(a => {
        if(a.name === args.name) {
          return {...a, born: args.setBornTo }
        } else {
          i++
          return {...a}
        }
      })
      // console.log(authors)
      if (i === authors.length) {
        return null
      }
      return authors.filter(a => a.name === args.name)[0]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})