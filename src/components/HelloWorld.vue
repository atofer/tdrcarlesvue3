<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    subtitol: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  color:rgba(38, 153, 153, 0.61);
}
.h2s {
 margin-top: -1em; 
}
.colorvermell{
  color:rgb(0, 0, 0);
}
</style>