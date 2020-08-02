import Vue from 'vue';
import { reactive, ref } from '@vue/composition-api';
import { useFunds } from '@/functions/funds';
import { Item } from '@/types/item';
import { Cart } from '@/types/cart';

const cart = reactive<Cart>({});
const currentTotal = ref(0);

export function useCart() {
    function increaseTotal(item: Item) {
        currentTotal.value = Math.round(
            Math.round(currentTotal.value) + item.price
        );
    }

    function decreaseTotal(item: Item) {
        currentTotal.value = Math.round(
            Math.round(currentTotal.value) - item.price
        );
    }

    function canAffordItem(item: Item) {
        const { funds } = useFunds();
        const { currentBalance } = funds;
        if (currentBalance - item?.price >= 0) {
            return true;
        }
        return false;
    }

    function addToCart(item: Item): Cart {
        const { purchaseItem } = useFunds();
        if (!cart[item.title]) {
            Vue.set(cart, item.title, []);
        }
        cart[item.title].push(item);
        purchaseItem(item);
        increaseTotal(item);

        return cart;
    }

    function removeFromCart(item: Item): Cart {
        const { refundItem } = useFunds();
        const itemArray = cart[item.title];
        if (itemArray?.length) {
            itemArray.pop();
        }
        if (itemArray.length === 0) {
            delete cart[item.title];
        }
        refundItem(item);
        decreaseTotal(item);

        return cart;
    }

    return {
        cart,
        addToCart,
        removeFromCart,
        canAffordItem,
        currentTotal,
    };
}
