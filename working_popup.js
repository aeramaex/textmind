// Multi-Provider AI Popup Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup script loading...');
    
    // Get all the UI elements
    const providerSelect = document.getElementById('providerSelect');
    const apiKeyInput = document.getElementById('apiKey');
    const apiKeyLabel = document.getElementById('apiKeyLabel');
    const aiModelSelect = document.getElementById('aiModel');
    const customUrlGroup = document.getElementById('customUrlGroup');
    const customModelGroup = document.getElementById('customModelGroup');
    const customUrlInput = document.getElementById('customUrl');
    const customModelInput = document.getElementById('customModel');
    const saveAiConfigBtn = document.getElementById('saveAiConfig');
    const testConnectionBtn = document.getElementById('testConnection');
    const refreshModelsBtn = document.getElementById('refreshModels');
    const aiStatus = document.getElementById('aiStatus');
    const statusText = document.getElementById('statusText');

    let currentProvider = 'gemini';
    let providerApiKeys = {}; // Store API keys per provider

    // Check if essential elements exist
    if (!providerSelect || !apiKeyInput || !aiModelSelect) {
        console.error('Essential popup elements not found');
        return;
    }

    console.log('Essential elements found, initializing...');

    // Load saved configuration
    loadSavedConfiguration();

    // Provider selection handler
    if (providerSelect) {
        providerSelect.addEventListener('change', function() {
            const selectedProvider = this.value;
            handleProviderChange(selectedProvider);
        });
    }

    // Save configuration handler
    if (saveAiConfigBtn) {
        saveAiConfigBtn.addEventListener('click', saveConfiguration);
    }

    // Test connection handler
    if (testConnectionBtn) {
        testConnectionBtn.addEventListener('click', testConnection);
    }

    // Refresh models handler
    if (refreshModelsBtn) {
        refreshModelsBtn.addEventListener('click', refreshModels);
    }

    // API key input handler - load models when API key changes
    if (apiKeyInput) {
        apiKeyInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                loadModelsForProvider(currentProvider);
            }
        });
    }

    function loadSavedConfiguration() {
        chrome.storage.sync.get([
            'selectedProvider', 
            'providerApiKeys',
            'selectedAiModel', 
            'customApiUrl', 
            'customModel',
            // Legacy keys for backward compatibility
            'googleAiApiKey'
        ], function(result) {
            // Load provider
            currentProvider = result.selectedProvider || 'gemini';
            if (providerSelect) {
                providerSelect.value = currentProvider;
            }

            // Load API keys
            providerApiKeys = result.providerApiKeys || {};
            
            // Handle legacy Gemini API key
            if (result.googleAiApiKey && !providerApiKeys.gemini) {
                providerApiKeys.gemini = result.googleAiApiKey;
            }

            // Load custom configuration
            if (customUrlInput && result.customApiUrl) {
                customUrlInput.value = result.customApiUrl;
            }
            if (customModelInput && result.customModel) {
                customModelInput.value = result.customModel;
            }

            // Apply provider settings
            handleProviderChange(currentProvider);

            // Load selected model
            if (result.selectedAiModel) {
                setTimeout(() => {
                    if (aiModelSelect) {
                        aiModelSelect.value = result.selectedAiModel;
                    }
                }, 500); // Give time for models to load
            }
        });
    }

    function handleProviderChange(providerId) {
        currentProvider = providerId;
        
        // Fallback provider names if AIProviders not loaded
        const providerNames = {
            'gemini': 'Google Gemini',
            'openai': 'OpenAI',
            'anthropic': 'Anthropic Claude',
            'groq': 'Groq',
            'cerebras': 'Cerebras AI',
            'openrouter': 'OpenRouter',
            'custom': 'Custom OpenAI-Compatible'
        };
        
        const provider = window.AIProviders && window.AIProviders[providerId];
        const providerName = provider ? provider.name : (providerNames[providerId] || providerId);
        
        // Update API key label and placeholder
        if (apiKeyLabel) {
            apiKeyLabel.textContent = `${providerName} API Key`;
        }
        if (apiKeyInput) {
            apiKeyInput.placeholder = `Enter your ${providerName} API key...`;
            // Load saved API key for this provider
            apiKeyInput.value = providerApiKeys[providerId] || '';
        }

        // Show/hide custom fields
        const isCustom = providerId === 'custom';
        if (customUrlGroup) {
            customUrlGroup.style.display = isCustom ? 'block' : 'none';
        }
        if (customModelGroup) {
            customModelGroup.style.display = isCustom ? 'block' : 'none';
        }

        // Load models for this provider (with delay to ensure providers.js is loaded)
        setTimeout(() => {
            loadModelsForProvider(providerId);
        }, 100);
    }

    async function loadModelsForProvider(providerId) {
        if (!aiModelSelect) return;

        // Clear current models
        aiModelSelect.innerHTML = '<option value="">Loading models...</option>';
        aiModelSelect.disabled = true;

        if (providerId === 'custom') {
            // For custom provider, just show a text input-like option
            aiModelSelect.innerHTML = '<option value="">Enter model in field below</option>';
            aiModelSelect.disabled = true;
            return;
        }

        const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
        if (!apiKey) {
            aiModelSelect.innerHTML = '<option value="">Enter API key to load models</option>';
            aiModelSelect.disabled = false;
            return;
        }

        try {
            let models = [];
            
            // Check if AIHandler is available for dynamic loading
            if (window.AIHandler && window.AIHandler.loadModels) {
                models = await window.AIHandler.loadModels(providerId, apiKey);
            } else {
                // Use hardcoded fallback models if AIHandler not available
                models = getHardcodedFallbackModels(providerId);
            }

            if (models && models.length > 0) {
                populateModelSelect(models);
                const providerName = getProviderName(providerId);
                showStatus('success', `Loaded ${models.length} ${providerName} models`);
            } else {
                aiModelSelect.innerHTML = '<option value="">No models available</option>';
                showStatus('error', `No models found for ${getProviderName(providerId)}`);
            }
        } catch (error) {
            console.error(`Failed to load models for ${providerId}:`, error);
            
            // Use hardcoded fallback models on error
            const fallbackModels = getHardcodedFallbackModels(providerId);
            if (fallbackModels.length > 0) {
                populateModelSelect(fallbackModels);
                showStatus('error', `Using fallback models: ${error.message}`);
            } else {
                aiModelSelect.innerHTML = '<option value="">Failed to load models</option>';
                showStatus('error', `Failed to load models: ${error.message}`);
            }
        } finally {
            aiModelSelect.disabled = false;
        }
    }

    function getProviderName(providerId) {
        const providerNames = {
            'gemini': 'Google Gemini',
            'openai': 'OpenAI',
            'anthropic': 'Anthropic Claude',
            'groq': 'Groq',
            'cerebras': 'Cerebras AI',
            'openrouter': 'OpenRouter',
            'custom': 'Custom OpenAI-Compatible'
        };
        return providerNames[providerId] || providerId;
    }

    function getHardcodedFallbackModels(providerId) {
        const fallbackModels = {
            gemini: [
                { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Experimental)' },
                { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
                { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
            ],
            openai: [
                { id: 'gpt-4o', name: 'GPT-4o' },
                { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
                { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
                { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
            ],
            anthropic: [
                { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
                { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku' },
                { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' }
            ],
            groq: [
                { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' },
                { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile' },
                { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' }
            ],
            cerebras: [
                { id: 'llama3.1-8b', name: 'Llama 3.1 8B' },
                { id: 'llama3.1-70b', name: 'Llama 3.1 70B' }
            ],
            openrouter: [
                { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
                { id: 'openai/gpt-4o', name: 'GPT-4o' }
            ]
        };
        return fallbackModels[providerId] || [];
    }


    function populateModelSelect(models) {
        if (!aiModelSelect) return;

        aiModelSelect.innerHTML = '<option value="">Select a model...</option>';
        
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            aiModelSelect.appendChild(option);
        });

        aiModelSelect.disabled = false;
    }

    async function refreshModels() {
        if (refreshModelsBtn) {
            refreshModelsBtn.disabled = true;
            setTimeout(() => {
                refreshModelsBtn.disabled = false;
            }, 2000);
        }
        
        // Clear any cached models for the current provider
        const provider = window.AIProviders && window.AIProviders[currentProvider];
        if (provider) {
            provider.models = []; // Clear cache to force fresh API call
        }
        
        await loadModelsForProvider(currentProvider);
    }

    function saveConfiguration() {
        const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
        const selectedModel = aiModelSelect ? aiModelSelect.value : '';
        const customUrl = customUrlInput ? customUrlInput.value.trim() : '';
        const customModel = customModelInput ? customModelInput.value.trim() : '';

        // Validation
        if (!apiKey && currentProvider !== 'custom') {
            showStatus('error', 'Please enter an API key');
            return;
        }

        if (currentProvider === 'custom') {
            if (!customUrl) {
                showStatus('error', 'Please enter a custom API URL');
                return;
            }
            if (!customModel) {
                showStatus('error', 'Please enter a custom model ID');
                return;
            }
        } else if (!selectedModel) {
            showStatus('error', 'Please select a model');
            return;
        }

        // Save API key for current provider
        providerApiKeys[currentProvider] = apiKey;

        // Prepare data to save
        const configData = {
            selectedProvider: currentProvider,
            providerApiKeys: providerApiKeys,
            selectedAiModel: currentProvider === 'custom' ? customModel : selectedModel,
            customApiUrl: customUrl,
            customModel: customModel
        };

        // Save configuration
        chrome.storage.sync.set(configData, function() {
            if (chrome.runtime.lastError) {
                showStatus('error', 'Failed to save configuration');
            } else {
                showStatus('success', 'Configuration saved successfully');
                
                // Notify content scripts about the update
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    if (tabs && tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'updateAiConfig',
                            provider: currentProvider,
                            apiKey: apiKey,
                            model: currentProvider === 'custom' ? customModel : selectedModel,
                            customConfig: currentProvider === 'custom' ? {
                                baseUrl: customUrl,
                                model: customModel
                            } : null
                        });
                    }
                });
            }
        });
    }

    async function testConnection() {
        const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
        const selectedModel = aiModelSelect ? aiModelSelect.value : '';
        const customUrl = customUrlInput ? customUrlInput.value.trim() : '';
        const customModel = customModelInput ? customModelInput.value.trim() : '';

        // Validation
        if (!apiKey && currentProvider !== 'custom') {
            showStatus('error', 'Please enter an API key');
            return;
        }

        if (currentProvider === 'custom') {
            if (!customUrl || !customModel) {
                showStatus('error', 'Please enter custom API URL and model');
                return;
            }
        } else if (!selectedModel) {
            showStatus('error', 'Please select a model');
            return;
        }

        showStatus('testing', 'Testing connection...');

        try {
            // Use the AIHandler from providers.js if available
            if (window.AIHandler && window.AIHandler.testConnection) {
                const customConfig = currentProvider === 'custom' ? {
                    baseUrl: customUrl,
                    model: customModel
                } : null;

                const result = await window.AIHandler.testConnection(
                    currentProvider, 
                    currentProvider === 'custom' ? customModel : selectedModel, 
                    apiKey, 
                    customConfig
                );

                if (result && result.success) {
                    showStatus('success', 'Connection successful! Model is responding.');
                } else {
                    showStatus('error', `Connection failed: ${result ? result.error : 'Unknown error'}`);
                }
            } else {
                // Fallback test for when AIHandler is not available
                showStatus('success', 'Configuration saved. Test will be available after page refresh.');
            }
        } catch (error) {
            console.error('Test connection error:', error);
            showStatus('error', `Connection test failed: ${error.message}`);
        }
    }

    function showStatus(type, message) {
        console.log(`Status: ${type} - ${message}`);
        
        if (!aiStatus || !statusText) {
            // Fallback: show alert if status elements not found
            if (type === 'error') {
                console.error(message);
            }
            return;
        }

        statusText.textContent = message;
        aiStatus.className = `status-display ${type}`;
        aiStatus.style.display = 'block';

        if (type !== 'testing') {
            setTimeout(() => {
                aiStatus.style.display = 'none';
            }, 3000);
        }
    }

    // Initialize API key toggle functionality
    const toggleApiKeyBtn = document.getElementById('toggleApiKey');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');

    if (toggleApiKeyBtn && apiKeyInput && eyeIcon && eyeOffIcon) {
        toggleApiKeyBtn.addEventListener('click', function() {
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
                eyeIcon.classList.add('icon-hidden');
                eyeOffIcon.classList.remove('icon-hidden');
            } else {
                apiKeyInput.type = 'password';
                eyeIcon.classList.remove('icon-hidden');
                eyeOffIcon.classList.add('icon-hidden');
            }
        });
    }

    // Screenshot Full Page
    const screenshotFullBtn = document.getElementById('screenshot-full');
    if (screenshotFullBtn) {
        screenshotFullBtn.addEventListener('click', () => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0]?.id) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'screenshot_full_translate' });
                    window.close(); // Close popup after triggering screenshot
                }
            });
        });
    }

    // Screenshot Area
    const screenshotAreaBtn = document.getElementById('screenshot-area');
    if (screenshotAreaBtn) {
        screenshotAreaBtn.addEventListener('click', () => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0]?.id) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'screenshot_area_translate' });
                    window.close(); // Close popup after triggering screenshot
                }
            });
        });
    }

    // Translation page functionality (if it exists)
    const translatePageBtn = document.getElementById('translate-page');
    if (translatePageBtn) {
        translatePageBtn.addEventListener('click', async () => {
            // Add translation page functionality here if needed
            console.log('Translate page clicked');
        });
    }
});