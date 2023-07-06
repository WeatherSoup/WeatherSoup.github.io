// settings

let text=[
    document.getElementById("city-name")
];
function setTextStyleMono() {
    text.forEach(elem => {
        elem.style.fontFamily="MNN";
    });
}
function setTextStyleRegular() {
    text.forEach(elem => {
        elem.style.fontFamily="Inter";
    });
}

let shown=false;
let arrow=document.getElementById("arrow");
let settings_panel=document.getElementById("settings-panel");
arrow.addEventListener("click", () => {
    if (shown) {
        settings_panel.style.transform="translateX(calc(100% - 45px))";
        shown=false;
        arrow.style.transform="rotate(0deg)";
    } else if (!shown) {
        settings_panel.style.transform="translateX(0px)";
        shown=true;
        arrow.style.transform="rotate(180deg)";
    }
});
let bg1=document.getElementById("bg-color-one");
let bg2=document.getElementById("bg-color-two");

let bgs=document.getElementsByClassName("bg-changer");

bg1.oninput=e=> {
    document.body.style.backgroundImage=`linear-gradient(135deg, ${bg1.value}, ${bg2.value})`;
}
bg2.oninput=e=> {
    document.body.style.backgroundImage=`linear-gradient(135deg, ${bg1.value}, ${bg2.value})`;
}
let bg_reset=document.getElementById("bg-reset");
bg_reset.addEventListener("click", () => {
    bg1.value="#8E2DE2";
    bg2.value="#4A00E0";
    document.body.style.backgroundImage="linear-gradient(135deg, #8E2DE2, #4A00E0)";
});


let lat;
let lon;

function geo_success(pos) {
    lat=pos.coords.latitude;
    lon=pos.coords.longitude;
}
function geo_error(err) {
    if (err.code===1) {
        alert("Please allow access to geolcation.");
    } else {
        alert("Could not fetch geolocation.");
    }
}
if (!navigator.geolocation) {
    throw new Error("Could not access geolocation feature.");
}
window.navigator.geolocation.getCurrentPosition(geo_success, geo_error, {enableHighAccuracy: true});

const getWeatherInfo = async(latitude, longitude) => {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f7ac2029e93c0d81cc9a1f46f2980ab9&units=imperial`);
    const data=await response.json();
    console.log(latitude +" "+ longitude);
    document.getElementById("city-name").innerText=data.name;
    console.log(data);
}

document.getElementById("get-geo").addEventListener("click", () => {
    window.navigator.geolocation.getCurrentPosition(geo_success, geo_error, {enableHighAccuracy: true});
    getWeatherInfo(lat, lon);
});