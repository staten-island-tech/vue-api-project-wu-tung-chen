<template>
  <div class="home">
    <div class="map-container">
      <img class="quest-map" :src="mapURL" alt="Map" @click="addPin(getCoords($event))"/>
      <div class="canvas-container">
        <canvas width="1120" height="672">
          <img src />
        </canvas>
      </div>
      <div class="pin-container">
        <Pin v-for="(location, index) in locations" :key="index" :locationData="location" :currentMapBounds="mapBounds"></Pin>
      </div>
    </div>
    
    <div class="direction-container">
      <div @click="newMap('NW')"><h1 class="directions">NW</h1></div>
      <div @click="newMap('N')"><h1 class="directions">N</h1></div>
      <div @click="newMap('NE')"><h1 class="directions">NE</h1></div>
      <div @click="newMap('W')"><h1 class="directions">W</h1></div>
      <div class="div-no-color"></div>
      <div @click="newMap('E')"><h1 class="directions">E</h1></div>
      <div @click="newMap('SW')"><h1 class="directions">SW</h1></div>
      <div @click="newMap('S')"><h1 class="directions">S</h1></div>
      <div @click="newMap('SE')"><h1 class="directions">SE</h1></div>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <audio id="volume" controls loop autoplay>
        <source src="../assets/music/october.mp3" type="audio/mp3">
    </audio>  -->

  </div>
</template>

<script>
// @ is an alias to /src
import APICalls from "@/APICalls.js";
import Pin from '@/components/Pin.vue';

