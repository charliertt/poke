<template>
  <div class="page-container">
    <h1>Mapa de Progresión del Mundo</h1>
    <p class="status-bar">Bienvenido, Aventurero. {{ statusMessage }}</p>
    
    <WorldMapView />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useMapStore } from '../stores/mapStore';
import WorldMapView from '../components/WorldMapView.vue';

const mapStore = useMapStore();

const totalZones = computed(() => mapStore.allZones.length);
const completedZones = computed(() => mapStore.allZones.filter(z => z.state === 'completed').length);

const statusMessage = ref('Cargando el mapa...');

onMounted(async () => {
  // Simula la carga de datos
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  statusMessage.value = `Has completado ${completedZones.value} de ${totalZones.value} zonas. ¡A seguir!`;
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Ocupa toda la pantalla, el scroll lo maneja WorldMapView */
  width: 100%;
  height: 100vh; 
  background-color: #1a1a2e;
  color: #fff;
  overflow: hidden; /* Evita doble scroll */
}

h1 {
  margin-top: 20px;
  color: #a7ff83;
}

.status-bar {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #334466;
  border-radius: 5px;
  font-style: italic;
}
</style>