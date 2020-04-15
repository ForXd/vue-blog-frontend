<template>
    <div>
        <div class="cur-link">
            {{link.title}}
        </div>
        <div class="children" v-if="hasChildren">
            <tree-link v-for="item in link.children"
            :link="item"
            :key="item.id" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'TreeLink',
    props: {
        link: Object
    },
    computed: {
        hasChildren() {
            return this.link.children && this.link.children.length;
        }
    },
}
</script>

<style scoped>
.cur-link {

}
.children {
    padding-left: 1em;
}
</style>

