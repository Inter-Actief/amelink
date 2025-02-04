<script setup lang="ts">

import FormFields from "@/components/forms/fields/FormFields.vue";

const props = defineProps([
    "form_id",
    'id',
    "type",
    "label",
    "name",
    "value",
    "placeholder",
    "class",
    "disabled"
]);

const field = [
    {
        "id": props.id,
        "type": props.type,
        "label": props.label,
        "name": props.name,
        "value": props.value,
        "placeholder": props.placeholder,
        "class": props.class,
    }
]

</script>

<template>
    <FormFields :formid="form_id" :fields="field" :disabled="disabled" />
</template>

<style scoped lang="scss">

</style>