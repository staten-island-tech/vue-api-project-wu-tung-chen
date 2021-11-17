<template>

  <div id="app">
     <div class="Character">   
      <img class="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" /> 
      <img class="Character_spritesheet pixelart face-down" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png" alt="Character" /> 
    </div>

    <div class="Character">   
      <img class="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" /> 
      <img class="Character_spritesheet pixelart face-right" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png" alt="Character" /> 
    </div>

     <div class="Character">   
      <img class="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" /> 
      <img class="Character_spritesheet pixelart face-left" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png" alt="Character" /> 
    </div>

        <div class="Character">   
      <img class="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" /> 
      <img class="Character_spritesheet pixelart face-up" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png" alt="Character" /> 
    </div>

  </div>

</template>

<style lang="scss">

:root {
   --pixel-size: 6;
}

* {
  padding: 0;
  margin: 0;
  font-size: 62.5%;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

body {
   background: url(../src/assets/Pixel_Map.png) no-repeat center;
   background-size: contain;
   background-color: rgb(204, 253, 255);

   margin: 0;
   height: 100vh;
   display: flex;
   // align-items: center;
   // justify-content: center;
   // flex-direction: column;
}

.Character {
   width: calc(32px * var(--pixel-size));
   height: calc(32px * var(--pixel-size));
   overflow: hidden;
   position: relative;
   margin: 4em auto;
}

.Character_spritesheet {
   animation: moveSpritesheet 1s steps(4) infinite;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   
}
.Character_shadow {
   position: absolute;
   width: calc(32px * var(--pixel-size));
   height: calc(32px * var(--pixel-size));
}

.pixelart {
   image-rendering: pixelated;
}

.face-right {
   top: calc(-32px * var(--pixel-size));
}
.face-up {
   top: calc(-64px * var(--pixel-size));
}

.face-left {
   top: calc(-96px * var(--pixel-size));
}


@keyframes moveSpritesheet {
   from {
      transform: translate3d(0px,0,0)
   }
   to {
      transform: translate3d(-100%,0,0)
   }
}


</style>