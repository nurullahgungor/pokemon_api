const exp = require("constants");
const express = require("express");
const https = require("https");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3030, function () {
  console.log("Server is started at port 3030");
});

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res) =>{
  let id = Number(req.body.pokemon);
  let url = "https://pokeapi.co/api/v2/pokemon/"+ id ;
  var pokemonImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ id +".png";
  
  https.get(url, (response)=>{
    
    var responseData = "";
    
    response.on("data", (dataChunk) =>{
      responseData += dataChunk;
    }).then();

    response.on("end", () =>{
      var pokeInfo = JSON.parse(responseData);
      var pokemonName = pokeInfo.name;
      var pokeType = pokeInfo.types[0].type.name;

      res.write("<h1> Name of the pokemon, you searched is " + pokemonName + "</h1>");
      res.write("<img src ='"+ pokemonImg + "'>");
      res.write("<h5> Main type of pokemon" + pokeType + "</h5>")
      res.write("test for git learning")
      res.send()
    })
  });
})