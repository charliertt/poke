<template>
  <div class="world-map-view">
    <div class="map-canvas" :style="{ backgroundImage: `url(${mapArt})` }">
      <PathConnections :zones="mapStore.allZones" :width="MAP_WIDTH" :height="MAP_HEIGHT" />

      <ZoneNode
        v-for="zone in mapStore.allZones"
        :key="zone.id"
        :zone="zone"
        :map-width="MAP_WIDTH"
        :map-height="MAP_HEIGHT"
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
import mapArt from '../assets/cali-journey-map.svg';

const mapStore = useMapStore();

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 1200;

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
  background: radial-gradient(circle at 50% 20%, #dff4ff 0%, #a5d6ff 70%, #7fb7ff 100%);
  padding: 20px 0 40px;
}

.map-canvas {
  position: relative;
  width: min(960px, 95vw);
  aspect-ratio: 1 / 1;
  margin: 0 auto 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
}
</style>