import fetch from 'node-fetch';
import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/proxy'
  ],

  apollo: {
    includeNodeModules: true,
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: {
        httpEndpoint: ('http://localhost:3000/craft/api'),
        wsEndpoint: null,
        httpLinkOptions: {
          headers: {
            'Authorization': 'Bearer DLxomPNNuYLVfh8RXClON9NJwTo0VJpP2kYRzq24qVEmBZwaXsWGxmTJw_gRWST9'
          }
        }
      }
    }
  },

  proxy: [
    [ 'https://balansemerket.jakobsenfrukt.no/craft/api', { ws: false } ]
  ],

  generate: {
    routes: function () {
      const uri = 'https://balansemerket.jakobsenfrukt.no/craft/api'
      
      const httpLink = createHttpLink({
        uri: uri,
        fetch: fetch
      });
      
      const authLink = setContext((_, { headers }) => {
        const token = 'DLxomPNNuYLVfh8RXClON9NJwTo0VJpP2kYRzq24qVEmBZwaXsWGxmTJw_gRWST9';
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });

      const link = authLink.concat(httpLink)

      const operation = {
        query: gql`
        query {
          tiltak: entries(section:tiltak) {
            ... on Tiltak {
              slug
            }
          }
        }`
      }
      // For single execution operations, a Promise can be use
      return makePromise(execute(link, operation))
      .then(result => { return result.data.tiltak.map(project => `/tiltak/${tiltak.slug}/`)})
      .catch(error => console.log(`received error ${error}`))
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
