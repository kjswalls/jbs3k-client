<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import TheFilterItem from '@/components/TheFilterItem.vue';
import { Filter } from '@/types/filter';

export default defineComponent({
    name: 'TheFilter',
    components: {
        TheFilterItem,
    },
    props: {
        filters: {
            type: Array as () => Filter[],
        },
        activeFilterId: {
            type: String,
        },
    },
});
</script>

<template>
    <div class="TheFilter">
        <ul class="list" v-if="filters[0]">
            <TheFilterItem
                v-for="filter in filters"
                :key="filter.id"
                :filter="filter"
                :isActive="filter.id === activeFilterId"
            />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.TheFilter {
    margin: 0px;
    padding: 2px;
    min-height: 40px;
    justify-self: start;
    grid-column: 1;
    grid-row: 1;

    .list {
        margin: 0px;
        padding: 0px;
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
    }
}

@media (max-width: $sm) {
    .TheFilter {
        justify-self: center;
        width: 100%;
        overflow-x: auto;
        grid-row: 2;

        .list {
            flex-wrap: nowrap;
            /* justify-content: center; */
            width: 100%;
        }
    }
}
</style>
