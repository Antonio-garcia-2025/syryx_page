const lyricsViewer = document.querySelector("#lyricsViewer");
const lyricsTitle = document.querySelector("#selectedLyricsTitle");
const lyricsFrame = document.querySelector("#lyricsFrame");
const closeLyricsButton = document.querySelector("#closeLyrics");
let selectedLyricsButton = null;

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
        selectedLyricsButton.focus();
        selectedLyricsButton = null;
    }
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
