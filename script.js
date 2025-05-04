const body = document.body;
const nameButton = document.getElementById("nameButton");
const projectsButton = document.getElementById("projectsButton");
const aboutButton = document.getElementById("aboutButton");
const dropdownButtons = document.querySelectorAll(".dropdownButton");
const leftContainer = document.querySelector(".leftContainer");
const leftText = document.getElementById("leftText");
const contact = document.querySelector(".contact");
const flashlight = document.getElementById("flashlight");
const lightToggle = document.getElementById("lightToggle");
const lightSwitch = document.getElementById("lightSwitch");

const projects = [
    { name: "sound-bending", description: `sound-bending allows you to use your hand movements to record vocal loops and add effects 
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
                    link: "https://github.com/zackjwilk/sound-bending" },
    { name: "spoti-tools", description: `spoti-tools offers multiple features to help users automate tasks on Spotify
                        like adding local files (w/ metadata) and sequencing/organizing playlists.
                        <br><br>
                        ** Functions **<br><br>
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
                        loudness, and are in C major).`,
                    link: "https://github.com/zackjwilk/spoti-tools" }
];

// create project buttons container at beginning of leftContainer
const projectButtonsContainer = document.createElement("div");
projectButtonsContainer.id = "projectButtonsContainer";
projectButtonsContainer.style.display = "none";
leftContainer.insertBefore(projectButtonsContainer, leftContainer.firstChild);

// create buttons for each project
projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.className = "projectButton";
    button.textContent = project.name;
    button.addEventListener("click", () => showProjectDetails(index));
    projectButtonsContainer.appendChild(button);
});

// create project details container
const projectDetailsContainer = document.createElement("div");
projectDetailsContainer.id = "projectDetailsContainer";
projectDetailsContainer.style.display = "none";
leftContainer.appendChild(projectDetailsContainer);

function showProjectDetails(index) {
    projectDetailsContainer.style.display = "block";
    projectDetailsContainer.innerHTML = `
        <a href=${projects[index].link} target="_blank">${projects[index].name}</a>
        <p>${projects[index].description}</p>
        <button id="backButton">←</button>
    `;
    
    projectButtonsContainer.style.display = "none";

    document.getElementById("backButton").addEventListener("click", () => {
        projectDetailsContainer.style.display = "none";
        projectButtonsContainer.style.display = "block";
    });
}

// dropdown
function toggleDropdown(opening) {
    if (opening) {
        nameButton.innerHTML = "_ zack wilkinson";
        return;
    };
    nameButton.innerHTML = "▼ zack wilkinson";
    leftContainer.style.visibility = "hidden";
    leftText.style.visibility = "hidden";
    contact.style.visibility = "hidden";
    projectButtonsContainer.style.display = "none";
    projectDetailsContainer.style.display = "none";
    projectsButton.style.textDecoration = "";
    aboutButton.style.textDecoration = "";
};

nameButton.addEventListener("click", function (event) {
    dropdownButtons.forEach(button => {
        button.style.visibility = button.style.visibility === "visible" ? "hidden" : "visible";
    });
    nameButton.innerHTML[0] === "▼" ? toggleDropdown(true) : toggleDropdown(false);
});

aboutButton.addEventListener("click", function (event) {
    leftContainer.style.visibility = "visible";
    leftText.style.visibility = "visible";
    contact.style.visibility = "visible";
    projectButtonsContainer.style.display = "none";
    projectDetailsContainer.style.display = "none";
    aboutButton.style.textDecoration = "1.5px underline dashed rgb(230, 100, 20)";
    projectsButton.style.textDecoration = "";
    leftText.innerHTML = `Hi! I'm Zack Wilkinson, an undergraduate student studying Computer Science
     at Stevens Institute of Technology. I'm interested in gaining experience through internship 
     opportunities—primarily pertaining to software development, but I'm open to exploring any 
     opportunities that will broaden my knowledge and better familiarize me with real-world work 
     environments in the CS field.`;
});

projectsButton.addEventListener("click", function (event) {
    leftContainer.style.visibility = "visible";
    leftText.style.visibility = "hidden";
    contact.style.visibility = "hidden";
    projectButtonsContainer.style.display = "block";
    projectDetailsContainer.style.display = "none";
    projectsButton.style.textDecoration = "1.5px underline dashed rgb(230, 100, 20)";
    aboutButton.style.textDecoration = "";
    
    leftContainer.scrollTop = 0;
});

// flashlight
flashlight.ondragstart = function () { return false; };

body.addEventListener("mousemove", (event) => {
    if (flashlight.style.visibility == "visible") {
        flashlight.style.left = `${event.clientX}px`;
        flashlight.style.top = `${event.clientY}px`;

        flashlight.style.transform = "translate(-50%, -50%)";
    }
});

var mode = "light"
lightToggle.addEventListener("click", function (event) {
    var switchSFX = new Audio("assets/switch.wav");
    switchSFX.play();
    if (mode == "light") {
        flashlight.style.visibility = "visible";
        flashlight.style.left = `${event.clientX}px`;
        flashlight.style.top = `${event.clientY}px`;
        flashlight.style.transform = "translate(-50%, -50%)";

        lightToggle.title = "Light Mode";
        lightSwitch.src = "assets/light-off.png";
        
        mode = "dark";
    } else {
        flashlight.style.visibility = "hidden";
        lightToggle.title = "Dark Mode";
        lightSwitch.src = "assets/light-on.png";
        
        mode = "light";
    }
});
