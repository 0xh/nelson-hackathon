const pkg = require("./package");

module.exports = {
  /**
   * Router config
   */
  router: {
    middleware: ["index-html-redirect"]
  },

  /**
   * PWA manifest
   */
  manifest: {
    name: "NELSON",
    lang: "en",
    display: "minimal-ui"
  },

  /**
   * Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "author", content: "NELSON" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /**
   * Custom plugins
   */
  plugins: [
    "~/plugins/anchor",
    "~/plugins/event-bus.js",
    "~/plugins/vuex-router-sync.js",
    { src: "~plugins/leaflet.js", ssr: false }
  ],

  /**
   * Global CSS
   */
  css: [],

  /**
   * Build configuration (webpack extension)
   */
  build: {
    postcss: [require("autoprefixer")(), require("postcss-clean")()],

    plugins: [
      //
    ],

    extend(config, { isDev }) {
      // Run ESLint on save
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  generate: {
    dir: "dist"
  },

  modules: [
    // ['@nuxtjs/proxy', { pathRewrite: { '^/api/': '/' }, secure: false }],
    "@nuxtjs/font-awesome",
    "@nuxtjs/apollo",
    ["@nuxtjs/pwa", { onesignal: false }],
    "nuxt-leaflet",
    "@nuxtjs/axios"
  ],

  apollo: {
    clientConfigs: {
      default: {
        // required
        httpEndpoint: "http://localhost:3000"
      }
    }
  },

  /**
   * Proxy config in order to get round CORS issues
   */
  proxy: {
    // '/api/': 'https://hostname'
  },

  mode: "spa"
};
