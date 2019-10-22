import fetch from 'node-fetch';
import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag'

import getApolloConfig, { token } from './apollo.config'

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
      default: '~/apollo.config.js'
    }
  },

  proxy: [
    [ 'https://balansemerket.no/craft/api', { ws: false } ]
  ],

  generate: {
    routes: function () {
      const config = getApolloConfig()
      const uri = config.httpEndpoint
      // console.log(lol().cache)
      const httpLink = createHttpLink({
        uri: uri,
        fetch: fetch,
        cache: config.cache,
      });
      
      const authLink = setContext((_, { headers }) => {
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
          ressurser: entries(section:ressurser) {
            ... on Ressurser {
              slug
            }
            ... on RessurserPdfRessurs {
              slug
            }
          }
        }`
      }
      // For single execution operations, a Promise can be use
      return makePromise(execute(link, operation))
      .then(result => { 
        var tiltakArray = result.data.tiltak.map(tiltak => `/tiltak/${tiltak.slug}/`)
        var ressursArray = result.data.ressurser.map(ressurser => `/ressurser/${ressurser.slug}/`)
        return tiltakArray.concat(ressursArray)
      })
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
