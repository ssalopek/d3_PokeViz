//definirani html format za prikaz po jednog slot-a za svakog pokemona
var pokemon = '<div class="row">' +
          '<div class="col-lg-3">' +
            '<div class="pokemon panel panel-primary">' +
              '<div class="panel-heading">' +
                '<h1>' +
                  '__placeholderName__' + " " +
                  '<small>__placeholderInfo__</small>' +
                '</h1>' +
              '</div>' +
              '<div class="panel-body">' +
                  '<img class="avatar center-block" src="img/pokemons/__placeholderImg__.jpg">' +
              '</div>' +

            '</div>' +
          '</div>' +
        '</div>'

$(document).ready(function() {
	$.get("pokemon.json", function(data) {
    var totalPokemon = data.length //vrati dužinu datoteke da bi kasnije u petlji ispisao sve pokemone iz datotke(json)
		for (var i = 0; i < totalPokemon; i++) {
			$("#lista-pokemon").append( //na zato definirano mjesto u index.html ubaci varijablu 'pokemon' koja je html format
				pokemon
		.replace('__placeholderName__', data[i].name) //i zamijeni placeholder stringove sa stvarnim podacima iz json datoteke
        .replace('__placeholderImg__', data[i].name.toLowerCase()) //toLowerCase jer su svi nazivi slika malim slovima
        .replace('__placeholderInfo__', data[i].species)
			)			
    }
  
	})
})








