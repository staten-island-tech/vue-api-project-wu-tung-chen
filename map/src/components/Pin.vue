<template>
  <div>
    <h1> {{ pinData.lat }}, {{ pinData.long }} </h1>
    <h2> {{ pinData.county }}, {{ pinData.region }}, {{ pinData.country }}</h2>
    <!-- <div class="pin2"></div> -->
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

div {
  width: 10rem;
  height: auto;
  margin: 0.3rem;
}

h1 {
  font-size: 1.5rem;
}

h2 {
  font-size: 1.2rem;
  margin-top: -1rem;
}

/* .pin2 {
  position: absolute;
  top: 40%;
  left: 50%;
  margin-left: 115px;
  
  border-radius: 50%;
  border: 8px solid #fff;
  width: 8px;
  height: 8px;
}

.pin2::after {
  position: absolute;
  content: '';
  width: 0px;
  height: 0px;
  bottom: -30px;
  left: -6px;
  border: 10px solid transparent;
  border-top: 17px solid #fff;
} */

</style>
