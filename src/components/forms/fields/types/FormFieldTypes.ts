import type { ModelValue } from '@vuepic/vue-datepicker'

type Modify<T, R> = Omit<T, keyof R> & R

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

export interface FieldProps {
    field: Field | undefined
    formid: number
    modelValue: object
    disabled: boolean
}

export type StringFieldProps = Modify<
    FieldProps,
    {
        modelValue: string
    }
>

export type DateFieldProps = Modify<
    FieldProps,
    {
        modelValue: ModelValue
    }
>
