import fetch from 'node-fetch';
import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import gql from 'graphql-tag'

import getApolloConfig from './apollo.config'

export default {
  target: 'static',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'nb-NO',
    },
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
      const httpLink = createHttpLink({
        uri: uri,
        fetch: fetch,
        cache: config.cache,
      });
      
      const operation = {
        query: gql`
        query {
          tiltak: entries(section: "tiltak") {
            ... on tiltak_tiltak_Entry {
              slug
            }
          }
          ressurser: entries(section: "ressurser") {
            ... on ressurser_ressurser_Entry {
              slug
            }
            ... on ressurser_pdfRessurs_Entry {
              slug
            }
          }
          resourceCategories: categories(group: "ressurser") {
            ... on ressurser_Category {
              slug
            }
          }
          dictionary: entries(section: "dictionary" ) {
            ... on dictionary_word_Entry {
              slug
            }
          }
        }`
      }
      // For single execution operations, a Promise can be use
      return makePromise(execute(httpLink, operation))
      .then(result => { 
        var tiltakArray = result.data.tiltak.map(tiltak => `/tiltak/${tiltak.slug}/`)
        var ressursArray = result.data.ressurser.map(ressurser => `/ressurser/${ressurser.slug}/`)
        var resourceCategories = result.data.resourceCategories.map(category => `/ressurser/kategori/${category.slug}/`)
        var wordArray = result.data.dictionary.map(dictionary => `/ordliste/${dictionary.slug}/`)
        return tiltakArray.concat(ressursArray, wordArray, resourceCategories)
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
