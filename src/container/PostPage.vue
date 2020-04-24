<template>
    <div>
        <post :rawContent="rawContent" :tocHeight="200" :key="id"/>
        <div class="comment">
            <comment-list :comments="comments"/>
        </div>
    </div>
</template>
<script>
import Post from '@/components/post/Post.vue';
import CommentList from '@/components/comment/CommentList.vue';
import P from '@/api/post.js';
import R from '@/api/request.js'
export default {
    props: {
        id: String
    },
    components: {
        Post,
        CommentList
    },
    data() {
        return {
            comments: [],
            post: null,
            rawContent: ''
        }
    },
    mounted() {
        P.getPost(this.id).then(res => {
            this.post = res;
            R.getFile(res.content_url)
            .then(res => res.text())
            .then(res => {
                this.rawContent = res;
            })
        })
    }
}
</script>
<style scoped>
    .comment {
      
    }
</style>


