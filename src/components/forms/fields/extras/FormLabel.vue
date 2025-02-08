<template>
    <label v-if="!field!.class.split(' ').includes('hidelabel')" :for="`input_${formid}_${id}`">
        {{ $gettext(field!.label) }}
        <span v-if="field!.required">*</span>
        <template v-else></template>
    </label>
    <template v-else></template>
</template>

<script setup lang="ts">
import { useGettext } from 'vue3-gettext';

const { $gettext } = useGettext();

const props = defineProps({
    field: Object,
    formid: Number,
    id: Number,
})
</script>

<style scoped lang="scss"></style>
