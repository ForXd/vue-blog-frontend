<template>
    <div id="container">
        <div class="goto" @click="prevPage"> &lt;</div>
        <section v-if="total_page <= 5">
            <page-item 
                class="item" 
                v-for="i in total_page"
                :num="i" 
                :key="i"
                :gotoPage="gotoPage"
                :currentPage="current_page"
            />
        </section>
        <section v-else>
            <page-item 
                class="item" 
                v-for="i in 5"
                :num="i + current_page - 1" 
                :key="i + current_page - 1"
                :gotoPage="gotoPage"
                :currentPage="current_page"
            />
        </section>
        <div v-show="total_page > 5">...</div>
        <input type="text" class="page" v-model="input_num">
        <div class="go" @click="() => gotoPage(input_num)">go</div>
        <div class="goto" @click="nextPage"> &gt;</div>
    </div>
</template>
<script>
import PageItem from './PageItem.vue';
export default {
    components: {
        PageItem
    },
    props: {
        onChange: Function,
        total: Number,
        count: Number,
    },
    data() {
        return {
            current_page: 1,
            input_num: 1,
        }
    },
    computed: {
        total_page() {
            return Math.floor(this.total/this.count) + 1;
        }
    },
    methods: {
        gotoPage(num) {
            num = Number(num);
            if (num > 0 && num <= this.total_page) {
                this.current_page = num;
                this.onChange(this.current_page);
            } else {
                this.input_num = this.current_page;
            }
        },
        prevPage() {
            if (this.current_page < 2) return;
            this.current_page -= 1;
            this.onChange(this.current_page);
        },
        nextPage() {
            if (this.current_page == this.total_page) return;
            this.current_page += 1;
            this.onChange(this.current_page);
        }
    }
}
</script>
<style scoped>
#container {
    display: inline-flex;
    justify-content: center;
    border-radius: 0.5rem;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px 0;
}
section {
    display: flex;
}
.goto, .go {
    padding: 0.5rem;
}
.goto:hover {
    color: blue;
    cursor: pointer;
}
.page {
    width: 2em;
    text-align: center;
    padding: 0 6px;
    outline: none;
    border:none;
}
</style>


