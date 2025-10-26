<template>
    <section
        class="flex px-4 py-2 rounded my-2 text-sm"
        :class="{
            'bg-yellow-200 text-yellow-600': alertStyle === 'warning',
            'bg-red-300 text-red-700': alertStyle === 'danger',
            'bg-blue-300 text-blue-700': alertStyle === 'information',
            'bg-green-300 text-green-700': alertStyle === 'success'
        }"
    >
        <div class="shrink-0 pr-2 pt-0.5">
            <ExclamationTriangleIcon v-if="alertStyle === 'warning'" class="h-4 text-yellow-500" />
            <XCircleIcon v-if="alertStyle === 'danger'" class="h-4 text-red-500" />
            <InformationCircleIcon v-if="alertStyle === 'information'" class="h-4 text-blue-500" />
            <CheckCircleIcon v-if="alertStyle === 'success'" class="h-4 text-green-500" />
        </div>

        <div class="flex-grow">
            <p class="font-semibold" v-text="title"></p>
            <slot></slot>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {
    ExclamationTriangleIcon,
    XCircleIcon,
    InformationCircleIcon,
    CheckCircleIcon
} from '@heroicons/vue/24/solid';

defineProps({
    title: {
        type: String,
        required: true
    },
    alertStyle: {
        type: String,
        required: false,
        default: "warning",
        validator: (val: string) => ["warning", "danger", "information", "success"].includes(val)
    },
});
</script>
