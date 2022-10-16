<script setup>
</script>

<template>
  <div class="inventory">
    <div class="inventory__slot" id="slot-1"></div>
    <div class="inventory__slot" id="slot-2"></div>
    <div class="inventory__slot" id="slot-3"></div>
    <div class="inventory__slot" id="slot-4"></div>
    <div class="inventory__slot" id="slot-5"></div>
    <div class="inventory__slot" id="slot-6"></div>
    <div class="inventory__slot" id="slot-7"></div>
    <div class="inventory__slot" id="slot-8"></div>
    <div class="inventory__slot" id="slot-9"></div>
    <div class="inventory__slot" id="slot-10"></div>
    <div class="inventory__slot" id="slot-11"></div>
    <div class="inventory__slot" id="slot-12"></div>
    <div class="inventory__slot" id="slot-13"></div>
    <div class="inventory__slot" id="slot-14"></div>
    <div class="inventory__slot" id="slot-15"></div>
    <div class="inventory__slot" id="slot-16"></div>
    <div class="inventory__slot" id="slot-17"></div>
    <div class="inventory__slot" id="slot-18"></div>
    <div class="inventory__slot" id="slot-19"></div>
    <div class="inventory__slot" id="slot-20"></div>
    <div class="inventory__slot" id="slot-21"></div>
    <div class="inventory__slot" id="slot-22"></div>
    <div class="inventory__slot" id="slot-23"></div>
    <div class="inventory__slot" id="slot-24"></div>
    <div class="inventory__slot" id="slot-25"></div>
    <div class="inventory__slot" id="slot-26"></div>
    <div class="inventory__slot" id="slot-27"></div>
    <div class="inventory__slot" id="slot-28"></div>
    <div class="inventory__slot" id="slot-29"></div>
    <div class="inventory__slot" id="slot-30"></div>
    <div class="inventory__slot" id="slot-31"></div>
    <div class="inventory__slot" id="slot-32"></div>
  </div>
</template>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; /* fr fr no cap */
  border: 2px solid grey;
  gap: 2px;
  background-color: grey;
}

.inventory__slot {
  width: 42px;
  height: 42px;
  background-color: #171819;
}
</style>