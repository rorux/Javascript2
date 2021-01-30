import { Errors } from './Errors.js';
import { Products } from './Products.js';
import { Cart } from './Cart.js';
import { Search } from './Search.js';

const Shop = {
    data() {
        return {
            errorServer: false
        }
    },
    components: {
        Errors,
        Products,
        Cart,
        Search
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.errorServer = true
                });
        },
    }
};

Vue.createApp(Shop).mount('#app');
