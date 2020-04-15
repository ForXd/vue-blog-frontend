<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <back-ground></back-ground> -->
    <post-editor :submitPost="test"/>
  </div>
</template>
<script>
import PostEditor from '@/components/post/PostEditor.vue';
export default {
  components: {
    PostEditor
  },
  data() {
    return {
    }
  },
  methods: {
    test(post) {
      console.log(post);
      
    }
  },
  mounted() {
    // console.log(this.comments)
  },
}
</script>
<style scoped>
  .txt {
    width: 100%;
  }
  .container {
    width: 70%;
    margin: 3rem auto;
  }
</style>

