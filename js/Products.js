import { Product } from "./Product.js";

export const Products = {
    components: {
        Product
    },
    data() {
        return {
            catalogUrl: 'js/getProducts.json',
            products: []
        }
    },
    mounted() {
        this.$root.getJson(this.catalogUrl)
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