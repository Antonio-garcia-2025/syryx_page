const lyricsViewer = document.querySelector("#lyricsViewer");
const lyricsTitle = document.querySelector("#selectedLyricsTitle");
const lyricsFrame = document.querySelector("#lyricsFrame");
const closeLyricsButton = document.querySelector("#closeLyrics");
let selectedLyricsButton = null;

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
        lyricsTitle.textContent = button.dataset.title;
        lyricsFrame.title = `Lyrics for ${button.dataset.title}`;
        lyricsFrame.src = button.dataset.lyrics;
        lyricsViewer.hidden = false;
        lyricsViewer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

closeLyricsButton.addEventListener("click", () => {
    lyricsViewer.hidden = true;
    lyricsFrame.src = "about:blank";

    if (selectedLyricsButton) {
        selectedLyricsButton.setAttribute("aria-expanded", "false");
        selectedLyricsButton = null;
    }

    const albumButton = document.querySelector(".lyricsAlbumButton");
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
