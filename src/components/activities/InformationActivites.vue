<template>
    <TextCard :title="$gettext('Who, what, where, when...')">
        <div class="grid grid-cols-12 pt-4">
            <div class="col-span-2">
                <div class="font-bold">{{ $gettext('Who') }}</div>
                <div class="font-bold">{{ $gettext('What') }}</div>
                <div class="font-bold">{{ $gettext('Where') }}</div>
                <div class="font-bold">{{ $gettext('When') }}</div>
                <div class="font-bold">{{ $gettext('Label') }}</div>
                <div class="font-bold">{{ $gettext('Costs') }}</div>
            </div>
            <div class="col-span-10">
                <div>{{ props.item.organizer.name }}</div>
                <div>{{ getItemValue(props.item.activityLabel, 'explanation') }}</div>
                <div>{{ props.item.location }}</div>
                <div> {{ formattedData(props.item.enrollmentBegin) }} {{ $gettext('from') }}
                    {{ formattedTime(props.item.enrollmentBegin) }} {{ $gettext('until') }}
                    {{ formattedTime(props.item.enrollmentEnd) }}</div>
                <div>{{ props.item.activityLabel[`nameEn`] }}</div>
                <div>
                    <template v-if="props.item.hasCosts"> {{ props.item.price }} euro </template>
                    <template v-else>
                        {{ $gettext('Free') }}
                    </template>
                </div>
            </div>
        </div>
    </TextCard>
</template>

<script setup lang="ts">
import { formattedData, formattedTime, getItemValue } from '@/functions/functions'
import { useGettext } from 'vue3-gettext';
import TextCard from '../ui/TextCard.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { reactive } from 'vue';
const gettext = useGettext();

const { $gettext } = gettext;
const props = defineProps(['item'])

const data = reactive([{
    name: $gettext('Who'),
    value: props.item.organizer.name
}])
</script>

<style scoped lang="scss"></style>
