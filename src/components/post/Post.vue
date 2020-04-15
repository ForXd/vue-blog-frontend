 <template>
    <div class="container">
      <div class="title">
         {{post.title}}
      </div>
      <div class="author">
         {{post.author}}
      </div>
      <div class="time">
         {{post.createTime}}
      </div>
      <div class="content">
         {{post.content}}
      </div>
      <div class="statistic">

      </div>
      <div class="function">
         <i>赞</i>
         <i>踩</i>
         <i></i>
      </div>
    </div>
 </template>
 
 <script>
 export default {
     props: {
        post: Object
     },
     
 }
 </script>
<style lang="less" scoped>
 
</style>
 
