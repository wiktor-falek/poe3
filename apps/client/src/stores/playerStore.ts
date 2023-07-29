import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import type { Character } from "@poe3/types";
import { Player } from "@poe3/core";
import StartingItemsFactory from "@poe3/items/dist/startingItemsFactory";

const usePlayerStore = defineStore("character", () => {
  const player: Ref<Player | undefined> = ref(undefined);
  const equipment: Ref<any> = ref(undefined);
  const inventory: Ref<any> = ref(undefined);

  function setPlayer(character: Character) {
    player.value = new Player(character);
    equipment.value = StartingItemsFactory.createForClass(player.value.class);
    inventory.value = []; 
  }

  return {
    player,
    equipment,
    inventory,
    setPlayer,
  };
});

export default usePlayerStore;
