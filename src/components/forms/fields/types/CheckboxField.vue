<template>
    <div :class="['field choicefield checkboxfield', field.class]">
        <FormLabel :field="field" :formid="formid" :id="id" />

        <ul>
            <li v-for="(choice, index) in field.choices">
                <input
                    type="checkbox"
                    :name="`choice_${formid}_${id}_${index}`"
                    :id="`choice_${formid}_${id}_${index}`"
                    :required="field.required"
                    v-model="choice.value"
                    :value="choice.label"
                    :disabled="disabled"
                />
                <label :for="`choice_${formid}_${id}_${index}`">{{ $t(choice.label) }}</label>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getFormFieldID } from '@/functions/functions.ts'
import FormLabel from '@/components/forms/fields/extras/FormLabel.vue'

const props = defineProps({
    field: Object,
    formid: Number,
    modelValue: {
        type: Array,
        default: () => [],
    },
    disabled: Boolean,
})

const id = props.field.id ? props.field.id : getFormFieldID()
const internalValue = ref(...props.modelValue)

watch(internalValue, (newValue) => {
    console.log(newValue)
    emit('update:modelValue', newValue)
})

const emit = defineEmits(['update:modelValue'])

/*

v-model="choice.value"

 */
</script>
