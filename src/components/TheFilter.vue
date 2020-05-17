<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'TheFilter',
    //   components: {
    //     TheFilterItem
    //   }
})
</script>

<template>
    <ul class="TheFilter">
        <TheFilterItem v-for="item in 10" :key="item" name="yo" price="$5" />
    </ul>
</template>

<style lang="scss" scoped>
.TheFilter {
    margin: 0px;
    padding: 0px;
    list-style: none;
    grid-column: 1;
    grid-row: 1;
}
</style>
