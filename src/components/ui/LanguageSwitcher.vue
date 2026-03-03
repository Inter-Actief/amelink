<template>
    <Select v-model="selectedLanguage" :options="langs" optionLabel="name" placeholder="" class="w-full">
        <template #value="slotProps">
            <div class="flex items-center p-1">
                <img :src="`/images/flags/${selectedLanguage}.svg`" class="mr-2" />
            </div>
        </template>
        <template #option="slotProps">
            <div class="flex items-center">
                <img :alt="slotProps.option" :src="`/images/flags/${slotProps.option}.svg`" class="mr-2" />
            </div>
        </template>
    </Select>
</template>

<script setup lang="ts">
import { closeMobileMenu } from '@/functions/functions'
import { useLanguageStore } from '@/stores/languageStore';
import { useGettext } from 'vue3-gettext'
import Select from 'primevue/select';
import { ref, watch } from 'vue';
const gettext = useGettext();
const langStore = useLanguageStore();

const selectedLanguage = ref<string>(gettext.current);
const langs = ref(['en', 'nl']);

watch(selectedLanguage, () => {
    changeLanguage(selectedLanguage.value);
})

function changeLanguage(newLanguage: string) {
    langStore.switchLanguage(newLanguage);
    closeMobileMenu()
}
</script>

<style scoped></style>
