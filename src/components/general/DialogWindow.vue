<template>
    <dialog ref="d">
        <div class="content">
            <slot name="content"/>
        </div>
    </dialog>
</template>

<script>
export default {
    methods: {
        open() {
            this.$refs.d.showModal()
        },
        handleClose(e) {
            if (e.target.tagName === 'dialog'.toUpperCase()) {
                this.$refs.d.close();
            }
        },
        close() {
            this.$refs.d.close();
        }
    },
    mounted() {
        this.$refs.d.addEventListener('click', this.handleClose)
    },
}
</script>
<style scoped>
    @keyframes show {
        from {
            transform: translate(-50%, -100%) scale(0);
            opacity: 0;
        }
        to {
            transform:translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    dialog:not([open]) {
        display: block;
        opacity: 0;
        visibility: hidden;
    }
    
    dialog[open] {
        border: none;
        padding: 0;
        animation: show 0.6s forwards;
    }
    .content {
        padding: 1rem;
    }
    dialog::backdrop {
        background: rgba(0,0,0,0.5);
    }
</style>