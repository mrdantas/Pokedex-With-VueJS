const MyApp = {
    data() {
        return {
            query: "",
            filtered: [],
            pokemons: [],
        }
    },
    mounted() {
        let limit = 151;
        let offset = 0;
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then((response) => response.json())
            .then((data) => data.results)
            .then(pokemons => {
                const list = [];
                pokemons.forEach(pokemon => {
                    const pokemonId = pokemon.url.replace(/\/$/, '').split('/').pop();
                    list.push({
                        id: pokemonId,
                        name: pokemon.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
                    });
                });
                this.pokemons = list;
            });
    },
    methods: {
        search() {
            this.filtered = this.pokemons.filter((el) => {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            });
        },
    },
}

Vue.createApp(MyApp).mount("#app")