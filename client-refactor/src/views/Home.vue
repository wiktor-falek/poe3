<template>
  <main>
    <h1 class="logo">*Game Logo*</h1>

    <section>
      <h2>
        Welcome to PoE3, the spiritual successor to Path of Exile
        <span class="smol">(without the vision)</span>
      </h2>
    </section>

    <RouterLink to="/signin" class="button" id="start"
      >Start Playing</RouterLink
    >

    <section>
      <p>Explore dungeons with a party up to 4 players!</p>
    </section>

    <section>
      <p>*Combat presentation*</p>
    </section>

    <section>
      <p>*Item system with examples*</p>
    </section>

    <section>
      <p>*Classes and ascendancies section*</p>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px;
}

section {
  text-align: left;
  margin-top: 50px;
}

.smol {
  font-size: 0.5em;
}

#start {
  margin: 0 auto;
  width: 100%;
  max-width: 200px;
  margin-top: 20px;
}
</style>
