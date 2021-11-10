<template>

  <div id="app">

   <div class="test-container">

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

  </div>

</template>

<style lang="scss">

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

:root {
   --pixel-size: 6;
}

body {
   background: #b5fcf6;
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
