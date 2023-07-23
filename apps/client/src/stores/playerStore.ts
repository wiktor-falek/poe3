import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import type { Character } from "@poe3/types";
import { Player } from "@poe3/core";

const usePlayerStore = defineStore("character", () => {
  const player: Ref<Player | undefined> = ref(undefined);

  function setPlayer(character: Character) {
    player.value = new Player(character);
  }

  return {
    player,
    setPlayer,
  };
});

export default usePlayerStore;
