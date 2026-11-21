const lyricsViewer = document.querySelector("#lyricsViewer");
const lyricsTitle = document.querySelector("#selectedLyricsTitle");
const lyricsFrame = document.querySelector("#lyricsFrame");
const lyricsPlayerFrame = document.querySelector("#lyricsPlayerFrame");
const lyricsPlayerOptions = document.querySelector("#lyricsPlayerOptions");
const lyricsPlaybackNote = document.querySelector("#lyricsPlaybackNote");
const lyricsPlayerUnavailable = document.querySelector("#lyricsPlayerUnavailable");
const closeLyricsButton = document.querySelector("#closeLyrics");
let selectedLyricsButton = null;
let selectedAlbum = null;
const musicPlayerNames = {
    spotify: "Spotify",
    appleMusic: "Apple Music",
    youtubeMusic: "YouTube Music"
};

function selectMusicPlayer(playerName) {
    const playerUrl = selectedAlbum?.dataset[`${playerName}Embed`];

    if (!playerUrl) {
        return;
    }

    lyricsPlayerFrame.src = playerUrl;
    lyricsPlayerFrame.title = `${musicPlayerNames[playerName]} player for ${selectedAlbum.querySelector(".lyricsAlbumTitle").textContent}`;

    document.querySelectorAll(".lyricsPlayerOption").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.player === playerName));
    });
}

document.querySelectorAll(".lyricsPlayerOption").forEach((button) => {
    button.addEventListener("click", () => selectMusicPlayer(button.dataset.player));
});

document.querySelectorAll(".lyricsAlbumButton").forEach((button) => {
    const tracklist = document.getElementById(button.getAttribute("aria-controls"));
    const actionLabel = button.querySelector(".lyricsAlbumAction");

    button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        tracklist.hidden = isExpanded;
        actionLabel.textContent = isExpanded ? "View tracklist" : "Hide tracklist";
    });
});

document.querySelectorAll(".lyricsList [data-lyrics]").forEach((button) => {
    button.setAttribute("aria-controls", "lyricsViewer");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
        if (selectedLyricsButton) {
            selectedLyricsButton.setAttribute("aria-expanded", "false");
        }

        selectedLyricsButton = button;
        selectedLyricsButton.setAttribute("aria-expanded", "true");
        selectedAlbum = button.closest(".lyricsAlbum");
        lyricsTitle.textContent = button.dataset.title;
        lyricsFrame.title = `Lyrics for ${button.dataset.title}`;
        lyricsFrame.src = button.dataset.lyrics;
        const availablePlayers = Object.keys(musicPlayerNames).filter((player) => selectedAlbum.dataset[`${player}Embed`]);
        lyricsPlayerOptions.hidden = availablePlayers.length === 0;
        lyricsPlayerOptions.querySelectorAll(".lyricsPlayerOption").forEach((playerButton) => {
            playerButton.hidden = !availablePlayers.includes(playerButton.dataset.player);
        });
        lyricsPlayerUnavailable.hidden = availablePlayers.length > 0;
        lyricsPlaybackNote.textContent = availablePlayers.length > 0
            ? `The full ${selectedAlbum.querySelector(".lyricsAlbumTitle").textContent} album plays here; the selected song may not start automatically.`
            : `Listening links for ${selectedAlbum.querySelector(".lyricsAlbumTitle").textContent} will be added when available.`;
        if (availablePlayers.length > 0) {
            selectMusicPlayer(availablePlayers[0]);
            lyricsPlayerFrame.hidden = false;
        } else {
            lyricsPlayerFrame.src = "about:blank";
            lyricsPlayerFrame.hidden = true;
        }
        document.querySelector(".lyricsPage").classList.add("isReading");
        lyricsViewer.hidden = false;
        lyricsViewer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

closeLyricsButton.addEventListener("click", () => {
    lyricsViewer.hidden = true;
    lyricsFrame.src = "about:blank";
    lyricsPlayerFrame.src = "about:blank";
    document.querySelector(".lyricsPage").classList.remove("isReading");

    const albumToReturnTo = selectedAlbum;

    if (selectedLyricsButton) {
        selectedLyricsButton.setAttribute("aria-expanded", "false");
        selectedLyricsButton = null;
    }

    const albumButton = albumToReturnTo
        ? albumToReturnTo.querySelector(".lyricsAlbumButton")
        : document.querySelector(".lyricsAlbumButton");
    selectedAlbum = null;
    albumButton.focus({ preventScroll: true });
    albumButton.scrollIntoView({ behavior: "smooth", block: "start" });
});

lyricsFrame.addEventListener("load", () => {
    const lyricsDocument = lyricsFrame.contentDocument;
    const lyricsText = lyricsDocument && lyricsDocument.querySelector("pre");

    if (!lyricsText) {
        return;
    }

    lyricsDocument.body.style.margin = "0";
    lyricsDocument.body.style.backgroundColor = "#101010";
    lyricsDocument.body.style.color = "#FFFFFF";
    lyricsDocument.body.style.fontFamily = "Arial, sans-serif";
    lyricsText.style.margin = "0";
    lyricsText.style.padding = "clamp(1rem, 4vw, 2rem)";
    lyricsText.style.font = "inherit";
    lyricsText.style.color = "#FFFFFF";
    lyricsText.style.backgroundColor = "#101010";
    lyricsText.style.fontSize = "1rem";
    lyricsText.style.lineHeight = "1.8";
    lyricsText.style.whiteSpace = "pre-wrap";
    lyricsText.style.overflowWrap = "anywhere";
});
