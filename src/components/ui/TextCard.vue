<template>
    <component :is="props.routerLink ? RouterLink : 'div'" v-bind="props.routerLink ? props.routerLink : {}">
        <Card class="text-card" style="height: 100%;">
            <template #header v-if="props.image">
                <img class="format rounded-t-lg" :class="`aspect-[${props.imageAspect}]`" :src="props.image" />
            </template>
            <template #title v-if="props.title">
                <div class="flex flex-row items-center gap-2 w-full justify-between pt-4 pl-4">
                    <span class="!text-4xl !font-semibold">{{ props.title }}</span>
                    <Chip v-if="props.label" :label="props.label.text"
                        :style="{ backgroundColor: `#${props.label.color}` }"
                        class="ml-auto !text-slate-50 !self-end" />
                </div>
            </template>
            <template #subtitle v-if="props.subtitle">
                <div class="pl-4 pr-4">
                    {{ props.subtitle }}
                </div>
            </template>
            <template #content>
                <p class="m-0 pl-4 pr-4">
                    <slot />
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1 pl-4 pr-4 pb-4">
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
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();

interface Props {
    image?: string,
    imageAspect?: string,
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
    readmore: false,
    imageAspect: '5/3'
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
