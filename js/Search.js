import { SearchItem } from "./SearchItem.js";

export const Search = {
    components: {
        SearchItem
    },
    data() {
        return {
            filtered: [],
            liveSearch: '',
            isVisibleSearch: false,
        }
    },
    methods: {
        filterGoods() {
            if (this.liveSearch.trim()) {
                const regexp = new RegExp(this.liveSearch.trim(), 'i');
                this.filtered = this.$root.$refs['catalog'].products.filter(product => regexp.test(product.title));
                this.filtered = this.filtered.slice(0, 5);
                this.isVisibleSearch = true;
                return this.filtered;
            }
            else this.isVisibleSearch = false;
        }
    },
    mounted() {
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
        })
    },
    template: `<form action = "#" class="search-form" >
                    <input type="text" class="search-field" v-model="this.liveSearch" @input="this.filterGoods()" @blur="this.isVisibleSearch = false" >
                    <button class="btn-search" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 413.842 413.842" xml:space="preserve">
                            <path d="M401.395,341.29l-69.568-69.568c-4.731-4.732-12.402-4.732-17.134,0l-7.343,7.343l-28.907-28.908
                            c20.261-26.247,32.335-59.122,32.335-94.769C310.777,69.707,241.07,0,155.389,0C69.707,0,0,69.707,0,155.388
                            c0,85.682,69.707,155.389,155.389,155.389c35.646,0,68.521-12.073,94.769-32.335l28.907,28.908l-7.343,7.343
                            c-4.731,4.731-4.731,12.402,0,17.134l69.569,69.568c16.597,16.597,43.507,16.597,60.104,0
                            C417.992,384.797,417.992,357.887,401.395,341.29z M155.389,79.34c-41.934,0-76.049,34.115-76.049,76.049c0,11.046-8.954,20-20,20
                            s-20-8.954-20-20C39.339,91.4,91.399,39.34,155.389,39.34c11.046,0,20,8.954,20,20S166.435,79.34,155.389,79.34z" />
                        </svg>
                    </button >
                    <div class="search-items-wrap" v-show="this.isVisibleSearch">
                        <div class="search-item-yes" v-show="filtered.length">
                            <SearchItem v-for="el of filtered" :key="filtered.id" :product="el"></SearchItem>
                        </div>
                        <p class="search-item-no" v-show="!this.filtered.length">Нет товаров</p>
                    </div >
                </form >`
}


