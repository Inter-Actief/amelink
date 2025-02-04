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
import gql from 'graphql-tag'
import { computed } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions'
import EpaButton from '@/components/ui/EpaButton.vue'
import InformationActivites from '@/components/activities/InformationActivites.vue'
import { appState } from '@/main'
import EnrollFrom from '@/components/forms/EnrollForm.vue'

const props = defineProps(['id'])
const query = computed(
	() => gql`
  query MyQuery {
    activity(id: "${props.id}") {
      description${appState.language}
      summary${appState.language}
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
          name${appState.language}
          explanation${appState.language}
      }
      organizer {
          name
      }
      enrollmentEnd
      enrollmentBegin
    }
  }
`,
)

const { result, loading, error, refetch } = useQuery(query)
const queryResults = computed(() => result.value?.activity)
const queryItem = computed(() => (queryResults.value ? queryResults.value : null))
</script>
