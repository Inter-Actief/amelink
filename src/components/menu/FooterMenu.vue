<template>
    <div>
        <h4>{{ title }}</h4>

        <ul>
            <li><a href="#">Custom link</a></li>
            <li><a href="#">Custom link</a></li>
            <li><a href="#">Custom link</a></li>
            <li><a href="#">Custom link</a></li>
            <li>
                <EpaButton class="link" href="#">Custom Link name</EpaButton>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import EpaButton from '@/components/ui/EpaButton.vue'

const props = defineProps(['title'])
</script>
