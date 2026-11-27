<!-- Marks a pinned item. Written once because the spotlight and the queue mean
     the same thing by it: the association wants this one read first. -->
<template>
    <span
        class="ml-1 flex shrink-0 items-center border-l border-slate-300 pl-2 text-primary dark:border-[var(--p-content-border-color)] dark:text-[var(--p-primary-300)]"
        role="img"
        :aria-label="$gettext('Pinned')"
        :title="$gettext('Pinned')"
    >
        <Pin class="size-[1.4rem]" :stroke-width="2.25" aria-hidden="true" />
    </span>
</template>

<script setup lang="ts">
import { Pin } from '@lucide/vue'
import { useGettext } from 'vue3-gettext'

const { $gettext } = useGettext()
</script>
