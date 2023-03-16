import colors from 'vuetify/es5/util/colors'

const {
  NODE_ENV,
  SERVER_PORT, // Set by docker-compose.
} = process.env;

const isDev = NODE_ENV === 'development';
const nodeEnv = NODE_ENV.toUpperCase();

const HOST = process.env[`NUXT_HOST_${nodeEnv}`];
const PORT = process.env[`NUXT_PORT_${nodeEnv}`];
const SERVER_URL = process.env[`NUXT_SERVER_URL_${nodeEnv}`];

export default {
  // Env configuration (https://nuxtjs.org/docs/configuration-glossary/configuration-env/)
  env: {
    //  server_url: isDev ? `http://localhost:5000` : `https://monstermatches.com`,
    SERVER_URL,
  },
  server: {
    host: HOST,
    port: PORT,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - card-match-game',
    title: 'card-match-game',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/vue-chat-scroll.js', '~/plugins/animate-css.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: 'vuetify/es5/util/colors',
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          classic: colors.deepPurple.accent4,
          classic_text: '#FFFFFF',
          // lovely: colors.pink.lighten1,
          // lovely: '#FFBDE7',
          lovely: '#FFD7F0',
          lovely_text: '#000000',
          plain: colors.grey.darken4,
          plain_text: '#FFFFFF',
          ghosty: '#000000',
          ghosty_text: '#FFFFFF',
          colorless: colors.grey.lighten5,
          colorless_text: '#000000',

        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },

  // Loading bar configuration (https://nuxtjs.org/docs/features/loading#loading)
  loading: {
    color: '#800080'
  },
}
