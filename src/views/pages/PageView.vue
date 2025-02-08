<template>
    <div class="ia_section gray">
        <div class="ia_row">
            <div class="ia_column">
                <template v-if="item">
                    <div class="text" v-html="markedText(item?.content ? item.content : '')"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { markedText } from '@/functions/functions'
import { useQueryStore } from '@/stores/queryStore'
const queryStore = useQueryStore();

const props = defineProps(['id', 'slug'])

const result = await queryStore.getPageViewQuery({ pageId: props.id })
const item = computed(() => result.result.page)
</script>
