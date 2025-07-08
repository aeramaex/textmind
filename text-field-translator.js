// Enhanced Text Field Translation Feature for TextMind Pro
// Modern UI with search-based language selection, copy/replace functionality

(function() {
    'use strict';

    // State management
    let isEnabled = true;
    let currentLanguage = 'english';
    let translationCache = new Map();
    let activePopup = null;
    let currentField = null;
    let isDarkMode = false;

    // Language definitions (consistent with popup)
    const ALL_LANGUAGES = {
        'english': 'English',
        'spanish': 'Español (Spanish)',
        'french': 'Français (French)',
        'german': 'Deutsch (German)',
        'italian': 'Italiano (Italian)',
        'portuguese': 'Português (Portuguese)',
        'russian': 'Русский (Russian)',
        'chinese_simplified': '中文 (简体) (Chinese Simplified)',
        'chinese_traditional': '中文 (繁體) (Chinese Traditional)',
        'japanese': '日本語 (Japanese)',
        'korean': '한국어 (Korean)',
        'arabic': 'العربية (Arabic)',
        'hindi': 'हिंदी (Hindi)',
        'dutch': 'Nederlands (Dutch)',
        'polish': 'Polski (Polish)',
        'turkish': 'Türkçe (Turkish)',
        'swedish': 'Svenska (Swedish)',
        'norwegian': 'Norsk (Norwegian)',
        'danish': 'Dansk (Danish)',
        'finnish': 'Suomi (Finnish)',
        'greek': 'Ελληνικά (Greek)',
        'hebrew': 'עברית (Hebrew)',
        'thai': 'ไทย (Thai)',
        'vietnamese': 'Tiếng Việt (Vietnamese)',
        'indonesian': 'Bahasa Indonesia (Indonesian)',
        'malay': 'Bahasa Melayu (Malay)',
        'filipino': 'Filipino (Filipino)',
        'czech': 'Čeština (Czech)',
        'slovak': 'Slovenčina (Slovak)',
        'hungarian': 'Magyar (Hungarian)',
        'romanian': 'Română (Romanian)',
        'bulgarian': 'Български (Bulgarian)',
        'croatian': 'Hrvatski (Croatian)',
        'serbian': 'Српски (Serbian)',
        'slovenian': 'Slovenščina (Slovenian)',
        'estonian': 'Eesti (Estonian)',
        'latvian': 'Latviešu (Latvian)',
        'lithuanian': 'Lietuvių (Lithuanian)',
        'ukrainian': 'Українська (Ukrainian)',
        'belarusian': 'Беларуская (Belarusian)',
        'icelandic': 'Íslenska (Icelandic)',
        'irish': 'Gaeilge (Irish)',
        'welsh': 'Cymraeg (Welsh)',
        'scottish_gaelic': 'Gàidhlig (Scottish Gaelic)',
        'catalan': 'Català (Catalan)',
        'basque': 'Euskera (Basque)',
        'galician': 'Galego (Galician)',
        'maltese': 'Malti (Maltese)',
        'albanian': 'Shqip (Albanian)',
        'macedonian': 'Македонски (Macedonian)',
        'bosnian': 'Bosanski (Bosnian)',
        'montenegrin': 'Crnogorski (Montenegrin)',
        'bengali': 'বাংলা (Bengali)',
        'urdu': 'اردو (Urdu)',
        'punjabi': 'ਪੰਜਾਬੀ (Punjabi)',
        'gujarati': 'ગુજરાતી (Gujarati)',
        'marathi': 'मराठी (Marathi)',
        'tamil': 'தமிழ் (Tamil)',
        'telugu': 'తెలుగు (Telugu)',
        'kannada': 'ಕನ್ನಡ (Kannada)',
        'malayalam': 'മലയാളം (Malayalam)',
        'sinhalese': 'සිංහල (Sinhalese)',
        'nepali': 'नेपाली (Nepali)',
        'burmese': 'မြန်မာ (Burmese)',
        'khmer': 'ខ្មែរ (Khmer)',
        'lao': 'ລາວ (Lao)',
        'mongolian': 'Монгол (Mongolian)',
        'tibetan': 'བོད་ཡིག (Tibetan)',
        'georgian': 'ქართული (Georgian)',
        'armenian': 'Հայերեն (Armenian)',
        'azerbaijani': 'Azərbaycan (Azerbaijani)',
        'kazakh': 'Қазақ (Kazakh)',
        'kyrgyz': 'Кыргыз (Kyrgyz)',
        'uzbek': 'Oʻzbek (Uzbek)',
        'tajik': 'Тоҷикӣ (Tajik)',
        'turkmen': 'Türkmen (Turkmen)',
        'persian': 'فارسی (Persian)',
        'pashto': 'پښتو (Pashto)',
        'dari': 'دری (Dari)',
        'kurdish': 'Kurdî (Kurdish)',
        'amharic': 'አማርኛ (Amharic)',
        'tigrinya': 'ትግርኛ (Tigrinya)',
        'oromo': 'Oromoo (Oromo)',
        'somali': 'Soomaali (Somali)',
        'swahili': 'Kiswahili (Swahili)',
        'yoruba': 'Yorùbá (Yoruba)',
        'igbo': 'Igbo (Igbo)',
        'hausa': 'Hausa (Hausa)',
        'zulu': 'isiZulu (Zulu)',
        'xhosa': 'isiXhosa (Xhosa)',
        'afrikaans': 'Afrikaans (Afrikaans)',
        'malagasy': 'Malagasy (Malagasy)'
    };

    const LANGUAGE_FLAGS = {
        'english': '🇺🇸',
        'spanish': '🇪🇸',
        'french': '🇫🇷',
        'german': '🇩🇪',
        'italian': '🇮🇹',
        'portuguese': '🇵🇹',
        'russian': '🇷🇺',
        'chinese_simplified': '🇨🇳',
        'chinese_traditional': '🇹🇼',
        'japanese': '🇯🇵',
        'korean': '🇰🇷',
        'arabic': '🇸🇦',
        'hindi': '🇮🇳',
        'dutch': '🇳🇱',
        'polish': '🇵🇱',
        'turkish': '🇹🇷',
        'swedish': '🇸🇪',
        'norwegian': '🇳🇴',
        'danish': '🇩🇰',
        'finnish': '🇫🇮',
        'greek': '🇬🇷',
        'hebrew': '🇮🇱',
        'thai': '🇹🇭',
        'vietnamese': '🇻🇳',
        'indonesian': '🇮🇩',
        'malay': '🇲🇾',
        'filipino': '🇵🇭',
        'czech': '🇨🇿',
        'slovak': '🇸🇰',
        'hungarian': '🇭🇺',
        'romanian': '🇷🇴',
        'bulgarian': '🇧🇬',
        'croatian': '🇭🇷',
        'serbian': '🇷🇸',
        'slovenian': '🇸🇮',
        'estonian': '🇪🇪',
        'latvian': '🇱🇻',
        'lithuanian': '🇱🇹',
        'ukrainian': '🇺🇦',
        'belarusian': '🇧🇾',
        'icelandic': '🇮🇸',
        'irish': '🇮🇪',
        'welsh': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
        'scottish_gaelic': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        'catalan': '🇪🇸',
        'basque': '🇪🇸',
        'galician': '🇪🇸',
        'maltese': '🇲🇹',
        'albanian': '🇦🇱',
        'macedonian': '🇲🇰',
        'bosnian': '🇧🇦',
        'montenegrin': '🇲🇪',
        'bengali': '🇧🇩',
        'urdu': '🇵🇰',
        'punjabi': '🇮🇳',
        'gujarati': '🇮🇳',
        'marathi': '🇮🇳',
        'tamil': '🇮🇳',
        'telugu': '🇮🇳',
        'kannada': '🇮🇳',
        'malayalam': '🇮🇳',
        'sinhalese': '🇱🇰',
        'nepali': '🇳🇵',
        'burmese': '🇲🇲',
        'khmer': '🇰🇭',
        'lao': '🇱🇦',
        'mongolian': '🇲🇳',
        'tibetan': '🇨🇳',
        'georgian': '🇬🇪',
        'armenian': '🇦🇲',
        'azerbaijani': '🇦🇿',
        'kazakh': '🇰🇿',
        'kyrgyz': '🇰🇬',
        'uzbek': '🇺🇿',
        'tajik': '🇹🇯',
        'turkmen': '🇹🇲',
        'persian': '🇮🇷',
        'pashto': '🇦🇫',
        'dari': '🇦🇫',
        'kurdish': '🇮🇶',
        'amharic': '🇪🇹',
        'tigrinya': '🇪🇷',
        'oromo': '🇪🇹',
        'somali': '🇸🇴',
        'swahili': '🇰🇪',
        'yoruba': '🇳🇬',
        'igbo': '🇳🇬',
        'hausa': '🇳🇬',
        'zulu': '🇿🇦',
        'xhosa': '🇿🇦',
        'afrikaans': '🇿🇦',
        'malagasy': '🇲🇬'
    };

    // Initialize the feature
    function init() {
        loadSettings();
        setupEventListeners();
        injectStyles();
        
        // Listen for settings updates
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.onMessage.addListener(handleMessage);
        }
    }

    // Load settings from storage
    function loadSettings() {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['textFieldTranslationEnabled', 'targetLanguage', 'selectedTheme'], function(result) {
                isEnabled = result.textFieldTranslationEnabled !== false;
                currentLanguage = result.targetLanguage || 'english';
                
                // Handle theme
                const theme = result.selectedTheme || 'device';
                if (theme === 'device') {
                    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                } else {
                    isDarkMode = theme !== 'light';
                }
            });
        }
    }

    // Handle messages from popup/background
    function handleMessage(request, sender, sendResponse) {
        switch (request.action) {
            case 'updateTextFieldTranslationSettings':
                loadSettings();
                break;
            case 'updateTheme':
                isDarkMode = request.darkMode;
                updateTheme();
                break;
        }
        sendResponse({success: true});
    }

    // Update theme for existing elements
    function updateTheme() {
        if (activePopup) {
            activePopup.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        }
    }

    // Setup event listeners for form fields
    function setupEventListeners() {
        // Use event delegation for dynamic content
        document.addEventListener('focusin', handleFieldFocus);
        document.addEventListener('focusout', handleFieldBlur);
        document.addEventListener('input', handleFieldInput);
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('click', handleDocumentClick);
        
        // Handle dynamic content changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            checkNewFields(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Check if element is a translatable field
    function isTranslatableField(element) {
        if (!element || !isEnabled) return false;
        
        const tagName = element.tagName.toLowerCase();
        const type = element.type ? element.type.toLowerCase() : '';
        
        // Input fields
        if (tagName === 'input') {
            const supportedTypes = ['text', 'email', 'search', 'url', 'tel'];
            return supportedTypes.includes(type);
        }
        
        // Textareas
        if (tagName === 'textarea') return true;
        
        // Content editable elements
        if (element.contentEditable === 'true') return true;
        
        return false;
    }

    // Check newly added fields
    function checkNewFields(container) {
        const fields = container.querySelectorAll('input[type="text"], input[type="email"], input[type="search"], input[type="url"], input[type="tel"], textarea, [contenteditable="true"]');
        fields.forEach(field => {
            if (isTranslatableField(field)) {
                setupFieldTranslation(field);
            }
        });
    }

    // Setup translation for a specific field
    function setupFieldTranslation(field) {
        if (field.dataset.textmindSetup) return; // Already setup
        field.dataset.textmindSetup = 'true';
        
        // Create wrapper if needed
        let wrapper = field.parentElement;
        if (!wrapper.classList.contains('textmind-field-wrapper')) {
            wrapper = document.createElement('div');
            wrapper.className = 'textmind-field-wrapper';
            field.parentNode.insertBefore(wrapper, field);
            wrapper.appendChild(field);
        }
    }

    // Handle field focus
    function handleFieldFocus(event) {
        const field = event.target;
        if (!isTranslatableField(field)) return;
        
        setupFieldTranslation(field);
        currentField = field;
        
        // Show translation button if field has content
        setTimeout(() => {
            updateTranslationButton(field);
        }, 100);
    }

    // Handle field blur
    function handleFieldBlur(event) {
        const field = event.target;
        if (!isTranslatableField(field)) return;
        
        // Hide translation button after a delay
        setTimeout(() => {
            if (document.activeElement !== field && !activePopup) {
                hideTranslationButton(field);
            }
        }, 200);
    }

    // Handle field input
    function handleFieldInput(event) {
        const field = event.target;
        if (!isTranslatableField(field)) return;
        
        updateTranslationButton(field);
    }

    // Handle keyboard shortcuts
    function handleKeydown(event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyT') {
            event.preventDefault();
            if (currentField && isTranslatableField(currentField)) {
                showTranslationPopup(currentField);
            }
        }
        
        // Handle Escape key to close popup
        if (event.code === 'Escape' && activePopup) {
            closeTranslationPopup();
        }
    }

    // Handle document clicks
    function handleDocumentClick(event) {
        // Close popup if clicking outside
        if (activePopup && !activePopup.contains(event.target) && !event.target.closest('.textmind-translate-btn')) {
            closeTranslationPopup();
        }
    }

    // Update translation button visibility
    function updateTranslationButton(field) {
        if (!isEnabled) return;
        
        const wrapper = field.closest('.textmind-field-wrapper');
        if (!wrapper) return;
        
        let button = wrapper.querySelector('.textmind-translate-btn');
        const hasContent = getFieldText(field).trim().length > 0;
        
        if (hasContent) {
            if (!button) {
                button = createTranslationButton(field);
                wrapper.appendChild(button);
            }
            button.style.display = 'flex';
        } else if (button) {
            button.style.display = 'none';
        }
    }

    // Hide translation button
    function hideTranslationButton(field) {
        const wrapper = field.closest('.textmind-field-wrapper');
        if (!wrapper) return;
        
        const button = wrapper.querySelector('.textmind-translate-btn');
        if (button) {
            button.style.display = 'none';
        }
    }

    // Create translation button
    function createTranslationButton(field) {
        const button = document.createElement('button');
        button.className = 'textmind-translate-btn';
        button.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        `;
        button.title = 'Translate text (Ctrl+Shift+T)';
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showTranslationPopup(field);
        });
        
        return button;
    }

    // Get text content from field
    function getFieldText(field) {
        if (field.contentEditable === 'true') {
            return field.textContent || '';
        }
        return field.value || '';
    }

    // Set text content in field
    function setFieldText(field, text) {
        if (field.contentEditable === 'true') {
            field.textContent = text;
            // Trigger input event
            field.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            field.value = text;
            // Trigger input and change events
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    // Show translation popup
    function showTranslationPopup(field) {
        const text = getFieldText(field).trim();
        if (!text) return;
        
        // Close existing popup
        if (activePopup) {
            closeTranslationPopup();
        }
        
        // Create popup
        const popup = createTranslationPopup(text, field);
        document.body.appendChild(popup);
        activePopup = popup;
        
        // Position popup
        positionPopup(popup, field);
        
        // Animate in
        requestAnimationFrame(() => {
            popup.classList.add('show');
        });
        
        // Focus language search
        const languageSearch = popup.querySelector('.textmind-language-search');
        if (languageSearch) {
            setTimeout(() => languageSearch.focus(), 100);
        }
    }

    // Create translation popup
    function createTranslationPopup(text, field) {
        const popup = document.createElement('div');
        popup.className = 'textmind-translation-popup';
        popup.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        
        const flag = LANGUAGE_FLAGS[currentLanguage] || '🌐';
        const languageName = ALL_LANGUAGES[currentLanguage] || 'English';
        
        popup.innerHTML = `
            <div class="textmind-popup-header">
                <h3>🌐 Translate Text</h3>
                <button class="textmind-close-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="textmind-popup-content">
                <div class="textmind-text-section">
                    <label>Original Text:</label>
                    <div class="textmind-original-text">${escapeHtml(text)}</div>
                </div>
                
                <div class="textmind-language-section">
                    <label>Translate to:</label>
                    <div class="textmind-language-selector">
                        <div class="textmind-current-language">
                            <span class="language-flag">${flag}</span>
                            <span class="language-name">${languageName}</span>
                            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6,9 12,15 18,9"/>
                            </svg>
                        </div>
                        <div class="textmind-language-dropdown">
                            <input type="text" class="textmind-language-search" placeholder="Search languages..." />
                            <div class="textmind-language-list"></div>
                        </div>
                    </div>
                </div>
                
                <div class="textmind-translation-section">
                    <label>Translation:</label>
                    <div class="textmind-translation-result">
                        <div class="loading-placeholder">Click "Translate" to see translation</div>
                    </div>
                </div>
                
                <div class="textmind-actions">
                    <button class="textmind-btn textmind-btn-primary translate-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M2 12h20"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        Translate
                    </button>
                    <button class="textmind-btn textmind-btn-secondary copy-btn" disabled>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy
                    </button>
                    <button class="textmind-btn textmind-btn-secondary replace-btn" disabled>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="7.5,12 12,16.5 16.5,12"/>
                            <line x1="12" y1="7.5" x2="12" y2="16.5"/>
                        </svg>
                        Replace
                    </button>
                </div>
            </div>
        `;
        
        // Setup event listeners
        setupPopupEventListeners(popup, field);
        
        return popup;
    }

    // Setup popup event listeners
    function setupPopupEventListeners(popup, field) {
        // Close button
        popup.querySelector('.textmind-close-btn').addEventListener('click', closeTranslationPopup);
        
        // Language selector
        const languageSelector = popup.querySelector('.textmind-current-language');
        const languageDropdown = popup.querySelector('.textmind-language-dropdown');
        const languageSearch = popup.querySelector('.textmind-language-search');
        const languageList = popup.querySelector('.textmind-language-list');
        
        // Toggle dropdown
        languageSelector.addEventListener('click', () => {
            const isOpen = languageDropdown.classList.contains('open');
            if (isOpen) {
                languageDropdown.classList.remove('open');
            } else {
                languageDropdown.classList.add('open');
                populateLanguageList(languageList, '');
                languageSearch.focus();
            }
        });
        
        // Language search
        languageSearch.addEventListener('input', (e) => {
            populateLanguageList(languageList, e.target.value);
        });
        
        // Action buttons
        const translateBtn = popup.querySelector('.translate-btn');
        const copyBtn = popup.querySelector('.copy-btn');
        const replaceBtn = popup.querySelector('.replace-btn');
        
        translateBtn.addEventListener('click', () => translateText(popup, field));
        copyBtn.addEventListener('click', () => copyTranslation(popup));
        replaceBtn.addEventListener('click', () => replaceText(popup, field));
    }

    // Populate language list
    function populateLanguageList(container, filter) {
        container.innerHTML = '';
        
        const filteredLanguages = Object.entries(ALL_LANGUAGES)
            .filter(([code, name]) => 
                name.toLowerCase().includes(filter.toLowerCase()) ||
                code.toLowerCase().includes(filter.toLowerCase())
            )
            .slice(0, 50); // Show more languages for better user experience
        
        filteredLanguages.forEach(([code, name]) => {
            const item = document.createElement('div');
            item.className = 'textmind-language-item';
            if (code === currentLanguage) {
                item.classList.add('selected');
            }
            
            const flag = LANGUAGE_FLAGS[code] || '🌐';
            item.innerHTML = `
                <span class="language-flag">${flag}</span>
                <span class="language-name">${name}</span>
            `;
            
            item.addEventListener('click', () => selectLanguage(code, item.closest('.textmind-translation-popup')));
            container.appendChild(item);
        });
        
        if (filteredLanguages.length === 0) {
            container.innerHTML = '<div class="no-results">No languages found</div>';
        }
    }

    // Select language
    function selectLanguage(code, popup) {
        currentLanguage = code;
        
        // Update display
        const currentLanguageEl = popup.querySelector('.textmind-current-language');
        const flag = LANGUAGE_FLAGS[code] || '🌐';
        const name = ALL_LANGUAGES[code];
        
        currentLanguageEl.querySelector('.language-flag').textContent = flag;
        currentLanguageEl.querySelector('.language-name').textContent = name;
        
        // Close dropdown
        popup.querySelector('.textmind-language-dropdown').classList.remove('open');
        
        // Save preference
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.set({ targetLanguage: code });
        }
        
        // Reset translation if exists
        const translationResult = popup.querySelector('.textmind-translation-result');
        translationResult.innerHTML = '<div class="loading-placeholder">Click "Translate" to see translation</div>';
        
        // Reset buttons
        popup.querySelector('.copy-btn').disabled = true;
        popup.querySelector('.replace-btn').disabled = true;
    }

    // Translate text
    async function translateText(popup, field) {
        const originalText = getFieldText(field);
        const translateBtn = popup.querySelector('.translate-btn');
        const translationResult = popup.querySelector('.textmind-translation-result');
        const copyBtn = popup.querySelector('.copy-btn');
        const replaceBtn = popup.querySelector('.replace-btn');
        
        // Check cache first
        const cacheKey = `${originalText}:${currentLanguage}`;
        if (translationCache.has(cacheKey)) {
            const cached = translationCache.get(cacheKey);
            displayTranslation(translationResult, cached);
            copyBtn.disabled = false;
            replaceBtn.disabled = false;
            return;
        }
        
        // Show loading
        translateBtn.disabled = true;
        translateBtn.innerHTML = `
            <svg class="spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Translating...
        `;
        
        translationResult.innerHTML = '<div class="loading-placeholder spinning">Translating...</div>';
        
        try {
            // Request translation from background script
            const response = await new Promise((resolve, reject) => {
                if (typeof chrome !== 'undefined' && chrome.runtime) {
                    chrome.runtime.sendMessage({
                        action: 'translateText',
                        text: originalText,
                        targetLanguage: currentLanguage,
                        languageName: ALL_LANGUAGES[currentLanguage]
                    }, (response) => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                        } else {
                            resolve(response);
                        }
                    });
                } else {
                    reject(new Error('Extension context not available'));
                }
            });
            
            if (response && response.success) {
                const translation = response.translation;
                
                // Cache translation
                translationCache.set(cacheKey, translation);
                
                // Display translation
                displayTranslation(translationResult, translation);
                
                // Enable action buttons
                copyBtn.disabled = false;
                replaceBtn.disabled = false;
            } else {
                throw new Error(response?.error || 'Translation failed');
            }
        } catch (error) {
            console.error('Translation error:', error);
            translationResult.innerHTML = `<div class="error-placeholder">Translation failed: ${error.message}</div>`;
        } finally {
            // Reset translate button
            translateBtn.disabled = false;
            translateBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Translate
            `;
        }
    }

    // Display translation
    function displayTranslation(container, translation) {
        container.innerHTML = `<div class="translation-text">${escapeHtml(translation)}</div>`;
    }

    // Copy translation
    async function copyTranslation(popup) {
        const translationText = popup.querySelector('.translation-text');
        if (!translationText) return;
        
        const text = translationText.textContent;
        const copyBtn = popup.querySelector('.copy-btn');
        
        try {
            await navigator.clipboard.writeText(text);
            
            // Show feedback
            const originalHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
                Copied!
            `;
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHtml;
            }, 2000);
        } catch (error) {
            console.error('Copy failed:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    // Replace text in field
    function replaceText(popup, field) {
        const translationText = popup.querySelector('.translation-text');
        if (!translationText) return;
        
        const translation = translationText.textContent;
        const replaceBtn = popup.querySelector('.replace-btn');
        
        // Replace text in field
        setFieldText(field, translation);
        
        // Show feedback
        const originalHtml = replaceBtn.innerHTML;
        replaceBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
            </svg>
            Replaced!
        `;
        
        setTimeout(() => {
            replaceBtn.innerHTML = originalHtml;
        }, 2000);
        
        // Update translation button for the field
        updateTranslationButton(field);
    }

    // Position popup
    function positionPopup(popup, field) {
        const fieldRect = field.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Reset any previous positioning
        popup.style.position = 'fixed';
        popup.style.top = 'auto';
        popup.style.left = 'auto';
        popup.style.right = 'auto';
        popup.style.bottom = 'auto';
        popup.style.transform = 'none';
        popup.classList.remove('positioned-above');
        
        // Get field wrapper to position relative to it
        const wrapper = field.closest('.textmind-field-wrapper') || field.parentElement;
        const wrapperRect = wrapper.getBoundingClientRect();
        
        // Position relative to the wrapper
        const popupWidth = 360; // Fixed width for consistent positioning
        popup.style.width = popupWidth + 'px';
        
        // Calculate positions
        let top = wrapperRect.bottom + 12; // Below the field with some spacing
        let left = wrapperRect.left;
        
        // Adjust horizontal position if it goes off screen
        if (left + popupWidth > viewport.width - 16) {
            left = viewport.width - popupWidth - 16;
        }
        if (left < 16) {
            left = 16;
        }
        
        // Check if there's enough space below, otherwise position above
        const popupHeight = 400; // Approximate popup height
        let positionedAbove = false;
        
        if (top + popupHeight > viewport.height - 16) {
            // Position above the field
            top = wrapperRect.top - popupHeight - 12;
            positionedAbove = true;
            
            // If still not enough space above, position it in the center of viewport
            if (top < 16) {
                top = Math.max(16, (viewport.height - popupHeight) / 2);
                positionedAbove = false; // Reset since we're centering
            }
        }
        
        // Add positioning class for arrow styling
        if (positionedAbove) {
            popup.classList.add('positioned-above');
        }
        
        // Apply final positioning
        popup.style.top = top + 'px';
        popup.style.left = left + 'px';
        popup.style.zIndex = '2147483647'; // Ensure it's on top
        
        // Adjust arrow position based on field position
        const arrowOffset = Math.min(Math.max(wrapperRect.left - left + wrapperRect.width / 2 - 6, 12), popupWidth - 24);
        if (positionedAbove) {
            popup.style.setProperty('--arrow-left', arrowOffset + 'px');
        } else {
            popup.style.setProperty('--arrow-left', arrowOffset + 'px');
        }
    }

    // Close translation popup
    function closeTranslationPopup() {
        if (activePopup) {
            activePopup.classList.remove('show');
            setTimeout(() => {
                if (activePopup && activePopup.parentNode) {
                    activePopup.parentNode.removeChild(activePopup);
                }
                activePopup = null;
            }, 200);
        }
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Inject styles
    function injectStyles() {
        if (document.getElementById('textmind-field-translator-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'textmind-field-translator-styles';
        style.textContent = `
            /* Field wrapper */
            .textmind-field-wrapper {
                position: relative;
                display: inline-block;
                width: 100%;
            }
            
            /* Translation button */
            .textmind-translate-btn {
                position: absolute;
                top: 50%;
                right: 8px;
                transform: translateY(-50%);
                width: 24px;
                height: 24px;
                border: none;
                background: #3b82f6;
                color: white;
                border-radius: 4px;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                transition: all 0.2s ease;
                font-size: 0;
            }
            
            .textmind-translate-btn:hover {
                background: #2563eb;
                transform: translateY(-50%) scale(1.1);
            }
            
            .textmind-translate-btn svg {
                width: 14px;
                height: 14px;
            }
            
            .textmind-translate-btn[data-theme="dark"] {
                background: #60a5fa;
            }
            
            .textmind-translate-btn[data-theme="dark"]:hover {
                background: #3b82f6;
            }
            
            /* Translation popup */
            .textmind-translation-popup {
                position: fixed;
                background: white;
                border: 1px solid #e1e5e9;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
                width: 360px;
                max-width: calc(100vw - 32px);
                z-index: 2147483647;
                opacity: 0;
                transform: translateY(-8px);
                transition: all 0.15s ease-out;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            }
            
            .textmind-translation-popup.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .textmind-translation-popup[data-theme="dark"] {
                background: rgba(31, 41, 55, 0.95);
                border-color: #4b5563;
                color: #f9fafb;
            }
            
            /* Popup header */
            .textmind-popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                border-bottom: 1px solid #f1f3f4;
                background: rgba(249, 250, 251, 0.8);
                border-radius: 8px 8px 0 0;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-popup-header {
                border-bottom-color: #4b5563;
                background: rgba(17, 24, 39, 0.8);
            }
            
            .textmind-popup-header h3 {
                margin: 0;
                font-size: 14px;
                font-weight: 500;
                color: #374151;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-popup-header h3 {
                color: #e5e7eb;
            }
            
            .textmind-close-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                color: #9ca3af;
                transition: all 0.15s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .textmind-close-btn:hover {
                background: rgba(156, 163, 175, 0.1);
                color: #6b7280;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-close-btn:hover {
                background: rgba(75, 85, 99, 0.3);
                color: #d1d5db;
            }
            
            .textmind-close-btn svg {
                width: 14px;
                height: 14px;
            }
            
            /* Popup content */
            .textmind-popup-content {
                padding: 16px;
            }
            
            .textmind-text-section,
            .textmind-language-section,
            .textmind-translation-section {
                margin-bottom: 16px;
            }
            
            .textmind-popup-content label {
                display: block;
                font-size: 12px;
                font-weight: 500;
                color: #6b7280;
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.025em;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-popup-content label {
                color: #9ca3af;
            }
            
            /* Original text */
            .textmind-original-text {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 10px 12px;
                font-size: 13px;
                line-height: 1.4;
                max-height: 60px;
                overflow-y: auto;
                color: #475569;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-original-text {
                background: rgba(15, 23, 42, 0.6);
                border-color: #475569;
                color: #cbd5e1;
            }
            
            /* Language selector */
            .textmind-language-selector {
                position: relative;
            }
            
            .textmind-current-language {
                display: flex;
                align-items: center;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 8px 12px;
                cursor: pointer;
                transition: all 0.15s ease;
                font-size: 13px;
            }
            
            .textmind-current-language:hover {
                border-color: #3b82f6;
                background: #f1f5f9;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-current-language {
                background: rgba(15, 23, 42, 0.6);
                border-color: #475569;
                color: #cbd5e1;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-current-language:hover {
                border-color: #60a5fa;
                background: rgba(30, 41, 59, 0.8);
            }
            
            .textmind-current-language .language-flag {
                margin-right: 8px;
                font-size: 14px;
            }
            
            .textmind-current-language .language-name {
                flex: 1;
                font-size: 13px;
                font-weight: 400;
            }
            
            .textmind-current-language .dropdown-icon {
                width: 12px;
                height: 12px;
                color: #94a3b8;
                transition: transform 0.15s ease;
                margin-left: 8px;
            }
            
            .textmind-language-dropdown.open .textmind-current-language .dropdown-icon {
                transform: rotate(180deg);
            }
            
            /* Language dropdown */
            .textmind-language-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
                z-index: 100;
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                transform: translateY(-4px);
                transition: all 0.15s ease;
                margin-top: 4px;
            }
            
            .textmind-language-dropdown.open {
                max-height: 240px;
                opacity: 1;
                transform: translateY(0);
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-language-dropdown {
                background: rgba(15, 23, 42, 0.95);
                border-color: #475569;
                backdrop-filter: blur(8px);
            }
            
            .textmind-language-search {
                width: 100%;
                border: none;
                border-bottom: 1px solid #f1f5f9;
                padding: 8px 12px;
                font-size: 13px;
                outline: none;
                background: transparent;
                color: inherit;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-language-search {
                border-bottom-color: #475569;
            }
            
            .textmind-language-search::placeholder {
                color: #94a3b8;
                font-size: 12px;
            }
            
            .textmind-language-list {
                max-height: 180px;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #cbd5e1 transparent;
            }
            
            .textmind-language-list::-webkit-scrollbar {
                width: 4px;
            }
            
            .textmind-language-list::-webkit-scrollbar-track {
                background: transparent;
            }
            
            .textmind-language-list::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 2px;
            }
            
            .textmind-language-item {
                display: flex;
                align-items: center;
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.1s ease;
                font-size: 13px;
            }
            
            .textmind-language-item:hover {
                background: rgba(59, 130, 246, 0.05);
            }
            
            .textmind-language-item.selected {
                background: rgba(59, 130, 246, 0.1);
                color: #1e40af;
                font-weight: 500;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-language-item:hover {
                background: rgba(75, 85, 99, 0.3);
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-language-item.selected {
                background: rgba(96, 165, 250, 0.2);
                color: #93c5fd;
            }
            
            .textmind-language-item .language-flag {
                margin-right: 8px;
                font-size: 14px;
            }
            
            .textmind-language-item .language-name {
                font-size: 13px;
            }
            
            .no-results {
                padding: 16px 12px;
                text-align: center;
                color: #94a3b8;
                font-size: 12px;
                font-style: italic;
            }
            
            /* Translation result */
            .textmind-translation-result {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 10px 12px;
                min-height: 40px;
                font-size: 13px;
                line-height: 1.4;
                color: #475569;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-translation-result {
                background: rgba(15, 23, 42, 0.6);
                border-color: #475569;
                color: #cbd5e1;
            }
            
            .loading-placeholder,
            .error-placeholder {
                color: #94a3b8;
                font-style: italic;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 20px;
                font-size: 12px;
            }
            
            .error-placeholder {
                color: #f87171;
            }
            
            .spinning {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .translation-text {
                color: #1e293b;
                font-weight: 400;
            }
            
            .textmind-translation-popup[data-theme="dark"] .translation-text {
                color: #e2e8f0;
            }
            
            /* Action buttons */
            .textmind-actions {
                display: flex;
                gap: 6px;
                margin-top: 16px;
            }
            
            .textmind-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 6px 12px;
                border-radius: 5px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s ease;
                border: none;
                text-decoration: none;
                flex: 1;
                justify-content: center;
            }
            
            .textmind-btn:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
            
            .textmind-btn svg {
                width: 14px;
                height: 14px;
            }
            
            .textmind-btn-primary {
                background: #3b82f6;
                color: white;
            }
            
            .textmind-btn-primary:hover:not(:disabled) {
                background: #2563eb;
                transform: translateY(-1px);
            }
            
            .textmind-btn-secondary {
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #e2e8f0;
            }
            
            .textmind-btn-secondary:hover:not(:disabled) {
                background: #e2e8f0;
                transform: translateY(-1px);
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-btn-secondary {
                background: rgba(51, 65, 85, 0.6);
                color: #cbd5e1;
                border-color: #475569;
            }
            
            .textmind-translation-popup[data-theme="dark"] .textmind-btn-secondary:hover:not(:disabled) {
                background: rgba(71, 85, 105, 0.8);
            }
            
            /* Responsive design */
            @media (max-width: 480px) {
                .textmind-translation-popup {
                    width: calc(100vw - 24px);
                    left: 12px !important;
                    right: 12px;
                    max-width: none;
                }
                
                .textmind-actions {
                    flex-direction: column;
                    gap: 8px;
                }
                
                .textmind-btn {
                    justify-content: center;
                }
                
                .textmind-popup-content {
                    padding: 12px;
                }
                
                .textmind-popup-header {
                    padding: 10px 12px;
                }
            }
            
            /* Improved positioning anchor */
            .textmind-field-wrapper {
                position: relative !important;
            }
            
            /* Ensure popup stays connected to field */
            .textmind-translation-popup::before {
                content: '';
                position: absolute;
                top: -6px;
                left: var(--arrow-left, 20px);
                width: 12px;
                height: 12px;
                background: white;
                border: 1px solid #e2e8f0;
                border-bottom: none;
                border-right: none;
                transform: rotate(45deg);
                z-index: -1;
            }
            
            .textmind-translation-popup[data-theme="dark"]::before {
                background: rgba(31, 41, 55, 0.95);
                border-color: #4b5563;
            }
            
            /* Hide arrow when positioned above */
            .textmind-translation-popup.positioned-above::before {
                display: none;
            }
            
            .textmind-translation-popup.positioned-above::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: var(--arrow-left, 20px);
                width: 12px;
                height: 12px;
                background: white;
                border: 1px solid #e2e8f0;
                border-top: none;
                border-left: none;
                transform: rotate(45deg);
                z-index: -1;
            }
            
            .textmind-translation-popup[data-theme="dark"].positioned-above::after {
                background: rgba(31, 41, 55, 0.95);
                border-color: #4b5563;
            }
        `;
        
        document.head.appendChild(style);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
