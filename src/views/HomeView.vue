<script setup lang="ts">
import { useBattleStore } from '@/stores/battle'
import { storeToRefs } from 'pinia'
const { attackPokemon } = useBattleStore()
const { pokemons, opponentPokemons, gameOver, winner } = storeToRefs(useBattleStore())
</script>

<template>
  <main>
    <h1>Battle Pokémon App</h1>

    <div v-if="gameOver" class="gameOver">
      <h2>Game Over!</h2>
      <p>The winner is: {{ winner }}</p>
    </div>
    <section class="battle-section">
      <div class="pokemon-card">
        <h2>Player's Pokémon</h2>
        <p>Name: {{ pokemons[0].name }}</p>
        <p>HP: {{ pokemons[0].hp }}</p>
        <button @click="attackPokemon(pokemons, opponentPokemons)">Attack Opponent</button>
      </div>

      <div class="pokemon-card">
        <h2>Opponent's Pokémon</h2>
        <p>Name: {{ opponentPokemons[0].name }}</p>
        <p>HP: {{ opponentPokemons[0].hp }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 2rem;
}

.battle-section {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}

.pokemon-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}

.gameOver {
  background-color: #ffdddd;
  border: 1px solid #ff5c5c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  color: #a70000;
}
</style>
