<template>
  <div>
    <UrlForm />
    <Scene />
    <div class="score">
      Score
      <p>{{ this.$store.state.score }} </p>
    </div>
  </div>
</template>

<script lang="js" src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
