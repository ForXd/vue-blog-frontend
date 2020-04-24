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
        comments: Array
    },
    data() {
        return {
            index: this.comments.length + 1,
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
            item.children.push({
                id: this.index++,
                content,
                to_comment: item.id,
                author: this.$store.user
            })
            // need post to server
        },
        addComment(content) {
            let comment = {};
            comment.content = content;
            comment.author = this.$store.user;
            comment.parentId = 0;
            comment.id = this.index;
            this.index++;
            this.comments.push(comment);
            this.content = '';
        }
    },
}
</script>
<style scoped>
.first {

}
</style>

