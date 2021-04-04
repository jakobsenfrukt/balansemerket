import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";

import schema from "./schema.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema,
});

export default function(ctx) {
  return {
    httpEndpoint: "https://balansemerket.no/craft/api",
    cache: new InMemoryCache({ fragmentMatcher }),
    wsEndpoint: null,
  };
}
