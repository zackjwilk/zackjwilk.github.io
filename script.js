const container = document.querySelector(".moving-image-container");
const movingImage = document.getElementById("follow-cursor");
const face = document.getElementById("face");

const rect = container.getBoundingClientRect();

movingImage.style.outline = `${container.offsetWidth}px solid black`;
movingImage.ondragstart = function() { return false; };

container.addEventListener("mousemove", (event) => {
    const X = event.clientX - rect.left - container.offsetWidth/2 //+ movingImage.offsetWidth/2;
    const Y = event.clientY - rect.top - container.offsetHeight/2 + movingImage.offsetHeight*0.25;

    movingImage.style.transform = `translate(${X}px, ${Y}px)`;
});

container.addEventListener("mouseleave", () => {
    movingImage.style.visibility = "hidden";
    face.style.visibility = "hidden";
});

container.addEventListener("mouseenter", (event) => {
    movingImage.style.visibility = "visible";
    face.style.visibility = "visible";
})

const bdayCountdown = document.querySelector(".bday-countdown")

var x = setInterval(function() {
    var now = new Date();
    var month = now.getUTCMonth();
    var day = now.getUTCDate();
    var year = now.getUTCFullYear();
    if (month == 4 && day == 6) {
        bdayCountdown.innerHTML = "happy birthday!!!";
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

const buttons = Array.from(document.getElementsByTagName("button"));
const projName = document.querySelector(".proj-name");
const projDesc = document.querySelector(".proj-desc");

const projects = {
    "spotify-helper":`spotify-helper offers multiple features to help user automate tasks on Spotify
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
                        loudness, and are in C major).`,
    "I WILL MAKE MORE PROJECTS": "I WILL I SWEAR"
}

buttons.forEach((button) => {
    button.addEventListener("click", function() {
        projName.innerHTML = button.innerHTML;
        projDesc.innerHTML = projects[button.innerHTML];
    })
 })