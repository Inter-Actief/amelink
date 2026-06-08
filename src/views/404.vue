<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import { useRoute } from 'vue-router';
import { useGettext } from 'vue3-gettext';
const gettext = useGettext();
const { $gettext } = gettext;
const { path } = useRoute();
</script>

<template>
    <main>
        <Content class="text-center">
            <h1>{{ $gettext('404, not found!') }}</h1>
            <p>{{ $gettext('We could not find the following page: ') }} {{ path }}</p>

            <RouterLink class="link" :to="{ name: 'home' }"><Button>{{ $gettext('Back to home') }}</Button></RouterLink>
        </Content>
    </main>
</template>
