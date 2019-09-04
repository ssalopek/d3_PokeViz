//varijable u koje ću spremati parametre iz json-a, a pohranjene su u 'template' varijablu
//kreiranje funkcije i dodajem html format
var template = (pokemonName, pokemonImg, pokemonInfo, pokemonHeight, pokemonWeight,
    pokemonAbilities, pokemonType) =>
    `<div class="page-header">
<h1>
    ${pokemonName}
    <small>${pokemonInfo}</small>
</h1>
</div>

<div class="row">

<div class="col-md-6">
    <img class="avatar center-block" src="img/pokemons/${pokemonImg}.jpg">
</div>
<!-- Tabs -->
<div class="col-md-6" ng-controller="TabsController as tabs">
    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'Info')" id="defaultOpen">Info</button>
        <button class="tablinks" onclick="openTab(event, 'Stats')">Stats</button>
    </div>

    <div id="Info" class="tabcontent">
        <script>document.getElementById("defaultOpen").click();</script>
        <div id="data">
            <ul class="list-group">
                <li class="list-group-item">
                    <strong>Type</strong>
                    <span class="pull-right">
                            ${pokemonType}
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>Height</strong>
                    <span class="pull-right">
                        ${pokemonHeight}</span>
                </li>
                <li class="list-group-item">
                    <strong>Weight</strong>
                    <span class="pull-right">${pokemonWeight}</span>
                </li>
                <li class="list-group-item">
                    <strong>Abilities</strong>
                    <ul>
                        <li>
                            ${pokemonAbilities}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <div id="Stats" class="tabcontent">
        <div class="tab-content">
            <div class="barChart">
                <script>
                    barChart();
                </script>
            </div>
        </div>
    </div>

    <br>
</div>
</div>`

$(document).ready(() => {
    var pokemonPlaceholder = $('#pokemon_placeholder');
    $.get('pokemon.json', (d) => {
        var queryString = window.location.search.slice(1); //vrati querystring dio od url-a
        var params = queryString.split('?'); //razdvoji string u polje podstringova tj. nakon znaka '?' u url-u

        var id = '';
        params.forEach((val) => {
            if (val.startsWith('id')) { //prođi kroz to polje i dohvati podstring koji počinje sa 'id'
                var pair = val.split('=');//razdvoji taj podstring nakon znaka '=' kako bi izdvojio svaki ID pokemona

                id = pair[1]; //i taj ID pokemona pohrani u 'id' varijablu
            }
        });

        var pokemonData = d.find((val) => val.id === id); //pronađi gornji ID i pohrani u varijablu 'pokemonData'

        pokemonName = pokemonData.name; //čupanje različitih parametara iz json datoteke
        pokemonImg = pokemonData.name.toLowerCase(); //a ti se parametri sada razlikuju jer svaki dohvaća drugi ID
        pokemonInfo = pokemonData.species;
        pokemonHeight = pokemonData.height;
        pokemonWeight = pokemonData.weight;
        pokemonAbilities = pokemonData.abilities;
        pokemonType = pokemonData.type;

        var str = template(pokemonName, pokemonImg, pokemonInfo, pokemonHeight,
            pokemonWeight, pokemonAbilities, pokemonType); //kreiranje novog parametra samo da bi ga kasnije pozvati

        pokemonPlaceholder.append(str); //i sad taj parametar ubaci na mjesto u pokemon.html sa id-om #pokemon_placeholder
    });
});
