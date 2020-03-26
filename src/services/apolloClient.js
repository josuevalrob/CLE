import ApolloClient, { InMemoryCache } from 'apollo-boost';

//Apollo GraphQl
const Client = new ApolloClient({
  uri : process.env.REACT_APP_API_URL,
  cache: new InMemoryCache({addTypename: false}),
  onError: ({networkError, graphQLErrors}) => {
    graphQLErrors && console.log('⚛️ GraphQl Error ⚛️',graphQLErrors)
    networkError && console.log('👮🏻‍♀️ network error', networkError)
  }
})

export default Client