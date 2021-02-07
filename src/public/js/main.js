import { Errors } from './Errors.js';
import { Products } from './Products.js';
import { Cart } from './Cart.js';
import { Search } from './Search.js';

export const Shop = {
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
    provide() {
        return {
            getJson: this.getJson,
            postJson: this.postJson,
            putJson: this.putJson,
            delJson: this.delJson,
        }
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
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.errorServer = true
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.errorServer = true
                });
        },
        delJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.errorServer = true
                });
        }
    }
};
