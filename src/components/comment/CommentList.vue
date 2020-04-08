<template>
    <div class="container">
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
            index: 8,
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
        }
    },
}
</script>
