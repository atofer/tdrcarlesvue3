<template>
<div>
    Introdueix un número del 0 al 6
    <input v-model="numero">
   <button v-on:click="envia">envia</button>
   {{missatge}}
</div>
</template>
<script>
var numeros = [3,8,1,2,6,1,2,3]; 
var numerossenserepetir = [];
var ordenats = [];
var temporal = [];

export default {
    name: 'ProvaFor',
    data(){
        return {
            numero:'', missatge:''
        }
    },
    methods:{ 
        envia: function () {
            this.missatge='no he trobat el numero que has posat'
            for( var i=0; i<numeros.length; i++){

               if (numerossenserepetir.find(element => numeros[i]==element)==undefined) {
                   numerossenserepetir.push(numeros[i]);
               }

            }
            ordenats.push(numeros[0]);
            var l=0;
            for(i=1; i<numerossenserepetir.length; i++){
                        if (numerossenserepetir[i]<ordenats[l]){
                             for (var k=0; k<l; k++){
                                 temporal.push (ordenats[k]);
                             }
                            temporal.push(numerossenserepetir[i]);
                            for (k=l; k<ordenats.length; k++){
                                temporal.push(ordenats[k]);
                            }
                            
                        }
                        else {
                            while(l<ordenats.length && ordenats[l]<numerossenserepetir[i]){
                                temporal.push(ordenats[l]);
                                l++;
                            }
                            temporal.push (numerossenserepetir[i]);
                            while(l<ordenats.length){
                                temporal.push(ordenats[l]);
                                l++;
                            }

                        }
                        ordenats=temporal;
                        temporal=[];
                        l=0
            }
            this.missatge =ordenats.join(",");

        
        },  
    }
}
</script>
<style scoped>

</style>