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
                const MIN_VOLUME = 0;
                audioContext = new window.AudioContext();
                analyser = audioContext.createAnalyser();
                pitchSamples = new comu.SmartArray();
                const sampleRate = audioContext.sampleRate;                

                analyser.fftSize = 2048;
                analyser.minDecibels = -90;
                analyser.maxDecibels = -10;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                canvasContext = this.canvas.getContext('2d');

                const userMediaConstraints = {audio: true};

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

                const getKey = () => {
                    const pitch = pitchSamples.mode;
                    let closestLower = comu.KEYS[0];
                    let closestHigher = comu.KEYS[comu.KEYS.length - 1];

                    for (let i = 0; i < comu.KEYS.length; i++) {
                        if (comu.KEYS[i].hz < pitch) closestLower = comu.KEYS[i];
                        if (comu.KEYS[i].hz > pitch) {
                            closestHigher = comu.KEYS[i];
                            break; // going from low to high so we can stop here
                        }
                    }

                    const distanceToLower = Math.abs(pitch - closestLower.hz);
                    const distanceToHigher = Math.abs(pitch - closestHigher.hz);

                    return Math.min(distanceToLower, distanceToHigher) === distanceToLower?closestLower:closestHigher;
                };

                const renderKey = () => {
                    this.pNota = getKey();
                    this.$emit('update:nota', this.pNota) 
                    pitchSamples.empty();
                    console.log(this.pNota);
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

                    canvasContext.fillRect(i, item, 2, 2); // point in the wave

                    lastItem = item;
                    });
                };
                var vegades=1;
                var vInstrument;            
                const drawFreq = () => {
                    canvasContext.fillStyle = 'lightgray';
                    analyser.getByteFrequencyData(dataArray);
                    if (vegades==1) {
                        vInstrument=dataArray;
                        console.log(vInstrument);
                    }
                    let volumeTotal = 0;
                    canvasContext.fillRect(0, (300 - (256 / 10)), 1024, 1);

                    dataArray.forEach((item, i) => {
                    canvasContext.fillRect(i, 300 - item, 1, item);
                    volumeTotal += item;
                    });

                    const volume = volumeTotal / dataArray.length;
                    const nowLoudEnough = volume > MIN_VOLUME;

                    if (loudEnough !== nowLoudEnough) {
                        pitchSamples.empty();
                    }

                    loudEnough = nowLoudEnough;
                    this.db.textContent = volume;
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