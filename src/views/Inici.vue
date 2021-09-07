<template>
  <div class="container">
    <div class="row">
        <div class="titol col">Treball de recerca </div>
    </div>
    <div class="container"> 
      <div class="row">
        <div class="descripcio col-8">
            Benvinguts a l'aplicació del meu tdr, aquí podras consultar la documentació que he fet servir per aconseguir que reconegui les notes de la meva guitarra.
        </div>
        <div class="col-4 fons"> 
        </div>
      </div>
    </div>
    
    <HelloWorld msg="APLICACIÓ PER LLEGIR NOTES"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "Inici",
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap");
.titol{
  text-align: center;
  font-size: 4em;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}

.descripcio{
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
  text-align: left;
}

.fons{
  background-image:  url("../assets/contrabaix.jpg");
  height: 30em;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
