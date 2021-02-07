import { Product } from "./Product.js";

export const Products = {
    inject: ['getJson'],
    components: {
        Product
    },
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            })
    },
    template: `<div class="products">
                    <Product v-for="el of products" :key="el.id" :product="el"></Product>
                </div>`

}