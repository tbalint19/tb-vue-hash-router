# Vue hash router plugin (with disabled back button)

### Usage

Install in your VueJS project:

```bash
npm i -s tb-vue-hash-router
```

Import in __main.js__ and install it with a landing page:

```javascript
import HashRouterPlugin from 'tb-vue-hash-router'

Vue.use(HashRouterPlugin, { landingPage: 'my-custom-starter-page' })

Vue.component('my-custom-starter-page', MyCustomStarterPage)
```

All your pages should be globally installed in __main.js__!

```javascript
import MyCustomStarterPage from './components/my-custom-starter-page'
```

In your root vue component:
```html
<template>
  <div>
    <page-root></page-root>
  </div>
</template>
```


<hr>


And you are good to go!<br>

### API:

The default usage (with globally installed pages):

```javascript
methods: {
  navigateToHome: function() {
    this.$navigate('home-page')
    // the page rendered in <page-root> is home-page.vue
    // hash is #home
    // back button still useless
  }
}
```

...or simply from the template:

```html
<template>
  <div>
    <button @click="$navigate('home-page')">Home</button>
  </div>
</template>
```

__The param of *$navigate* function is always a string: the name of a globally registered page.__


<hr>


##### Full API:

```javascript
// simple redirect without params
this.$navigate('home-page')

// simple redirect with params - available in next page with $getRedirectParams
this.$navigate('home-page', { someKey: "someValue" })
```

```javascript
// loads the redirect params (most likely in created() lifecycle method)
/*
  in a page loaded with #products?id=5
  the object { id: 5 } is available
  with $getRedirectParams
*/
let params = this.$getRedirectParams()
```

```javascript
// adds ?id=5 to the hash
this.$addToQueryParams("id", 5)

// deletes query param id if exists
this.$deleteQueryParam("id")

// deletes all query params
this.$deleteQueryParams()

// updates multiple params to the hash: ?id=5&show=false
// previous params deleted
this.$updateQueryParams({ id: 5, show: false })
```
