<template>
    <div>
        <post :rawContent="rawContent" :tocHeight="200" :key="id"/>
        <div class="comment">
            <comment-list :comments="comments" :createComment="createComment"/>
        </div>
    </div>
</template>
<script>
import Post from '@/components/post/Post.vue';
import CommentList from '@/components/comment/CommentList.vue';
import {getPost} from '@/api/post.js';
import R from '@/api/request.js';
import { createComment, getCommentbyPost } from '@/api/comment.js';
import { convertToTree } from '@/util/helper.js';
export default {
    props: {
        id: String
    },
    components: {
        Post,
        CommentList
    },
    watch: {
        id: function(id) {
            this.init(id);
        }
    },
    data() {
        return {
            comments: [],
            post: null,
            rawContent: ''
        }
    },
    methods: {
        createComment(comment) {
            comment.author_id = 1;
            comment.post_id = this.id;
            console.log(comment);
            return createComment(comment);
        },
        init(id) {
            getPost(id).then(res => {
            this.post = res;
            console.log(res);
            R.getFile(res.content_url)
                .then(res => res.text())
                .then(res => {
                    this.rawContent = res;
                })
            });
            getCommentbyPost(id).then(res => {
                this.comments = convertToTree(res);
            })
        }
    },
    mounted() {
        this.init(this.id);
    }
}
</script>
<style scoped>
    .comment {
      width: 70%;
      margin: 0 auto;
    }
</style>


