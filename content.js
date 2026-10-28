
let settings = {
    shorts: true,
    recommendations: true,
    comments: true
};

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

// Hide or show matching elements
function updateElement(selector, shouldHide) {
    document.querySelectorAll(selector).forEach(element => {
        element.style.display = shouldHide ? "none" : "";
    });
}

function applySettings() {

    // 1. Handle Shorts
    for (const selector of selectors.shorts) {
        updateElement(selector, settings.shorts);
    }

    // 2. Handle Recommendations
    for (const selector of selectors.recommendations) {
        updateElement(selector, settings.recommendations);
    }

    // 3. Handle Comments
    for (const selector of selectors.comments) {
        updateElement(selector, settings.comments);
    }

}

// Load settings when YouTube opens
chrome.storage.sync.get(
    ["shorts", "recommendations", "comments"],
    saved => {
        settings = {
            shorts: saved.shorts ?? true,
            recommendations: saved.recommendations ?? true,
            comments: saved.comments ?? true
        };

        applySettings();
    }
);

// Update immediately when popup settings change
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;

    for (const key of Object.keys(settings)) {
        if (changes[key]) {
            settings[key] = changes[key].newValue ?? true;
        }
    }

    applySettings();
});

// Handle elements YouTube adds dynamically
const observer = new MutationObserver(() => {
    applySettings();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
