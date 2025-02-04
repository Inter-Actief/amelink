<template>

    <div :class="['field editorfield', field.class]">
        <FormLabel :field="field" :formid="formid" :id="id" />
        <CKEditor :initcontent="''" :disabled="disabled" v-model="internalValue"/>
    </div>

</template>


<script setup>
import {ref, watch} from 'vue';
import CKEditor from "@/components/forms/fields/extras/CKEditor.vue";
import {getFormFieldID} from "@/functions/functions.ts";
import FormLabel from "@/components/forms/fields/extras/FormLabel.vue";

const props = defineProps({
    field: Object,
    formid: Number,
    modelValue: String,
    disabled: Boolean
});

const id = props.field.id ? props.field.id : getFormFieldID();
const internalValue = ref(props.modelValue);

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue);
});

const emit = defineEmits(['update:modelValue']);
</script>