export default {
  name: "Home",
  components: {
    Pin,
  },
  data() {
    return {

      // Expected Projection - Coordinate bounds given to the map
      mapBounds: {
        latTop: 50,
        latBot: 25,
        longLeft: -125,
        longRight: -65,
      },

      // Actual Projection - Real coordinate bounds of the returned map
      
      /* mapBounds: {
        latTop: 55,
        latBot: 14,
        longLeft: -140,
        longRight: -50,
      }, */

      latInc: 15,
      longInc: 36,

      sourceMap: require("@/assets/map-us.jpg"),
      currentMapURL: null,

      locations: [
        {
          lat: 36.97,
          long: -92.30,

          clickedLat: 36.96,
          clickedLong: -92.29,

          county: "Douglass County",
          region: "Missouri",
          region_code: "MO",
          country: "United States",
          country_code: "USA",
        }
      ]
    };
  },

  methods: {
    getCoords(event) {
      const elRect = event.currentTarget.getBoundingClientRect();

      const pixelsX = event.clientX - elRect.left;
      const pixelsY = event.clientY - elRect.top;

      const percentX = pixelsX / elRect.width;
      const percentY = pixelsY / elRect.height;

      const latRange = this.mapBounds.latBot - this.mapBounds.latTop;
      const longRange = this.mapBounds.longRight - this.mapBounds.longLeft;

      // Calculates lat/long and rounds to 2 decimal

      const latitude = Number((this.mapBounds.latTop + percentY * latRange).toFixed(2));
      const longitude = Number((this.mapBounds.longLeft + percentX * longRange).toFixed(2));

      console.log(`${latitude}, ${longitude}`);

      return {
        latitude: latitude,
        longitude: longitude,
      }
    },

    addPin(coordinateObj){
      APICalls.getPlaceData(
        coordinateObj.latitude,
        coordinateObj.longitude
      ).then((locationData) => {
        // If the location has a county then log that, otherwise log the name of the marine area
        if (locationData.county) {
          this.locations.push({
              lat: Number(locationData.latitude.toFixed(2)),
              long: Number(locationData.longitude.toFixed(2)),

              clickedLat: coordinateObj.latitude,
              clickedLong: coordinateObj.longitude,

              county: locationData.county,
              region: locationData.region,
              region_code: locationData.region_code,
              country: locationData.country,
              country_code: locationData.country_code,
            })
        } else {
          // The location will be of type marine area or ocean
          this.locations.push({
            lat: locationData.latitude.toFixed(2),
            long: locationData.longitude.toFixed(2),

            clickedLat: coordinateObj.latitude,
            clickedLong: coordinateObj.longitude,

            name: locationData.name,
          })
        }
      });
    },

    newMap(direction) {
      // Changes lat/long based on input direction
      switch (direction.toUpperCase()) {
        case "N":
          this.mapBounds.latTop += this.latInc;
          this.mapBounds.latBot += this.latInc;
          break;
        case "S":
          this.mapBounds.latTop -= this.latInc;
          this.mapBounds.latBot -= this.latInc;
          break;
        case "E":
          this.mapBounds.longLeft += this.longInc;
          this.mapBounds.longRight += this.longInc;
          break;
        case "W":
          this.mapBounds.longLeft -= this.longInc;
          this.mapBounds.longRight -= this.longInc;
          break;
        case "NE":
          this.mapBounds.latTop += this.latInc * 0.7;
          this.mapBounds.latBot += this.latInc * 0.7;

          this.mapBounds.longLeft += this.longInc * 0.7;
          this.mapBounds.longRight += this.longInc * 0.7;
          break;
        case "NW":
          this.mapBounds.latTop += this.latInc * 0.7;
          this.mapBounds.latBot += this.latInc * 0.7;

          this.mapBounds.longLeft -= this.longInc * 0.7;
          this.mapBounds.longRight -= this.longInc * 0.7;
          break;
        case "SE":
          this.mapBounds.latTop -= this.latInc * 0.7;
          this.mapBounds.latBot -= this.latInc * 0.7;

          this.mapBounds.longLeft += this.longInc * 0.7;
          this.mapBounds.longRight += this.longInc * 0.7;
          break;
        case "SW":
          this.mapBounds.latTop -= this.latInc * 0.7;
          this.mapBounds.latBot -= this.latInc * 0.7;

          this.mapBounds.longLeft -= this.longInc * 0.7;
          this.mapBounds.longRight -= this.longInc * 0.7;
          break;
        default: 
          console.log(`Error: newMap() Invalid Direction: ${direction.toUpperCase()}`);
          break;
      }

      // COORDINATE BOUND

      // If latitudeTop is ABOVE north pole, cap it to the north pole
      if (this.mapBounds.latTop > 85) {
        this.mapBounds.latTop = 85;
        this.mapBounds.latBot = this.mapBounds.latTop - this.latInc;
      }

      // If latitudeBot is BELOW south pole, cap it to the south pole
      if (this.mapBounds.latBot < -85) {
        this.mapBounds.latBot = -85;
        this.mapBounds.latTop = this.mapBounds.latBot + this.latInc;
      }

      // If longitude is greater than 180deg East, convert to deg West (negative degrees)
      if (this.mapBounds.longLeft > 180) {
        this.mapBounds.longLeft -= 360;
      }
      if (this.mapBounds.longRight > 180) {
        this.mapBounds.longRight -= 360;
      }

      // If longitude is less than 180deg West (negative degrees), convert to deg East
      if (this.mapBounds.longLeft < -180) {
        this.mapBounds.longLeft += 360;
      }
      if (this.mapBounds.longRight < -180) {
        this.mapBounds.longRight += 360;
      }

      APICalls.getMap(
        this.mapBounds.latTop,
        this.mapBounds.longLeft,
        this.mapBounds.latBot,
        this.mapBounds.longRight
      ).then((imageURL) => (this.currentMapURL = imageURL));

    },

    loadSprite() {

      // sprite attributes
      // for reference: sprite is 14px by 17px (multiply this by scale)

      const scale = 1.8;
      const width = 32;
      const height = 48;
      const scaled_width = scale * width;
      const scaled_height = scale * height;
      const cycle_loop = [0, 1, 2, 3];
      const facing_down = 0;
      const facing_up = 3;
      const facing_left = 1;
      const facing_right = 2;
      const frame_limit = 9;
      const movement_speed = 5;

      let canvas = document.querySelector("canvas");
      let ctx = canvas.getContext("2d");
      let keyPresses = {};
      let currentDirection = facing_down;
      let currentLoopIndex = 0;
      let frameCount = 0;
      let positionX = 0;
      let positionY = 0;
      let img = new Image();

      //const elMapRectangle = document.querySelector(".map-container").getBoundingClientRect();

      window.addEventListener("keydown", keyDownListener);
      function keyDownListener(event) {
        keyPresses[event.key] = true;
      }

      window.addEventListener("keyup", keyUpListener);
      function keyUpListener(event) {
        keyPresses[event.key] = false;
      }

      function loadImage() {
        img.src = require("@/assets/probably-kenny.png");
        img.onload = function () {
          window.requestAnimationFrame(gameLoop);
        };
      }

      function drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(
          img,
          frameX * width,
          frameY * height,
          width,
          height,
          canvasX,
          canvasY,
          scaled_width,
          scaled_height
        );
      }

      loadImage();

      function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let hasMoved = false;

        if (keyPresses.w) {
          moveCharacter(0, -movement_speed, facing_up);
          hasMoved = true;
        } else if (keyPresses.s) {
          moveCharacter(0, movement_speed, facing_down);
          hasMoved = true;
        }

        if (keyPresses.a) {
          moveCharacter(-movement_speed, 0, facing_left);
          hasMoved = true;
        } else if (keyPresses.d) {
          moveCharacter(movement_speed, 0, facing_right);
          hasMoved = true;
        }

        if (hasMoved) {
          frameCount++;
          if (frameCount >= frame_limit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= cycle_loop.length) {
              currentLoopIndex = 0;
            }
          }
        }

        if (!hasMoved) {
          currentLoopIndex = 0;
        }

        drawFrame(
          cycle_loop[currentLoopIndex],
          currentDirection,
          positionX,
          positionY
        );

        // Code to get lad/long for sprite

        //console.log(`Sprite Pixels: ${positionX + (scaled_width / 2)}, ${positionY + (scaled_height * 3 / 4)}`);

        // Gets sprite pixels WITH offset
        /* const spritePixelX = positionX + (scaled_width / 2);
        const spritePixelY = positionY + (scaled_height * 3 / 4);

        const percentX = spritePixelX / elMapRectangle.width;
        const percentY = spritePixelY / elMapRectangle.height;

        const latRange = latBot - latTop;
        const longRange = longRight - longLeft;

        // Calculates lat/long and rounds to 2 decimal

        const latitude = (latTop + percentY * latRange).toFixed(2);
        const longitude = (longLeft + percentX * longRange).toFixed(2);

        console.log(`${latitude}, ${longitude}`);
 */

        window.requestAnimationFrame(gameLoop);
      }

      function moveCharacter(deltaX, deltaY, direction) {
        if (
          positionX + deltaX > 0 &&
          positionX + scaled_width + deltaX < canvas.width
        ) {
          positionX += deltaX;
        }
        if (
          positionY + deltaY > 0 &&
          positionY + scaled_height + deltaY < canvas.height
        ) {
          positionY += deltaY;
        }
        currentDirection = direction;
      }
    }
  },

  computed: {
    mapURL() {
      // If the map is NOT null, then return it, otherwise return default map.
      if (this.currentMapURL) return this.currentMapURL;
      else return this.sourceMap;
    },
  },

  mounted() {
    this.loadSprite();

    // change volume of music

    const audio = document.getElementById("volume");
    audio.volume = 0.9;

  },
};

