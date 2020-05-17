<script>
import { defineComponent } from '@vue/composition-api'
import TheFilter from '@/components/TheFilter.vue'
import ItemList from '@/components/ItemList.vue'
import TheCart from '@/components/TheCart.vue'

export default defineComponent({
    name: 'Shop',
    components: {
        TheFilter,
        ItemList,
        TheCart,
    },
})
</script>

<template>
    <div class="Shop">
        <TheCart />
        <TheFilter />
        <ItemList />
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
    }
}
</style>
