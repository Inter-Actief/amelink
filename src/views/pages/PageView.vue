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
import { inject } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed, ref, watch } from 'vue'
import { getItemValue, markedText } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'

const props = defineProps(['id', 'slug'])
const gettext = useGettext();


const { result, loading, error, refetch } = useQuery(query, { pageId: props.id });
const item = computed(() => result.value?.page)
</script>
