<template>
  <div id="nav">
    <router-link to="/">Inici</router-link> |
    <router-link to="/documentacio">Documentació</router-link> |
    <router-link to="/aprox1">Aproximació 1</router-link> |
    <router-link to="/aprox2">Aproximació 2</router-link> |
    <router-link to="/final">Final</router-link> |
    <router-link to="/llegir">Llegir</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
