<template>
    <div class="card flex justify-center">
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full large">
            <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" fluid />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                    $form.username.error?.message }}</Message>
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { yupResolver } from '@primevue/forms/resolvers/yup';

import * as yup from "yup"

const toast = useToast();

const initialValues = reactive({
    username: ''
});

const resolver = yupResolver(
    yup.object().shape({
        username: yup.string().required('Username is required via Yup.'),
    })
);

const onFormSubmit = ({ valid }: { valid: boolean }) => {
    if (valid) {
        toast.add({
            severity: 'success',
            summary: 'Form is submitted.',
            life: 3000
        });
    }
};
</script>
