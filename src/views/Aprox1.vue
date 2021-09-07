<template>
 <div class="container">
     Audio via WebKit
    <Piano v-model:nota='pNota1'/>
    <Audio v-model:nota='pNota1'/> 
  </div>
</template>

<script>
import Piano from "@/components/Piano.vue"
import Audio from "@/components/Audio.vue"
import {ref} from "vue"
export default {
  components: {
    Piano, Audio
  },
  setup(){
    const pNota1 = ref (null)
    return {pNota1}
  }   
} 
</script>

<style scoped>
canvas {
  border: 1px dashed gray;
}

[data-ref="note"] {
  height: 30px;
  font-size: 20px;
}


rect {
  fill: transparent;
  stroke: #555;
  stroke-width: 1px;
}

text {
  stroke: none;
  fill: #ccc;
  font-size: 12px;
}

.piano-key {
  transition: fill 150ms;
}

.piano-key--ivory {
  fill: snow;
}

.piano-key--ebony {
  fill: black;
}

.piano-key--lit {
  fill: #2196f3;
}
</style>