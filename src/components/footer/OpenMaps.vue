<template>

    <a target="_blank" :href="googlemapsURL()">{{ $t('Open maps') }}</a>

</template>

<script setup>

const adress = 'Drienerlolaan 5, e208, 7522 NB Enschede';
const googlemapsURL = () => {

    return 'http://maps.google.com/maps?q=' + encodeURIComponent(adress) ;
}

</script>



