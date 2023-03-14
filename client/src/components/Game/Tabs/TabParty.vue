<script lang="ts" setup>
import { ref, computed } from "vue";
import { usePlayerStore } from "../../../stores/playerStore";
import useSocketStore from "../../../stores/socketStore";
import ClassIcon from "../../ClassIcon.vue";

const characterName = usePlayerStore().character.name;
const socket = useSocketStore().socket;

const partyData = ref();
const isPartyLeader = computed(() => {
  if (partyData.value == null) return false;

  const client = partyData.value.clients.find(
    (client: any) => client.character.name === characterName
  );
  return client.isPartyLeader;
});

socket.emit("party:get-data");

socket.on("party:data", (data) => {
  partyData.value = data;
});

function leaveParty() {
  socket.emit("party:leave-party");
}

const targetCharacterName = ref();
function sendInvite() {
  const characterName = targetCharacterName.value;
  console.log(characterName);
  socket.emit("party:invite-character", characterName);
  targetCharacterName.value = "";
}

const pendingInvites = ref([]);

socket.on("party:invite", (invite) => {
  console.log(invite);
  pendingInvites.value.push(invite);
});

function acceptInvite(invite) {
  const name = invite.from.name;
  const inviteId = invite.inviteId;
  socket.emit("party:accept-invite", name, inviteId);
  pendingInvites.value = [];
}
</script>

<template>
  <!-- TODO: style buttons, replace text with svgs -->
  <div class="party">
    <div class="party-members">
      <div
        class="party-members__member"
        :class="{ faded: !client.isConnected }"
        v-if="partyData"
        v-for="client in partyData.clients"
      >
        <ClassIcon :playerClass="client.character.class" />
        <div class="">
          <p
            class="name"
            :class="{
              'color--this-player': client.character.name === characterName,
            }"
          >
            {{ client.character.name }}
            <img
              v-if="client.isPartyLeader"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Simple_gold_crown.svg/1200px-Simple_gold_crown.svg.png"
              class="party-leader-icon"
            />
          </p>
          <p>
            Lv {{ client.character.level }}
            <span class="capitalize"> {{ client.character.class }}</span>
          </p>
        </div>
        <button
          class="square-button"
          @click="leaveParty"
          v-if="
            client.character.name === characterName &&
            partyData.clients.length !== 1
          "
        >
          Leave
        </button>
        <button class="square-button" v-if="isPartyLeader && client.character.name != characterName">
          Kick
        </button>
      </div>
    </div>
    <div class="container">
      <div class="pending-invites">
        <div class="pending-invite" v-for="invite in pendingInvites">
          <ClassIcon :playerClass="invite.from.class" />
          <div class="">
            <p>New Party Invite</p>
            <p>{{ invite.from.name }} Lv {{ invite.from.level }}</p>
          </div>
          <button class="square-button" @click="acceptInvite(invite)">Join</button>
        </div>
      </div>
      <div class="invite">
        <input
          id="character-invite"
          type="text"
          v-model="targetCharacterName"
          placeholder="Enter character name"
        />
        <button @click="sendInvite" class="button button--no-min-width">
          Invite
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.party {
  width: 100%;
  height: 100%;
  max-height: 648px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.invite {
  display: flex;
  height: 28px;
  min-width: 0;
  width: 100%;
}

.invite input {
  flex-grow: 1;
}

.invite .button {
  padding: 0px 20px;
  height: inherit;
}
.party {
}

.faded {
  opacity: 0.2;
}

.party-members__member,
.pending-invite {
  height: 60px;
  display: flex;
  background-color: rgb(40, 40, 40);
  border: 1px solid rgb(151, 151, 151);
  margin: 2px;
  gap: 5px;
  align-items: center;
}

.pending-invite {
}

.square-button {
  height: 100%;
  aspect-ratio: 1 / 1;
  margin-left: auto;
}

.name {
  display: flex;
  gap: 5px;
  align-items: center;
}

.party-leader-icon {
  height: 24px;
  width: 24px;
}

.pending-invite {
  display: flex;
  background-color: rgb(40, 40, 40);
}
</style>
