# Changelog - TextMind Pro

## [2.0.0] - 2024-12-19

### 🎉 Major Release - Complete Rebranding & Multi-Provider Support

#### ✨ Added
- **Multi-Provider AI Support**
  - OpenAI (GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-3.5 Turbo)
  - Anthropic Claude (Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus)
  - Google Gemini (Gemini 2.0 Flash, Gemini 1.5 Flash, Gemini 1.5 Pro)
  - Custom OpenAI-compatible APIs (Ollama, LocalAI, OpenRouter, etc.)

- **Professional Rebranding**
  - New name: "TextMind Pro" (was "SmartSelect AI")
  - Professional gradient logo with neural network design
  - Updated extension description and branding

- **Enhanced Configuration System**
  - Provider selection dropdown in popup
  - Dynamic UI that adapts to selected provider
  - Custom API endpoint configuration
  - Connection testing before saving
  - Secure storage of all provider settings

- **New Architecture**
  - `providers.js` - Centralized provider management
  - Modular request formatters for each API type
  - Universal AI handler for all providers
  - Backward compatibility with existing configurations

#### 🔄 Changed
- Extension name: "SmartSelect Ai" → "TextMind Pro"
- Version bump: 1.0 → 2.0
- Package name: Updated to reflect new branding
- Improved popup UI with provider-specific fields
- Enhanced error handling and user feedback

#### 🛠️ Technical Improvements
- Unified API request system across all providers
- Automatic request format detection
- Provider-specific response parsing
- Enhanced configuration validation
- Better error messages and status indicators

#### 📚 Documentation
- New `README_PROVIDERS.md` with setup guides
- Updated main README with new features
- Added changelog for version tracking
- Comprehensive provider configuration examples

#### 🎨 UI/UX Enhancements
- Professional gradient icons (16px, 48px, 128px)
- Improved popup layout and styling
- Better visual feedback for configuration states
- Provider-specific placeholder text and labels

### 🔧 Migration Notes
- Existing Gemini configurations will continue to work
- Users can now add additional providers alongside Gemini
- All settings are preserved during the update
- New provider options available in extension popup

---

## [1.1.0] - Previous Version
- Basic Gemini AI integration
- Text selection tooltip
- Translation features
- Dark mode support
- Chat dock functionality

## [1.0.0] - Initial Release
- Core text selection functionality
- Basic AI integration (placeholder)
- Tooltip and chat interface
- Copy and search actions