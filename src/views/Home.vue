<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <input type="file" @change="getFile">
    <input type="button" @click="uploadFile" value="submit">
    <post-list :items="posts"/>
  </div>
</template>

<script>
// @ is an alias to /src
import R from '@/api/request';
import PostList from '@/components/post/PostList.vue';
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      posts: [
        {id:1, title:'test1', description: 'a test post', createTime: '2020-03-31', praiseNum: 1, imgUrl:'/src/assets/logo.png'},
        {id:2, title:'test2', description: 'a test post', createTime: '2020-03-31', praiseNum: 1},
        {id:3, title:'test3', description: 'a test post', createTime: '2020-03-31', praiseNum: 1},
        {id:4, title:'test4', description: 'a test post', createTime: '2020-03-31', praiseNum: 1},
        {id:5, title:'test5', description: 'a test post', createTime: '2020-03-31', praiseNum: 1},
      ],
      files:null,
    }
  },
  components: {
    PostList
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      user: state => state.user,
    })
  },
  methods: {
    uploadFile() {
      R.upload('upload', this.files, 'test')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    getFile(event) {
      this.files = event.target.files;
    },
  },
  mounted() {
    // request.get('user/123').then(res => {
    //   console.log(res)
    // });
    // request.post('user/123', {name: 'abc', pass: 'test'}).then(res => {
    //   console.log(res);
    // })
  },
}
</script>
