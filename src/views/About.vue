<template>
  <div class="about">
    <h1>This is an about page</h1>
    <comment-list :comments="comments"></comment-list>
  </div>
</template>
<script>
// 
import comments from './test.js';
import CommentList from '@/components/comment/CommentList.vue';
export default {
  components: {
    CommentList
  },
  data() {
    return {
      comments: comments
    }
  },
  methods: {

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

