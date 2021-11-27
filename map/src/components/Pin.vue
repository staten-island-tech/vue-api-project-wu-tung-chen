<template>
  <div id="pin-box" :style="percentages">
    <!-- <h1> {{ locationData.lat }}, {{ locationData.long }} </h1>
    <h2> {{ locationData.county }}, {{ locationData.region }}, {{ locationData.country }}</h2> -->
    <div class="pin"></div>
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
        left: `${(this.locationData.clickedLong - this.currentMapBounds. longLeft)/(this.currentMapBounds.longRight - this.currentMapBounds.longLeft) * 100}%`,

        top: `${(this.locationData.clickedLat - this.currentMapBounds.latTop)/(this.currentMapBounds.latBot - this.currentMapBounds.latTop) * 100}%`,
      }
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

#pin-box {
  position: absolute;

  background-color: white;
}

/* h1 {
  font-size: 1.3rem;
}

h2 {
  font-size: 1.1rem;
  margin-top: -1rem;
} */

.pin {
  position: absolute;
  
  border-radius: 50%;
  border: 0.64rem solid var(--pin-color);
  width: 0.64rem;
  height: 0.64rem;
}

.pin::after {
  position: absolute;

  content: '';
  width: 0rem;
  height: 0rem;
  top: 0.85rem;
  left: -0.48rem;
  border: 0.8rem solid transparent;
  border-top: 1.36rem solid var(--pin-color);
}

</style>
