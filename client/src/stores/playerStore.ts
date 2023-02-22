import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { useMessageStore } from "./messageStore";
const messageStore = useMessageStore();

export const usePlayerStore = defineStore("player", () => {
  const character: Ref<any> = ref(null);

  function loadcharacter(_character: object) {
    if (character.value == null) {
      character.value = _character;
    } else {
      Object.assign(character.value, _character);
    }
    console.log(character.value);
  }

  function setSilver(amount: number) {
    character.value.silver = amount;
  }

  // TODO: Level interface
  function setLevel(level: any, xpGained: number | null) {
    // check if level satisfies Level interface
    if (
      level == null &&
      level.value == null &&
      level.xp == null &&
      level.requiredXp == null
    ) {
      return null;
    }

    const characterLevelObject = character.value.level;

    if (xpGained) {
      messageStore.pushClientSideSystemMessage(`You gained ${xpGained} xp`);
    }

    if (characterLevelObject.value < level.value) {
      messageStore.pushClientSideSystemMessage(
        `You are now Level ${level.value}`
      );
    }

    character.value.level = level;
  }

  return {
    character,
    loadcharacter,
    setSilver,
    setLevel,
  };
});
