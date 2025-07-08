// AI Providers Configuration
// Supports multiple AI providers with OpenAI-compatible APIs

(function() {
    'use strict';

    // AI Provider configurations
    window.AIProviders = {
        // Google Gemini (existing)
        gemini: {
            name: 'Google Gemini',
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
            apiKeyParam: 'key',
            models: [], // Dynamic loading
            defaultModel: 'gemini-2.0-flash-exp',
            requestFormat: 'gemini',
            requiresApiKey: true,
            modelsEndpoint: '/models',
            modelFilter: (model) => model.supportedGenerationMethods && 
                (model.supportedGenerationMethods.includes('generateContent') ||
                 model.supportedGenerationMethods.includes('generateText'))
        },

        // OpenAI
        openai: {
            name: 'OpenAI',
            baseUrl: 'https://api.openai.com/v1',
            apiKeyHeader: 'Authorization',
            models: [], // Dynamic loading
            defaultModel: 'gpt-4o-mini',
            requestFormat: 'openai',
            requiresApiKey: true,
            modelsEndpoint: '/models',
            modelFilter: (model) => model.id.includes('gpt') && !model.id.includes('instruct')
        },

        // Anthropic Claude
        anthropic: {
            name: 'Anthropic Claude',
            baseUrl: 'https://api.anthropic.com/v1',
            apiKeyHeader: 'x-api-key',
            models: [], // Dynamic loading
            defaultModel: 'claude-3-5-sonnet-20241022',
            requestFormat: 'anthropic',
            requiresApiKey: true,
            additionalHeaders: {
                'anthropic-version': '2023-06-01'
            },
            modelsEndpoint: '/models',
            modelFilter: (model) => model.type === 'model'
        },

        // Custom OpenAI-compatible endpoint
        custom: {
            name: 'Custom OpenAI-Compatible',
            baseUrl: '', // User configurable
            apiKeyHeader: 'Authorization',
            models: [], // User configurable
            defaultModel: '',
            requestFormat: 'openai',
            requiresApiKey: true,
            customizable: true
        },

        // OpenRouter (popular OpenAI-compatible service)
        openrouter: {
            name: 'OpenRouter',
            baseUrl: 'https://openrouter.ai/api/v1',
            apiKeyHeader: 'Authorization',
            models: [], // Dynamic loading
            defaultModel: 'anthropic/claude-3.5-sonnet',
            requestFormat: 'openai',
            requiresApiKey: true,
            additionalHeaders: {
                'HTTP-Referer': 'https://textmind-pro.extension',
                'X-Title': 'TextMind Pro'
            },
            modelsEndpoint: '/models',
            modelFilter: (model) => model.context_length && model.context_length > 1000
        },

        // Cerebras AI (ultra-fast inference)
        cerebras: {
            name: 'Cerebras AI',
            baseUrl: 'https://api.cerebras.ai/v1',
            apiKeyHeader: 'Authorization',
            models: [], // Dynamic loading
            defaultModel: 'llama3.1-8b',
            requestFormat: 'cerebras',
            requiresApiKey: true,
            modelsEndpoint: '/models',
            modelFilter: (model) => model.id && !model.id.includes('deprecated')
        },

        // Groq (ultra-fast inference)
        groq: {
            name: 'Groq',
            baseUrl: 'https://api.groq.com/openai/v1',
            apiKeyHeader: 'Authorization',
            models: [], // Dynamic loading - Groq DOES provide /models endpoint!
            defaultModel: 'llama-3.1-8b-instant',
            requestFormat: 'groq',
            requiresApiKey: true,
            modelsEndpoint: '/models',
            modelFilter: (model) => model.object === 'model'
        }
    };

    // Request formatters for different API types
    window.AIRequestFormatters = {
        gemini: {
            formatRequest: (prompt, model) => ({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 1,
                    responseMimeType: "text/plain"
                }
            }),
            
            formatUrl: (baseUrl, model, apiKey) => 
                `${baseUrl}/models/${model}:generateContent?key=${apiKey}`,
            
            extractResponse: (data) => 
                data?.candidates?.[0]?.content?.parts?.[0]?.text,
            
            getHeaders: () => ({
                'Content-Type': 'application/json'
            })
        },

        openai: {
            formatRequest: (prompt, model) => ({
                model: model,
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 4000
            }),
            
            formatUrl: (baseUrl, model, apiKey) => 
                `${baseUrl}/chat/completions`,
            
            extractResponse: (data) => 
                data?.choices?.[0]?.message?.content,
            
            getHeaders: (apiKey) => ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            })
        },

        anthropic: {
            formatRequest: (prompt, model) => ({
                model: model,
                max_tokens: 4000,
                messages: [
                    { role: 'user', content: prompt }
                ]
            }),
            
            formatUrl: (baseUrl, model, apiKey) => 
                `${baseUrl}/messages`,
            
            extractResponse: (data) => 
                data?.content?.[0]?.text,
            
            getHeaders: (apiKey) => ({
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            })
        },

        cerebras: {
            formatRequest: (prompt, model) => ({
                model: model,
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1024
                // Cerebras supports basic OpenAI parameters but not frequency_penalty, etc.
            }),
            
            formatUrl: (baseUrl, model, apiKey) => 
                `${baseUrl}/chat/completions`,
            
            extractResponse: (data) => 
                data?.choices?.[0]?.message?.content,
            
            getHeaders: (apiKey) => ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            })
        },

        groq: {
            formatRequest: (prompt, model) => ({
                model: model,
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 1,
                stream: false
                // Based on official Groq API reference
            }),
            
            formatUrl: (baseUrl, model, apiKey) => 
                `${baseUrl}/chat/completions`,
            
            extractResponse: (data) => 
                data?.choices?.[0]?.message?.content,
            
            getHeaders: (apiKey) => ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            })
        }
    };

    // Main AI API handler
    window.AIHandler = {
        async loadModels(providerId, apiKey) {
            try {
                const provider = window.AIProviders[providerId];
                if (!provider) {
                    throw new Error(`Unknown provider: ${providerId}`);
                }
                
                // If provider doesn't have modelsEndpoint, use static models
                if (!provider.modelsEndpoint) {
                    if (provider.models && provider.models.length > 0) {
                        console.log(`Using static models for ${providerId}:`, provider.models.length, 'models');
                        return provider.models;
                    } else {
                        throw new Error(`Provider ${providerId} has no models configured`);
                    }
                }

                let url = `${provider.baseUrl}${provider.modelsEndpoint}`;
                const headers = {
                    'Content-Type': 'application/json'
                };

                // Handle different authentication methods
                if (provider.apiKeyParam) {
                    // Gemini uses URL parameter authentication
                    url += `?${provider.apiKeyParam}=${apiKey}`;
                } else if (provider.apiKeyHeader === 'Authorization') {
                    headers['Authorization'] = `Bearer ${apiKey}`;
                } else if (provider.apiKeyHeader) {
                    headers[provider.apiKeyHeader] = apiKey;
                }

                // Add any additional headers
                if (provider.additionalHeaders) {
                    Object.assign(headers, provider.additionalHeaders);
                }

                console.log(`Loading models for ${providerId}:`, { url, headers: {...headers, Authorization: '[HIDDEN]'} });

                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    const errorText = await response.text().catch(() => 'Unknown error');
                    console.error(`API Error for ${providerId}:`, response.status, response.statusText, errorText);
                    throw new Error(`Failed to fetch models: ${response.status} ${response.statusText} - ${errorText}`);
                }

                const data = await response.json();
                let models = [];

                // Handle different API response formats
                if (data.data && Array.isArray(data.data)) {
                    // OpenAI/Groq/Cerebras format
                    models = data.data;
                } else if (data.models && Array.isArray(data.models)) {
                    // Gemini format
                    models = data.models;
                } else if (Array.isArray(data)) {
                    // Direct array format
                    models = data;
                } else {
                    throw new Error('Unexpected API response format');
                }

                // Apply provider-specific filtering
                if (provider.modelFilter && typeof provider.modelFilter === 'function') {
                    models = models.filter(provider.modelFilter);
                }

                // Transform to consistent format
                const transformedModels = models.map(model => {
                    // Handle different model object structures
                    let id, name;
                    
                    if (typeof model === 'string') {
                        id = name = model;
                    } else if (model.id) {
                        id = model.id;
                        name = model.name || model.display_name || model.id;
                    } else if (model.name) {
                        // Gemini format
                        id = model.name.replace('models/', '');
                        name = model.displayName || id;
                    } else {
                        return null;
                    }

                    return { id, name };
                }).filter(Boolean);

                // Update the provider's models cache
                provider.models = transformedModels;

                return transformedModels;

            } catch (error) {
                console.error(`Failed to load models for ${providerId}:`, error);
                // Return fallback models if available
                return this.getFallbackModels(providerId);
            }
        },

        getFallbackModels(providerId) {
            const fallbackModels = {
                gemini: [
                    { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Experimental)' },
                    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
                    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
                    { id: 'gemini-pro', name: 'Gemini Pro' }
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
                    { id: 'llama-3.1-405b-reasoning', name: 'Llama 3.1 405B Reasoning' },
                    { id: 'llama-3.2-11b-vision-preview', name: 'Llama 3.2 11B Vision' },
                    { id: 'llama-3.2-3b-preview', name: 'Llama 3.2 3B' },
                    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
                    { id: 'gemma2-9b-it', name: 'Gemma 2 9B' }
                ],
                cerebras: [
                    { id: 'llama3.1-8b', name: 'Llama 3.1 8B' },
                    { id: 'llama3.1-70b', name: 'Llama 3.1 70B' },
                    { id: 'llama-3.3-70b', name: 'Llama 3.3 70B' }
                ],
                openrouter: [
                    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
                    { id: 'openai/gpt-4o', name: 'GPT-4o' }
                ]
            };

            return fallbackModels[providerId] || [];
        },

        async makeRequest(prompt, providerConfig, model, apiKey) {
            const formatter = window.AIRequestFormatters[providerConfig.requestFormat];
            if (!formatter) {
                throw new Error(`Unsupported request format: ${providerConfig.requestFormat}`);
            }

            const url = formatter.formatUrl(providerConfig.baseUrl, model, apiKey);
            const requestBody = formatter.formatRequest(prompt, model);
            const headers = formatter.getHeaders(apiKey);

            // Add any additional headers from provider config
            if (providerConfig.additionalHeaders) {
                Object.assign(headers, providerConfig.additionalHeaders);
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const responseText = formatter.extractResponse(data);

            if (!responseText) {
                throw new Error('No response from AI model');
            }

            return responseText;
        },

        async testConnection(providerId, model, apiKey, customConfig = null) {
            try {
                let providerConfig = window.AIProviders[providerId];
                
                // Handle custom provider configuration
                if (providerId === 'custom' && customConfig) {
                    providerConfig = { ...providerConfig, ...customConfig };
                }

                if (!providerConfig) {
                    throw new Error(`Unknown provider: ${providerId}`);
                }

                // console.log(`Testing connection for ${providerId}:`, { provider: providerConfig.name, model });

                const testPrompt = "Hello! This is a connection test. Please respond with 'Connection successful!'";
                const response = await this.makeRequest(testPrompt, providerConfig, model, apiKey);
                
                return { success: true, message: 'Connection successful!', response };
            } catch (error) {
                console.error(`Test connection failed for ${providerId}:`, error);
                return { success: false, error: error.message };
            }
        }
    };

})();