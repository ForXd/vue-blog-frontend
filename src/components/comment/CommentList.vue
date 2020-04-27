<template>
    <div class="container">
        <div class="first">
            <textarea v-model="content" cols="30" rows="10"></textarea>
            <button @click="() => this.addComment(this.content)">reply</button>
        </div>
        <comment-item v-for="comment in comments" 
        :comment="comment" 
        :key="comment.id"
        :addChildren="addChildren"
        :addItem="addItem">
        </comment-item>
    </div>
</template>
<script>

import CommentItem from './CommentItem.vue';
export default {
    components: {
        CommentItem
    },
    props: {
        comments: Array,
        createComment: Function
    },
    data() {
        return {
            content: '',
        }
    },
    methods: {
        addChildren(item, content) {
            this.$set(item, 'children', []);
            this.addItem(item, content);
        },
        addItem(item, content) {
            console.log(item, content);
            let comment = {};
            comment.content = content;
            comment.to_comment = item.id;
            this.createComment(comment).then(res => {
                console.log(res);
                item.children.push(res);
            })
            // item.children.push({
            //     id: this.index++,
            //     content,
            //     to_comment: item.id,
            //     author: this.$store.user
            // })
            // need post to server
        },
        addComment(content) {
            let comment = {};
            comment.content = content;
            comment.author = this.$store.user;
            comment.parentId = 0;
            this.createComment(comment).then(res => {
                console.log(res);
                this.comments.push(res);
                this.content = '';
            })
        }
    },
}
</script>
<style scoped>
.first {

}
</style>

