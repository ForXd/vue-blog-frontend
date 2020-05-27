<template>
    <div class="category">
        {{ name }}
    </div>
</template>
<script>
export default {
    props: {
        name: String
    }
}
</script>
<style scoped>
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