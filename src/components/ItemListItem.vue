<script>
import { defineComponent, computed } from '@vue/composition-api'
import AddToCartButton from '@/components/AddToCartButton.vue'

export default defineComponent({
    name: 'ItemListItem',
    components: {
        AddToCartButton,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const formattedPrice = computed(() =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(props.price)
        )
        return {
            formattedPrice,
        }
    },
})
</script>

<template>
    <li class="ItemListItem">
        <BaseArtwork :imageSrc="image" :altText="`${name} icon`" class="icon" />
        <p class="primaryBody name">{{ name }}</p>
        <p class="primaryBody price">{{ formattedPrice }}</p>
        <AddToCartButton />
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
