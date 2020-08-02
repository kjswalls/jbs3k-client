<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'AddToCartButton',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        buttonText() {
            return this.disabled ? "Can't afford" : 'Buy';
        },
    },
});
</script>

<template>
    <BaseButton :class="['AddToCartButton', { disabled }]" :disabled="disabled">
        {{ buttonText }}
    </BaseButton>
</template>

<style lang="scss" scoped>
.AddToCartButton {
    margin-top: 15px;

    &.disabled {
        border-color: rgb(248, 157, 157);
        color: rgb(248, 157, 157);
    }
}
</style>
