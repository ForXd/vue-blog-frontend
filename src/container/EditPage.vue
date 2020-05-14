<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <back-ground></back-ground> -->
    <post-editor :submitPost="submit" :post="post"/>
  </div>
</template>
<script>
import PostEditor from '@/components/post/PostEditor.vue';
import {createPost, getPost} from '@/api/post.js';
export default {
  components: {
    PostEditor
  },
  props: {
    id: String,
  },
  data() {
    return {
        post: null
    }
  },
  methods: {
    submit(post) {
    //todo   post.author_id = this.$store.user.id;
      post.author_id = 1;
      post.description = post.content.slice(0, 50);
      return createPost(post);
    }
  },
  created() {
      if (this.id != '0') {
          getPost(this.id).then(res => {
            this.post = res;
          })
      }
  }
}
</script>
<style scoped>
  .container {
    width: 80%;
    margin: 3rem auto;
  }
</style>

