//varijabla za pohranu podataka iz json-a i kreiranje funkcije
//dodaj html format
var pokemon = (pokemonId, pokemonName, pokemonInfo, pokemonImg) => 
`<div class="line">
<div class="col-lg-3">
    <div class="pokemon panel panel-primary">
        <div class="panel-heading">
            <h1>
                ${pokemonName}
                <small>${pokemonInfo}</small>
            </h1>
        </div>

        <div class="panel-body">
            <a href="/pokemon.html?id=${pokemonId}">
                <img class="avatar center-block" src="img/pokemons/${pokemonImg}.jpg">
            </a>
        </div>
    </div>
</div>
</div>`

$(document).ready(function() {
	$.get("pokemon.json", function(data) { //dohvati json datoteku
    var totalPokemon = data.length //vrati dužinu datoteke
		for (var i = 0; i < totalPokemon; i++) { //prođi kroz cijelu datoteku i na mjesto u index.html sa id-om #lista-pokemon
            $("#lista-pokemon") //ubaci prethodno definirane varijable
            .append(pokemon(data[i].id, data[i].name, data[i].species, data[i].name.toLowerCase()));
    }
	})
})
