<template>
    <Card class="horizontal-card h-full overflow-hidden">
        <template #content>
            <div class="flex flex-row h-full min-h-40">
                <div class="flex flex-col gap-2 p-4 flex-1 min-w-0">
                    <span v-if="props.title" class="text-2xl md:text-3xl font-semibold">{{ props.title }}</span>
                    <Skeleton v-else-if="props.loading && props.loadingOpts.title" height="2rem" width="70%" />
                    <p v-if="props.body || $slots.default" class="m-0 text-xl md:text-2xl">
                        <slot>{{ props.body }}</slot>
                    </p>
                    <PlaceholderText v-if="props.loading && props.loadingOpts.contentLines"
                        :lines="props.loadingOpts.contentLines" />
                    <div class="mt-auto pt-2">
                        <EpaButton v-if="showButton" class="link readmore" icon="readmore" :to="props.to"
                            :href="props.href">
                            {{ props.buttonLabel || $gettext('Read more') }}
                        </EpaButton>
                        <Skeleton v-if="props.loading && props.loadingOpts.readmore" height="2rem" width="12rem" />
                    </div>
                </div>
                <div v-if="props.image || (props.loading && props.loadingOpts.image)" class="w-48 shrink-0">
                    <img v-if="props.image" v-image-error :src="props.image" :alt="props.title ?? ''"
                        class="h-40 w-full h-full object-cover aspect-square" />
                    <Skeleton v-else height="10rem" class="h-40! sm:h-full!" />
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Skeleton from 'primevue/skeleton';
import type { RouteLocationRaw } from 'vue-router';
import { computed } from 'vue';
import { useGettext } from 'vue3-gettext';
import EpaButton from './EpaButton.vue';
import PlaceholderText from '../placeholder/PlaceholderText.vue';

const { $gettext } = useGettext();

interface Props {
    loading?: boolean,
    loadingOpts?: {
        image?: boolean,
        title?: boolean,
        readmore?: boolean,
        contentLines?: number
    },
    image?: string,
    title?: string,
    body?: string,
    /** Shown when `to`, `href`, or `readmore` is set. Defaults to "Read more". */
    buttonLabel?: string,
    to?: RouteLocationRaw,
    href?: string,
    readmore?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    readmore: false,
    loadingOpts: () => ({
        image: false,
        title: true,
        readmore: false,
        contentLines: 2
    })
})

const showButton = computed(() => !props.loading && (props.to || props.href || props.readmore))
</script>

<style scoped>
.horizontal-card :deep(.p-card-body),
.horizontal-card :deep(.p-card-content) {
    padding: 0;
    height: 100%;
}

.horizontal-card:hover .readmore {
    background-size: 100% 0.2rem;
}
</style>
