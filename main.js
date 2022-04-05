const app = Vue.createApp ({
    data() {
        return {
            cart: null,
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            description: 'Description du produit',
            image: './assets/images/socks_green.jpg',
            inventory: 1,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: '#39A66F', image:'./assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: '#32455F', image:'./assets/images/socks_blue.jpg', quantity: 0 },
            ],
            activeClass: true
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            return this.brand + '' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        }
    }
})
