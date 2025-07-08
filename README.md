# TextMind Pro - Professional AI Text Assistant

A powerful Chrome extension that transforms text selection into an intelligent AI-powered experience. Select any text on any webpage to get instant AI explanations, translations, custom prompts, and more using multiple AI providers including OpenAI, Claude, Gemini, and custom APIs.

## Features

### Multi-Provider AI Support
- **OpenAI** - GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo
- **Anthropic Claude** - Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus  
- **Google Gemini** - Gemini 2.0 Flash, Gemini 1.5 Flash, Gemini 1.5 Pro
- **Cerebras AI** - Llama 3.1 8B/70B, Llama 3.3 70B (ultra-fast inference)
- **OpenRouter** - Access to 100+ models through one API
- **Custom APIs** - Any OpenAI-compatible endpoint (Ollama, LocalAI, etc.)

### Smart Text Actions
- **AI Explain** - Instant explanations of selected text
- **Custom Prompts** - Ask anything about the selected content
- **Translation** - Translate to 50+ languages
- **Copy & Search** - Quick clipboard and search actions

### Interactive Chat
- **Docked Chat Window** - Draggable, persistent chat interface
- **Context Awareness** - Automatically includes selected text
- **Follow-up Questions** - Continue conversations about the content

### Professional UI
- **Smart Positioning** - Tooltip adapts to viewport boundaries
- **Dark Mode Support** - Multiple beautiful dark themes
- **Responsive Design** - Works on all screen sizes
- **Exclusion Zones** - Intelligent selection detection

## Installation & Setup

### Quick Start
1. **Download** the extension files
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right)
4. **Click "Load unpacked"** and select the extension folder
5. **Configure AI Provider** - Click the extension icon and set up your preferred AI service

### AI Provider Setup
- **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com/api-keys)
- **Claude**: Get API key from [console.anthropic.com](https://console.anthropic.com/)
- **Gemini**: Get API key from [makersuite.google.com](https://makersuite.google.com/app/apikey)
- **Custom**: Use any OpenAI-compatible endpoint (Ollama, LocalAI, etc.)

## How to Use

1. **Select any text** on any webpage
2. **Choose an action** from the tooltip that appears:
   - **Explain** - Get AI explanation of the selected text
   - **Ask** - Enter a custom prompt about the selection
   - **Translate** - Translate to your preferred language
   - **Copy** - Copy text to clipboard
   - **Search** - Search the text on Google
3. **Open chat dock** for extended conversations
4. **Configure providers** via the extension popup

## Supported Platforms

- **Local AI**: Ollama, LocalAI, LM Studio
- **Cloud APIs**: OpenAI, Anthropic, Google AI
- **Custom Endpoints**: Any OpenAI-compatible API

## Architecture

- `manifest.json`: Extension configuration and permissions
- `providers.js`: Multi-provider AI system with OpenAI-compatible APIs
- `content.js`: Text selection detection and UI management
- `ai-config.js`: Dynamic AI configuration and API handling
- `popup.js/html`: Settings interface for provider configuration
- `style.css`: Professional UI styling with dark mode support

## Development Notes

- **Multi-Provider System**: Easily extensible to support new AI providers
- **OpenAI Compatibility**: Works with any OpenAI-compatible API
- **Secure Storage**: API keys stored securely in Chrome sync storage
- **Modern Architecture**: Clean, modular code structure
- **Professional Design**: Beautiful, responsive UI with multiple themes

## What's New in v2.0

- **Multi-Provider Support** - OpenAI, Claude, Gemini, and custom APIs
- **Professional Rebranding** - New name, logo, and polished UI
- **Enhanced Configuration** - Easy provider switching and testing
- **Improved Architecture** - Modular, extensible codebase
- **Better Documentation** - Comprehensive setup guides

## License

This project is open source and available under the ISC License.