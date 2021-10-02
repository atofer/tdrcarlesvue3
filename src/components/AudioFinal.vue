<template>
    <div>
     <button @button="$emit('uptdate:nota', $event.target.value)" v-on:click="comenca">Comença</button>
     <button v-on:click="para">Para</button>
     <canvas ref="canvas" width="1024" height="300"></canvas>
     <pre ref="db">0</pre>
     nota: {{nota}}
    </div>
</template>

<script>
import {onMounted, ref} from "vue"
import * as comu from "@/js/comu.js"
var audioContext; 
var analyser;
var audioReady;
var pitchSamples;
var audioSource;
var loudEnough;
var lestream;
var idReq;
var canvasContext;
var refreshIntervalId;
var arrayVolums;
var contadorGuitarra;
var contadorPiano;
var dataArray;

export default {
    props: {
        nota: Object,
    },
    emits: ['update:nota'],
    setup(props) {
        const canvas = ref(null);
        const pNota = ref(props.nota);
        const db = ref(null);
    onMounted(() => {
    
    })
        return {canvas, pNota, db}
    },
    methods:{ 
        comenca: function () {
                audioReady = false;
                loudEnough = false;
                const MIN_VOLUME = 5;
                audioContext = new window.AudioContext();
                analyser = audioContext.createAnalyser();
                pitchSamples = new comu.ArrayLectures();
                arrayVolums = new comu.ArrayLectures();
                const sampleRate = audioContext.sampleRate;                

                analyser.fftSize = 2048;
                analyser.minDecibels = -90;
                analyser.maxDecibels = -10;
                contadorGuitarra = 0;
                contadorPiano = 0;
                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
                //var daF = new Uint8Array(bufferLength);

                canvasContext = this.canvas.getContext('2d');

                const userMediaConstraints = {audio: true};

                navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

                const getUserMediaSuccess = stream => {
                    lestream = stream;
                    audioSource = audioContext.createMediaStreamSource(stream);
                    //this.mic_audio.srcObject = audioSource.stream;
                    //this.mic_audio.setAttribute('crossorigin', 'anonymous');    
                    audioSource.connect(analyser);
                    //audioSource.connect(audioContext.destination);
                    audioReady = true;
                    
                };
                const getUserMediaError = err => {
                    err && console.error(err);
                    };

                navigator.getUserMedia(userMediaConstraints, getUserMediaSuccess, getUserMediaError);

                let lastItem = 0;
                const STEPS_THRESHOLD = 5;
                //contadorElements = 0;

                const getKey = () => {
                    const pitch = pitchSamples.mode;
                   
                   
                    let retorn = null;
                    let closestLower = comu.TECLES[0];
                    let closestHigher = comu.TECLES[comu.TECLES.length - 1];

                    for (let i = 0; i < comu.TECLES.length; i++) {
                        if (comu.TECLES[i].hz < pitch) closestLower = comu.TECLES[i];
                        if (comu.TECLES[i].hz > pitch) {
                            closestHigher = comu.TECLES[i];
                            break;
                        }
                    }

                    const distanceToLower = Math.abs(pitch - closestLower.hz);
                    const distanceToHigher = Math.abs(pitch - closestHigher.hz);
                    retorn = Math.min(distanceToLower, distanceToHigher) === distanceToLower?closestLower:closestHigher;
                    console.log("Frequencia nota: "+retorn.hz); 
                    //console.log(arrayVolums);                                     
                    let nota = retorn.hz;
                    if (nota!=0){                                                
                       
                        contadorGuitarra = 0;
                        contadorPiano = 0;
                        for (let i=0; i<arrayVolums.tamany; i++){
                            let daF = arrayVolums.element(i);
                            let posh2 = Math.round(((nota * 2.0)*1024.0)/24000.0)-1;
                            let posh4 = Math.round(((nota * 4.0)*1024.0)/24000.0)-1;                        
                            let volumh2 = daF[posh2];
                            let volumh4 = daF[posh4];                                                        
                            if (volumh4<volumh2 && (((volumh2-volumh4)*1.0)/((volumh4+volumh2)*1.0))*100.0>30.0) {
                                contadorPiano = contadorPiano + 1;
                                
                            }                                
                            else {
                                contadorGuitarra = contadorGuitarra + 1;   
                            }

                        }
                        
                        if (contadorPiano > contadorGuitarra){
                            console.log ("piano:"+contadorPiano+" guitarra: "+contadorGuitarra);
                            retorn = null;
                        }
                        else{
                            console.log ("guitarra: "+contadorGuitarra +" piano:"+contadorPiano );
                        }
                        arrayVolums.empty();                    
                    }


                    
                    


                                                                   
                    return retorn;
                };
               

                const renderKey = () => {
                    this.pNota = getKey();
                    this.$emit('update:nota', this.pNota) 
                    pitchSamples.empty();
                };


                const drawWave = () => {
                    if (!loudEnough) return;
                    canvasContext.fillStyle = 'firebrick';
                    analyser.getByteTimeDomainData(dataArray);                            
                    canvasContext.fillRect(0, 128, 1024, 2);

                    let lastPos = 0;
                    dataArray.forEach((item, i) => {
                    if (i > 0 && i < dataArray.length && item > 128 && lastItem <= 128) {
                        const elapsedSteps = i - lastPos;
                        lastPos = i;

                        if (elapsedSteps > STEPS_THRESHOLD) {
                            const hertz = 1 / (elapsedSteps / sampleRate);
                            pitchSamples.push(hertz);
                        }
                    }

                    canvasContext.fillRect(i, item, 2, 2);

                    lastItem = item;
                    });
                };

                const drawFreq = () => {
                    canvasContext.fillStyle = 'lightgray';
                    var daF = new Uint8Array(bufferLength);
                    var copiaDaF = new Uint8Array(bufferLength);                
                    analyser.getByteFrequencyData(daF);  
                                       
                    
                    let volumeTotal = 0;
                    canvasContext.fillRect(0, (300 - (256 / 10)), 1024, 1);

                    daF.forEach((item, i) => {
                        canvasContext.fillRect(i, 300 - item, 1, item);
                        volumeTotal += item;
                    });

                    const volume = volumeTotal / daF.length;
                    const nowLoudEnough = volume > MIN_VOLUME;
                
                    loudEnough = nowLoudEnough;
                    this.db.textContent = volume;         
                    if (loudEnough){
                        daF.forEach((item,i)=>{
                            copiaDaF[i]=item;
                        })
                        arrayVolums.push(copiaDaF);                                                
                    } 

                    if (loudEnough !== nowLoudEnough) {
                        pitchSamples.empty();
                    }
                    
                };
                
                const renderAudio = () => {
                    idReq = requestAnimationFrame(renderAudio);

                    if (!audioReady) return;

                    canvasContext.clearRect(0, 0, 1024, 300);

                    drawFreq();
                    drawWave();
                };
               
                renderAudio();
                
                refreshIntervalId = window.setInterval(() => {
                    loudEnough && renderKey();
                }, 250);
        },
        para: function () {
                window.clearInterval (refreshIntervalId);
                window.cancelAnimationFrame(idReq);
                lestream.getTracks().forEach(element=>{
                    element.stop();
                })
                loudEnough = false;                
                canvasContext.clearRect(0, 0, 1024, 300);       
                this.pNota = null;
                this.$emit('update:nota', this.pNota)      
            }
    }
}
</script>

<style scoped>

</style>