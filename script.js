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

/*
const bdayCountdown = document.querySelector(".bday-countdown")

var x = setInterval(function () {
    var now = new Date();
    var month = now.getUTCMonth();
    var day = now.getUTCDate();
    var year = now.getUTCFullYear();
    if (month == 4 && day == 6) {
        bdayCountdown.innerHTML = "it my birthday!!!";
    } else {
        if (month > 5 || (month == 5 && day > 6)) {
            year++;
        }

        var birthday = new Date(year, 4, 6)
        var distance = birthday.getTime() - now.getTime();

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        bdayCountdown.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }
}, 1000);
*/

const buttons = Array.from(document.getElementsByTagName("button"));
const projName = document.querySelector(".proj-name");
const projDesc = document.querySelector(".proj-desc");

const projects = {
    "spoti-tools": [`spoti-tools offers multiple features to help user automate tasks on Spotify
                        like adding local files (w/ metadata) and sequencing/organizing playlists.
                        <br><br>
                        <b>Functions</b><br><br>
                        * Local Files Automator *<br>
                        Spotify Local Files Automator is a Python script that takes user input of a song
                        title and artist name and/or link to song on SoundCloud and rips the song from
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
