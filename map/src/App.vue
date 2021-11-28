<template>

  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>

    <audio id="volume" controls loop autoplay muted>
        <source :src="songs[currentSongIndex]" type="audio/mp3">
    </audio>

    <!-- <button @click="cycleSong()">CHANGE SONG</button> -->

<!-- ^^^ can change songs between 'shinkai.mp3' , 'october.mp3' or 'stardew.mp3' ^^^ -->
<!-- change the volume in Home.vue, go all the way down to <script></script> -->

  </div>

</template>

<script>

export default {
  name: "App",
  data() {
    return {
      songs: [
        require("@/assets/music/jujutsu.mp3"),
        require("@/assets/music/october.mp3"),
        require("@/assets/music/shinkai.mp3"),
        require("@/assets/music/stardew.mp3"),
      ],
      currentSongIndex: 3,
    }
  },
  methods: {
    cycleSong() {
      this.currentSongIndex++;
      if (this.currentSongIndex === this.songs.length) {
        this.currentSongIndex = 0;
      }
    }
  },
}
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#volume {
  width: 3.1rem;
  height: 1.5rem;
  bottom: 10rem;
  right: 0.3rem;
  margin-bottom: -1rem;
  margin-right: 67.3rem;
  box-shadow: 0 0.3rem 0.5rem rgb(0 0 0 / 40%);
  border-radius: 0.7rem;
  position: relative;
}

#nav {
  padding: 20px;
  background: linear-gradient(rgba(248, 246, 255, 0.85), rgba(248, 246, 255, 0.85)), url(assets/cherryblossoms.jpg) no-repeat;
  margin-bottom: 0.6rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  margin-top: 1.2rem;
  width: 68.5rem;
}

#nav a {
  font-size: 1rem;
  font-weight: bold;
  color: #2c3e50;
  cursor: url(assets/genshin_pointer.png), auto;
}

#nav a.router-link-exact-active {
  color: #4a33cc;
}

</style>