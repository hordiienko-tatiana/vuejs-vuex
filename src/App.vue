<template>
  <div id="app">
    <mcv-top-bar />

    <router-view />
  </div>
</template>

<script>
  import McvTopBar from '@/components/AppTopBar.vue'
  import {actionTypes} from '@/store/modules/auth'

  export default {
    name: 'McvApp',
    components: {
      McvTopBar,
    },
    mounted() {
      this.$store.dispatch(actionTypes.getCurrentUser)
    },
  }
</script>
