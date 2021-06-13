<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap');
*{
  padding: 0px;
  margin: 0px;
}
#app{
  font-family: 'Lexend Deca', sans-serif !important;
}
</style>
<style src="./assets/tailwind.css"/>