<template>
    <article class="flex flex-row items-center justify-center">
        <section class="flex h-10 w-10 items-center justify-center">
            <slot name="icon"></slot>
        </section>

        <section class="flex flex-col ml-2">
            <p class="text-md font-semibold text-white/60" v-text="name"></p>
            <p class="text-lg font-bold text-white" v-text="value"></p>
        </section>
    </article>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    name: string,
    value: string | number
}>();
</script>