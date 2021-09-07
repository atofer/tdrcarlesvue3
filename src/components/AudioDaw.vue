<template>
    <div>
        <button @click="play()">play</button>
        {{nota}}
    </div>
</template>

<script>
import Wad from 'web-audio-daw';
import * as comu from '@/js/comu.js'
import {ref} from 'vue'
var voice = new Wad({
    source  : 'mic',
})
export default {
    props: {
        nota: Object,
    },
    emits: ['update:nota'],
    setup(props) {
        const pNota1 = ref(props.nota);
        return {pNota1}
    },
    methods: {
        play: () =>{
            voice.play();
            this.pNota1 = comu.KEYS[0];
        }
    }
}
</script>

<style scoped>

</style>