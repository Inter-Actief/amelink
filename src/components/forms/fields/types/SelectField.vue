<template>
    <div :class="['field selectfield', field?.class]">
        <FormLabel :field="field" :formid="formid" :id="id" />

        <div class="select">
            <EpaIcon icon="angledown" />
            <select :name="`input_${formid}_${id}`" :id="`input_${formid}_${id}`">
                <option v-for="(choice, index) in field?.choices" :key="index" :value="`choice_${index}`"
                    :disabled="disabled">
                    {{ choice.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getFormFieldID } from '@/functions/functions.ts'
import FormLabel from '@/components/forms/fields/extras/FormLabel.vue'
import EpaIcon from '@/components/ui/EpaIcon.vue'
import type { StringFieldProps } from './FormFieldTypes';

const props = defineProps<StringFieldProps>();

const id = props?.field?.id ? props.field.id as number : getFormFieldID()
const internalValue = ref(props.modelValue)

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue)
})

const emit = defineEmits(['update:modelValue'])
</script>
