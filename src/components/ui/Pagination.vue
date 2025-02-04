<template>
    <div v-if="totalItems > 0" class="pagination">
        <ul>
            <li>
                <button @click="goToPage(1)" :disabled="currentPage === 1">{{ $t('First') }}</button>
            </li>

            <li v-for="pageNumber in displayedPages">
                <span v-if="pageNumber === '...'">...</span>
                <button v-else @click="goToPage(pageNumber)"
                        :class="[(parseInt(currentPage) === parseInt(pageNumber) ? 'active' : '')]">{{ pageNumber }}
                </button>
            </li>

            <li>
                <button @click="goToPage(totalPages)" :disabled="currentPage >= totalPages">{{ $t('Last') }}</button>
            </li>

        </ul>
    </div>
</template>

<script setup>
import {computed, defineEmits, ref, watch} from 'vue';
import {useRouter} from "vue-router";

const props = defineProps(['totalItems', 'itemsPerPage', 'page']);

const router = useRouter();

const currentPage = ref(props.page);
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
const displayedPages = ref([]);

watch([currentPage, totalPages], () => {
    createPagination();
});

createPagination();

function createPagination()
{
    const extend = 2;
    const pages = [];

    let dotPushed = false;

    if (totalPages.value === 0) {
        return;
    }

    for (let i = 1; i <= totalPages.value; i++) {

        console.log(i);

        if (i <= (parseInt(currentPage.value) + extend) && i >= (parseInt(currentPage.value) - extend)  || i === 2 || i === totalPages.value - 1 || i === 1 || i === totalPages.value)
        {
            console.log(i);
            pages.push(i);
            dotPushed = false;
        } else if (!dotPushed && i !== 1 && i !== totalPages.value) {
            pages.push('...');
            dotPushed = true;
        }
    }

    displayedPages.value = pages;
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emits('prev');
        router.push({query: {page: currentPage.value}});
    }
};

const emits = defineEmits(['next', 'prev']);

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emits('next');
        router.push({query: {page: currentPage.value}});
    }
};

function goToPage(pageNumber) {
    currentPage.value = pageNumber;
    emits('select', pageNumber);
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

            > span {
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