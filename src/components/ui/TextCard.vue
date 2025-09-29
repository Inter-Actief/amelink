<template>
    <component :is="props.routerLink ? RouterLink : 'div'" v-bind="props.routerLink ? props.routerLink : {}">
        <template></template>
        <Card class="p-4 text-card">
            <template #header v-if="props.image">
                <img :src="`/src/assets/images/${props.image}`" />
            </template>
            <template #title v-if="props.title">
                <div class="flex flex-row items-center w-full justify-between">
                    <span class="!text-4xl !font-semibold">{{ props.title }}</span>
                    <Chip v-if="props.label" :label="props.label.text"
                        :style="{ backgroundColor: `#${props.label.color}` }"
                        class="ml-auto !text-slate-50 !self-end" />
                </div>
            </template>
            <template #subtitle v-if="props.subtitle">{{ props.subtitle }}</template>
            <template #content>
                <p class="m-0">
                    <slot />
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <slot name="footer"></slot>
                    <EpaButton v-if="showReadMore" class="link readmore" icon="readmore">
                        {{ $gettext('Read more') }}
                    </EpaButton>
                </div>
            </template>
        </Card>
    </component>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';
import { RouterLink } from 'vue-router';
import Card from 'primevue/card';
import type { _RouterLinkI, RouteLocationRaw, RouterLinkProps } from 'vue-router';
import { computed } from 'vue';
interface Props {
    image?: string,
    title?: string,
    subtitle?: string,
    label?: {
        color: string,
        text: string
    },
    readmore?: boolean,
    routerLink?: RouterLinkProps
}
const props = withDefaults(defineProps<Props>(), {
    readmore: false
})

const showReadMore = computed(() => {
    return props.routerLink || props.readmore;
})

</script>

<style scoped lang="scss">
.text-card {
    &:hover .readmore {
        background-size: 100% 0.2rem;
    }
}
</style>
