<template>
    <button v-if="props.variant === 'button'" type="button" class="language-toggle"
        :aria-label="`${$gettext('Language')}: ${currentLanguage}`"
        :title="`${$gettext('Language')}: ${currentLanguage}`" @click="cycleLanguage">
        <img :src="`/images/flags/${currentLanguage}.svg`" alt="" />
    </button>

    <Select v-else v-model="selectedLanguage" :options="langs" optionLabel="name" placeholder="" class="w-full">
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
import { computed, ref, watch } from 'vue';

interface Props {
    /** `button` is the compact flag-only toggle used in the header. */
    variant?: 'select' | 'button'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'select',
})

const gettext = useGettext();
const { $gettext } = gettext;
const langStore = useLanguageStore();

const selectedLanguage = ref<string>(gettext.current);
const langs = ref(['en', 'nl']);
const currentLanguage = computed(() => langStore.currentLanguage);

watch(selectedLanguage, () => {
    changeLanguage(selectedLanguage.value);
})

function changeLanguage(newLanguage: string) {
    langStore.switchLanguage(newLanguage);
    closeMobileMenu()
}

/** With only two languages the header toggle can simply cycle to the other one. */
function cycleLanguage() {
    langStore.switchLanguage();
    closeMobileMenu()
}
</script>

<style scoped>
.language-toggle {
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
}

.language-toggle img {
    display: block;
    width: 1.8rem;
    height: auto;
    border-radius: 0.15rem;
}
</style>
