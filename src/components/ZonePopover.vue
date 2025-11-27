<template>
  <div v-if="zone" class="zone-popover-overlay" @click.self="$emit('close')">
    <div class="popover-content">
      <h2>{{ zone.name }}</h2>
      <p>{{ zone.description }}</p>

      <div class="details">
        <p v-if="zone.state === 'locked' && zone.requirements">
          **🔒 Requisitos:** {{ zone.requirements }}
        </p>
        <p v-else-if="zone.state !== 'locked' && zone.progress !== undefined">
          **✅ Progreso:** {{ zone.progress }}%
        </p>
      </div>

      <button 
        v-if="zone.state === 'active'" 
        @click="$emit('enter-zone', zone.id)"
        class="action-button"
      >
        Entrar al Nivel
      </button>

      <button @click="$emit('close')" class="close-button">Cerrar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Zone } from '../types/zone';

defineProps<{
  zone: Zone | null;
}>();

defineEmits(['close', 'enter-zone']);
</script>

<style scoped>
.zone-popover-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.popover-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
  color: #333;
}

.details {
  margin: 15px 0;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.action-button {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
}

.close-button {
    background-color: #ccc;
}

button {
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>