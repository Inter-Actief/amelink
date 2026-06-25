<template>
    <TextCard :title="$gettext('Who, what, where, when...')">
        <div class="space-y-3 pt-4">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 font-bold">{{ $gettext('Who') }}</div>
                <div class="col-span-9">
                    <Skeleton v-if="loading" width="40%" height="1.5rem"></Skeleton>
                    <span v-else>{{ props.item.organizer.name }}</span>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 font-bold">{{ $gettext('What') }}</div>
                <div class="col-span-9">
                    <Skeleton v-if="loading" width="60%" height="1.5rem"></Skeleton>
                    <span v-else>{{ props.item.summary }}</span>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 font-bold">{{ $gettext('Where') }}</div>
                <div class="col-span-9">
                    <Skeleton v-if="loading" width="50%" height="1.5rem"></Skeleton>
                    <span v-else>{{ props.item.location }}</span>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 font-bold">{{ $gettext('When') }}</div>
                <div class="col-span-9">
                    <template v-if="loading">
                        <div class="space-y-2">
                            <Skeleton width="70%" height="1.5rem"></Skeleton>
                            <Skeleton width="75%" height="1.5rem"></Skeleton>
                        </div>
                    </template>
                    <span v-else>{{ formattedData(props.item.enrollmentBegin) }} {{ $gettext('from') }}
                        {{ formattedTime(props.item.enrollmentBegin) }} {{ $gettext('until') }}
                        {{ formattedTime(props.item.enrollmentEnd) }}</span>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 font-bold">{{ $gettext('Label') }}</div>
                <div class="col-span-9">
                    <Skeleton v-if="loading" width="35%" height="1.5rem"></Skeleton>
                    <span v-else>{{ props.item.activityLabel[`nameEn`] }}</span>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 font-bold">{{ $gettext('Costs') }}</div>
                <div class="col-span-9">
                    <Skeleton v-if="loading" width="25%" height="1.5rem"></Skeleton>
                    <template v-else>
                        <template v-if="props.item.hasCosts"> {{ props.item.price }} euro </template>
                        <template v-else>
                            {{ $gettext('Free') }}
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </TextCard>
</template>

<script setup lang="ts">
import { formattedData, formattedTime } from '@/functions/functions'
import { useGettext } from 'vue3-gettext';
import TextCard from '../ui/TextCard.vue';
import Skeleton from 'primevue/skeleton';
import type { SingleActivitiesQuery } from '@/gql/graphql';

type Activity = NonNullable<SingleActivitiesQuery['activity']>;

interface Props {
    item: Activity
    loading?: boolean
}

const gettext = useGettext();

const { $gettext } = gettext;
const props = withDefaults(defineProps<Props>(), {
    loading: false
})
</script>

<style scoped></style>
