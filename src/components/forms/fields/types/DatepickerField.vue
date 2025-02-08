<template>
    <div :class="[
        'field datepickerfield',
        field?.class,
        field?.placeholder || isActive || modelValue ? 'active' : '',
    ]">
        <FormLabel :field="field" :formid="formid" :id="id" />

        <VueDatePicker v-model="internalValue" :format="dateFormat" :enable-time-picker="false" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { getFormFieldID } from '@/functions/functions.ts'
import FormLabel from '@/components/forms/fields/extras/FormLabel.vue'
import type { StringFieldProps } from './FormFieldTypes'

const props = defineProps<StringFieldProps>();

const id = props?.field?.id ? props.field.id as number : getFormFieldID()
const internalValue = ref(props.modelValue)

watch(internalValue, (newValue) => {
    emit('update:modelValue', formatDate(newValue))
})

const emit = defineEmits(['update:modelValue'])
const dateFormat = ref('yyyy-MM-dd')
const isActive = ref(false)

const formatDate = (date: any) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const handleFocus = () => {
    isActive.value = true
}

const handleBlur = () => {
    isActive.value = false
}
</script>

<style>
:root {
    --dp-font-size: 1.6rem;
    --dp-preview-font-size: 1.4rem;
    --dp-action-button-height: 3rem;
}
</style>
