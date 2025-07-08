# Multi-Provider AI Support

This extension now supports multiple AI providers with OpenAI-compatible APIs.

## Supported Providers

### 1. Google Gemini (Default)
- **Models**: Gemini 2.0 Flash, Gemini 1.5 Flash, Gemini 1.5 Pro
- **API Key**: Google AI API Key
- **Endpoint**: Google's Generative Language API

### 2. OpenAI
- **Models**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo
- **API Key**: OpenAI API Key
- **Endpoint**: OpenAI Chat Completions API

### 3. Anthropic Claude
- **Models**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- **API Key**: Anthropic API Key
- **Endpoint**: Anthropic Messages API

### 4. Cerebras AI
- **Models**: Llama 3.1 8B, Llama 3.1 70B, Llama 3.3 70B
- **API Key**: Cerebras AI API Key
- **Endpoint**: Cerebras AI ultra-fast inference API
- **Special Feature**: Extremely fast inference speeds

### 5. Custom OpenAI-Compatible
- **Models**: User-defined
- **API Key**: Optional (depends on provider)
- **Endpoint**: User-defined base URL
- **Compatible with**: Any OpenAI-compatible API (Ollama, LocalAI, etc.)

## Configuration

1. Open the extension popup
2. Select your preferred AI provider from the dropdown
3. Enter your API key (if required)
4. For custom providers, also enter:
   - Base URL (e.g., `https://api.example.com/v1`)
   - Model name (e.g., `llama2:7b`)
5. Select a model from the available options
6. Click "Test" to verify the connection
7. Click "Save" to store your configuration

## API Key Setup

### Google Gemini
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into the extension

### OpenAI
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Copy and paste into the extension

### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Copy and paste into the extension

### Cerebras AI
1. Visit [Cerebras AI Platform](https://inference.cerebras.ai/)
2. Sign up and get your API key
3. Copy and paste into the extension

### Custom Providers
Examples of compatible services:
- **Ollama**: `http://localhost:11434/v1`
- **LocalAI**: `http://localhost:8080/v1`
- **OpenRouter**: `https://openrouter.ai/api/v1`
- **Together AI**: `https://api.together.xyz/v1`

## Features

- **Automatic Provider Detection**: The extension automatically formats requests based on the selected provider
- **Connection Testing**: Test your configuration before saving
- **Fallback Support**: Graceful fallback to default models if API calls fail
- **Secure Storage**: API keys are stored securely in Chrome's sync storage
- **Cross-Device Sync**: Settings sync across your Chrome browsers

## Technical Details

The multi-provider system uses:
- `providers.js`: Provider configurations and request formatters
- `ai-config.js`: Dynamic configuration management
- `popup.js`: UI for provider selection and configuration

Each provider has its own request format and response parsing logic, ensuring compatibility with different API specifications.