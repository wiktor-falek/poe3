<script lang="ts" setup>
import Item from "./Item.vue";
import { ref, Ref } from "vue";
import { usePlayerStore } from "../../../../stores/playerStore";

const props = defineProps(["equipment"]);

const playerStore = usePlayerStore();
const equipment = playerStore.character.equipment;

type EquipmentSlot =
  | "hand"
  | "offhand"
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "ring_1"
  | "ring_2"
  | "amulet"
  | "belt";

const itemContextMenuSlot: Ref<null | EquipmentSlot> = ref(null);

function changeContextMenuSlot(slot: null | EquipmentSlot) {
  if (slot == null) {
    itemContextMenuSlot.value = null;
    return;
  }

  itemContextMenuSlot.value = slot;
}
</script>

<template>
  <div class="equipment" v-if="props.equipment">
    <!-- empty element for positioning -->
    <div class="equipment-slot equipment-slot--empty"></div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('helmet')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.helmet"
        :slot="'helmet'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'helmet'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('amulet')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.amulet"
        :slot="'amulet'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'amulet'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('hand')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.hand"
        :slot="'hand'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'hand'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('chest')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.chest"
        :slot="'chest'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'chest'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('offhand')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.offhand"
        :slot="'offhand'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'offhand'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('ring_1')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.ring_1"
        :slot="'ring_1'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'ring_1'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('belt')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.belt"
        :slot="'belt'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'belt'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('ring_2')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.ring_2"
        :slot="'ring_2'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'ring_2'"
      />
    </div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('gloves')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.gloves"
        :slot="'gloves'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'gloves'"
      />
    </div>

    <!-- empty element for positioning -->
    <div class="equipment-slot equipment-slot--empty"></div>

    <div
      class="background-wrapper"
      @contextmenu="changeContextMenuSlot('boots')"
    >
      <Item 
        @closeContextMenu="changeContextMenuSlot(null)"
        class="equipment-slot"
        :item="props.equipment.boots"
        :slot="'boots'"
        :displayEquipmentContextMenu="itemContextMenuSlot === 'boots'"
      />
    </div>
  </div>
</template>

<style scoped>
.equipment {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
}

.background-wrapper {
  background-color: rgb(34, 34, 34);
}
</style>
