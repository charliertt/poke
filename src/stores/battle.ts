import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBattleStore = defineStore('battle', () => {
  // my pokemons
  const pokemons = ref([{ id: 1, name: 'Bulbasaur', hp: 10, attack: 44, defense: 49 }])

  // opponent pokemons
  const opponentPokemons = ref([{ id: 4, name: 'Charmander', hp: 10, attack: 52, defense: 43 }])

  const attacker = ref(true)

  // attack function
  const attackPokemon = (pokemonAttack: any, pokemonDefense: any) => {
    // tolerate both: refs passed from script (have `.value`) and unwrapped arrays passed from templates
    const attackArr = pokemonAttack && pokemonAttack.value ? pokemonAttack.value : pokemonAttack
    const defendArr = pokemonDefense && pokemonDefense.value ? pokemonDefense.value : pokemonDefense

    // validate
    if (!attackArr || !defendArr || !attackArr[0] || !defendArr[0]) return

    if (gameOver.value) return

    const attackerStats = attackArr[0]
    const defenderStats = defendArr[0]

    // calculate damage (at least 1)
    const damage = Math.max(1, attackerStats.attack - defenderStats.defense)

    defenderStats.hp = Math.max(0, defenderStats.hp - damage)

    // switch turn
    attacker.value = !attacker.value

    // if game is not over and it is now the opponent's turn, schedule their attack
    if (!gameOver.value && !attacker.value) {
      setTimeout(() => {
        alert('Opponent is attacking!')
        attackPokemon(opponentPokemons, pokemons)
      }, 1000)
    }
  }

  const gameOver = computed(() => {
    return pokemons.value[0].hp <= 0 || opponentPokemons.value[0].hp <= 0
  })

  const winner = computed(() => {
    if (pokemons.value[0].hp <= 0) return 'opponent'
    if (opponentPokemons.value[0].hp <= 0) return 'player'
    return null
  })

  return { pokemons, opponentPokemons, attacker, attackPokemon, gameOver, winner }
})
