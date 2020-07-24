<template>
    <div>
        <div class="first">
            <textarea v-model="content" rows="1" @input="handleChange"></textarea>
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
            // console.log(item, content);
            let comment = {};
            comment.content = content;
            comment.author = this.$store.state.user.id;
            comment.to_comment = item.id;
            this.createComment(comment).then(res => {
                comment.id = res.id;
                item.children.push(comment);
            })
        },
        addComment(content) {
            let comment = {};
            comment.content = content;
            comment.author = this.$store.state.user.id;
            comment.to_comment = 0;
            console.log(comment);
            this.createComment(comment).then(res => {
                comment.id = res.id;
                this.comments.push(comment);
                this.content = '';
            })
        },
        handleChange(e) {
            let elem = e.target;
            elem.style.height = 'auto';
            elem.scrollTop = 0;
            elem.style.height = elem.scrollHeight + 'px';
        },
    },
}
</script>
<style lang="less" scoped>
.first {
    textarea {
        padding: 1em;
        resize: none;
        outline: none;
    }
    button {
        background: #fff;
        outline: none;
        align-self:flex-end;
    }
    display: flex;
    flex-direction: column;
}
</style>

