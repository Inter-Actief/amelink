import type { ModelValue } from '@vuepic/vue-datepicker'
export interface Choice {
    label: string
    value: boolean
}

export interface Field {
    id?: string | number
    class?: string
    choices?: Array<Choice>
    required?: boolean
    placeholder?: string
}

export interface FieldProps<T> {
    field: Field | undefined
    formid: number
    modelValue: T
    disabled: boolean
}

export type StringFieldProps = FieldProps<string>

export type DateFieldProps = FieldProps<ModelValue>
