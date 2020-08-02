import { Item } from '@/types/item';

export interface Cart {
    [key: string]: Item[];
}

export default Cart;
