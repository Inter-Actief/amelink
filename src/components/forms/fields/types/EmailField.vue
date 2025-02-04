<template>

    <div :class="['field emailfield', field.class, field.placeholder || isActive || modelValue ? 'active' : '']">
        <FormLabel :field="field" :formid="formid" :id="id" />

        <input
            type="email"
            :name="`input_${formid}_${id}`"
            :id="`input_${formid}_${id}`"
            v-model="internalValue"
            :placeholder="field.placeholder"
            :required="field.required"
            :disabled="disabled"
            @focus="handleFocus"
            @blur="handleBlur"
        >
    </div>

</template>


<script setup>
import {ref, watch} from 'vue';
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
const isActive = ref(false);

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue);
});

const emit = defineEmits(['update:modelValue']);

const handleFocus = () => {
    isActive.value = true;
};

const handleBlur = () => {
    isActive.value = false;
};
</script>