<template>
  <div id="app">
     <div class="map-container">
        <img class="map" src="@/assets/us-map.jpg" alt="" @click="getCoords($event)">
     </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
   data() {
      return {
         latTop: 51.8,
         latBot: 21.48,
         longLeft: -126.27,
         longRight: -64.42,
      }
   },
   methods: {
      getCoords(event) {
         const elRect = event.currentTarget.getBoundingClientRect();
         const pixelsX = event.clientX - elRect.left;
         const pixelsY = event.clientY - elRect.top;

         const percentX = pixelsX / elRect.width;
         const percentY = pixelsY / elRect.height;

         const latRange = this.latBot - this.latTop;
         const longRange = this.longRight - this.longLeft;

         const latitude = this.latTop + (percentY * latRange);
         const longitude = this.longLeft + (percentX * longRange);

         console.log(`${latitude}, ${longitude}`);
      },
   },
   created() {
      EventService.getMap();
      //EventService.getMapRefactored();
   },
};

</script>


<style lang="scss">

#app {
   width: 100%;
   height: 100%;
}

body {
   background: #b5fcf6;
   margin: 0 !important;
   padding: 0 !important;
}

.map-container {
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
}

.map {
   width: 60rem;
}

</style>
