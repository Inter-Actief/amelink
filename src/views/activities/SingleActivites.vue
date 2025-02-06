<template>
    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column span6">
                <template v-if="queryItem">
                    <div class="title">
                        <h1>
                            {{ getItemValue(queryItem, 'summary') }}
                        </h1>

                        <div class="date">
                            {{ formattedData(queryItem.begin) }}
                        </div>
                    </div>

                    <div class="text" v-html="markedText(getItemValue(queryItem, 'description'))"></div>

                    <EpaButton v-if="queryItem.photos.length > 0"
                        :to="{ name: 'singleactivitiesphotos', params: { id: props.id } }" class="">
                        {{ $gettext('View photos') }}
                    </EpaButton>
                    <template v-else></template>

                    <EpaButton v-if="queryItem.photos.length > 0" :to="{ name: 'activities', params: { id: props.id } }"
                        class="link return" bicon="return">
                        {{ $gettext('Return to overview') }}
                    </EpaButton>
                    <template v-else></template>
                </template>
            </div>

            <div class="ia_column span6">
                <InformationActivites :item="queryItem" />
                <EnrollFrom />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions'
import EpaButton from '@/components/ui/EpaButton.vue'
import InformationActivites from '@/components/activities/InformationActivites.vue'
import EnrollFrom from '@/components/forms/EnrollForm.vue'
import { useGettext } from 'vue3-gettext'
import { graphql } from '@/gql'

const gettext = useGettext();
const props = defineProps(['id'])
const query = graphql(`
  query SingleActivitiesQuery($id: ID) {
    activity(id: $id) {
      begin
      id
      summary
      description
      photos {
          thumbMedium
          thumbMediumHeight
          thumbMediumWidth
      }
      location
      hasCosts
      price
      activityLabel {
          nameEn
          explanationEn
      }
      organizer {
          name
      }
      enrollmentEnd
      enrollmentBegin
    }
  }
`) // TODO: activityLabel.name or activityLabel.nameNl ?
// TODO: Add 'name' and 'explanation' to ActivityLabel

const { result, loading, error, refetch } = useQuery(query, {
    id: props.id
})
const queryResults = computed(() => result.value?.activity)
const queryItem = computed(() => (queryResults.value ? queryResults.value : null))
</script>
