const body = document.body;
const flashlight = document.getElementById("flashlight");
const lightToggle = document.getElementById("lightToggle");
const lightSwitch = document.getElementById("lightSwitch");
const asciiElement = document.getElementById("ascii");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// glitch effect
const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+=[]{}|;:,.<>?/~";
const RADIUS = 1; // 1x1 radius means 3x3 area total (center + 1 in all directions)
let charElements = []; // stores all individual <span> elements for current art
let lastAffectedIndices = new Set(); // tracks indices affected in prev frame
let charDimensions = { width: 0, height: 0, cols: 0, rows: 0 };
let containerRect = null;
let currentArtText = "";
let isGlitchActive = false;
let animationFrameId = null; // stores requestAnimationFrame ID

function getRandomChar() {
    return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function coordsToIndex(col, row) {
    if (col < 0 || col >= charDimensions.cols || row < 0 || row >= charDimensions.rows) {
        return -1; // out of bounds
    }
    return row * charDimensions.cols + col;
}

function restoreChar(index) {
    if (index >= 0 && index < charElements.length) {
        const charEl = charElements[index];
        const originalChar = charEl.dataset.originalChar;

        if (charEl.textContent !== originalChar) {
            charEl.textContent = originalChar;
        }
    }
}

function calculateGrid() {
    if (charElements.length === 0) return;

    containerRect = asciiElement.getBoundingClientRect();

    const firstCharRect = charElements[0]?.getBoundingClientRect();

    if (firstCharRect) {
        charDimensions.width = firstCharRect.width;
        charDimensions.height = firstCharRect.height;
    } else {
        charDimensions.width = 0;
        charDimensions.height = 0;
    }
    
    // calc total columns and rows based on text structure
    const lines = currentArtText.split("\n");
    charDimensions.rows = lines.length;
    // get max line length to determine cols
    charDimensions.cols = lines.reduce((max, line) => Math.max(max, line.length), 0); 
}

function glitchLoop() {
    // check if loop should still be active (mouse is hovering)
    if (!isGlitchActive) {
        // stop loop if mouse left
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        return;
    }

    lastAffectedIndices.forEach(index => {
        if (index !== -1) {
            const charEl = charElements[index];
            const originalChar = charEl.dataset.originalChar; 

            // only glitch if og char is NOT a space
            if (originalChar !== ' ') {
                charEl.textContent = getRandomChar();
            }
        }
    });
    
    // request next frame
    animationFrameId = requestAnimationFrame(glitchLoop);
}

function handleMouseMove(e) {
    // recalc if dimensions are missing
    if (!containerRect || charDimensions.width === 0 || charDimensions.height === 0) {
        calculateGrid();
        if (charDimensions.width === 0) return; 
    }

    if (!containerRect) {
        calculateGrid();
        return; 
    }

    // map mouse pixel coordinates to character coordinates (relative to container)
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // calc central character column and row being hovered over
    const centerCol = Math.floor(mouseX / charDimensions.width);
    const centerRow = Math.floor(mouseY / charDimensions.height);

    const currentAffectedIndices = new Set();
    
    // iterate thru radius (3x3 area)
    for (let rowOffset = -RADIUS; rowOffset <= RADIUS; rowOffset++) {
        for (let colOffset = -RADIUS; colOffset <= RADIUS; colOffset++) {
            
            const targetCol = centerCol + colOffset;
            const targetRow = centerRow + rowOffset;
            
            const index = coordsToIndex(targetCol, targetRow);
            
            if (index !== -1) {
                currentAffectedIndices.add(index);
            }
        }
    }
    
    // reset chars outside new radius
    lastAffectedIndices.forEach(index => {
        if (!currentAffectedIndices.has(index)) {
            restoreChar(index);
        }
    });

    lastAffectedIndices = currentAffectedIndices;
    
    // Start the continuous loop if it's not running
    if (!isGlitchActive) {
        isGlitchActive = true;
        animationFrameId = requestAnimationFrame(glitchLoop);
    }
}

function handleMouseLeave() {
    // reset all currently glitched chars when mouse leaves
    lastAffectedIndices.forEach(index => {
        restoreChar(index);
    });
    lastAffectedIndices.clear(); 
    
    // Stop the continuous loop
    isGlitchActive = false;
}

function initializeGlitchArt(artText, sectionName) {
    
    // clear listeners before replacing content
    asciiElement.removeEventListener("mousemove", handleMouseMove);
    asciiElement.removeEventListener("mouseleave", handleMouseLeave);
    window.removeEventListener("resize", calculateGrid);

    // stop loop if it's running
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    isGlitchActive = false;
    
    // reset indices set immediately
    lastAffectedIndices.clear();

    asciiElement.innerHTML = ""; 
    charElements = [];

    let lines = artText.split("\n");

    if (lines.length > 0 && lines[0].trim() === "") lines.shift();
    if (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

    const rawLines = lines;
    
    if (rawLines.length === 0) return;
    
    currentArtText = rawLines.join("\n"); // update currentArtText with cleaned version

    // calc max cols (width) based on all lines
    charDimensions.cols = rawLines.reduce((max, line) => Math.max(max, line.length), 0); 
    
    const fragment = document.createDocumentFragment();

    rawLines.forEach(line => {
        // pad line with spaces to match max width for grid alignment
        const paddedLine = line.padEnd(charDimensions.cols, " "); 

        for (let i = 0; i < paddedLine.length; i++) {
            const char = paddedLine[i];
            const span = document.createElement("span");
            span.className = "glitch-char";
            span.textContent = char;
            // store og char (including spaces)
            span.dataset.originalChar = char; 
            charElements.push(span);
            fragment.appendChild(span);
        }
        fragment.appendChild(document.createElement("br"));
    });

    asciiElement.appendChild(fragment);

    calculateGrid(); 
    
    // delayed call to recalc grid and bounding box
    setTimeout(calculateGrid, 0); 
    
    // only attach listeners if the current section is home
    if (sectionName === "home") { 
        asciiElement.addEventListener("mousemove", handleMouseMove);
        asciiElement.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", calculateGrid); 
    }
}


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
 ____ ______  _____   ___ _____ _____ _____ _____ 
| ___ \\ ___ \\|  _  | |_  |  ___/  __ \\_   _/  ___|
| |_/ / |_/ /| | | |   | | |__ | /  \\/ | | \\ \`--. 
|  __/|    / | | | |   | |  __|| |     | |  \`--. \\
| |   | |\\ \\ \\ \\_/ /\\__/ / |___| \\__/\\ | | /\\__/ /
\\_|   \\_| \\_| \\___/\\____/\\____/ \\____/ \\_/ \\____/ 
`;

const artAbout = `
  ___   _____  _____ _   _ _____ 
 / _ \\ | ___ \\|  _  | | | |_   _|
/ /_\\ \\| |_/ /| | | | | | | | |  
|  _  || ___ \\| | | | | | | | |  
| | | || |_/ /\\ \\_/ / |_| | | |  
\\_| |_/\\____/  \\___/ \\___/  \\_/  
`;

// carousel config
const sections = [
    { name: "home", art: artZack },
    { name: "about", art: artAbout },
    { name: "projects", art: artProjects }
];

let currentIndex = 0;

// navigation logic
function updateUI() {
    const currentSection = sections[currentIndex];
    
    // update ascii
    initializeGlitchArt(currentSection.art, currentSection.name);

    // manage content sections
    // hide all sections
    document.querySelectorAll(".content-section").forEach(el => {
        el.classList.remove("active-section");
    });

    // show current section
    const activeContent = document.getElementById(`section-${currentSection.name}`);
    if (activeContent) {
        activeContent.classList.add("active-section");
    }
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? sections.length - 1 : currentIndex - 1;
    updateUI();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === sections.length - 1) ? 0 : currentIndex + 1;
    updateUI();
});

