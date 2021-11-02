<template>
  <div>
    <div class="scene" />
    <!-- <div class="buttons"> -->
      <!-- <MoveObject
        obj="myCube"
        rot-y="12"
        pos-z="0.6"
        pos-x="0.7"
        pos-dur="2"
        rot-dur="3"
      />
    </div> -->
    <MouseMoveHandler obj="myCube" />
    <video id="video" loop style="display:none">
      <source src="/rickroll.mp4" type='video/mp4'>
    </video>
  </div>
</template>

<script lang="js" src="./Scene.js"></script>
<style lang="scss" src="./Scene.scss" scoped></style>
