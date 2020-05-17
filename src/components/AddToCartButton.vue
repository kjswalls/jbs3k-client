<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'AddToCartButton',
})
</script>

<template>
    <BaseButton class="AddToCartButton">
        Add to cart
    </BaseButton>
</template>

<style lang="scss" scoped>
.AddToCartButton {
    margin-top: 15px;
}
</style>
