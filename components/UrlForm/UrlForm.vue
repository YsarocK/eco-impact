<template>
  <div>
    <form @submit="handleForm">
      <input v-model="inputUrl" type="text" @change="handleInput">
      <input type="submit" value="Rechercher">
      <p class="load" v-if="loading == true">
        LOADING
      </p>
      <p class="load" v-if="imgLoaded == false && loading == true">
        LOADING IMG
      </p>
    </form>
  </div>
</template>

<script lang="js" src="./UrlForm.js"></script>
<style lang="scss" src="./UrlForm.scss" scoped></style>
