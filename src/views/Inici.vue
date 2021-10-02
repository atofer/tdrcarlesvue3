<template>
  <div class="container">
    <div class="row">
        <div class="titol col">Treball de recerca </div>
    </div>
    <div class="container"> 
      <div class="row" style="max-height: 300px;">
        <div class="descripcio col-8">
            Benvinguts a l'aplicació del meu tdr, he intentat aconseguir que l'aplicació reconegui les notes de la meva guitarra.<br/>
            <ul>
              <li>Aproximació 1: Pàgina que identifica la nota que es rep per l'entrada del micròfon amb la "moda" de les feqüencies llegides</li>
              <li>Aproximació 2: Igual que la 1 però utilitzant una llibreria gratuita: Web Audio Daw.</li>
              <li>Final: Pàgina del resultat final, Si toca el General Music CD-20 no s'ilumina el teclat si sona la guitarra si.</li>
            </ul>
        </div>
        <div class="col-4 fons" />
      </div>
      <div class="row">
        <div class="lletra-petita">
          Imatge: creative commons -  Jasiel_Ch a Pixabay
        </div>
      </div>
      <div class="row">
        <div class="autor">
          Carles Tomàs Subirana - 2021<br/>
          2º BTX.
          Maristes Rubí
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inici",
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
  background-image:  url("../assets/guitar-5056322.jpg");
  height: 300px;
  background-repeat: no-repeat;
  background-size: contain;
}

.lletra-petita {
  font-size: 8px;
  text-align: right;
}

.autor {
  font-weight: bold;
  font-size: 10px;
  text-align: right;
}

</style>
