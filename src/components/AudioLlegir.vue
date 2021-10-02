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
var ac;
var analyser;
var contadorGuitarra;
var contadorPiano;
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
            ac = Wad.audioContext;
        
            tuner.add(voice);
            tuner.setVolume(0);
            voice.play();
            tuner.updatePitch();
            analyser = ac.createAnalyser();
            Wad.source.connect(analyser);
            
            /*analyser.fftSize = 2048;
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;*/
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength); 
            contadorGuitarra = 0;
            contadorPiano = 0;    
        
            var logPitch = function(){
                console.log(tuner.pitch, tuner.noteName);
                idReq = requestAnimationFrame(logPitch);
                analyser.getByteFrequencyData(dataArray);
               console.log (dataArray);
                let posh6 = Math.round(((tuner.pitch * 6.0)*1024.0)/24000.0)-1;
                let posh7 = Math.round(((tuner.pitch * 7.0)*1024.0)/24000.0)-1;
                let volumh6 = dataArray[posh6];
                let volumh7 = dataArray[posh7];
                if (volumh6>0 && volumh7>0) {
                    if (volumh7<volumh6){
                        contadorGuitarra = contadorGuitarra + 1;   
                    }
                    else {
                        contadorPiano = contadorPiano + 1;
                    }                
                }
               
               
            };
            logPitch();

            var renderKey = () => {
                console.log ("contadorPiano: "+contadorPiano);
                console.log ("contadorGuitarra: "+contadorGuitarra);
                if (contadorGuitarra>contadorPiano){
                    this.pNota = comu.TECLES.find(tecla=>tecla.nom == tuner.noteName);
                    this.$emit('update:nota', this.pNota);  
                }
                contadorGuitarra = 0;
                contadorPiano = 0;
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