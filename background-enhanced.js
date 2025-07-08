// Enhanced background script with screenshot and translation features
chrome.runtime.onInstalled.addListener(() => {
    console.log('TextMind Pro extension installed and ready.');

    // Create context menu for image analysis
    chrome.contextMenus.create({
        id: "analyzeImage",
        title: "Describe Image",
        contexts: ["image"]
    });

    // Don't auto-open side panel - let popup handle it
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyzeImage") {
        chrome.tabs.sendMessage(tab.id, {
            action: "analyzeImage",
            url: info.srcUrl
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handle image fetching
    if (request.action === 'fetchImage') {
        fetch(request.url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1];
                    sendResponse({
                        success: true,
                        data: base64data
                    });
                };
                reader.onerror = () => {
                    sendResponse({
                        success: false,
                        error: 'Failed to read image'
                    });
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                sendResponse({
                    success: false,
                    error: error.message
                });
            });
        return true; // Keep message channel open for async response
    }

    // Handle screenshot capture request
    if (request.action === 'captureVisibleTab') {
        console.log('Capturing screenshot...');
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
            if (chrome.runtime.lastError) {
                console.error('Screenshot capture error:', chrome.runtime.lastError);
                sendResponse({ error: chrome.runtime.lastError.message });
                return;
            }

            console.log('Screenshot captured successfully');

            // If area is specified, crop the image
            if (request.area) {
                console.log('Cropping to specified area:', request.area);
                try {
                    const croppedDataUrl = await cropImageOffscreen(dataUrl, request.area);
                    sendResponse({ imageDataUrl: croppedDataUrl });
                } catch (error) {
                    console.error('Error cropping image:', error);
                    sendResponse({ error: error.message });
                }
            } else {
                sendResponse({ imageDataUrl: dataUrl });
            }
        });
        return true; // Allow non-blocking response
    }

    // Handle language preferences
    if (request.action === 'getLanguages') {
        chrome.storage.sync.get(['selectedLanguages'], (data) => {
            const languages = data.selectedLanguages || ['auto'];
            sendResponse({ languages });
        });
        return true;
    }

    // Handle side panel opening
    if (request.action === 'openSidePanel') {
        console.log('Received openSidePanel request');

        // Get the current active tab since popup doesn't have a tab context
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length > 0) {
                const tabId = tabs[0].id;
                console.log('Opening side panel for tab:', tabId);

                chrome.sidePanel.open({ tabId: tabId }).then(() => {
                    console.log('Side panel opened successfully');
                    sendResponse({ success: true });
                }).catch((error) => {
                    console.error('Error opening side panel:', error);
                    sendResponse({ success: false, error: error.message });
                });
            } else {
                console.error('No active tab found');
                sendResponse({ success: false, error: 'No active tab found' });
            }
        });

        return true; // Keep message channel open for async response
    }
});

// Function to crop an image using OffscreenCanvas
async function cropImageOffscreen(dataUrl, area) {
    try {
        // Create a blob from the data URL
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Create an array buffer from the blob
        const arrayBuffer = await blob.arrayBuffer();

        // Create a bitmap from the array buffer
        const bitmap = await createImageBitmap(new Blob([arrayBuffer]));

        // Create an OffscreenCanvas
        const canvas = new OffscreenCanvas(area.width, area.height);
        const ctx = canvas.getContext('2d');

        // Draw the cropped portion of the image
        ctx.drawImage(
            bitmap,
            area.left, area.top, area.width, area.height,
            0, 0, area.width, area.height
        );

        // Convert to blob and then to data URL
        const croppedBlob = await canvas.convertToBlob({ type: 'image/png' });
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(croppedBlob);
        });
    } catch (error) {
        console.error('Error in cropImageOffscreen:', error);
        throw error;
    }
}