<template>
    <div class="form_box">
        <form v-if="fields" class="ia_form active_labels strong_labels" @submit.prevent="handleSubmit">
            <FormFields :formid="form_id" :fields="fields" :disabled="disabled" />

            <div class="form_footer">
                <EpaButton type="submit" class="ia_button" loading="true" :disabled="disabled">{{
                    $gettext('Send')
                    }}</EpaButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import EpaButton from '@/components/ui/EpaButton.vue'
import { ref } from 'vue'
import FormFields from '@/components/forms/fields/FormFields.vue'
import { getFormID } from '@/functions/functions'
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();

const form_id = getFormID()
const disabled = ref(false)

interface PostFormField {
    label: string
    value: string | object
}

interface Field {
    id?: string
    type: string
    label: string
    name?: string
    value?: string
    placeholder?: string
    class?: string
    required?: boolean
    choices?: { label: string; value: boolean | string }[]
    fields?: Field[]
}

const fields = ref<Field[]>([
    {
        type: 'text',
        label: 'Name',
        name: '',
        value: '',
        class: '',
        required: true,
    },
    {
        type: 'email',
        label: 'Email',
        name: '',
        value: '',
        class: '',
    },
    {
        type: 'tel',
        label: 'Phone',
        name: '',
        value: '',
        class: '',
    },
    {
        type: 'editor',
        label: 'Message',
        name: '',
        value: '',
        class: '',
    },
])

const handleSubmit = () => {
    disabled.value = true

    const inputValuesNew = fields.value.reduce<PostFormField[]>((acc, field) => {
        if (field.type === 'multiple' && Array.isArray(field.fields)) {
            field.fields.forEach((subField) => {
                acc.push({
                    label: subField.label,
                    value: subField.value ? subField.value : '',
                })
            })
        }
        if (field.type === 'checkbox') {
            acc.push({
                label: field.label,
                value: field.choices ? field.choices : '',
            })
        } else {
            acc.push({
                label: field.label,
                value: field.value ? field.value : '',
            })
        }
        return acc
    }, [])
}
</script>
