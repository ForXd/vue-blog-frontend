<template>
    <div class="edit_info">
        <div class="info_label">
            {{ name }}
        </div>
        <div class="info_value">
            <input 
            type="text" 
            :class="valueClass"
            :readonly="editAble ? false : 'readonly'" 
            v-model="infoValue">
        </div>
        <div class="info_operator">
            <div @click="() => editAble = !editAble">
                edit
            </div>
            <div @click="() => {updateValue(infoValue); editAble = false;}">
                save
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        value: String,
        updateValue: Function
    },
    data() {
        return {
            infoValue: '',
            editAble: false
        }
    },
    computed: {
        valueClass() {
            return this.editAble ? 'edit_value' : 'show_value';
        }
    },
    methods: {

    },
    created() {
        this.infoValue = this.value;
    }
}
</script>
<style>
.edit_info {
    display: flex;
    justify-content: space-between;
    margin: 1rem 2rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #ccc;
}
.edit_value {
    padding: 0.5rem;
    border-radius: 10px;
    outline: none;
    border: 2px solid;
}
.show_value {
    outline: none;
    border: none;
}
</style>