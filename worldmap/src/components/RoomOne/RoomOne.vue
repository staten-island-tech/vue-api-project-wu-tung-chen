<template>
  <div class="roomOne">
    <div class="canvas" id="canvas">
      <div id="character">
        <img class="Character_shadow pixelart" src="@/assets/Character_Shadow.png" alt="Shadow" />

        <img class="Character_spritesheet pixelart face-down" id="spriteCharacter" src="@/assets/Character.png" alt="Character" />
      </div>
    </div> 
  </div> 
</template>

<script>

  export default {
    name: "RoomOne",
    mounted: function() {
      const sprite = document.getElementById("spriteCharacter");
      const character = document.getElementById("character");
      let screenWidth;
      let screenHeight;
      let x = 0;
      let y = 5;
      //screen size
      const findScreenSize = function() {
        //divide by 6 to put in rem
        //6 bc width of sprite is 6
        screenWidth = window.innerWidth / 16 - 6;
        document.getElementById("canvas").style.width = window.innerWidth / 16 + "rem";
        //8 bc height of sprite is 8
        //plus 8 for inventory
        screenHeight = window.innerHeight / 16 - 14;
        document.getElementById("canvas").style.height = window.innerHeight / 16 + "rem";
      };
      findScreenSize();
      window.onresize = findScreenSize;
      //animation
      const addAnimation = function() {
        sprite.classList.add("Character_animation");
      };
      const removeAnimation = function() {
        sprite.classList.remove("Character_animation");
      };
      //movement
      const moveUp = function() {
        sprite.classList.add("face-up");
        sprite.classList.remove("face-down", "face-right", "face-left");
        y = y - 1;
      };
      const moveRight = function() {
        sprite.classList.add("face-right");
        sprite.classList.remove("face-down", "face-left", "face-up");
        x = x + 1;
      };
      const moveLeft = function() {
        sprite.classList.add("face-left");
        sprite.classList.remove("face-down", "face-right", "face-up");
        x = x - 1;
      };
      const moveDown = function() {
        sprite.classList.add("face-down");
        sprite.classList.remove("face-right", "face-left", "face-up");
        y = y + 1;
      };
      const updateSpritePosition = function() {
        character.style.left = x + "rem";
        character.style.top = y + "rem";
      };
      //boundaries
      const walls = function() {
        if (x < 0) {
          sprite.classList.remove("Character_animation");
          x = 0;
        } else if (x > screenWidth) {
          sprite.classList.remove("Character_animation");
          x = screenWidth;
        } else if (y < 0) {
          sprite.classList.remove("Character_animation");
          y = 0;
        } else if (y > screenHeight) {
          sprite.classList.remove("Character_animation");
          y = screenHeight;
        }
      };
      //keyboard
      const keyboardAnimate = function(event) {
        if (event.keyCode == "38" || event.keyCode == "87") {
          moveUp();
        } else if (event.keyCode == "39" || event.keyCode == "68") {
          moveRight();
        } else if (event.keyCode == "37" || event.keyCode == "65") {
          moveLeft();
        } else if (event.keyCode == "40" || event.keyCode == "83") {
          moveDown();
        }
        coordinates(event);
      };
      function move(event) {
        addAnimation();
        //animate
        keyboardAnimate(event);
        //check if overboard
        walls();
        updateSpritePosition();
      }
      document.addEventListener("keydown", move);
      //when arrow keys are released, stops animation
      function stop() {
        removeAnimation();
        clearInterval();
      }
      document.addEventListener("keyup", stop);
      const coordinates = function(event) {
        const mapArray = Array.from(document.getElementsByClassName("map-item"));
        const modalArray = Array.from(document.getElementsByClassName("modal-item"));
        let playerCoords = document.getElementById("character").getBoundingClientRect();
        let playerLeft = Math.round(playerCoords.left / 16);
        let playerRight = Math.round(playerCoords.right / 16);
        let playerTop = Math.round(playerCoords.top / 16 + 2);
        let playerBottom = Math.round(playerCoords.bottom / 16);
        mapArray.forEach(function(item) {
          let objectCoords = item.getBoundingClientRect();
          let objectLeft = Math.round(objectCoords.left / 16);
          let objectRight = Math.round(objectCoords.right / 16);
          let objectTop = Math.round(objectCoords.top / 16);
          let objectBottom = Math.round(objectCoords.bottom / 16);
          if (playerRight > objectLeft && playerLeft < objectRight && playerBottom > objectTop && playerTop < objectBottom) {
            item.children[0].style.transform = "scale(1.2)";
            item.style.pointerEvents = "all";
            if (event.keyCode == "13") {
              modalArray.forEach(function(item) {
                item.style.display = "none";
              });
              item.children[3].style.display = "block";
            }
          } else {
            item.children[0].style.transform = "scale(1)";
            item.style.pointerEvents = "none";
          }
        });
      };
    },

};

</script>

<style>
  :root {
    --scale: 6;
  }
  * {
    margin: 0;
    padding: 0;
  }
  html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }
  body {
    background-color: antiquewhite;
    overflow: hidden;
  }
  .roomOne {
    width: 100%;
    height: 100%;
  }
  .canvas {
    padding: 0;
    position: absolute;
    /* background-image: url("~@/assets/Images/RoomOne/space2.jpg"); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
  #character {
    width: calc(1rem * var(--scale));
    height: calc(1rem * var(--scale));
    overflow: hidden;
    position: absolute;
    top: 5rem;
    left: 0;
    z-index: 1;
  }
  .Character_spritesheet {
    width: calc(4rem * var(--scale));
    position: absolute;
    left: 0;
  }
  .Character_animation {
    animation: moveSpritesheet 1s steps(4) infinite;
  }
  .Character_shadow {
    position: absolute;
    width: calc(1rem * var(--scale));
    height: calc(1rem * var(--scale));
    left: 0;
  }
  .pixelart {
    image-rendering: pixelated;
  }
  .face-right {
    top: calc(-1rem * var(--scale));
  }
  .face-up {
    top: calc(-2rem * var(--scale));
  }
  .face-left {
    top: calc(-3rem * var(--scale));
  }
  @keyframes moveSpritesheet {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

</style>