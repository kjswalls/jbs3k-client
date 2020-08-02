import { reactive } from '@vue/composition-api';
import { Item } from '@/types/item';
import { requestInterval } from '@/functions/util';

const PROFIT_PER_SECOND = 3_605;

const funds = reactive({
    currentBalance: 181_000_000_000,
});

requestInterval(() => {
    funds.currentBalance += PROFIT_PER_SECOND;
}, 1000);

export function initializeFunds(currentBalance = 181_000_000_000) {
    funds.currentBalance = currentBalance;
}

export function useFunds() {
    function purchaseItem(item: Item) {
        funds.currentBalance -= item.price;
    }

    function refundItem(item: Item) {
        funds.currentBalance += item.price;
    }

    return {
        funds,
        purchaseItem,
        refundItem,
    };
}
