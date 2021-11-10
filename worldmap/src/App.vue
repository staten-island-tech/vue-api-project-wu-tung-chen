<template lang="en">
  <div id="app">
    <RoomOne v-if="roomOneLoad"/>
  </div>
</template>

<script>

  import RoomOne from "@/components/RoomOne/RoomOne";

  export default {
    name: "App",
    components: {
      RoomOne,
    },
    data() {
      return {
        roomOneLoad: false,
      };
    },
    methods: {
      StartGame: function() {
        this.start = true;
        this.roomOneLoad = true;
      },
      Restart: function() {
        this.roomOneLoad = false;
        this.start = false;
      },
    },
  };
</script>

<style>

  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  button {
    text-align: center;
    font-size: 1.5rem;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    border-radius: 0.5rem;
    color: white;
    font-family: "Roboto Mono", monospace;
    transition: 0.3s;
  }

</style>
