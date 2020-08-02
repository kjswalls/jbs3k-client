<script>
import { defineComponent, computed, ref, watch } from '@vue/composition-api';
import TheFilter from '@/components/TheFilter.vue';
import ItemList from '@/components/ItemList.vue';
import TheCart from '@/components/TheCart.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import getItems from '@/apollo/queries/getItems.query.gql';
import getCategories from '@/apollo/queries/getCategories.query.gql';
import getCurrentNetWorth from '@/apollo/queries/getCurrentNetWorth.query.gql';
import { initializeFunds } from '@/functions/funds';

export default defineComponent({
    name: 'Shop',
    components: {
        TheFilter,
        ItemList,
        TheCart,
    },
    setup() {
        const activeFilterId = ref('0'); // All items
        const {
            result: itemsResult,
            loading: itemsLoading,
            error: itemsError,
        } = useQuery(getItems);
        const items = useResult(itemsResult, null, data => data.items);

        const {
            result: categoriesResult,
            loading: categoriesLoading,
            error: categoriesError,
        } = useQuery(getCategories);
        const categories = useResult(
            categoriesResult,
            null,
            data => data.categories
        );

        const balanceOptions = ref({
            fetchPolicy: 'cache-first',
        });
        const {
            result: balanceResult,
            loading: balanceLoading,
            error: balanceError,
        } = useQuery(getCurrentNetWorth, null, balanceOptions);
        const balance = useResult(balanceResult, null, data => data.netWorth);

        watch(balance, value => {
            if (value) {
                initializeFunds(value);
            }
        });

        function filterItems(category) {
            activeFilterId.value = category.id;
        }

        const filteredItems = computed(() => {
            if (activeFilterId.value === '0') {
                return items.value;
            }
            return items.value.filter(
                item => item.category.id === activeFilterId.value
            );
        });

        const augmentedCategories = computed(() => {
            if (categoriesLoading.value) {
                return [];
            }
            const augmented = categories.value.map(category => {
                const augmentedCategory = category;
                augmentedCategory.handler = () => filterItems(category);
                return augmentedCategory;
            });
            return augmented;
        });

        return {
            filteredItems,
            augmentedCategories,
            categoriesLoading,
            categoriesError,
            itemsLoading,
            itemsError,
            activeFilterId,
            balanceResult,
            balanceLoading,
            balanceError,
        };
    },
});
</script>

<template>
    <div class="Shop" v-if="balanceResult">
        <TheCart />
        <TheFilter
            :filters="augmentedCategories"
            :activeFilterId="activeFilterId"
            v-if="!categoriesLoading && !categoriesError"
        />
        <ItemList :items="filteredItems" v-if="!itemsLoading && !itemsError" />
    </div>
    <div class="Shop shopLoading" v-else-if="balanceLoading">
        Checking Jeff B.'s bank statements...
    </div>
    <div class="Shop shopError" v-else-if="balanceError">
        Sorry, there was an error getting Jeff B.'s current net worth. Please
        try again later. :)
    </div>
</template>

<style lang="scss" scoped>
.Shop {
    display: grid;
    grid-template-columns: minmax(min-content, 1fr) min-content;
    grid-template-rows: minmax(min-content, max-content) 1fr;
    grid-gap: 20px;
    justify-items: center;
    overflow-y: auto;
}

@media (max-width: $sm) {
    .Shop {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(auto-fill, minmax(min-content, max-content));
        grid-gap: 10px;
    }
}
</style>
