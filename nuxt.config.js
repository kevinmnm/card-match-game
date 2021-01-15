import colors from 'vuetify/es5/util/colors'

export default {
   // Global page headers (https://go.nuxtjs.dev/config-head)
   head: {
      titleTemplate: '%s - card-match-game',
      title: 'card-match-game',
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         { hid: 'description', name: 'description', content: '' }
      ],
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
   },

   // Global CSS (https://go.nuxtjs.dev/config-css)
   css: [
   ],

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
   modules: [
   ],

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
               // lovely: colors.pink.lighten1,
               // lovely: '#FFBDE7',
               lovely: '#FFD7F0',
               plain: colors.black,
               colorless: colors.grey.lighten5

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
   loading: { color: '#800080' }
}
