const latPad = document.getElementById("lat");
const lngPad = document.getElementById("lng");
const tempPad = document.getElementById("temp");
const condition = document.getElementById("disc");
const checkBtn = document.getElementById("btn-check");


checkBtn.addEventListener("click", ()=>{
    latPad.textContent = "loading";
    lngPad.textContent = "loading";
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition( async pos =>{
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const fixedLat = lat.toFixed(4);
            const fixedLng = lng.toFixed(4);
            latPad.textContent = lat + "°";
            lngPad.textContent = lng + "°";
            
            console.log("location spotted!")
            
            // const theURL = `weather/${fixedLat},${fixedLng}`;
            const theURL = `/weather/${fixedLat},${fixedLng}`;
            const get = await fetch(theURL);
            const getRes = await get.json();
            console.log(getRes);
            const temp = await getRes.current.temp_c;
            const cond = await getRes.current.condition.text;
            tempPad.textContent =  "_ " + temp + "C";
            condition.textContent =  "_ " + cond;
            // const weather = await getWeather("current.json", `q=${fixedLat + "," + fixedLng}`);
            // console.log(weather.getRes.current.temp_c)
            postData(lat, lng, temp, cond);
        })
    } else { console.log("geolocation not found") }
})
async function postData(lat, lng, temp, cond){
    const timestamp = Date.now();
    const data = {lat, lng, temp, cond, timestamp};
            const options = {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data),
            };
            const post = await fetch("/postedData", options)
            const postRes = await post.json();
            console.log(postRes);
}
    

// async function getWeather(req, reqP){
//     const api_url = "https://api.weatherapi.com/v1/";
//     const key = "key=b62c673860f34235854160940240907"
//     const get = await fetch(api_url + req + "?" + key + "&" + reqP);
//     const getRes = await get.json();
//     console.log(getRes);
//     return {getRes}
// }
