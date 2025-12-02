// src/stores/mapStore.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Zone } from '../types/zone'; 

// --- Datos Mockup de Zonas ---
const initialZones: Zone[] = [
    {
        id: 1,
        name: 'Cima Ventosa',
        description: 'Desde lo alto se observa todo el viaje. ¡Buen comienzo!',
        position: { x: 600, y: 180 },
        state: 'completed',
        progress: 100,
        nextZoneId: 2,
    },
    {
        id: 2,
        name: 'Bosque de Inicio',
        description: 'La primera zona. Aprende los fundamentos.',
        position: { x: 310, y: 440 },
        state: 'active',
        progress: 35,
        nextZoneId: 3,
    },
    {
        id: 3,
        name: 'Pradera Central',
        description: 'Encuentros amistosos y el profesor aguardando tu llegada.',
        position: { x: 600, y: 520 },
        state: 'locked',
        requirements: 'Completar "Bosque de Inicio"',
        nextZoneId: 4,
    },
    {
        id: 4,
        name: 'Cuevas Florecientes',
        description: 'Rocas, hongos brillantes y rutas inesperadas.',
        position: { x: 890, y: 470 },
        state: 'locked',
        requirements: 'Al menos 50% de Pradera Central',
        nextZoneId: 5,
    },
    {
        id: 5,
        name: 'Cascada del Arcoíris',
        description: 'La caída de agua marca la entrada al reto final.',
        position: { x: 600, y: 830 },
        state: 'locked',
        requirements: 'Completar "Cuevas Florecientes"',
    },
];

export const useMapStore = defineStore('map', () => {
    // STATE
    const zones = ref<Zone[]>(initialZones);
    const selectedZoneId = ref<number | null>(null);

    // GETTERS
    const allZones = computed(() => zones.value);

    const getSelectedZone = computed<Zone | null>(() => {
        if (selectedZoneId.value === null) return null;
        return zones.value.find(z => z.id === selectedZoneId.value) || null;
    });

    // ACTIONS
    function setSelectedZone(zone: Zone | null) {
        selectedZoneId.value = zone ? zone.id : null;
    }

    /**
     * Simula la finalización de una zona y actualiza la siguiente.
     * @param zoneId ID de la zona completada.
     */
    function completeZone(zoneId: number) {
        const zoneIndex = zones.value.findIndex(z => z.id === zoneId);
        if (zoneIndex === -1) return;

        // 1. Marcar la zona actual como completada
        const zone = zones.value[zoneIndex];
        if (!zone) return;

        zone.state = 'completed';
        zone.progress = 100;

        // 2. Activar la siguiente zona si existe
        const nextZoneId = zone.nextZoneId;

        if (nextZoneId) {
            const nextZoneIndex = zones.value.findIndex(z => z.id === nextZoneId);
            if (nextZoneIndex !== -1) {
                const nextZone = zones.value[nextZoneIndex];
                if (nextZone) {
                    nextZone.state = 'active';
                    nextZone.progress = 0;
                }
            }
        }
        
        // 3. Limpiar la selección
        setSelectedZone(null);
        console.log(`Zona ${zoneId} completada. ¡Progreso guardado!`);
    }

    return {
        // State & Getters
        allZones,
        getSelectedZone,
        // Actions
        setSelectedZone,
        completeZone,
    };
});