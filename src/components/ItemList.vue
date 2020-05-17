<script>
import { defineComponent } from '@vue/composition-api'
import ItemListItem from '@/components/ItemListItem.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import getItems from '@/apollo/queries/getItems.query.gql'

export default defineComponent({
    name: 'ItemList',
    components: {
        ItemListItem,
    },
    setup() {
        const { result, loading, error } = useQuery(getItems)
        const items = useResult(result, null, data => data.items)
        return {
            items,
        }
    },
})
</script>

<template>
    <ul class="ItemList" v-if="items">
        <ItemListItem
            v-for="item of items"
            :key="item.id"
            :image="item.image"
            :name="item.title"
            :price="item.price"
            :description="item.description"
        />
    </ul>
</template>

<style lang="scss" scoped>
.ItemList {
    margin: 0px;
    padding: 10px;
    list-style: none;
    grid-column: 1;
    grid-row: 2 / -1;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    justify-items: center;
    overflow-y: auto;
    width: 100%;
}
</style>
