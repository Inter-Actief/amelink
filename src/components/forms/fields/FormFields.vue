<template>

<div class="fields">
    <template v-for="field in fields" :key="field.id" :class="['field', field.cssClass]">

        <TextField
            v-if="field.type === 'text'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <TextareaField
            v-else-if="field.type === 'textarea'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <EmailField
            v-else-if="field.type === 'email'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <PhoneField
            v-else-if="field.type === 'tel'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <RadioField
            v-else-if="field.type === 'radio'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <SelectField
            v-else-if="field.type === 'select'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <CheckboxField
            v-else-if="field.type === 'checkbox'"
            :formid="formid"
            :field="field"
            v-model="field.choices"
            :disabled="disabled"
        />
        <DatepickerField
            v-else-if="field.type === 'date'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <TimepickerField
            v-else-if="field.type === 'time'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <TextEditor
            v-else-if="field.type === 'editor'"
            :formid="formid"
            :field="field"
            v-model="field.value"
            :disabled="disabled"
        />
        <template v-else-if="field.type === 'multiple'">
            <div class="field multiple">
                <label>{{ field.label }}</label>
                <FormFields :formid="formid" :fields="field.fields" :disabled="disabled" />
            </div>
        </template>

    </template>
</div>
    
</template>

<script setup lang="ts">
import TextareaField from "@/components/forms/fields/types/TextareaField.vue";
import PhoneField from "@/components/forms/fields/types/PhoneField.vue";
import SelectField from "@/components/forms/fields/types/SelectField.vue";
import CheckboxField from "@/components/forms/fields/types/CheckboxField.vue";
import EmailField from "@/components/forms/fields/types/EmailField.vue";
import RadioField from "@/components/forms/fields/types/RadioField.vue";
import DatepickerField from "@/components/forms/fields/types/DatepickerField.vue";
import TextEditor from "@/components/forms/fields/types/TextEditor.vue";
import TextField from "@/components/forms/fields/types/TextField.vue";
import TimepickerField from "@/components/forms/fields/types/TimepickerField.vue";

const props = defineProps({
    fields: Object,
    formid: Number,
    disabled: Boolean
});

</script>

<style scoped lang="scss">

</style>