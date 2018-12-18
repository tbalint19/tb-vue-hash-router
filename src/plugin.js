import Vue from 'vue'
import PageRoot from './page-root.vue'

export default class HashRouterPlugin {

  static HASH_ROUTER_CONTROLLER = new Vue({
    data: {
      redirectParams: {}
    },
    methods: {
      navigate: function(pageName, params) {
        this.redirectParams = params ? params : {}
        window.location.hash = "hash-router-navigation"
        window.location.hash = pageName.split("-page")[0]
        this.$emit("Page selected", pageName)
      },
      getRedirectParams: function() {
        let params = Object.assign({}, this.redirectParams)
        return params
      },
      addToQueryParams: function(key, value) {
        if (!this.supportsHash()) {
          return result
        }
        window.location.hash += window.location.hash.includes("?") ? "&" : "?"
        window.location.hash += key + "=" + value
      },
      updateQueryParams: function(newParams) {
        this.deleteQueryParams()
        for (let key in newParams) {
          this.addToQueryParams(key, newParams[key])
        }
      },
      deleteQueryParams: function() {
        window.location.hash = window.location.hash.split("?")[0].substring(1)
      },
      deleteQueryParam: function(key) {
        let currentParams = this.parseQueryParams()
        delete currentParams[key]
        this.updateQueryParams(currentParams)
      },
      parseQueryParams: function() {
        let result = {}
        if (!this.supportsHash()) {
          return result
        }
        let queryParams = window.location.hash.split("?")[1]
        if (!queryParams) {
          return result
        }
        let params = queryParams.split("&")
        params.forEach((param) => {
          let key = param.split("=")[0]
          let value = param.split("=")[1]
          result[key] = value
        })
        return result
      },
      supportsHash: function() {
        if (!window || !window.location || window.location.hash == undefined) {
          return false
        }
        return true
      }
    },
    created() {
      this.redirectParams = this.parseQueryParams()
    }
  })

  static install(Vue, options) {
    if (!options || !options.landingPage) {
      let error = `
No landing page added!
Define a globally registered component as a landing page!
In main.js upon registering HashRouterPlugin:

import YourComponent from './components/your-component.js'

Vue.use(HashRouterPlugin, { landingPage: 'your-component' })

Vue.component('your-component', YourComponent)
      `
      throw error
    }

   Vue.prototype.$navigate = HashRouterPlugin.HASH_ROUTER_CONTROLLER.navigate
   Vue.prototype.$getRedirectParams = HashRouterPlugin.HASH_ROUTER_CONTROLLER.getRedirectParams
   Vue.prototype.$addToQueryParams = HashRouterPlugin.HASH_ROUTER_CONTROLLER.addToQueryParams
   Vue.prototype.$deleteQueryParam = HashRouterPlugin.HASH_ROUTER_CONTROLLER.deleteQueryParam
   Vue.prototype.$deleteQueryParams = HashRouterPlugin.HASH_ROUTER_CONTROLLER.deleteQueryParams
   Vue.prototype.$updateQueryParams = HashRouterPlugin.HASH_ROUTER_CONTROLLER.updateQueryParams

   Vue.prototype.$hashRouter = HashRouterPlugin.HASH_ROUTER_CONTROLLER
   Vue.prototype.$landingPage = options.landingPage

   Vue.component('page-root', PageRoot);
  }

}
