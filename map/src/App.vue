<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  background: linear-gradient(rgba(248, 246, 255, 0.85), rgba(248, 246, 255, 0.85)), url(assets/cherryblossoms.jpg) no-repeat;
  margin-bottom: 0.5rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
}

#nav a {
  font-size: 1rem;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #4a33cc;
}

</style>
