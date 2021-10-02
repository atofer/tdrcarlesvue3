<template>
    <div id = "idTeclat" :aria-label="nota">
        <svg ref = "pianosvg" width="1200" height="200">
          <g > 
            <text  :key="key.pos" v-for="(key,index) in blanques"   :x="11+((index)*22)" y="10" text-anchor="middle">{{key.pos}}</text>
            <rect :key="key.pos" v-for="(key,index) in blanques" rx="2" :x="((index)*22)" y="14" width="22" height="125" :data-ref="'key_'+key.pos" piano-key="true" :class="'piano-key piano-key--ivory '+(key.pos==(nota==null?-1:nota.pos)?'piano-key--lit':'')"></rect>
          </g>
          <g>
            <rect :key="key.pos" v-for="(key,index) in negres" rx="2" :x="((key.pos-(index+1))*22)-(key.despl=='dreta'?3:key.despl=='esquerra'?7:5)" y="14" width="11" height="80" :data-ref="'key_'+key.pos" piano-key="true" :class="'piano-key piano-key--ebony '+(key.pos==(nota==null?-1:nota.pos)?'piano-key--lit':'')"></rect> 
          </g>
        </svg>
    </div>   
</template>

<script>
import * as comu from '@/js/comu.js'
export default {
  props: {
    nota: Object,
  },
  setup() {
  },
  computed: {
     blanques: function() {
       return comu.TECLES.filter(function(u) {return u.color=='blanca';})
     },
     negres: function() {
       return comu.TECLES.filter(function(u) {return u.color=='negra';})
     }
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
  fill: rgb(0, 0, 0);
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
  fill: #00ff00;
}
</style>