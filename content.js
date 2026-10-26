let settings = {
    shorts: true,
    recommendations: true,
    comments: true
};

// Selectors for YouTube elements
const selectors = {
    shorts: [
        "ytd-reel-shelf-renderer",
        "ytd-rich-shelf-renderer[is-shorts]"
    ],

    recommendations: [
        "ytd-watch-next-secondary-results-renderer"
    ],

    comments: [
        "ytd-comments"
    ]
};

// Hide or show elements
function updateElement(selector, shouldHide) {
    document.querySelectorAll(selector).forEach(element => {
        element.style.display = shouldHide ? "none" : "";
    });
}

// Apply current settings
function applySettings() {

    selectors.shorts.forEach(selector => {
        updateElement(selector, settings.shorts);
    });

    selectors.recommendations.forEach(selector => {
        updateElement(selector, settings.recommendations);
    });

    selectors.comments.forEach(selector => {
        updateElement(selector, settings.comments);
    });
}

// Get saved settings
chrome.storage.sync.get(
    ["shorts", "recommendations", "comments"],
    (saved) => {

        settings.shorts = saved.shorts ?? true;
        settings.recommendations = saved.recommendations ?? true;
        settings.comments = saved.comments ?? true;

        applySettings();
    }
);

// Listen for changes from popup
chrome.runtime.onMessage.addListener((message) => {

    if (message.type === "UPDATE_SETTINGS") {

        settings = message.settings;

        applySettings();
    }
});

// YouTube dynamically adds elements
const observer = new MutationObserver(() => {
    applySettings();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});