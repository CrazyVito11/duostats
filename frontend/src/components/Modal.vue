<template>
    <section
        v-if="isOpen"
        class="flex w-screen h-screen overflow-y-auto absolute top-0 left-0 bg-black/30 z-50 py-8 px-2"
    >
        <section class="m-auto p-4 w-full max-w-3xl bg-slate-800 border border-white/10 rounded-md shadow-md">
            <slot></slot>
        </section>
    </section>
</template>

<script lang="ts" setup>
defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    }
});
</script>
