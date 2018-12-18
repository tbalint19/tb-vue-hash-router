<template lang="html">
  <component :is="page"></component>
</template>

<script>
export default {
  name: 'PageRoot',
  data() {
    return {
      page: null
    }
  },
  created() {
    if (!window || !window.location || !window.location.hash) {
      this.page = this.$landingPage
      window.location.hash = "hash-router-navigation"
    } else {
      this.page = window.location.hash.split("?")[0].substring(1) + "-page"
      window.location.hash = "hash-router-navigation"
    }
    window.location.hash = this.page.split("-page")[0]
    this.$hashRouter.$on("Page selected", (pageName) => this.page = pageName)
    window.onhashchange = function() {
      if (window.location.hash == "#hash-router-navigation") {
        window.history.forward(1)
      }
    }
  }
}
</script>

<style lang="css">

</style>
