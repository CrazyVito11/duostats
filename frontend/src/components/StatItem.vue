<template>
    <article class="flex flex-row">
        <section class="flex h-full w-10 items-center justify-center">
            <slot name="icon"></slot>
        </section>

        <section class="flex flex-col ml-3">
            <section class="flex flex-row text-md font-semibold text-white/60">
                <p v-text="name"></p>
                <p v-if="tooltip" class="ml-1 cursor-help" :title="tooltip">ⓘ</p>
            </section>

            <p class="text-lg font-bold text-white" v-text="value"></p>
        </section>
    </article>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    name: string,
    value: string | number,
    tooltip?: string | null
}>();
</script>