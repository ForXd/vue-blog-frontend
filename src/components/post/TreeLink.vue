<template>
    <div>
        <div :class="focusId == link.id ? 'cur-link' : 'other-link'"
            @click="jump">
            {{link.title}}
        </div>
        <div class="children" v-if="hasChildren" v-show="focusChildren">
            <tree-link v-for="item in link.children"
            :link="item"
            :key="item.id"
            :focusId="focusId"
            :focusTo="focusTo" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'TreeLink',
    props: {
        link: Object,
        focusId: Number,
        focusTo: Function
    },
    methods: {
        jump() {
            this.focusTo(this.link.id);
            let obj = document.getElementById(this.link.id);
            obj.scrollIntoView();
        }
    },
    computed: {
        hasChildren() {
            return this.link.children && this.link.children.length;
        },
        focusChildren() {
            let id = this.focusId;
            // dfs 判断后代中是否存在focusId
            function inChild(children) {
                if (children) {
                    for (let i = 0; i < children.length; ++i) {
                        if (children[i].id == id) {
                            return true;
                        } else {
                            return inChild(children[i].children);
                        }
                    }
                }
                return false;
            }
            return inChild(this.link.children);
        }
    },
}
</script>

<style scoped>
.cur-link {
    background: white;
    text-overflow:ellipsis; 
    /* white-space: nowrap; */
    overflow: hidden;
}
.other-link {
    background: gray;
}
.children {
    padding-left: 1em;
}
</style>

