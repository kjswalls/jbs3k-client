<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ItemListItem from '@/components/ItemListItem.vue';
import { Item } from '@/types/item';

export default defineComponent({
    name: 'ItemList',
    components: {
        ItemListItem,
    },
    props: {
        items: {
            type: Array as () => Item[],
        },
    },
});
</script>

<template>
    <ul class="ItemList" v-if="items.length">
        <ItemListItem v-for="item of items" :key="item.id" :item="item" />
    </ul>
    <p v-else class="secondaryBody emptyView">
        This category doesn't have any items in it yet. :)
    </p>
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

.emptyView {
    color: $darkGray;
    justify-self: start;
    padding: 8px 10px;
}

@media (max-width: $sm) {
    .ItemList {
        grid-row: 3 / -1;
    }
}
</style>
