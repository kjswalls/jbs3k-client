<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'BaseButton',
})
</script>

<template>
    <button class="BaseButton">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.BaseButton {
    background: $lightGray;
    padding: 8px 10px;
    border: 2px solid $gray;
    border-radius: 5px;
    font-family: 'Roboto Mono', monospace;
    font-weight: bold;
    font-size: 12px;
    color: $darkGray;
    transition: all 0.2s ease;

    &:hover {
        background: $purple;
        color: $white;
        cursor: pointer;
        border: 2px solid $purple;
    }

    &:active {
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: solid;
    }
}
</style>
