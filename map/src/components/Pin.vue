<template>

  <div id="pin-box" :style="computedPercentages">

  <div class="pin" @click="showModal = !showModal">
    <transition name="fade">
      <div class="modal" v-if="showModal">
        <div class="backdrop"/>

        <div class="dialog">
          <div class="header">
            <p class="pin-coords">
              ({{locationData.lat}}, {{locationData.long}})
            </p>
            <p v-if="locationData.county" class="pin-info">
              {{locationData.county}}, {{locationData.region}}, {{locationData.country}}
            </p>
            <p v-else class="pin-info">
              {{locationData.name}}
            </p>
            
            <slot name="header"/>
          </div>

          <!-- <div class="body">
            <slot name="body"/>
          </div>

          <div class="footer">
            <slot name="footer"/>
          </div> -->
        </div>
      </div>
    </transition>
  </div>

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
      showModal: false,
    };
  },
  
  methods: {
    /* closeModal() {
      this.showModal = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.showModal = true;
      document.querySelector("body").classList.add("overflow-hidden");
    } */
  },

  computed: {
    computedPercentages() {
      const currentLat = this.locationData.clickedLat ? this.locationData.clickedLat : this.locationData.lat;
      const currentLong = this.locationData.clickedLong ? this.locationData.clickedLong : this.locationData.long;

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
  },

  // mounted (){

  //   let L = `quest-map`

  //   var map = L.map('pin').setView([36.97, -92.30], 0);

  //   L.tileLayer('http://www.mapquestapi.com/staticmap/v5/map?key=${mapQuestKey}&boundingBox=${latTop},${longLeft},${latBot},${longRight}&size=1000,600'
  //   ).addTo(map);

  //   L.marker([null, null]).addTo(map)
  //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //   .openPopup();
  // }
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
  cursor: url(../assets/genshin_pointer.png), auto;

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

.pin-coords {
  font-size: 1rem;  
}

.pin-info {
  font-size: 1rem;
  margin-left: 1rem;
}

/* MODAL CSS */

.modal {
  /* position: fixed;
  top: 0;
  right: 0;
  bottom: 0
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto; */
  position: fixed;
    z-index: 9;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate(-48%, -80%);
}

.backdrop {
    position: fixed;
    /* top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

.dialog {
    position: relative;
    width: 20rem;
    height: 5rem;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }

.header {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 7px 7px 10px;
  }

.body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

.footer {
    padding: 10px 20px 20px;
  }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>


