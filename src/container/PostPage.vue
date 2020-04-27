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
import {getPost} from '@/api/post.js';
import R from '@/api/request.js';
const test_data = [
    {id:1,content:'1',author: 'zyx', to_comment: 0},
    {id:2,content:'2',author: 'zyx', to_comment: 1},
    {id:3,content:'3',author: 'zyx', to_comment: 2},
    {id:4,content:'4',author: 'zyx', to_comment: 2},
    {id:5,content:'5',author: 'zyx', to_comment: 0},
    {id:6,content:'6',author: 'zyx', to_comment: 3},
    {id:7,content:'7',author: 'zyx', to_comment: 6},
]
import { convertToTree } from '@/util/helper.js';
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
    methods: {
        createComment(comment) {
            console.log(comment);
        }
    },
    mounted() {
        getPost(this.id).then(res => {
            this.post = res;
            R.getFile(res.content_url)
            .then(res => res.text())
            .then(res => {
                this.rawContent = res;
            })
        });
        console.log(1);
        console.log(convertToTree(test_data));
    }
}
</script>
<style scoped>
    .comment {
      
    }
</style>


