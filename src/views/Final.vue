<template>
 <div class="container">
     Llegir guitarra
    <Piano v-model:nota='pNota1'/>
    <AudioFinal v-model:nota='pNota1'/> 
  </div>
</template>

<script>
import Piano from "@/components/Piano.vue"
import AudioFinal from "@/components/AudioFinal.vue"
import {ref} from "vue"
export default {
  components: {
    Piano, AudioFinal
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