function barChart() {

    d3.json("pokemon.json", function (data) {
        var queryString = window.location.search.slice(1); //vrati querystring dio od url-a
        var params = queryString.split('?'); //razdvoji string u polje podstringova tj. nakon znaka '?' u url-u

        var id = '';
        params.forEach((val, i, array) => {
            if (val.startsWith('id')) { //prođi kroz to polje i dohvati podstring koji počinje sa 'id'
                var pair = val.split('=');//razdvoji taj podstring nakon znaka '=' kako bi izdvojio svaki ID pokemona

                id = pair[1]; //i taj ID pokemona pohrani u 'id' varijablu
            }
        });

        var pokemonData = data.find((val) => val.id === id); //pronađi gornji ID i pohrani u varijablu 'pokemonData'
        var pokemonHp = pokemonData.stats.hp; //čupanje različitih parametara iz json datoteke
        var pokemonAttack = pokemonData.stats.attack;//a ti se parametri sada razlikuju jer svaki dohvaća drugi ID
        var pokemonDefense = pokemonData.stats.defense;
        var pokemonSpAtk = pokemonData.stats.spatk;
        var pokemonSpDef = pokemonData.stats.spdef;
        var pokemonSpeed = pokemonData.stats.speed;

        var margin = { top: 20, right: 20, bottom: 100, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5),
            y = d3.scale.linear().range([height, 0]);

        //SVG
        var svg = d3.select("svg")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + height.top + height.bottom)
            .append("g")
            .attr("transfrom", "translate(" + margin.left + "," + margin.top + ")");

        //kreiranje canvasa za svaki pojedini parametar koji čupam iz json datoteke
        var canvasHp = d3.select(".barChart").append("svg")
            .attr("width", 500)
            .attr("height", 40);

        var canvasAttack = d3.select(".barChart").append("svg")
            .attr("width", 500)
            .attr("height", 40);

        var canvasDefense = d3.select(".barChart").append("svg")
            .attr("width", 500)
            .attr("height", 40);

        var canvasSpAt = d3.select(".barChart").append("svg")
            .attr("width", 500)
            .attr("height", 40);

        var canvasSpDef = d3.select(".barChart").append("svg")
            .attr("width", 500)
            .attr("height", 40);

        var canvasSpeed = d3.select(".barChart").append("svg")
            .attr("width", 500)
            .attr("height", 40);

        //TOOLTIP
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("font-size", "1.25em")
            .attr("font-weight", "bold");

        //class toolTip2 definirana u css dijelu
        var tooltip2 = d3.select("body")
            .append("div")
            .attr("class", "toolTip2");

        //dohvaćanje prethodono definiranog canvasa i punjenje podacima
        canvasHp.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function (d) {
                return pokemonHp * 5; //za širinu vrati parametar 'pokemonHp' i pomnoži sa cijeli brojem da graf bude duži
            })
            .attr("height", 30)
            .attr("y", function (d, i) {
                return i * 50; //statična visina
            })
            .attr("fill", "#931621") //boja barchart-a
            .on("mousemove", function (d) { //dodaj tooltip na prijelaz mišom
                tooltip2
                    .style("left", d3.event.pageX - 50 + "px") //definiran statički položaj tooltipa
                    .style("top", d3.event.pageY - 70 + "px") //taman iznad kursora miša
                    .style("display", "inline-block")
                    .html("HP: " + (pokemonHp)); //info tooltipa je vrijednost istog parametra, samo numerički prikaz
            })
            .on("mouseout", function (d) { //makni tooltip
                tooltip2.style("display", "none");
            })

        //i tako za svaki pojedini graf
        canvasHp.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#ffffff")
            .attr("y", function (d, i) {
                return i * 50 + 20;
            })
            .attr("x", 5)
            .text(function (d) {
                return "HP: " + pokemonHp;
            })


        canvasAttack.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function (d) {
                return pokemonAttack * 5;
            })
            .attr("height", 30)
            .attr("y", function (d, i) {
                return i * 50;
            })
            .attr("fill", "#931621")
            .on("mousemove", function (d) {
                tooltip2
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("Attack: " + (pokemonAttack));
            })
            .on("mouseout", function (d) {
                tooltip2.style("display", "none");
            })

        canvasAttack.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#ffffff")
            .attr("y", function (d, i) {
                return i * 50 + 20;
            })
            .attr("x", 5)
            .text(function (d) {
                return "Attack: " + pokemonAttack;
            })

        canvasDefense.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function (d) {
                return pokemonDefense * 5;
            })
            .attr("height", 30)
            .attr("y", function (d, i) {
                return i * 50;
            })
            .attr("fill", "#931621")
            .on("mousemove", function (d) {
                tooltip2
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("Defense: " + (pokemonDefense));
            })
            .on("mouseout", function (d) {
                tooltip2.style("display", "none");
            })

        canvasDefense.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#ffffff")
            .attr("y", function (d, i) {
                return i * 50 + 20;
            })
            .attr("x", 5)
            .text(function (d) {
                return "Defense: " + pokemonDefense;
            })

        canvasSpAt.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function (d) {
                return pokemonSpAtk * 5;
            })
            .attr("height", 30)
            .attr("y", function (d, i) {
                return i * 50;
            })
            .attr("fill", "#931621")
            .on("mousemove", function (d) {
                tooltip2
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("Sp.Attack: " + (pokemonSpAtk));
            })
            .on("mouseout", function (d) {
                tooltip2.style("display", "none");
            })

        canvasSpAt.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#ffffff")
            .attr("y", function (d, i) {
                return i * 50 + 20;
            })
            .attr("x", 5)
            .text(function (d) {
                return "Sp. Attack: " + pokemonSpAtk;
            })

        canvasSpDef.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function (d) {
                return pokemonSpDef * 5;
            })
            .attr("height", 30)
            .attr("y", function (d, i) {
                return i * 50;
            })
            .attr("fill", "#931621")
            .on("mousemove", function (d) {
                tooltip2
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("Sp.Defense: " + (pokemonSpDef));
            })
            .on("mouseout", function (d) {
                tooltip2.style("display", "none");
            })

        canvasSpDef.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#ffffff")
            .attr("y", function (d, i) {
                return i * 50 + 20;
            })
            .attr("x", 5)
            .text(function (d) {
                return "Sp. Defense: " + pokemonSpDef;
            })

        canvasSpeed.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function (d) {
                return pokemonSpeed * 5;
            })
            .attr("height", 30)
            .attr("y", function (d, i) {
                return i * 50;
            })
            .attr("fill", "#931621")
            .on("mousemove", function (d) {
                tooltip2
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("Speed: " + (pokemonSpeed));
            })
            .on("mouseout", function (d) {
                tooltip2.style("display", "none");
            })

        canvasSpeed.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("fill", "#ffffff")
            .attr("y", function (d, i) {
                return i * 50 + 20;
            })
            .attr("x", 5)
            .text(function (d) {
                return "Speed: " + pokemonSpeed;
            })


    })




}