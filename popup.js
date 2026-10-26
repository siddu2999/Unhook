const shorts = document.getElementById("shorts");
const recommendations = document.getElementById("recommendations");
const comments = document.getElementById("comments");

// Load saved settings
chrome.storage.sync.get(
    ["shorts", "recommendations", "comments"],
    (settings) => {
        shorts.checked = settings.shorts ?? true;
        recommendations.checked = settings.recommendations ?? true;
        comments.checked = settings.comments ?? true;
    }
);

// Save setting when changed
shorts.addEventListener("change", () => {
    chrome.storage.sync.set({
        shorts: shorts.checked
    });
});

recommendations.addEventListener("change", () => {
    chrome.storage.sync.set({
        recommendations: recommendations.checked
    });
});

comments.addEventListener("change", () => {
    chrome.storage.sync.set({
        comments: comments.checked
    });
});
