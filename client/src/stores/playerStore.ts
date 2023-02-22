import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { useMessageStore } from "./messageStore";
const messageStore = useMessageStore();

export const usePlayerStore = defineStore("player", () => {
  const characterData: Ref<any> = ref(null);

  function loadCharacterData(_characterData: object) {
    if (characterData.value == null) {
      characterData.value = _characterData;
    } else {
      Object.assign(characterData.value, _characterData);
    }
    console.log(characterData.value);
  }

  function setSilver(amount: number) {
    characterData.value.silver = amount;
  }

  // TODO: Level interface
  function setLevel(level: any) {
    // check if level satisfies Level interface
    if (
      level == null &&
      level.value == null &&
      level.xp == null &&
      level.requiredXp == null
    ) {
      return null;
    }

    const characterLevelObject = characterData.value.level;

    if (characterLevelObject.value < level.value) {
      messageStore.pushClientSideSystemMessage(
        `You are now Level ${level.value}`
      );
    }

    characterData.value.level = level;
  }

  return {
    characterData,
    loadCharacterData,
    setSilver,
    setLevel,
  };
});
