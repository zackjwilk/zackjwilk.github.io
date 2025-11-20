const body = document.body;
const flashlight = document.getElementById("flashlight");
const lightToggle = document.getElementById("lightToggle");
const lightSwitch = document.getElementById("lightSwitch");
const asciiElement = document.getElementById("ascii");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// ascii art data
const artZack = `
          _____                    _____                    _____                    _____          
         /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\         
        /::\\    \\                /::\\    \\                /::\\    \\                /::\\____\\        
        \\:::\\    \\              /::::\\    \\              /::::\\    \\              /:::/    /        
         \\:::\\    \\            /::::::\\    \\            /::::::\\    \\            /:::/    /         
          \\:::\\    \\          /:::/\\:::\\    \\          /:::/\\:::\\    \\          /:::/    /          
           \\:::\\    \\        /:::/__\\:::\\    \\        /:::/  \\:::\\    \\        /:::/____/           
            \\:::\\    \\      /::::\\   \\:::\\    \\      /:::/    \\:::\\    \\      /::::\\    \\           
             \\:::\\    \\    /::::::\\   \\:::\\    \\    /:::/    / \\:::\\    \\    /::::::\\____\\________  
              \\:::\\    \\  /:::/\\:::\\   \\:::\\    \\  /:::/    /   \\:::\\    \\  /:::/\\:::::::::::\\    \\ 
_______________\\:::\\____\\/:::/  \\:::\\   \\:::\\____\\/:::/____/     \\:::\\____\\/:::/  |:::::::::::\\____\\
\\::::::::::::::::::/    /\\::/    \\:::\\  /:::/    /\\:::\\    \\      \\::/    /\\::/   |::|~~~|~~~~~     
 \\::::::::::::::::/____/  \\/____/ \\:::\\/:::/    /  \\:::\\    \\      \\/____/  \\/____|::|   |          
  \\:::\\~~~~\\~~~~~~                 \\::::::/    /    \\:::\\    \\                    |::|   |          
   \\:::\\    \\                       \\::::/    /      \\:::\\    \\                   |::|   |          
    \\:::\\    \\                      /:::/    /        \\:::\\    \\                  |::|   |          
     \\:::\\    \\                    /:::/    /          \\:::\\    \\                 |::|   |          
      \\:::\\    \\                  /:::/    /            \\:::\\    \\                |::|   |          
       \\:::\\____\\                /:::/    /              \\:::\\____\\               \\::|   |          
        \\::/    /                \\::/    /                \\::/    /                \\:|   |          
         \\/____/                  \\/____/                  \\/____/                  \\|___|          `;

const artProjects = `
 ____ ______ _____   ___ _____ _____ _____ _____ 
| ___ \\ ___ \\  _  | |_  |  ___/  __ \\_   _/  ___|
| |_/ / |_/ / | | |   | | |__ | /  \\/ | | \\ \`--. 
|  __/|    /| | | |   | |  __|| |     | |  \`--. \\
| |   | |\\ \\\\ \\_/ /\\__/ / |___| \\__/\\ | | /\\__/ /
\\_|   \\_| \\_|\\___/\\____/\\____/ \\____/ \\_/ \\____/ 
`;

const artAbout = `
  ___  ______  _____ _   _ _____ 
 / _ \\ | ___ \\|  _  | | | |_   _|
/ /_\\ \\| |_/ /| | | | | | | | |  
|  _  || ___ \\| | | | | | | | |  
| | | || |_/ /\\ \\_/ / |_| | | |  
\\_| |_/\\____/  \\___/ \\___/  \\_/  
`;

// carousel config
const sections = [
    { name: 'home', art: artZack },
    { name: 'about', art: artAbout },
    { name: 'projects', art: artProjects }
];

let currentIndex = 0;

// navigation logic
function updateUI() {
    const currentSection = sections[currentIndex];
    
    // update ascii
    asciiElement.textContent = currentSection.art;

    // manage content sections
    // hide all sections
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.remove('active-section');
    });

    // show current section
    const activeContent = document.getElementById(`section-${currentSection.name}`);
    if (activeContent) {
        activeContent.classList.add('active-section');
    }
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? sections.length - 1 : currentIndex - 1;
    updateUI();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === sections.length - 1) ? 0 : currentIndex + 1;
    updateUI();
});

// project data
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

// project rendering
const projectBtnContainer = document.getElementById("projectBtnContainer");
const projectDetailsContainer = document.getElementById("projectDetailsContainer");

// generate buttons
projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.className = "projectBtn";
    button.textContent = `> ${project.name}`;
    button.addEventListener("click", () => showProjectDetails(index));
    projectBtnContainer.appendChild(button);
});

function showProjectDetails(index) {
    projectBtnContainer.style.display = "none";
    projectDetailsContainer.style.display = "block";
    
    projectDetailsContainer.innerHTML = `
        <h3><a href=${projects[index].link} target="_blank">${projects[index].name}</a></h3>
        <br>
        <p>${projects[index].description}</p>
        <br>
        <button id="backBtn">←</button>
    `;

    document.getElementById("backBtn").addEventListener("click", () => {
        projectDetailsContainer.style.display = "none";
        projectDetailsContainer.innerHTML = ''; // clear content
        projectBtnContainer.style.display = "flex";
    });
}

// flashlight logic
flashlight.ondragstart = function () { return false; };

body.addEventListener("mousemove", (event) => {
    if (flashlight.style.visibility == "visible") {
        flashlight.style.left = `${event.clientX}px`;
        flashlight.style.top = `${event.clientY}px`;
        flashlight.style.transform = "translate(-50%, -50%)";
    }
});

var mode = "light";
lightToggle.addEventListener("click", function (event) {
    var switchSFX = new Audio("assets/switch.wav");
    switchSFX.play();
    
    if (mode == "light") {
        // dark mode on
        flashlight.style.visibility = "visible";
        flashlight.style.left = `${event.clientX}px`;
        flashlight.style.top = `${event.clientY}px`;
        flashlight.style.transform = "translate(-50%, -50%)";

        body.style.backgroundColor = "#111";
        body.style.color = "white";
        asciiElement.style.color = "white";
        
        lightToggle.title = "Light Mode";
        lightSwitch.src = "assets/light-off.png";
        
        mode = "dark";
    } else {
        // light mode on
        flashlight.style.visibility = "hidden";
        
        body.style.backgroundColor = "rgb(160, 180, 150)";
        body.style.color = "black";
        asciiElement.style.color = "rgb(230, 100, 20)"; // revert ascii color
        
        lightToggle.title = "Dark Mode";
        lightSwitch.src = "assets/light-on.png";
        
        mode = "light";
    }
});

// init ui
updateUI();
