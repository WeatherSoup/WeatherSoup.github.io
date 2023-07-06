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

let reset_all=document.getElementById("reset-all");
reset_all.addEventListener("click", () => {

});

// geolocation
let ip_field=document.getElementById("ip-field");
let ip_submit=document.getElementById("ip-submit");
ip_submit.addEventListener("click", () => {
    const city = async () => {
        const response=await fetch(`https://ipinfo.io/${ip_field.value}?token=544c38631aa337`);
        const data=await response.json();
        document.getElementById("city-name").innerHTML=data.city+", "+data.region;
        console.log(data);
    }
    city();
});