
<template>

    <div class="activity_information" v-if="props.item">

        <h2>{{ $t('Who, what, where, when...') }}</h2>

        <div class="item">
            <div class="key">{{ $t('Who') }}</div>
            <div class="value">{{ props.item.organizer.name }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $t('What') }}</div>
            <div class="value">{{ props.item.activityLabel[`explanation${appState.language}`] }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $t('Where') }}</div>
            <div class="value">{{ props.item.location }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $t('When') }}</div>
            <div class="value">{{ formattedData( props.item.enrollmentBegin ) }} {{ $t('from') }} {{ formattedTime( props.item.enrollmentBegin ) }} {{ $t('until') }} {{ formattedTime( props.item.enrollmentEnd ) }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $t('Label') }}</div>
            <div class="value">{{ props.item.activityLabel[`name${appState.language}`] }}</div>
        </div>

        <div class="item">
            <div class="key">{{ $t('Costs') }}</div>
            <div class="value">
                <template v-if="props.item.hasCosts">
                    {{ props.item.price }} euro
                </template>
                <template v-else>
                    {{ $t('Free') }}
                </template>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">

import {formattedData, formattedTime} from "@/functions/functions";
import {appState} from "@/main";

const props = defineProps(['item']);

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