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

    // Handle text translation request
    if (request.action === 'translateText') {
        handleTextTranslation(request, sendResponse);
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

// Handle text translation requests
async function handleTextTranslation(request, sendResponse) {
    try {
        console.log('Handling text translation request:', request);
        
        // Get AI configuration
        const result = await new Promise((resolve) => {
            chrome.storage.sync.get([
                'selectedProvider',
                'openaiApiKey', 
                'claudeApiKey', 
                'geminiApiKey',
                'customApiKey',
                'customApiUrl',
                'customModelName',
                'perplexityApiKey',
                'groqApiKey',
                'deepseekApiKey',
                'xaiApiKey'
            ], resolve);
        });

        const provider = result.selectedProvider;
        if (!provider) {
            throw new Error('No AI provider selected. Please configure an AI provider in the extension settings.');
        }

        // Prepare translation prompt
        const prompt = `Translate the following text to ${request.languageName}. Provide only the translation without any additional commentary or explanation:

"${request.text}"`;

        let translation;

        // Handle different providers
        switch (provider) {
            case 'openai':
                if (!result.openaiApiKey) {
                    throw new Error('OpenAI API key not configured');
                }
                translation = await translateWithOpenAI(prompt, result.openaiApiKey);
                break;
            
            case 'claude':
                if (!result.claudeApiKey) {
                    throw new Error('Claude API key not configured');
                }
                translation = await translateWithClaude(prompt, result.claudeApiKey);
                break;
            
            case 'gemini':
                if (!result.geminiApiKey) {
                    throw new Error('Gemini API key not configured');
                }
                translation = await translateWithGemini(prompt, result.geminiApiKey);
                break;
            
            case 'perplexity':
                if (!result.perplexityApiKey) {
                    throw new Error('Perplexity API key not configured');
                }
                translation = await translateWithPerplexity(prompt, result.perplexityApiKey);
                break;
            
            case 'groq':
                if (!result.groqApiKey) {
                    throw new Error('Groq API key not configured');
                }
                translation = await translateWithGroq(prompt, result.groqApiKey);
                break;
            
            case 'deepseek':
                if (!result.deepseekApiKey) {
                    throw new Error('DeepSeek API key not configured');
                }
                translation = await translateWithDeepSeek(prompt, result.deepseekApiKey);
                break;
            
            case 'xai':
                if (!result.xaiApiKey) {
                    throw new Error('xAI API key not configured');
                }
                translation = await translateWithXAI(prompt, result.xaiApiKey);
                break;
            
            case 'custom':
                if (!result.customApiKey || !result.customApiUrl) {
                    throw new Error('Custom API configuration incomplete');
                }
                translation = await translateWithCustom(prompt, result.customApiKey, result.customApiUrl, result.customModelName);
                break;
            
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }

        sendResponse({
            success: true,
            translation: translation.trim()
        });

    } catch (error) {
        console.error('Translation error:', error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}

// Translation functions for different providers
async function translateWithOpenAI(prompt, apiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function translateWithClaude(prompt, apiKey) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 500,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Claude API request failed');
    }

    const data = await response.json();
    return data.content[0].text;
}

async function translateWithGemini(prompt, apiKey) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.1
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Gemini API request failed');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

async function translateWithPerplexity(prompt, apiKey) {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Perplexity API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function translateWithGroq(prompt, apiKey) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Groq API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function translateWithDeepSeek(prompt, apiKey) {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'DeepSeek API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function translateWithXAI(prompt, apiKey) {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'grok-beta',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'xAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function translateWithCustom(prompt, apiKey, apiUrl, modelName) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: modelName || 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Custom API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}