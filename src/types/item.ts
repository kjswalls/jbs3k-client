import { Category } from '@/types/category'

export interface Item {
    id: number
    title: string
    description: string
    image: string
    largeImage: string
    price: number
    category: Category
    source: string
}

export default Item
