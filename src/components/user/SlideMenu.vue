<template>
    <div class="slide">
        <div class="card_menu">
            <div :class="active === index ? 'active_item': 'item'" 
            v-for="(item, index) in menu" 
            :key="index"
            @click="changeActive(index)"
            >
                {{ item }}
            </div>
        </div>
        <div class="card_container">
            <div class="wrap" :style="wrapStyle">
                <div class="card" v-for="(item, index) in menu" :key="index" :style="cardStyle">
                    <slot :name="index">
                    </slot>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        menu: Array
    },
    data() {
        return {
            active: 0
        }
    },
    computed: {
        wrapStyle() {
            return {width:  `${this.menu.length * 100}%`, left: `-${this.active*100}%`}
        },
        cardStyle() {
            return {width:  `${Math.floor(100 /this.menu.length)}%`}
        }
    },
    methods: {
        changeActive(index) {
            this.active = index;
            console.log(111);
            console.log(index);
        }
    },
    mounted() {
        console.log(this.id);
    }
}
</script>
<style scoped>
.slide {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.card_container {
    overflow: hidden;
    width: 100%;
    position: relative;
    flex-grow: 1;
}
.wrap {
    position: absolute;
    height: 100%;
    z-index: 1;
    transition: all 0.6s ease;
    display: flex;
}
.card {
    height: 100%;
    overflow: auto;
}
.card_menu {
    display: flex;
    flex-basis: 2rem;
    justify-content: space-around;
}
.item, .active_item {
    padding: 0.5rem;
    transition: all 0.6s ease;
    flex-grow: 1;
    cursor: pointer;
}
.active_item {
    border-bottom: 1px solid;
    background: black;
    color: white;
}
</style>