// AI Configuration Handler for TextMind Pro
// This script works alongside the main content script to handle dynamic AI configuration

(function() {
    'use strict';
    
    let currentProvider = 'gemini';
    let currentApiKey = '';
    let currentModel = '';
    let customConfig = null;
    // Load saved configuration on script load
    chrome.storage.sync.get(['selectedProvider', 'providerApiKeys', 'googleAiApiKey', 'selectedAiModel', 'customApiUrl', 'customModel'], function(result) {
        currentProvider = result.selectedProvider || 'gemini';
        
        // Load API keys from new multi-provider format
        const providerApiKeys = result.providerApiKeys || {};
        
        // Handle legacy Gemini API key migration
        if (result.googleAiApiKey && !providerApiKeys.gemini) {
            providerApiKeys.gemini = result.googleAiApiKey;
            // Migrate to new format
            chrome.storage.sync.set({ providerApiKeys: providerApiKeys });
        }
        
        // Get API key for current provider
        currentApiKey = providerApiKeys[currentProvider] || '';
        
        if (result.selectedAiModel) {
            currentModel = result.selectedAiModel;
        } else {
            // Set default model based on provider
            const provider = window.AIProviders && window.AIProviders[currentProvider];
            currentModel = provider ? provider.defaultModel : '';
            chrome.storage.sync.set({ selectedAiModel: currentModel });
        }
        
        // Load custom configuration if using custom provider
        if (currentProvider === 'custom') {
            customConfig = {
                baseUrl: result.customApiUrl || '',
                model: result.customModel || ''
            };
        }
        
        // Update the hardcoded values in the main content script
        updateMainContentScript();
    });
    
    // Listen for messages from popup and background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'updateAiConfig') {
            currentProvider = request.provider || currentProvider;
            currentApiKey = request.apiKey;
            currentModel = request.model;
            customConfig = request.customConfig || null;
            updateMainContentScript();
            sendResponse({ success: true });
        }
        
        if (request.action === 'testAiConnection') {
            testConnection(request.provider || currentProvider, request.model, request.apiKey, request.customConfig)
                .then(result => sendResponse(result))
                .catch(error => sendResponse({ success: false, error: error.message }));
            return true; // Keep message channel open
        }
    });
    
    // Function to update the main content script's API configuration
    function updateMainContentScript() {
        // Create or update global configuration object
        window.TextMindPro = window.TextMindPro || {};
        window.TextMindPro.provider = currentProvider;
        window.TextMindPro.apiKey = currentApiKey;
        window.TextMindPro.model = currentModel;
        window.TextMindPro.customConfig = customConfig;
        
        // Override fetch requests to use dynamic configuration
        if (!window._originalFetch) {
            window._originalFetch = window.fetch;
            window.fetch = function(url, options = {}) {
                // Handle different provider API requests
                if (typeof url === 'string') {
                    // For backward compatibility, still handle Gemini API requests
                    if (url.includes('generativelanguage.googleapis.com')) {
                        // Extract the existing API key from the URL and replace it
                        const newUrl = url.replace(/key=[^&]+/, `key=${currentApiKey}`);
                        
                        // Also update the model in the URL if needed
                        const modelMatch = newUrl.match(/models\/([^:]+):/);
                        if (modelMatch && currentModel) {
                            const updatedUrl = newUrl.replace(/models\/[^:]+:/, `models/${currentModel}:`);
                            return window._originalFetch(updatedUrl, options);
                        }
                        
                        return window._originalFetch(newUrl, options);
                    }
                    
                    // Handle other provider requests by updating headers
                    const provider = window.AIProviders && window.AIProviders[currentProvider];
                    if (provider && currentApiKey) {
                        // Check if this is an API request for the current provider
                        if (url.includes(provider.baseUrl) || 
                            (currentProvider === 'custom' && customConfig && url.includes(customConfig.baseUrl))) {
                            
                            // Clone options to avoid modifying the original
                            const newOptions = { ...options };
                            newOptions.headers = { ...options.headers };
                            
                            // Add appropriate authorization header based on provider
                            if (provider.apiKeyHeader === 'Authorization') {
                                newOptions.headers['Authorization'] = `Bearer ${currentApiKey}`;
                            } else if (provider.apiKeyHeader) {
                                newOptions.headers[provider.apiKeyHeader] = currentApiKey;
                            }
                            
                            // Add any additional headers from provider config
                            if (provider.additionalHeaders) {
                                Object.assign(newOptions.headers, provider.additionalHeaders);
                            }
                            
                            return window._originalFetch(url, newOptions);
                        }
                    }
                }
                
                return window._originalFetch(url, options);
            };
        }
    }
    
    // Test AI connection using the new multi-provider system
    async function testConnection(providerId, model, apiKey, customConfigParam = null) {
        try {
            // Use the AIHandler from providers.js if available
            if (window.AIHandler && window.AIHandler.testConnection) {
                return await window.AIHandler.testConnection(providerId, model, apiKey, customConfigParam);
            }
            
            // Fallback to legacy Gemini testing for backward compatibility
            if (providerId === 'gemini' || !providerId) {
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
            }
            
            throw new Error(`Provider ${providerId} not supported in fallback mode`);
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    // Initialize on page load
    updateMainContentScript();
})();
