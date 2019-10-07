import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

import schema from './schema.json'


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema,
});


export default function(ctx) {
  return {
    httpEndpoint: ('http://localhost:3000/craft/api'),
    cache: new InMemoryCache({ fragmentMatcher }),
    wsEndpoint: null,
    httpLinkOptions: {
      headers: {
        'Authorization': 'Bearer DLxomPNNuYLVfh8RXClON9NJwTo0VJpP2kYRzq24qVEmBZwaXsWGxmTJw_gRWST9'
      }
    }
  }
}