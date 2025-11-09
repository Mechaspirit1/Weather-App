const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const pname = document.querySelector("#name");
const sname = document.querySelector("#subname");
const div = document.querySelector("#info");

async function getWeather(){
    //usa a api openstreet para conseguir a latitude e longitude necessarias para a api open meteo
    try{
        //recebe o valor do input
        const loc = await fetch(`https://nominatim.openstreetmap.org/search?q=${input.value.trim()}&format=json`); 
        const locParsed = await loc.json();
        console.log(locParsed)

        for(let i=0; i<locParsed.length; i++){
            //recebe o valor da latitude e longitude
            let myLat = parseFloat(locParsed[i].lat).toFixed(2);
            let myLon = parseFloat(locParsed[i].lon).toFixed(2);

            try{
                //usa lat e lon pra puxar informações referentes a geolocalização
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${myLat}&longitude=${myLon}&timezone=auto&current=temperature_2m&current=precipitation_probability&current=cloud_cover`);
                const parsed = await res.json()

                //informações de clima
                const currTime = parsed.current.time;
                const currTemp = parsed.current.temperature_2m;
                const currProb = parsed.current.precipitation_probability;
                const currSky = parsed.current.cloud_cover;
                const timezone = parsed.timezone_abbreviation;

                console.log(parsed);

                //Gera uma lista com todas as intancias de cidades e locais com o mesmo nome atraves do mundo
                const place = locParsed[i].name;
                const placeDetail = locParsed[i].display_name;
                const genInfor = `${currTime}, ${timezone}, ${currTemp}°C, ${currProb}% Chance of rain, ${currSky}% Cloud Coverage`;

                const location = document.createElement("h1");
                const locationDetail = document.createElement("h2");
                const locInfor = document.createElement("h3");

                const locText = document.createTextNode(place);
                const locDetText = document.createTextNode(placeDetail);
                const locInforText = document.createTextNode(genInfor);

                locInfor.appendChild(locInforText);
                location.appendChild(locText);
                locationDetail.appendChild(locDetText);

                div.appendChild(location);
                div.appendChild(locationDetail);
                div.appendChild(locInfor)
            }
            catch(err){
                console.log(err);
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

//chama a função quando o botão é clicado
btn.addEventListener("click", (e) =>{
    div.innerHTML="";
    e.preventDefault();
    getWeather();
})