<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<template>
    <div class="TheCart"></div>
</template>

<style lang="scss" scoped>
.TheCart {
    grid-column: 1;
    grid-row: 1;
    min-width: 100%;
    min-height: 150px;
    width: 100%;
    border: 3px solid $pink;
    border-radius: 30px;
}

@media (min-width: $xs) {
    .TheCart {
        min-height: 250px;
    }
}

@media (min-width: $sm) {
    .TheCart {
        grid-column: 2;
        grid-row: 1 / -1;
        min-width: 325px;
        min-height: 250px;
    }
}
</style>
