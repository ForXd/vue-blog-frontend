<template>
    <div :class="currentPage == num ? 'active' : 'other'" @click="() => gotoPage(num)">
        {{ num }}
    </div>
</template>
<script>
export default {
    props: {
        num: Number,
        gotoPage: Function,
        currentPage: Number
    },
}
</script>
<style scoped>
.other {
    background: white;
    padding: 0.5rem;
    cursor: pointer;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
.active {
    background: gray;
    color: white;
    padding:  0.5rem;
}
</style>



