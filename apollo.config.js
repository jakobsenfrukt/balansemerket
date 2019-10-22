import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

import schema from './schema.json'


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema,
});

export const token = 'DLxomPNNuYLVfh8RXClON9NJwTo0VJpP2kYRzq24qVEmBZwaXsWGxmTJw_gRWST9'


export default function(ctx) {
  return {
    httpEndpoint: ('https://balansemerket.no/craft/api'),
    cache: new InMemoryCache({ fragmentMatcher }),
    wsEndpoint: null,
    httpLinkOptions: {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
  }
}