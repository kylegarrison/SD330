//Settings
let is24HourFormat = false;
let isCelsius = true;
let temperature = Math.floor(Math.random() * 30) + 1;
let timer;
let shoppingList = ["Milk", "Eggs", "Butter", "Cheese", "Vegetables"];
let musicPlayer;

//power 
document.getElementById("power-button").addEventListener("click", togglePower);

document.getElementById("clock").addEventListener("click", toggleTimeFormat);

function togglePower() {
    const mainContent = document.getElementById("main-content");
    
    mainContent.style.display = mainContent.style.display === "none" ? "block" : "none";



}

// Clock and time format
setInterval(updateClock, 1000);

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let period = hours >= 12 ? 'PM' : 'AM';

    if (!is24HourFormat && hours > 12) hours -= 12;
    if (!is24HourFormat && hours === 0) hours = 12;

    document.getElementById("clock").textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${is24HourFormat ? '' : ' ' + period}`;
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
}

// temp 
function toggleTemperatureFormat() {
    isCelsius = !isCelsius;
    
    updateTemperatureDisplay();
}

function increaseTemperature() {
    temperature++;
    updateTemperatureDisplay();
}

function decreaseTemperature() {
    temperature--;
    updateTemperatureDisplay();

}

function updateTemperatureDisplay() {
    const tempDisplay = isCelsius ? temperature : (temperature * 9/5) + 32;
    document.getElementById("content").innerHTML = `Current Temperature: ${tempDisplay.toFixed(1)} °${isCelsius ? 'C' : 'F'}`;

}

// Display nav
function showDisplay(display) {
    const title = document.getElementById("display-title");
    
    const content = document.getElementById("content");

    if (display === "temperature") {
        title.textContent = "Viewing Temperature - It is Sunny today";
        
        content.innerHTML = `
            <h3>Inside: ${temperature}°${isCelsius ? 'C' : 'F'}</h3>
            <button onclick="increaseTemperature()">Increase Temp</button>
            <button onclick="decreaseTemperature()">Decrease Temp</button>
            <button onclick="toggleTemperatureFormat()">Toggle F/C</button>`;
    } else if (display === "shelf-view") {
        title.textContent = "Viewing Shelf";
        content.innerHTML = `<img src="shelf.jpg" alt="Fridge Shelf">`;
    } else if (display === "netflix") {
       
        title.textContent = "Viewing Netflix";
        content.innerHTML = `<audio src="tv-static.mp3" autoplay></audio><p>Playing TV...</p>`;
    
    } else if (display === "browser") {
        title.textContent = "Using Browser";
        content.innerHTML = `<p>Browsing the web...</p>`;
        content.innerHTML = `<img src="google.jpg" alt="Google">`;
    
    
    } else if (display === "settings") {
        title.textContent = "Viewing Settings";
        content.innerHTML = "<h3>[Settings options]</h3>";
    } else if (display === "shopping") {
        displayShoppingList();
    }
}

// Timer and alarm
function startTimer(duration) {
    clearInterval(timer);
    
    let timeRemaining = duration;
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            playAlarm();
        }
        
       
        timeRemaining--;
    }, 1000);

}

function playAlarm() {
    let alarmSound = new Audio('alarm.mp3');
    alarmSound.play();
}

// Shopping list
function displayShoppingList() {
    const content = document.getElementById("content");
    
    content.innerHTML = `
        <h3>Shopping List</h3>
        <ul id="shopping-list">${shoppingList.map(item => `<li>${item}</li>`).join('')}</ul>
        <input type="text" id="new-item" placeholder="Add item">
        <button onclick="addItem()">Add</button>`;
}

function addItem() {
    const newItemInput = document.getElementById("new-item");
    const newItem = newItemInput.value.trim();
    if (newItem) {
        shoppingList.push(newItem);
        newItemInput.value = "";
        displayShoppingList();
    }
}

// music
function toggleMusicPlayer() {
    if (!musicPlayer) {
       
        musicPlayer = new Audio('song.mp3');
        musicPlayer.loop = true;
        musicPlayer.play();
    } else if (musicPlayer.paused) {
        musicPlayer.play();
    } else {
        musicPlayer.pause();
   
   
   
    }






}
