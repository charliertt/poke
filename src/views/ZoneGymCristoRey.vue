<template>
  <div class="gym-zone">
    <!-- Header con info del gimnasio -->
    <div class="gym-header">
      <button class="back-btn" @click="goBack">
        ← Volver al Mapa
      </button>
      <div class="gym-info">
        <h1>🏟️ Gimnasio Cristo Rey</h1>
        <p>Líder: <strong>José</strong> | Tipo: Roca/Tierra</p>
      </div>
      <div class="controls-hint">
        <span>🎮 W-A-S-D o ↑ ↓ ← → para moverte</span>
      </div>
    </div>

    <!-- Área del mapa -->
    <div class="gym-map-container">
      <div ref="mapCanvas" class="map-canvas">
        <img
          ref="mapImg"
          :src="gymMapImage"
          alt="Gimnasio Cristo Rey"
          class="map-image"
        />

        <!-- Jugador -->
        <PlayerCharacter
          :x="playerPosition.x"
          :y="playerPosition.y"
          :is-moving="isMoving"
          :image-src="playerImage"
          label="Jugador"
        />

        <!-- Líder del Gimnasio (NPC) -->
        <div
          class="gym-leader"
          :class="{ 'near-player': isNearLeader }"
          :style="leaderStyle"
        >
          <div class="leader-sprite">
            <img :src="playerImage" alt="Líder José" class="leader-image" />
            <span class="leader-shadow"></span>
          </div>
          <div class="leader-label">Líder José</div>
        </div>
      </div>
    </div>

    <!-- Controles móviles -->
    <div class="mobile-controls">
      <div class="control-row">
        <button class="control-btn" @click="move('up')">⬆️</button>
      </div>
      <div class="control-row">
        <button class="control-btn" @click="move('left')">⬅️</button>
        <button class="control-btn" @click="move('down')">⬇️</button>
        <button class="control-btn" @click="move('right')">➡️</button>
      </div>
    </div>

    <!-- Modal de batalla -->
    <div v-if="showBattleModal" class="battle-modal-overlay" @click.self="showBattleModal = false">
      <div class="battle-modal">
        <div class="battle-header">
          <h2>⚔️ ¡Desafío del Líder!</h2>
        </div>
        <div class="battle-content">
          <div class="leader-preview">
            <img :src="playerImage" alt="Líder José" class="leader-avatar-img" />
            <div class="leader-name">Líder José</div>
          </div>
          <p class="battle-dialogue">
            "¡Bienvenido al Gimnasio Cristo Rey! Soy José, el líder de este gimnasio.
            Mi Tyranitar y yo hemos entrenado en las montañas de Cali.
            ¿Estás listo para el desafío?"
          </p>
          <div class="leader-pokemon">
            <span class="pokemon-icon">🦖</span>
            <span class="pokemon-name">Tyranitar Lv.45</span>
          </div>
        </div>
        <div class="battle-actions">
          <button class="btn-battle" @click="startBattle">
            ⚔️ ¡Pelear!
          </button>
          <button class="btn-cancel" @click="showBattleModal = false">
            🏃 Huir
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de victoria -->
    <div v-if="showVictoryModal" class="battle-modal-overlay">
      <div class="battle-modal victory">
        <div class="battle-header victory">
          <h2>🏆 ¡Victoria!</h2>
        </div>
        <div class="battle-content">
          <p class="victory-text">
            ¡Has derrotado al Líder José! Has demostrado ser un gran entrenador.
          </p>
          <div class="badge-reward">
            <div class="badge-icon">🏅</div>
            <div class="badge-name">Medalla Cristo Rey</div>
          </div>
        </div>
        <div class="battle-actions">
          <button class="btn-battle" @click="claimVictory">
            ✨ Reclamar Medalla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import gymMapImage from '../assets/gym-cristo-rey.png'
import playerImage from '../assets/player.png'
import PlayerCharacter from '../components/PlayerCharacter.vue'
import { useKeyboardMovement } from '../composables/useKeyboardMovement'

const router = useRouter()

// Estado del gimnasio
const showBattleModal = ref(false)
const showVictoryModal = ref(false)
const leaderDefeated = ref(false)

// Posición del líder (en %)
const leaderPosition = { x: 70, y: 75 }
const leaderStyle = computed(() => ({
  left: `${leaderPosition.x}%`,
  top: `${leaderPosition.y}%`,
}))

// Sistema de movimiento del jugador
const { position: playerPosition, isMoving, move } = useKeyboardMovement({
  initialPosition: { x: 50, y: 90 },
  speed: 2,
  bounds: { minX: 10, maxX: 90, minY: 20, maxY: 95 },
})

