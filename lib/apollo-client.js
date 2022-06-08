import { ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
        'Content-Type': 'application/json',
    },
    uri: 'https://kinnelon.stepzen.net/api/exegetical-octopus/__graphql',
    cache: new InMemoryCache()
})

export default client