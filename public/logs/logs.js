const myMap = L.map("map").setView([0, 0], 1);
const attribution = `&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tile = L.tileLayer(tileUrl, {attribution});
tile.addTo(myMap);
const markers = [];

async function getData(){
    const get = await fetch("/api");
    const getRes = await get.json();
    console.log(getRes)

    for(item of getRes){
        const root = document.createElement("div");
        root.classList.add("root");
        const lat = document.createElement("div");
        lat.classList.add("item");
        const lng = document.createElement("div");
        lng.classList.add("item");
        const temp = document.createElement("div");
        temp.classList.add("item");
        const cond = document.createElement("div");
        cond.classList.add("item");
        cond.classList.add("condition");
        const time = document.createElement("div");
        time.classList.add("timestamp");

        lat.textContent = item.lat.toFixed(2) + "°";
        lng.textContent = item.lng.toFixed(2) + "°";
        cond.textContent = item.cond;
        temp.textContent = item.temp;
        const theDate = new Date(item.timestamp).toLocaleString();
        time.textContent = theDate;

        root.append(time, lat, lng, cond, temp);
        document.body.append(root)
        const mark = L.marker([item.lat, item.lng]).addTo(myMap);
        mark.bindPopup(`weather here at ${item.lat}, ${item.lng} is ${item.cond} with temps of ${item.temp}</br>${new Date(item.timestamp).toLocaleString()}`)
    }
}
getData();
console.log(markers)