// project data
const projects = [
        { name: "Canvasgotchi", description: `Canvasgotchi is a browser pet that relies on you completing your assignments!
                        <br><br>
                        Canvasgotchi is a Google Chrome extension created using HTML, CSS, and JavaScript. It interacts with
                        Canvas's API to check the user's assignments and due dates, displaying the number of assignments due in
                        the next week on a widget below the pet. The pet has several states based on the number of assignments due.
                        If there are no assignments due it plays a sleeping animation, if there's 1-4 assignments due he smiles, and
                        if there are 5 or more assignments due he jumps up and down urging the user the complete an assignment.
                        <br><br>
                        This project began as a Python script, but after showing it to a few friends who showed interest in using it
                        themselves, I decided to shift to creating a Chrome extension (something I had never done before despite having
                        worked in HTML, CSS, and JavaScript). I then posted a video of this project on Instagram and received a lot of 
                        support, as well as requests to create versions that can be used on Firefox or with other LMS's like Moodle. 
                        Because of the attention that these requests received, I plan to create a Firefox version first and then look into 
                        developing compatability for Moodle and Blackboard.
                        <br><br>
                        WATCH DEMO <a href="https://www.instagram.com/p/DRiAdFIjlxn/" target="_blank">HERE</a>`,
                    link: "https://chromewebstore.google.com/detail/lllfdbnlmbikgdbpemmnabmmhdbfodkl?utm_source=item-share-cb" },
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
        projectDetailsContainer.innerHTML = ""; // clear content
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
        // When in dark mode, we want the glitch characters to be visible (white)
        asciiElement.style.color = "white"; 
        
        lightToggle.title = "Light Mode";
        lightSwitch.src = "assets/light-off.png";
        
        mode = "dark";
    } else {
        // light mode on
        flashlight.style.visibility = "hidden";
        
        body.style.backgroundColor = "rgb(160, 180, 150)";
        body.style.color = "black";
        // Revert to original color
        asciiElement.style.color = "rgb(230, 100, 20)"; 
        
        lightToggle.title = "Dark Mode";
        lightSwitch.src = "assets/light-on.png";
        
        mode = "light";
    }
});

// init ui
updateUI();
