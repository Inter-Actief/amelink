<template>
    <component :is="props.routerLink ? RouterLink : 'div'" v-bind="props.routerLink ? props.routerLink : {}">
        <Card class="text-card" style="height: 100%;">
            <template #header v-if="props.image ||
                (props.loadingOpts?.imageUrl && props.loadingOpts.aspect) ||
                (props.loading && props.loadingOpts.image)">
                <div class="mb-auto">

                    <img v-if="props.image" v-image-error class="object-cover format rounded-t-lg"
                    :class="`aspect-[${props.imageAspect}]`" :src="props.image" />
                    
                    <div v-if="props.loading && props.loadingOpts.image">
                        <Skeleton height="38rem" />
                    </div>
                    
                    <img v-if="props.loadingOpts?.imageUrl" v-image-error class="object-cover format rounded-t-lg"
                    :class="`aspect-[${props.loadingOpts.aspect}]`" :src="props.loadingOpts?.imageUrl" />
                </div>
            </template>
            <template #title v-if="props.title || (props.loading && props.loadingOpts.title)">
                <div class="flex flex-row items-center gap-2 w-full justify-between pt-4 pl-4">
                    <span v-if="props.title" class="text-4xl! font-semibold!">{{ props.title }}</span>
                    <Chip v-if="props.label" :label="props.label.text"
                        :style="{ backgroundColor: `#${props.label.color}` }"
                        class="ml-auto text-slate-50! self-end!" />
                </div>
                <div v-if="props.loading">
                    <div class="flex flex-row items-center gap-4 w-full justify-between pt-4 pl-4">
                        <Skeleton height="4rem" width="60rem" />
                        <div>
                            <Skeleton v-if="props.loadingOpts.label" height="4rem" width="8rem" />
                        </div>
                    </div>
                </div>
            </template>
            <template #subtitle v-if="props.subtitle || (props.loading && props.loadingOpts.subtitle)">
                <div class="pl-4 pr-4">
                    <span v-if="props.subtitle">
                        {{ props.subtitle }}
                    </span>
                    <div v-if="props.loading" class="pt-2">
                        <Skeleton height="2rem" width="30rem" />
                    </div>
                </div>
            </template>
            <template #content>
                <p class="m-0 pl-4 pr-4">
                    <slot />
                <div v-if="props.loading" class="pt-2">
                    <PlaceholderText :lines="props.loadingOpts.contentLines" />
                </div>
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1 pl-4 pr-4 pb-4">
                    <slot name="footer"></slot>
                    <EpaButton v-if="showReadMore" class="link readmore" icon="readmore">
                        {{ $gettext('Read more') }}
                    </EpaButton>
                    <div v-if="props.loading && props.loadingOpts.readmore" class="pt-2">
                        <Skeleton height="2rem" width="20rem" />
                    </div>
                </div>
            </template>
        </Card>
    </component>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';
import { RouterLink } from 'vue-router';
import EpaButton from './EpaButton.vue';
import Card from 'primevue/card';
import type { _RouterLinkI, RouteLocationRaw, RouterLinkProps } from 'vue-router';
import { computed } from 'vue';
import { useGettext } from 'vue3-gettext';
import type Skeleton from 'primevue/skeleton';
import PlaceholderText from '../placeholder/PlaceholderText.vue';
const { $gettext } = useGettext();

interface Props {
    loading?: boolean,
    loadingOpts?: {
        label?: boolean,
        image?: boolean,
        imageUrl?: string,
        aspect?: string,
        title?: boolean,
        subtitle?: boolean,
        readmore?: boolean,
        contentLines?: number
    }
    image?: string,
    imageAspect?: string,
    title?: string,
    subtitle?: string,
    label?: {
        color: string,
        text: string
    },
    readmore?: boolean,
    routerLink?: RouterLinkProps,
}

const props = withDefaults(defineProps<Props>(), {
    readmore: false,
    imageAspect: '5/3',
    loading: false,
    loadingOpts: () => ({
        image: false,
        label: false,
        title: true,
        subtitle: true,
        readmore: false,
        contentLines: 3
    })
})

const showReadMore = computed(() => {
    return props.routerLink || props.readmore;
})

</script>

<style scoped>
.text-card:hover .readmore {
    background-size: 100% 0.2rem;
}
</style>
