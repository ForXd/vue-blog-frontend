<template>
    <div class="wrapper">
        <div class="flag">
            <slot name="title">
            </slot>
        </div>
        <ul>
            <li v-for="(item, i) in menu" :key="i" @click="handler(i)">
                {{ item[prop] }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        menu: Array,
        prop: String,
        handler: Function
    }
}
</script>
<style scoped lang="less">
.wrapper {
    position: absolute;
    & > div {
        cursor: pointer;
    }
    .flag:hover ~ ul {
        transform: scale(1);
    }
    ul {
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 10rem;
        list-style: none;
        background-color: #f9f9f9;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
        margin-top: 1rem;
        border: 1px solid #ccc;
        min-width: 10rem;
        text-align: center;
        padding: 0;
        transform: scale(0);
        transition: all 0.6s ease;
        &:hover {
            transform: scale(1);
        }
        li:first-child {
            margin-top: 1rem;
        }
        li {
            padding: 0.5rem 0;
            text-overflow: ellipsis;
        }
        li:hover {
            background-color: #e9e9e9;
            cursor: pointer;
        }
    }
    ul::before {
        content: '';
        width: 1rem;
        height: 1rem;
        position: absolute;
        left: calc(50% - 0.5rem);
        top: -0.5rem;
        background: #f9f9f9;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        box-sizing: border-box;
        transform: rotate(45deg);
        z-index: 1;
    }
}
</style>