<template>
    <div
        :class="[
            'field timepickerfield',
            field.class,
            field.placeholder || isActive || modelValue ? 'active' : '',
        ]"
    >
        <FormLabel :field="field" :formid="formid" :id="id" />
        <VueDatePicker v-model="internalValue" :preview-format="empty" time-picker>
            <template #input-icon>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    aria-hidden="true"
                    class="dp__icon dp__input_icon dp__input_icons"
                >
                    <path
                        d="M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
                    />
                    <path
                        d="M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
                    />
                </svg>
            </template>
        </VueDatePicker>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { getFormFieldID } from '@/functions/functions.ts'
import FormLabel from '@/components/forms/fields/extras/FormLabel.vue'

const props = defineProps({
    field: Object,
    formid: Number,
    modelValue: String,
    disabled: Boolean,
})

const id = props.field.id ? props.field.id : getFormFieldID()
const internalValue = ref(props.modelValue)
const isActive = ref(false)

watch(internalValue, (newValue) => {
    const timestring =
        newValue.hours.toString().padStart(2, '0') +
        ':' +
        newValue.minutes.toString().padStart(2, '0')
    emit('update:modelValue', timestring)
})

const emit = defineEmits(['update:modelValue'])

const time = ref()

const empty = () => {
    return ''
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
