// TextMind Pro Background Script with Dark Mode Support

// Store for image processing queue
const imageQueue = [];

// Initialize context menu on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "analyzeImage",
        title: "Describe Image",
        contexts: ["image"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyzeImage") {
        chrome.tabs.sendMessage(tab.id, {
            action: "analyzeImage",
            url: info.srcUrl
        });
    }
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handle image fetching for analysis
    if (request.action === "fetchImage") {
        fetch(request.url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result.split(',')[1];
                    sendResponse({
                        base64: base64,
                        type: blob.type
                    });
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                sendResponse({
                    error: error.message
                });
            });
        return true; // Keep message channel open for async response
    }    // Handle theme updates - broadcast to all tabs
    if (request.action === "broadcastTheme") {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "updateTheme",
                    theme: request.theme,
                    darkMode: request.darkMode
                }).catch(() => {
                    // Ignore errors for tabs that can't receive messages
                });
            });
        });
        sendResponse({success: true});
        return true;
    }

    // Handle storage sync for theme
    if (request.action === "syncTheme") {
        chrome.storage.sync.get(['selectedTheme'], function(result) {
            const theme = result.selectedTheme || 'light';
            sendResponse({
                theme: theme,
                darkMode: theme !== 'light'
            });
        });
        return true;
    }

    // Legacy support for dark mode sync
    if (request.action === "syncDarkMode") {
        chrome.storage.sync.get(['selectedTheme'], function(result) {
            const theme = result.selectedTheme || 'light';
            sendResponse({
                darkMode: theme !== 'light'
            });
        });
        return true;
    }

    // Handle AI configuration updates
    if (request.action === "updateAiConfig") {
        // Broadcast to all tabs to update their AI configuration
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "updateAiConfig",
                    apiKey: request.apiKey,
                    model: request.model
                }).catch(() => {
                    // Ignore errors for tabs that don't have content script
                });
            });
        });
    }

    // Handle AI connection testing
    if (request.action === "testAiConnection") {
        testAiConnection(request.apiKey, request.model)
            .then(result => sendResponse(result))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep message channel open for async response
    }
});

// Listen for storage changes to sync theme across tabs
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.selectedTheme) {
        const newTheme = changes.selectedTheme.newValue || 'light';
        // Broadcast theme change to all tabs
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "updateTheme",
                    theme: newTheme,
                    darkMode: newTheme !== 'light'
                }).catch(() => {
                    // Ignore errors for tabs that can't receive messages
                });
            });
        });
    }
    
    // Legacy support for darkMode changes
    if (namespace === 'sync' && changes.darkMode && !changes.selectedTheme) {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "updateTheme",
                    darkMode: changes.darkMode.newValue,
                    theme: changes.darkMode.newValue ? 'dark' : 'light'
                }).catch(() => {
                    // Ignore errors for tabs that can't receive messages
                });
            });
        });
    }
});

// Handle extension icon updates based on theme (optional)
chrome.storage.sync.get(['selectedTheme'], function(result) {
    const theme = result.selectedTheme || 'light';
    const isDarkMode = theme !== 'light';
    // You could update the extension icon here based on theme
    // chrome.action.setIcon({
    //     path: isDarkMode ? "icons/icon-dark.png" : "icons/icon.png"
    // });
});

// AI connection testing function
async function testAiConnection(apiKey, model = 'gemini-2.5-flash-lite-preview-06-17') {
    try {
        const testPrompt = "Hello! This is a connection test. Please respond with 'Connection successful!'";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: testPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 1,
                    responseMimeType: "text/plain"
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (responseText) {
            return { success: true, message: 'Connection successful!' };
        } else {
            throw new Error('No response from AI model');
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}
