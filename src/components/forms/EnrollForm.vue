<template>
    <div class="activities_form form_box">
        <form v-if="fields" class="ia_form active_labels" @submit.prevent="handleSubmit">
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
import { getFormID } from '@/functions/functions'
import FormFields from '@/components/forms/fields/FormFields.vue'

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

//TODO: Use gettext to translate
const fields = ref<Field[]>([
    {
        type: 'checkbox',
        label: 'Inschrijving',
        name: '',
        value: '',
        placeholder: '',
        class: 'hidelabel',
        choices: [
            {
                label: 'Inschrijving',
                value: false,
            },
        ],
    },
    {
        type: 'checkbox',
        label: 'Kan uitschrijven',
        name: '',
        value: '',
        placeholder: '',
        class: 'hidelabel',
        choices: [
            {
                label: 'Kan uitschrijven',
                value: false,
            },
        ],
    },
    {
        type: 'date',
        label: 'Inschrijving start datum',
        name: '',
        value: '',
        placeholder: '',
        class: 'span6',
    },
    {
        type: 'time',
        label: 'Inschrijving start tijd',
        name: '',
        value: '',
        placeholder: '',
        class: 'span6',
    },

    {
        type: 'date',
        label: 'Inschrijving stop datum',
        name: '',
        value: '',
        placeholder: '',
        class: 'span6',
    },
    {
        type: 'time',
        label: 'Inschrijving stop tijd',
        name: '',
        value: '',
        placeholder: '',
        class: 'span6',
    },
    {
        id: '999',
        type: 'text',
        label: 'Maximum',
        name: '',
        value: '',
        placeholder: '',
        class: 'span6',
    },
    {
        type: 'checkbox',
        label: 'Vergendel wachtlijst',
        name: '',
        value: '',
        placeholder: '',
        class: 'hidelabel',
        choices: [
            {
                label: 'Vergendel wachtlijst',
                value: false,
            },
        ],
    },
    {
        type: 'text',
        label: 'Prijs',
        name: '',
        value: '',
        placeholder: '0,00',
        class: '',
    },
    {
        type: 'text',
        label: 'Callback URL',
        name: '',
        value: '',
        placeholder: '',
        class: '',
        required: true,
    },

    {
        type: 'text',
        label: 'Callback secret key',
        name: '',
        value: '',
        placeholder: '',
        class: '',
    },
    {
        type: 'text',
        label: 'Facebook event id',
        name: '',
        value: '',
        placeholder: '',
        class: '',
    },
    {
        type: 'select',
        label: 'Oauth application',
        name: '',
        value: '',
        placeholder: '',
        class: '',
        choices: [
            {
                label: 'Google',
                value: 'google',
            },
            {
                label: 'Facebook',
                value: 'facebook',
            },
        ],
    },
    {
        type: 'multiple',
        label: 'Test mul',
        fields: [
            {
                type: 'text',
                label: 'Field 1',
                name: '',
                value: '',
                placeholder: '',
                class: 'span6',
            },
            {
                type: 'text',
                label: 'Field 2',
                name: '',
                value: '',
                placeholder: '',
                class: 'span6',
            },
        ],
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
