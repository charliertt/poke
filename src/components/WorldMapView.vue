<template>
  <div class="world-map-view">
    <div class="map-canvas">
      <PathConnections :zones="mapStore.allZones" />

      <ZoneNode
        v-for="zone in mapStore.allZones"
        :key="zone.id"
        :zone="zone"
        @node-click="mapStore.setSelectedZone" 
      />
    </div>

    <ZonePopover
      :zone="mapStore.getSelectedZone"
      @close="mapStore.setSelectedZone(null)"
      @enter-zone="handleEnterZone"
    />
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '../stores/mapStore';
import ZoneNode from './ZoneNode.vue';
import ZonePopover from './ZonePopover.vue';
import PathConnections from './PathConnections.vue';

const mapStore = useMapStore();

const handleEnterZone = (zoneId: number) => {
  console.log(`¡Entrando a la Zona ID: ${zoneId}! Redirigiendo...`);
  
  // En una aplicación real, aquí iría la navegación a la vista del nivel:
  // router.push({ name: 'level', params: { id: zoneId } })

  alert(`Cargando la Zona ${mapStore.getSelectedZone?.name}. El nivel comenzaría aquí.`);

  // Simulación: Si el nivel se completa exitosamente:
  // mapStore.completeZone(zoneId); 
};
</script>

<style scoped>
.world-map-view {
  width: 100%;
  height: 100vh;
  overflow-y: auto; 
  position: relative;
  background-color: #2c3e50;
}

.map-canvas {
  position: relative;
  /* Altura que permite el scroll (mayor a 100vh) */
  height: 1200px; 
  width: 800px;
  margin: 0 auto; 
}
</style>