// Detectar proximidad al líder
const isNearLeader = computed(() => {
  const distance = Math.sqrt(
    Math.pow(playerPosition.value.x - leaderPosition.x, 2) +
    Math.pow(playerPosition.value.y - leaderPosition.y, 2)
  )
  return distance < 12
})

// Cuando el jugador se acerca al líder
watch(isNearLeader, (near) => {
  if (near && !leaderDefeated.value && !showBattleModal.value) {
    showBattleModal.value = true
  }
})

const goBack = () => {
  router.push('/mapa')
}

const startBattle = () => {
  showBattleModal.value = false
  // Simular batalla (en un juego real aquí iría la lógica de batalla)
  setTimeout(() => {
    showVictoryModal.value = true
    leaderDefeated.value = true
  }, 1000)
}

const claimVictory = () => {
  showVictoryModal.value = false
  // Aquí podrías guardar el progreso en el store
  alert('¡Has obtenido la Medalla Cristo Rey! 🏅')
  router.push('/mapa')
}
</script>

<style scoped>
.gym-zone {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #2d5016 0%, #4a7c23 50%, #2d5016 100%);
  position: relative;
  overflow: hidden;
}

.gym-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);
  z-index: 100;
}

.back-btn {
  padding: 8px 16px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.back-btn:hover {
  background: rgba(255,255,255,0.25);
}

.gym-info {
  text-align: center;
  color: white;
}

.gym-info h1 {
  font-size: 1.3rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.gym-info p {
  font-size: 0.85rem;
  margin: 4px 0 0;
  opacity: 0.9;
}

.controls-hint {
  padding: 6px 12px;
  background: rgba(0,0,0,0.5);
  border-radius: 15px;
  color: white;
  font-size: 0.75rem;
}

.gym-map-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 20px;
}

.map-canvas {
  position: relative;
  width: min(600px, 90vw);
  aspect-ratio: 2 / 3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.map-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* Líder del gimnasio */
.gym-leader {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 40;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gym-leader.near-player {
  animation: pulse-leader 1s infinite;
}

@keyframes pulse-leader {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.15); }
}

.leader-sprite {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.leader-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
}

.leader-shadow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 14px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
}

.leader-label {
  margin-top: 8px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #c62828, #8e0000);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

/* Pokémon decorativos */
.pokemon-deco {
  position: absolute;
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  animation: float 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 5;
}

.pokemon-1 { left: 30%; top: 25%; animation-delay: 0s; }
.pokemon-2 { left: 15%; top: 75%; animation-delay: 0.5s; }
.pokemon-3 { left: 45%; top: 60%; animation-delay: 1s; }
.pokemon-4 { left: 80%; top: 45%; animation-delay: 1.5s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Controles móviles */
.mobile-controls {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  flex-direction: column;
  gap: 4px;
}

.control-row {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.control-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px), (hover: none) {
  .mobile-controls {
    display: flex;
  }
}

/* Modal de batalla */
.battle-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.battle-modal {
  background: linear-gradient(145deg, #f5f5f5, #e0e0e0);
  border-radius: 16px;
  width: min(400px, 90vw);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.battle-header {
  background: linear-gradient(135deg, #c62828, #8e0000);
  color: white;
  padding: 16px;
  text-align: center;
}

.battle-header.victory {
  background: linear-gradient(135deg, #ffd700, #ff8c00);
}

.battle-header h2 {
  margin: 0;
  font-size: 1.4rem;
}

.battle-content {
  padding: 20px;
  text-align: center;
}

.leader-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.leader-avatar-img {
  width: 200px;
  height: 120px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  margin-bottom: 8px;
}

.leader-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #c62828;
}

.battle-dialogue {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
  margin-bottom: 16px;
  font-style: italic;
}

.leader-pokemon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: rgba(0,0,0,0.05);
  border-radius: 8px;
}

.pokemon-icon {
  font-size: 2rem;
}

.pokemon-name {
  font-weight: 600;
  color: #333;
}

.battle-actions {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(0,0,0,0.05);
}

.btn-battle, .btn-cancel {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-battle {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
}

.btn-cancel {
  background: linear-gradient(135deg, #757575, #424242);
  color: white;
}

.btn-battle:hover, .btn-cancel:hover {
  transform: scale(1.02);
}

/* Victoria */
.victory-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

.badge-reward {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border-radius: 12px;
}

.badge-icon {
  font-size: 4rem;
  animation: bounce-badge 1s infinite;
}

@keyframes bounce-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.badge-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #ff8f00;
}
</style>
