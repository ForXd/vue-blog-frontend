<template>
  <div id="app">
    <Navigation/>
    <div id="main">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from '@/components/general/Navigation.vue';
import Footer from '@/components/general/Footer.vue'
export default {
  components: {
    Navigation,
    Footer
  },
  mounted() {
    let user = localStorage.getItem('cur_user');
    if (user) {
      this.$store.commit('login', JSON.parse(user));
    }
    console.log(this.$store.state.user);
  },
}
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 600px;
  font-size: 15px;
}
#main {
  min-height: calc(100vh - 150px);
}
body {
  margin: 0;
}
</style>
