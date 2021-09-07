<template>
    <div class="container">
        Audio via Web Audio Daw
        <Piano v-model:nota='pNota1'/>
        <AudioDaw v-model:nota='pNota1'/>
    </div>
</template>

<script>
import Piano from "@/components/Piano.vue"
import {ref} from "vue"
export default {
    components: {
        Piano
    },
    setup() {
        const pNota1 = ref (null)
        return {pNota1}
    },
}
</script>

