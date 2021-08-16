<template>
  <div class="error">{{ message }}</div>
</template>

<script>
  export default {
    name: 'McvErrorMessage',
    props: {
      message: {
        type: String,
        default: 'Something went wrong!',
      },
    },
  }
</script>
<style scoped>
  .error {
    color: red;
  }
</style>
