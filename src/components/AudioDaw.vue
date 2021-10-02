<template>
    <div class = "audio">
        <button v-on:click="play()"> Comença </button>
        <button @click="stop()"> Para </button>
        Nota: {{nota}}
    </div>
</template>

<script>

import * as comu from '@/js/comu.js'
import {onMounted,ref} from 'vue'
import Wad from 'web-audio-daw';
var voice = new Wad({
    source  : 'mic',
})
var tuner;
var idReq;
var refreshIntervalId;
export default {
    props: {
        nota: Object,
    },
    emits: ['update:nota'],
    setup(props) {
        const pNota = ref(props.nota);
         onMounted(() => {
    
    })
        return {pNota}
    },
    methods: {
        play: function () {
            tuner = new Wad.Poly();
            tuner.add(voice);
            tuner.setVolume(0);
            voice.play();
            tuner.updatePitch();
          

 
            var logPitch = function(){
                console.log(tuner.pitch, tuner.noteName);
                idReq = requestAnimationFrame(logPitch);
            };
            logPitch();
   

            var renderKey = () => {
                this.pNota = comu.KEYS.find(tecla=>tecla.nom == tuner.noteName);
                this.$emit('update:nota', this.pNota);  
            }

            refreshIntervalId = window.setInterval(() => {
                    renderKey();
                }, 250);
        },
        stop: () => {
            window.clearInterval(refreshIntervalId);
            tuner.stopUpdatingPitch();
            window.cancelAnimationFrame(idReq);
            voice.stop();
        }
    }
}
</script>