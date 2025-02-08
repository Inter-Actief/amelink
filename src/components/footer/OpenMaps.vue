<template>
    <a target="_blank" :href="googlemapsURL()">{{ $gettext('Open maps') }}</a>
</template>

<script setup lang="ts">
import { useGettext } from 'vue3-gettext';

const { $gettext } = useGettext();

const adress = 'Drienerlolaan 5, e208, 7522 NB Enschede'
const googlemapsURL = () => {
    return 'http://maps.google.com/maps?q=' + encodeURIComponent(adress)
}
</script>
