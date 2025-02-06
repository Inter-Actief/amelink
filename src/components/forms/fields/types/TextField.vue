<template>
    <div :class="[
        'field textfield',
        props?.field?.class,
        props?.field?.placeholder || isActive || modelValue ? 'active' : '',
    ]">
        <FormLabel :field="field" :formid="formid" :id="id" />

        <input type="text" :name="`input_${formid}_${id}`" :id="`input_${formid}_${id}`" v-model="internalValue"
            :placeholder="props?.field?.placeholder" :required="props?.field?.required" :disabled="disabled"
            @focus="handleFocus" @blur="handleBlur" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getFormFieldID } from '@/functions/functions.ts'
import FormLabel from '@/components/forms/fields/extras/FormLabel.vue'
import type { StringFieldProps } from './FormFieldTypes';

const props = defineProps<StringFieldProps>();

const id = props?.field?.id ? props.field.id as number : getFormFieldID()
const internalValue = ref(props.modelValue)
const isActive = ref(false)

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue)
})

const emit = defineEmits(['update:modelValue'])

const handleFocus = () => {
    isActive.value = true
}

const handleBlur = () => {
    isActive.value = false
}
</script>
