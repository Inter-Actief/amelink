<template>
    <Content>
        <h1>{{ $gettext('Search Results for:') }} {{ search }}</h1>
    </Content>
</template>

<script setup lang="ts">
import Content from '@/components/ui/Content.vue'
import { useGettext } from 'vue3-gettext'

const { $gettext } = useGettext()
const props = defineProps(['search'])
</script>
