<template>
  <div id="pin-box" :style="computedPercentages">
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
    computedPercentages() {
      const currentLat = this.locationData.clickedLat;
      const currentLong = this.locationData.clickedLong;

      let latTopBound = this.currentMapBounds.latTop;
      let latBotBound = this.currentMapBounds.latBot;
      let longLeftBound = this.currentMapBounds.longLeft;
      let longRightBound = this.currentMapBounds.longRight;
      
      if (longLeftBound > longRightBound) {
        if (currentLong < 0) longLeftBound-= 360;
        else longRightBound+= 360;
      }

      const leftPercentage = (currentLong - longLeftBound)/(longRightBound - longLeftBound) * 100;
      const topPercentage = (currentLat - latTopBound)/(latBotBound - latTopBound) * 100;

      let displayValue = "initial";

      // If it's outside the bounds, the pin will have display none
      if (leftPercentage < 0 || leftPercentage > 100 || topPercentage < 0 || topPercentage > 100) {
        displayValue = "none";
      }

      // Return css styling properties
      return {
        left: `${leftPercentage}%`,
        top: `${topPercentage}%`,
        display: displayValue,
      };
    },
    /* display() {
      return this.percentages().left();
    } */
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

  cursor: pointer;

  transform: translate(-50%, -150%);
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
