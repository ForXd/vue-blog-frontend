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
    padding: 0 6px;
    cursor: pointer;
}
.active {
    border: 1px solid #ccc;
    background: gray;
    color: white;
    padding: 0 6px;
}
</style>



