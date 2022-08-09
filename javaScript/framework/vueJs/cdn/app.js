const app = Vue.createApp({
    data(){
        return {
            books: [
                {
                    title: "New Kid",
                    author: "Jerry Craft",
                    img: "assets/1.jpeg",
                    isFav: true
                },
                {
                    title: "Famous Book",
                    author: "Jean Akoto",
                    img: "assets/2.jpeg",
                    isFav: false,
                },
                {
                    title: "Wings of Fire",
                    author: "Suntherdland",
                    img: "assets/3.jpeg",
                    isFav: true
                },
            ]
        }
    },
    methods:{
        toggleFav(book){
            book.isFav = !book.isFav
        },

        handle(e, nom){
            console.log(e)
            console.log(nom)
        }
    },
    computed: {
        filterFavBooks(){
            return this.books.filter(b => b.isFav)
        }
    }
})

app.mount("#app")