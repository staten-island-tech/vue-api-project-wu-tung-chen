<template>
  <div id="app">
     <div class="map-container">
        <img class="map" src="@/assets/us-map.jpg" alt="" @click="mapClick($event)">
     </div>
  </div>
</template>

<script>

export default {
   data() {
      return {
         latTop: 51.8,
         latBot: 21.48,
         longLeft: 126.27,
         longRight: 64.42,
      }
   },
   methods: {
      mapClick(event) {
         const elRect = event.currentTarget.getBoundingClientRect();
         const pixelsX = event.clientX - elRect.left;
         const pixelsY = event.clientY - elRect.top;

         const percentX = pixelsX / elRect.width;
         const percentY = pixelsY / elRect.height;

         const latRange = this.latBot - this.latTop;
         const longRange = this.longRight - this.longLeft;

         const latitude = this.latTop + (percentX * latRange);
         const longitude = this.longLeft + (percentY * longRange);

         console.log(latitude,longitude);
      }
   },
   mounted () {},
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
