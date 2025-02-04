<template>
    <div class="activity_information" v-if="props.item">
        <h2>{{ $gettext('Who, what, where, when...') }}</h2>

        <div class="item">
            <div class="key">{{ $gettext('Who') }}</div>
            <div class="value">{{ props.item.organizer.name }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $gettext('What') }}</div>
            <div class="value">
                {{ props.item.activityLabel[`explanation${gettext.current.capitalize()}`] }}
            </div>
        </div>

        <div class="item">
            <div class="key">{{ $gettext('Where') }}</div>
            <div class="value">{{ props.item.location }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $gettext('When') }}</div>
            <div class="value">
                {{ formattedData(props.item.enrollmentBegin) }} {{ $gettext('from') }}
                {{ formattedTime(props.item.enrollmentBegin) }} {{ $gettext('until') }}
                {{ formattedTime(props.item.enrollmentEnd) }}
            </div>
        </div>

        <div class="item">
            <div class="key">{{ $gettext('Label') }}</div>
            <div class="value">{{ props.item.activityLabel[`name${gettext.current.capitalize()}`] }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $gettext('Costs') }}</div>
            <div class="value">
                <template v-if="props.item.hasCosts"> {{ props.item.price }} euro </template>
                <template v-else>
                    {{ $gettext('Free') }}
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formattedData, formattedTime } from '@/functions/functions'
import { useGettext } from 'vue3-gettext';
const gettext = useGettext();

const props = defineProps(['item'])
</script>

<style scoped lang="scss">
.activity_information {
    width: 100%;
    padding: 4rem;
    background-color: $color_light2;
    border-radius: $border-radius;

    h2 {
        padding-bottom: 2rem;
    }

    .item {
        display: grid;
        grid-template-columns: 10rem auto;

        .key {
            font-weight: 700;
        }
    }
}
</style>
