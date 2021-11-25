<template>
  <div class="home">
    <div class="map-container">
      <img class="quest-map" :src="mapURL" alt="Map" @click="getCoords($event)" />
      <div id="canvas">
      <canvas width="1120" height="672">
        <img src />
      </canvas>
      </div>
    </div>
    
    <div class="direction-container">
      <div @click="newMapNW()"><h1 id="directions">NW</h1></div>
      <div @click="newMapNorth()"><h1 id="directions">N</h1></div>
      <div @click="newMapNE()"><h1 id="directions">NE</h1></div>
      <div @click="newMapWest()"><h1 id="directions">W</h1></div>
      <div class="div-no-color"></div>
      <div @click="newMapEast()"><h1 id="directions">E</h1></div>
      <div @click="newMapSW()"><h1 id="directions">SW</h1></div>
      <div @click="newMapSouth()"><h1 id="directions">S</h1></div>
      <div @click="newMapSE()"><h1 id="directions">SE</h1></div>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import APICalls from "@/APICalls.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      latTop: 50,
      latBot: 25,
      longLeft: -125,
      longRight: -65,

      latInc: 15,
      longInc: 36,

      sourceMap: require("@/assets/map-us.jpg"),
      currentMapURL: null,
    };
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

      // Calculates lat/long and rounds to 1 decimal
      const latitude = (this.latTop + percentY * latRange).toFixed(1);
      const longitude = (this.longLeft + percentX * longRange).toFixed(1);

      console.log(`${latitude}, ${longitude}`);
    },
    
    newMapNorth() {
      this.latTop += this.latInc;
      this.latBot += this.latInc;

      this.newMap();
    },
    newMapSouth() {
      this.latTop -= this.latInc;
      this.latBot -= this.latInc;

      this.newMap();
    },
    newMapEast() {
      this.longLeft += this.longInc;
      this.longRight += this.longInc;

      this.newMap();
    },
    newMapWest() {
      this.longLeft -= this.longInc;
      this.longRight -= this.longInc;

      this.newMap();
    },
    newMapNE() {
      this.latTop += this.latInc * 0.7;
      this.latBot += this.latInc * 0.7;

      this.longLeft += this.longInc * 0.7;
      this.longRight += this.longInc * 0.7;

      this.newMap();
    },
    newMapNW() {
      this.latTop += this.latInc * 0.7;
      this.latBot += this.latInc * 0.7;

      this.longLeft -= this.longInc * 0.7;
      this.longRight -= this.longInc * 0.7;

      this.newMap();
    },
    newMapSE() {
      this.latTop -= this.latInc * 0.7;
      this.latBot -= this.latInc * 0.7;

      this.longLeft += this.longInc * 0.7;
      this.longRight += this.longInc * 0.7;

      this.newMap();
    },
    newMapSW() {
      this.latTop -= this.latInc * 0.7;
      this.latBot -= this.latInc * 0.7;

      this.longLeft -= this.longInc * 0.7;
      this.longRight -= this.longInc * 0.7;

      this.newMap();
    },
    newMap() {
      this.coordBound();

      APICalls.getMap(
        this.latTop,
        this.longLeft,
        this.latBot,
        this.longRight
      ).then((imageURL) => (this.currentMapURL = imageURL));
    },
    coordBound() {
      // If latitudeTop is ABOVE north pole, cap it to the north pole
      if (this.latTop > 85) {
        this.latTop = 85;
        this.latBot = this.latTop - this.latInc;
      }

      // If latitudeBot is BELOW south pole, cap it to the south pole
      if (this.latBot < -85) {
        this.latBot = -85;
        this.latTop = this.latBot + this.latInc;
      }

      // If longitude is greater than 180deg East, convert to deg West (negative degrees)
      if (this.longLeft > 180) {
        this.longLeft -= 360;
      }
      if (this.longRight > 180) {
        this.longRight -= 360;
      }

      // If longitude is less than 180deg West (negative degrees), convert to deg East
      if (this.longLeft < -180) {
        this.longLeft += 360;
      }
      if (this.longRight < -180) {
        this.longRight += 360;
      }
    },
  },
  computed: {
    mapURL() {
      // If the map is NOT null, then return it, otherwise return default map.
      if (this.currentMapURL) return this.currentMapURL;
      else return this.sourceMap;
    },
  },

  mounted: function () {

      // sprite attributes

    const scale = 1.5;
    const width = 32;
    const height = 48;
    const scaled_width = scale * width;
    const scaled_height = scale * height;
    const cycle_loop = [0, 1, 0, 2];
    const facing_down = 0;
    const facing_up = 3;
    const facing_left = 1;
    const facing_right = 2;
    const frame_limit = 6;
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

    window.addEventListener("keydown", keyDownListener);
    function keyDownListener(event) {
      keyPresses[event.key] = true;
    }

    window.addEventListener("keyup", keyUpListener);
    function keyUpListener(event) {
      keyPresses[event.key] = false;
    }

    function loadImage() {
      img.src =
        "http://untamed.wild-refuge.net/images/rpgxp/tokinoiori08.png";
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
  background-size: cover;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-container {
  width: 70rem;
  height: 42rem;
  border: 0.7rem solid;
  border-color: rgba(248, 246, 255);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
}

.quest-map {
  width: 100%;
  height: 100%;
}

#canvas {
  position: absolute;
  margin-top: -42.2rem;
}


.direction-container {
  width: 10rem;
  height: 10rem;
  padding-top: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 61.3rem;
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
  transition: all 0.9s;
  margin: auto;
}

.direction-container > div:hover{
  background: linear-gradient(rgba(20, 4, 66, 0.5), rgba(20, 4, 66, 0.5)), url(../assets/cherryblossoms.jpg) no-repeat center;
  color: whitesmoke;
  transform: scale(1.05);
}

.direction-container > div:active {
  transform: scale(0.75);
}

#directions {
  font-size: 1.2rem;
}

</style>
