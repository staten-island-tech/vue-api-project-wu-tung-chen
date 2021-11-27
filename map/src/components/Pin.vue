<template>

  <div id="pin-box" :style="percentages">
    <!-- <h1> {{ locationData.lat }}, {{ locationData.long }} </h1>
    <h2> {{ locationData.county }}, {{ locationData.region }}, {{ locationData.country }}</h2> -->
  <div class="pin">
    <transition name="fade">
        <div class="modal" v-if="show">
          <div class="backdrop" @click="closeModal()"/>

          <div class="dialog">
            <div class="header">
              <slot name="header"/>
              <button type="button" class="close" @click="closeModal()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
              </button>
            </div>

            <div class="body">
              <slot name="body"/>
            </div>

            <div class="footer">
              <slot name="footer"/>
            </div>
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
      show: true,
    };
  },
  
  methods: {
    closeModal() {
      this.show = false;
        document.querySelector("body").classList.remove("overflow-hidden");
    },
        openModal() {
          this.show = true;
          document.querySelector("body").classList.add("overflow-hidden");
      
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

/* MODAL CSS */

.modal {
  position: fixed;
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
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
    width: 150px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }

.close {
    width: 29px;
    height: 30px;
    cursor: pointer;
  }

.header {
    display: flex;
    align-items: flex-start;
    justify-content: end;
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
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>


