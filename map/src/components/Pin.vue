<template>
  <div :style="percentages">
    <h1> {{ locationData.lat }}, {{ locationData.long }} </h1>
    <h2> {{ locationData.county }}, {{ locationData.region }}, {{ locationData.country }}</h2>
    <!-- <div class="pin2"></div> -->
  </div>
</template>

<script>

export default {
  name: 'Pin',
  props: {
    locationData: {
      type: Object,
      required: true,
    },
    currentMapBounds: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    percentages() {
      return {
        left: (this.locationData.clickedLong - this.currentMapBounds.longLeft)/(this.currentMapBounds.longRight - this.currentMapBounds.longLeft) * 100,

        top: (this.locationData.clickedLat - this.currentMapBounds.latTop)/(this.currentMapBounds.latBot - this.currentMapBounds.latTop) * 100,
      }
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

h1 {
  font-size: 2rem;
  width: 70rem;
  height: auto;
}

h2 {
  font-size: 1.5rem;
  width: 70rem;
  height: auto;
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
