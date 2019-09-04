function scatter() {
    //margine
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 900 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    //SVG
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X PARAMETAR
    var xValue = function (d) { return d.pp; }; //vrati parametar iz csv datoteke i pohrani je u varijablu   

    // Y PARAMETAR
    var yValue = function (d) { return d.power; }; //na isti način vrati i drugi parametar

    var symbols = d3.scaleOrdinal(d3.symbols); //pohrani d3 simbole
    var symbol = d3.symbol().size(105); //tu ih generiraj i postavi veličinu

    //učitavanje datoteke
    d3.csv("pokemon.csv", function (data) {

        // X - os
        var x = d3.scaleLinear()
            .domain([0, 40]) //postavljanje niza vrijednosti x osi
            .range([0, width]); //postavi dužinu
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Y - os
        var y = d3.scaleLinear()
            .domain([0, 250]) //postavljenje niza vrijednosi y osi, veča dužina zbog veličine parametara
            .range([height, 0]); //postavi visinu
        svg.append("g")
            .call(d3.axisLeft(y));

        // TEXT za x os
        svg.append('text') //ubaci tekst na poziciju i daj joj label 
            .attr('x', 10)
            .attr('y', 10)
            .attr('class', 'label')
            .text('Power');

        // TEXT za y os
        svg.append('text')
            .attr('x', width)
            .attr('y', height - 10)
            .attr('text-anchor', 'end')
            .attr('class', 'label')
            .text('Power Points');

        // postavljanje varijable za pohranu boje 
        var cValue = function (d) { return d.type; },
            color = d3.scale.category10(); //trebat će drugačije boje, za različite točake, za lakšu vizualizaciju

        // TOOLTIP
        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // logika tooltipa ista kao i za barchart-ove (vidi barChart.js)
        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("font-size", "1.25em")
            .style("display", "none")
            .attr("font-weight", "bold");

        var tooltip2 = d3.select("body").append("div").attr("class", "toolTip2");

        //dohvati definirane simbole
        svg.selectAll(".symbol")
            .data(data)
            .enter()
            .append("path")
            .attr("class", "symbol")
            .attr("d", function (d, i) { return symbol.type(symbols(d.type))(); }) //za svaki 'type' postavi drugi simbol
            .style("fill", function (d) { return color(d.type); }) //za svaki 'type' postavi simbol druge boje
            .attr("transform", function (d) {
                return "translate(" + x(d.pp) + "," + y(d.power) + ")";
            });

        //LEGENDA
        var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; }); //definiraj razmak između legendi

        //dodaj definirane simbole u legendu
        legend.append("path")
            .style("fill", function (d) { return color(d); })
            .attr("d", function (d, i) { return symbol.type(symbols(d))(); })
            .attr("transform", function (d, i) {
                return "translate(" + (width - 10) + "," + 10 + ")"; //na ovu poziciju
            })

        //dodaj tekst uz simbol na legendu
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });

        //TOČE U PLOT-u
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle") //točke su zapravo circle
            .attr("r", 4) //ali je radijus namjerno manji od simbola pa se vidi samo oblik simbola
            .attr("cx", function (d) { return x(d.pp); }) //za x os mi vrati parametar 'pp'
            .attr("cy", function (d) { return y(d.power); }) //za x os mi vrati parametar 'power'
            .style("fill", function (d) { return color(cValue(d)); }) //postavi točke da budu one boje koje je i simbol
                                                    //da ne bi imao crnu točku usred simbola

            //prikaži tooltip na prijelaz mišom
            //logika slična kao kod barchart-ova (vidi barChart.js)
            .on("mouseover", function (d) {
                tooltip2.transition()
                    .duration(150)
                    .style("opacity", 1);
                tooltip2.html("<b>" + d.type + "</b>" + "<br/>" + d.name + "<br/> (Power Points: " + xValue(d)
                    + ", Power: " + yValue(d) + ")") //prikaži TIP-IME-PPvrijednost-POWERvrijednost
                    .style("display", "inline-block")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip2.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}