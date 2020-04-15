<template>
    <div class="container">
        <span v-for="i in 120" :key="i" @mouseover="handleHover"></span>
    </div>
</template>
<script>
export default {
    methods: {
        handleHover(e) {
            e.target.classList.add('fall');
        }
    }
}
</script>
<style scoped>
  .container {
    height: 100vh;
    background: url(../../assets/logo.png);
    background-size: cover;
    overflow: hidden;
    line-height: 0;
  }
  span {
    display: inline-block;
    width: 7.5%;
    height: 40px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  span.fall {
    background: #f00;
    transition: 0.2s;
    pointer-events: none;
    animation: fall 2s linear forwards;
  }
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(1000px) rotate(20deg);
    }
  }
</style>