</script>

<style>

body {
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-family: 'Noto Sans JP', sans-serif;
  background: linear-gradient(rgba(20, 4, 66, 0.4), rgba(20, 4, 66, 0.4)), url(../assets/travelers.jpg) no-repeat center;
}

/* #volume {
  width: 3.1rem;
  height: 1.5rem;
  margin-top: -1.5rem;
  margin-right: 67.5rem;
  position: relative;
} */

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-container {
  width: 70rem;
  height: 42rem;
  border: 0.5rem solid;
  border-color: rgba(248, 246, 255);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
}

.quest-map {
  width: 100%;
  height: 100%;
}

.canvas-container {
  position: absolute;
  margin-top: -42.2rem;

  pointer-events: none;
}

.direction-container {
  width: 10rem;
  height: 10rem;
  padding-top: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 60.3rem;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select:none;
}

.div-no-color {
  background: transparent !important;
  border: 0rem !important;
  cursor: default !important;
}

.direction-container > div {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  background: linear-gradient(rgba(251, 249, 255, 0.7), rgba(251, 249, 255, 0.7)), url(../assets/travelers.jpg) no-repeat bottom;
  text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  color: rgb(11, 3, 41);
  cursor: pointer;
  transition: all 0.5s;
  margin: auto;
}

.direction-container > div:hover{
  background: linear-gradient(rgba(20, 4, 66, 0.5), rgba(20, 4, 66, 0.5)), url(../assets/cherryblossoms.jpg) no-repeat center;
  color: whitesmoke;
  transform: scale(1.07);
}

.direction-container > div:active {
  transform: scale(0.3);
}

.directions {
  font-size: 1.2rem;
}

.pin-container{
  /* display: flex; 
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 1.7rem; */

  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 70rem;
  max-height: 42rem;
  position: absolute;
  margin-top: -42.3rem;

  pointer-events: none;
}

</style>
