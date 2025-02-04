const body = document.body;
const flashlight = document.getElementById("flashlight");
const lightToggle = document.getElementById("light-toggle");
const lightSwitch = document.getElementById("light-switch");
const headers = document.getElementsByTagName("header");
const main = document.getElementsByTagName("main")[0];
const leftColumn = document.querySelector(".left-column");
const display = document.querySelector(".display");

const style = getComputedStyle(document.body);
const color = style.getPropertyValue("--color");

flashlight.style.outline = `${body.offsetHeight*10}px solid black`;
flashlight.ondragstart = function () { return false; };

body.addEventListener("mousemove", (event) => {
    if (flashlight.style.visibility == "visible") {
        const X = event.clientX - flashlight.offsetWidth / 2
        const Y = event.clientY - flashlight.offsetHeight / 2;

        flashlight.style.transform = `translate(${X}px, ${Y}px)`;
    }
});

var mode = "light"
lightToggle.addEventListener("click", function (event) {
    var switchSFX = new Audio("assets/switch.wav");
    switchSFX.play();
    if (mode == "light") {
        flashlight.style.visibility = "visible";
        const X = event.clientX - flashlight.offsetWidth / 2
        const Y = event.clientY - flashlight.offsetHeight / 2;
        flashlight.style.transform = `translate(${X}px, ${Y}px)`;

        lightToggle.title = "Light Mode";
        lightSwitch.src = "assets/light-off.png";
        document.documentElement.style.setProperty("--color", "white");
        body.style.backgroundColor = "black";
        body.style.color = "white";
        headers[0].style.background = "black";
        headers[0].style.borderBottom = "2px dashed white";
        headers[1].style.borderBottom = "2px dashed white";
        main.style.backgroundColor = "black";
        leftColumn.style.border = "2px dashed white";
        display.style.border = "2px dashed white";
        mode = "dark";
    } else {
        flashlight.style.visibility = "hidden";
        lightToggle.title = "Dark Mode";
        lightSwitch.src = "assets/light-on.png";
        document.documentElement.style.setProperty("--color", "black");
        body.style.background = "white";
        body.style.color = "black";
        headers[0].style.backgroundColor = "white"
        headers[0].style.borderBottom = "2px dashed black";
        headers[1].style.borderBottom = "2px dashed black";
        main.style.backgroundColor = "white";
        leftColumn.style.border = "2px dashed black";
        display.style.border = "2px dashed black";
        mode = "light";
    }
});

const buttons = Array.from(document.getElementsByTagName("button"));
const projName = document.querySelector(".proj-name");
const projDesc = document.querySelector(".proj-desc");

const projects = {
    "sound-bending": [`sound-bending allows you to use your hand movements to record vocal loops and add effects 
                        into FL Studio in real-time with your webcam!
                        <br><br>
                        sound-bending uses MediaPipe for Python to track hand landmarks through the webcam 
                        video stream. It recognizes gestures the user is making with their hands (peace sign, 
                        fist, palm, etc.), and responds by sending signals to FL Studio. FL Studio allows for
                        MIDI scripting, which is why loopMIDI is required. loopMIDI creates the MIDI port to 
                        act as a connected MIDI controller. The Python program sends MIDI signals with the 
                        channel, note, and velocity values as vessels for data to manipulate the FL Studio
                        script, such as whether to record or add reverb/delay and how much.
                        <br><br>
                        This project was made in a few days after being inspired by revisiting Imogen Heap's 
                        Tiny Desk performance. I hope to expand on it soon after experimenting with it some 
                        more.
                        <br><br>
                        WATCH DEMO <a href="https://www.instagram.com/reel/DEJJdzZuyFT/?next=%2F" target="_blank">HERE</a>`,
                        "https://github.com/zackjwilk/sound-bending"],
    "spoti-tools": [`spoti-tools offers multiple features to help users automate tasks on Spotify
                        like adding local files (w/ metadata) and sequencing/organizing playlists.
                        <br><br>
                        <b>Functions</b><br><br>
                        * Local Files Automator *<br>
                        Spotify Local Files Automator is a Python script that takes user input of a song
                        title and artist name and/or link to the song on SoundCloud and rips the song from
                        SoundCloud, downloads it, adds metadata (title, artist, cover image), and places
                        it in the user's specified Spotify local files folder so they can listen to it on
                        Spotify (useful for unreleased songs or songs that are otherwise not typically 
                        available on Spotify).
                        <br><br>
                        * Playlist Sequencer *<br>
                        Spotify Playlist Sequencer is a Python script that takes user input of their Spotify
                        User ID and name of one of their playlists and creates a clone of said playlist in a
                        more comprehensible sequence. The tracks in the new playlist can be sequenced in
                        symmetrical (increasing until a maximum and then decreasing back down until the end
                        of the playlist), ascending, or descending order based on a selected audio feature
                        (energy, danceability, tempo, etc.).
                        <br><br>
                        * Subplaylist Maker / Playlist Filter *<br>
                        Spotify Subplaylist Maker is a Python script that takes a playlist link or user's
                        liked songs and creates a filtered clone based on audio feature factors decided by
                        the user (e.g. keeping songs that have high energy, high danceability, moderate
                        loudness, and are in C major).`, "https://github.com/zackjwilk/spoti-tools"],
    "music compass": [`Music Compass is a website that allows users to log in with Spotify and generate a
                        political compass meme style image using their top 10 artists on Spotify!
                        <br><br>
                        *NOT YET OPEN TO ALL USERS AS IT IS CURRENTLY STUCK IN "DEVELOPER MODE" AND PENDING 
                        SPOTIFY EXTENSION REQUEST. IF YOU WOULD LIKE TO TRY IT OUT, SEND ME AN EMAIL WITH
                        THE EMAIL ADDRESS LINKED TO YOUR SPOTIFY ACCOUNT SO I CAN MANUALLY ADD YOU.*`, "https://music-compass.glitch.me"],
    "I WILL MAKE MORE PROJECTS": ["I WILL I SWEAR!!!", ""]
}

buttons.forEach((button) => {
    if (button != lightToggle) {
        button.addEventListener("click", function () {
            projName.innerHTML = button.innerHTML;
            projName.href = projects[button.innerHTML][1];
            projDesc.innerHTML = projects[button.innerHTML][0];
            //button.style.color = color;
            button.style.fontWeight = "bold";
            buttons.forEach((button2) => {
                if (button2 != button) {
                    button2.style.color = "black";
                    button2.style.fontWeight = "normal";
                }
            })
        })
    }
})
