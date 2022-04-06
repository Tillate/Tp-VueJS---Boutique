app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" alt="">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of stock</p>
            <p v-if="onSale">On sale</p>
            <p v-else-if="inventory <=1 && inventory >0">Almost sold out</p>

            <p>Shipping: {{ shipping }}</p>

            <ul>
              <li v-for="detail in details">{{detail}}</li>
            </ul>
            
            <!-- Color picker -->
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :class="{ active: activeClass }"
              :style="{ backgroundColor: variant.color }">
            </div>

            <button 
              class="button" 
              :class="{ disabledButton: !inStock }" 
              :disabled="!inStock" 
              v-on:click="addToCart">
              Add to Cart
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
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
            activeClass: true,
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
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
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return '2.99€'

        }
    }
})