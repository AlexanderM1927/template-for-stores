interface IProductCart extends IProduct {
    quantity: number,
    selectedVariants?: {
        color?: Object,
        size?: Object
    }
}