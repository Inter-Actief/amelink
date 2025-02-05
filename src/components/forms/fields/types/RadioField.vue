<template>
    <div :class="['field choicefield radiofield', field?.class]">
        <FormLabel :field="field" :formid="formid" :id="id" />

        <ul>
            <li v-for="(choice, index) in field?.choices" v-bind:key="index">
                <input type="radio" :name="`choice_${formid}_${id}`" :id="`choice_${formid}_${id}_${index}`"
                    v-model="choice.value" :disabled="disabled" />
                <label :for="`choice_${formid}_${id}_${index}`">{{ $gettext(choice.label) }}</label>
            </li>
        </ul>
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

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue)
})

const emit = defineEmits(['update:modelValue'])
</script>
