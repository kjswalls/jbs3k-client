<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import AddToCartButton from '@/components/AddToCartButton.vue';
import { Item } from '@/types/item';
import { useCart } from '@/functions/cart';
import { useCurrency } from '@/functions/util';

export default defineComponent({
    name: 'ItemListItem',
    components: {
        AddToCartButton,
    },
    props: {
        item: {
            type: Object as () => Item,
            required: true,
        },
    },
    setup(props) {
        const { addToCart, canAffordItem } = useCart();
        const { formatNumber } = useCurrency();
        const formattedPrice = computed(() => formatNumber(props.item.price));
        const isAddDisabled = computed(() => !canAffordItem(props.item));

        return {
            formattedPrice,
            addToCart,
            isAddDisabled,
        };
    },
});
</script>

<template>
    <li class="ItemListItem">
        <BaseArtwork
            class="icon"
            :imageSrc="item.image"
            :altText="`${item.title} icon`"
            :popoverContent="item.description"
            :popoverSource="item.source"
        />
        <p class="primaryBody name">{{ item.title }}</p>
        <p class="primaryBody price">{{ formattedPrice }}</p>
        <AddToCartButton
            @click.native="addToCart(item)"
            :disabled="isAddDisabled"
        />
    </li>
</template>

<style lang="scss" scoped>
.ItemListItem {
    width: 100%;
    height: 250px;
    border-radius: 30px;
    background: $lightGray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: transform 0.3s ease;
    text-align: center;

    .icon {
        margin-bottom: 5px;
    }

    .name {
        color: $darkGray;
    }

    .name,
    .price {
        margin: 4px 0px;
    }

    &:hover {
        background: $white;
        border: 3px outset $purple;
        box-shadow: -5px 10px 2px 1px rgba(0, 0, 255, 0.2);
        transform: translate(2px, -3px);
    }
}

@media (min-width: $sm) {
    .ItemListItem {
        width: 180px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .ItemListItem {
        &:hover {
            transform: none;
        }
    }
}
</style>
