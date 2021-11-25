<template>
  <div>
    <h1> {{ pinData.lat }}, {{ pinData.long }} </h1>
    <h2> {{ pinData.county }}, {{ pinData.region }}, {{ pinData.country }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Pin',
  props: {
    pinData: {
        type: Object,
        required: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
