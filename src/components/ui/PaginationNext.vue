<template>
	<div v-if="totalItems > 0" class="pagination">
		<ul>
			<li>
				<button @click="prevPage" :disabled="currentPage === 1">
					{{ $gettext('Previous') }}
				</button>
			</li>

			<li>
				<span>{{ $gettext('Page') }} {{ currentPage }} / {{ totalPages }}</span>
			</li>

			<li>
				<button @click="nextPage" :disabled="currentPage >= totalPages">
					{{ $gettext('Next') }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['totalItems', 'itemsPerPage', 'page'])
const router = useRouter()
const currentPage = ref(props.page)
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--
		emits('prev')
		router.push({ query: { page: currentPage.value } })
	}
}

const emits = defineEmits(['next', 'prev'])

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++
		emits('next')
		router.push({ query: { page: currentPage.value } })
	}
}
</script>

<style scoped lang="scss">
.pagination {
	width: 100%;

	ul {
		padding: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;

		li {
			display: grid;

			>span {
				padding: 1rem;
				margin-top: auto;
			}

			button {
				color: inherit;
				border: 0.1rem solid $primary-color;
				border-radius: $border-radius;
				cursor: pointer;
				padding: 1rem 1.5rem;
				background-color: rgba(0, 0, 0, 0);
				transition: 200ms;
				font-size: inherit;
				font-family: inherit;

				&:hover,
				&.active {
					background-color: $primary-color;
					color: $text-color-light;
				}

				&:disabled {
					opacity: 0.2;
					pointer-events: none;
				}

				span {
					padding: 1rem 1rem;
				}
			}
		}
	}

	@media only screen and (max-width: $screen-md) {
		font-size: $font-size-extra-small;

		ul {
			li {

				span,
				button {
					padding: 0.7rem 1.3rem;
				}
			}
		}
	}
}
</style>
