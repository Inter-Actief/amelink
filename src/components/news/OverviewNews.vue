<template>
	<h1>{{ $gettext('News page') }}</h1>

	<div id="newsitems" class="newsitems cards">
		<div class="item" v-if="newsItems !== null" v-for="item in newsItems" :key="item">
			<router-link :to="{ name: 'singlenews', params: { id: item.id } }">
				<div class="body">
					<div class="info">
						<div class="title">
							<h2>{{ getItemValue(item, 'title') }}</h2>
						</div>
						<div class="date">{{ formattedData(item.publicationDate) }}</div>
					</div>
					<div class="excerpt">{{ getItemValue(item, 'introduction') }}</div>
				</div>

				<EpaButton class="link readmore" icon="readmore">{{ $gettext('Read more') }}</EpaButton>
			</router-link>
		</div>
	</div>

	<Pagination :totalItems="totalCount" :itemsPerPage="perpage" :page="page" @next="handleNextPage"
		@prev="handlePrevPage" @select="handleSelectPage" />
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref } from 'vue'
import Pagination from '@/components/ui/Pagination.vue'
import { useRoute } from 'vue-router'
import { appState } from '@/main.ts'
import { formattedData, getItemValue } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'

const route = useRoute()
const perpage = ref(10)
const page = ref(route.query.page ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

const query = computed(
	() => gql`
  query MyQuery {
    newsItems(limit: ${perpage.value}, offset: ${offset.value}) {
      results {
        id
        title${appState.language}
        introduction${appState.language}
        title
        introduction
        publicationDate
      }
      totalCount
    }
  }
`,
)

const { result, loading, error, refetch } = useQuery(query)

const queryResults = computed(() => result.value?.newsItems)

console.log(queryResults)

const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : null))

function handleNextPage() {
	page.value++
	offset.value = page.value > 1 ? (page.value - 1) * perpage.value : 0
	refetch()
	scrolltop()
}

function handlePrevPage() {
	page.value--
	offset.value = page.value > 1 ? (page.value - 1) * perpage.value : 0
	refetch()
	scrolltop()
}

function handleSelectPage(select) {
	page.value = select
	offset.value = page.value > 1 ? (page.value - 1) * perpage.value : 0
	refetch()
	scrolltop()
}

function scrolltop() {
	window.scrollTo({
		top: document.getElementById('newsitems').offsetTop,
		behavior: 'instant',
	})
}
</script>

<style scoped lang="scss">
.newsitems {
	display: grid;
	gap: 0 $gap-l;
	grid-template-columns: repeat(2, minmax(0, 1fr));

	.item {
		padding: 3rem 0;

		a {
			display: grid;
			gap: $gap_sm;
			text-decoration: none;
			color: inherit;
			height: 100%;
		}

		.info {
			height: fit-content;

			.date {
				font-size: $font-size-small;
			}
		}

		.excerpt {
			height: fit-content;
		}

		.readmore {
			width: fit-content;
			height: fit-content;
			margin-top: auto;
		}

		.body {
			display: grid;
			gap: $gap_sm;
			height: fit-content;
		}

		&:hover .readmore,
		&:hover .readmore>span {
			background-size: 100% 0.2rem;
		}
	}

	.item:not(:nth-last-child(-n + 2)) {
		border-bottom: 0.1rem solid $border-color;
	}

	&.cards {
		gap: $gap;

		.item {
			background-color: $card_background_color;
			padding: 4rem;
			border-radius: $border-radius;
			border-bottom: 0;
		}
	}

	@media only screen and (max-width: $screen-md) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
}
</style>
