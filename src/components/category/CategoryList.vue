<template>
    <div class="container">
        <div class="category"
        v-for="(val, i) in category" 
        :key="i" 
        >
            {{val.name}}
        </div>
    </div>
</template>
<script>

export default {
    props: {
        category: Array
    },
}
</script>
<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.category {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 1em;
    margin: 1em;
    cursor: pointer;
}
.category:hover {
    transform: scale(1.02);
    transition: all 0.6s ease-in-out;
    box-shadow: 0 0 0.5em 0;
}
</style>