// TextMind Pro Popup Script with Dark Mode Support
document.addEventListener('DOMContentLoaded', function() {
    const additionalSettingsToggle = document.getElementById('additionalSettingsToggle');
    const additionalSettings = document.getElementById('additionalSettings');
    const tooltipToggle = document.getElementById('tooltip-toggle');
    const textFieldTranslationToggle = document.getElementById('textFieldTranslationEnabled');
    const websiteToggleContainer = document.getElementById('websiteToggleContainer');
    const websiteToggle = document.getElementById('websiteToggle');
    const statusElement = document.getElementById('status');
    const statusText = statusElement ? statusElement.querySelector('.status-text') : null;

    // Language feature elements
    const languageSearchInput = document.getElementById('language-search');
    const languageSearchResults = document.getElementById('language-search-results');
    const currentLanguageDisplay = document.getElementById('current-language-display');
    const currentLanguageText = currentLanguageDisplay ? currentLanguageDisplay.querySelector('.current-language-text') : null;

    // Theme selector elements
    const themeOptions = document.querySelectorAll('.theme-option');
    let currentTheme = 'light';

    // Load saved theme
    chrome.storage.sync.get(['selectedTheme'], function(result) {
        currentTheme = result.selectedTheme || 'device'; // Default to device theme
        applyTheme(currentTheme);
        updateThemeSelector(currentTheme);
    });

    // Listen for system theme changes when device theme is selected
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function(e) {
        if (currentTheme === 'device') {
            applyTheme('device'); // Reapply device theme to pick up system change
            
            // Broadcast theme change to content scripts
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0]) {
                    const effectiveTheme = e.matches ? 'dark' : 'light';
                    chrome.tabs.sendMessage(tabs[0].id, { 
                        action: 'updateTheme', 
                        theme: effectiveTheme,
                        darkMode: e.matches 
                    });
                }
            });
        }
    });

    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedTheme = this.dataset.theme;
            if (selectedTheme !== currentTheme) {
                currentTheme = selectedTheme;
                applyTheme(selectedTheme);
                updateThemeSelector(selectedTheme);
                
                // Save theme preference
                chrome.storage.sync.set({ selectedTheme: selectedTheme }, function() {
                    const themeName = getThemeDisplayName(selectedTheme);
                    showStatus(`Theme changed to ${themeName}`);
                    
                    // Broadcast theme change to content scripts
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs && tabs[0]) {
                            let effectiveTheme = selectedTheme;
                            let isDarkMode = selectedTheme !== 'light';
                            
                            // Handle device theme
                            if (selectedTheme === 'device') {
                                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                effectiveTheme = prefersDark ? 'dark' : 'light';
                                isDarkMode = prefersDark;
                            }
                            
                            chrome.tabs.sendMessage(tabs[0].id, { 
                                action: 'updateTheme', 
                                theme: effectiveTheme,
                                darkMode: isDarkMode 
                            });
                        }
                    });
                });
            }
        });
    });

    function applyTheme(theme) {
        if (theme === 'device') {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        } else if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    function updateThemeSelector(theme) {
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === theme) {
                option.classList.add('active');
            }
        });
    }

    function getThemeDisplayName(theme) {
        const themeNames = {
            'device': 'Device',
            'light': 'Light',
            'dark': 'Dark',
            'dark-blue': 'Blue',
            'dark-purple': 'Purple',
            'dark-green': 'Green',
            'dark-orange': 'Orange',
            'dark-rose': 'Rose',
            'dark-minimal': 'Minimal'
        };
        return themeNames[theme] || theme;
    }

    function showStatus(message, isSuccess = true) {
        if (!statusElement || !statusText) return;
        statusElement.className = `status active ${isSuccess ? 'success' : 'error'}`;
        statusText.textContent = message;
        setTimeout(() => {
            statusElement.className = 'status';
        }, 2000);
    }

    function getCurrentHostname() {
        return new Promise((resolve) => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0] && tabs[0].url) {
                    try {
                        const url = new URL(tabs[0].url);
                        resolve(url.hostname);
                    } catch (e) {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            });
        });
    }

    // Language definitions - Comprehensive list of 75+ languages
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

    let currentSelectedLanguage = '';
    let recentLanguages = [];

    function selectLanguage(langCode) {
        currentSelectedLanguage = langCode;
        const langName = ALL_LANGUAGES[langCode];
        const flag = LANGUAGE_FLAGS[langCode] || '🌐';
        
        // Update display
        if (currentLanguageText) {
            currentLanguageText.innerHTML = `<span class="language-flag">${flag}</span> ${langName}`;
            currentLanguageText.classList.add('selected');
        }

        // Clear search input
        if (languageSearchInput) {
            languageSearchInput.value = '';
        }

        // Hide results
        hideLanguageResults();

        // Update recent languages
        updateRecentLanguages(langCode);

        // Save to storage
        chrome.storage.sync.get(['autoSaveEnabled'], function(result) {
            const autoSaveEnabled = result.autoSaveEnabled !== false; // Default to enabled
            
            if (autoSaveEnabled) {
                // Save both global and per-website
                saveLanguagePreference(langCode, langName);
            } else {
                // Save only global preference
                chrome.storage.sync.set({ 
                    targetLanguage: langCode, 
                    recentLanguages: recentLanguages 
                }, function() {
                    showStatus(`Translation target: ${langName} ✓`);
                });
            }
        });
    }

    function updateRecentLanguages(langCode) {
        recentLanguages = recentLanguages.filter(lang => lang !== langCode);
        recentLanguages.unshift(langCode);
        recentLanguages = recentLanguages.slice(0, 8);
    }

    function showLanguageResults(filter = '') {
        if (!languageSearchResults) return;
        
        languageSearchResults.innerHTML = '';
        let hasResults = false;

        // Show recent languages first if no filter
        if (!filter && recentLanguages.length > 0) {
            const recentHeader = document.createElement('div');
            recentHeader.className = 'language-section-header collapsible';
            recentHeader.innerHTML = `
                <span class="section-title">Recently Used</span>
                <span class="collapse-icon">▼</span>
            `;
            recentHeader.dataset.section = 'recent';
            languageSearchResults.appendChild(recentHeader);

            // Create collapsible content container
            const recentContent = document.createElement('div');
            recentContent.className = 'language-section-content';
            recentContent.id = 'recent-languages-content';

            recentLanguages.forEach(langCode => {
                if (ALL_LANGUAGES[langCode]) {
                    const item = document.createElement('div');
                    item.className = 'language-result-item recent';
                    const flag = LANGUAGE_FLAGS[langCode] || '🌐';
                    item.innerHTML = `<span class="language-flag">${flag}</span> ${ALL_LANGUAGES[langCode]} <span class="recent-badge">Recent</span>`;
                    item.dataset.langCode = langCode;
                    item.addEventListener('click', () => selectLanguage(langCode));
                    recentContent.appendChild(item);
                    hasResults = true;
                }
            });

            languageSearchResults.appendChild(recentContent);

            if (hasResults) {
                const separator = document.createElement('div');
                separator.className = 'language-separator';
                languageSearchResults.appendChild(separator);

                const allHeader = document.createElement('div');
                allHeader.className = 'language-section-header collapsible';
                allHeader.innerHTML = `
                    <span class="section-title">All Languages</span>
                    <span class="collapse-icon">▼</span>
                `;
                allHeader.dataset.section = 'all';
                languageSearchResults.appendChild(allHeader);

                // Create collapsible content container for all languages
                const allContent = document.createElement('div');
                allContent.className = 'language-section-content';
                allContent.id = 'all-languages-content';
            }
        }

        // Show filtered or all languages
        const filteredLanguages = Object.entries(ALL_LANGUAGES).filter(([langCode, langName]) => {
            // Don't show recent languages again in the main list if no filter
            if (!filter && recentLanguages.includes(langCode)) {
                return false;
            }
            return langName.toLowerCase().includes(filter.toLowerCase()) || 
                   langCode.toLowerCase().includes(filter.toLowerCase());
        });

        // Create container for all languages if it doesn't exist
        let allContent = document.getElementById('all-languages-content');
        if (!allContent) {
            allContent = document.createElement('div');
            allContent.className = 'language-section-content';
            allContent.id = 'all-languages-content';
        }

        filteredLanguages.forEach(([langCode, langName]) => {
            const item = document.createElement('div');
            item.className = 'language-result-item';
            const flag = LANGUAGE_FLAGS[langCode] || '🌐';
            item.innerHTML = `<span class="language-flag">${flag}</span> ${langName}`;
            item.dataset.langCode = langCode;
            item.addEventListener('click', () => selectLanguage(langCode));
            allContent.appendChild(item);
            hasResults = true;
        });

        // Only append if not already in DOM
        if (!document.getElementById('all-languages-content')) {
            languageSearchResults.appendChild(allContent);
        }

        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No languages match your search';
            languageSearchResults.appendChild(noResults);
        }

        languageSearchResults.classList.add('show');

        // Add collapse functionality
        addCollapseListeners();
    }

    function addCollapseListeners() {
        const headers = document.querySelectorAll('.language-section-header.collapsible');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const section = this.dataset.section;
                const content = document.getElementById(`${section}-languages-content`);
                const icon = this.querySelector('.collapse-icon');
                
                if (content) {
                    const isCollapsed = content.classList.contains('collapsed');
                    
                    if (isCollapsed) {
                        // Expand animation
                        content.style.height = '0px';
                        content.classList.remove('collapsed');
                        content.style.display = 'block';
                        
                        // Get the natural height
                        const scrollHeight = content.scrollHeight;
                        content.style.height = scrollHeight + 'px';
                        
                        // After animation, remove fixed height
                        setTimeout(() => {
                            content.style.height = 'auto';
                        }, 300);
                        
                        icon.textContent = '▼';
                        this.classList.remove('collapsed');
                    } else {
                        // Collapse animation
                        const scrollHeight = content.scrollHeight;
                        content.style.height = scrollHeight + 'px';
                        
                        // Force reflow
                        content.offsetHeight;
                        
                        content.style.height = '0px';
                        content.classList.add('collapsed');
                        
                        // Hide after animation
                        setTimeout(() => {
                            content.style.display = 'none';
                        }, 300);
                        
                        icon.textContent = '▶';
                        this.classList.add('collapsed');
                    }
                    
                    // Save collapse state
                    const storageKey = `languageSection${section.charAt(0).toUpperCase() + section.slice(1)}Collapsed`;
                    chrome.storage.sync.set({ [storageKey]: !isCollapsed });
                }
            });
        });

        // Load saved collapse states
        chrome.storage.sync.get(['languageSectionRecentCollapsed', 'languageSectionAllCollapsed'], function(result) {
            if (result.languageSectionRecentCollapsed) {
                const recentContent = document.getElementById('recent-languages-content');
                const recentHeader = document.querySelector('[data-section="recent"]');
                if (recentContent && recentHeader) {
                    recentContent.style.height = '0px';
                    recentContent.style.display = 'none';
                    recentContent.classList.add('collapsed');
                    recentHeader.querySelector('.collapse-icon').textContent = '▶';
                    recentHeader.classList.add('collapsed');
                }
            }
            
            if (result.languageSectionAllCollapsed) {
                const allContent = document.getElementById('all-languages-content');
                const allHeader = document.querySelector('[data-section="all"]');
                if (allContent && allHeader) {
                    allContent.style.height = '0px';
                    allContent.style.display = 'none';
                    allContent.classList.add('collapsed');
                    allHeader.querySelector('.collapse-icon').textContent = '▶';
                    allHeader.classList.add('collapsed');
                }
            }
        });
    }

    function hideLanguageResults() {
        if (languageSearchResults) {
            languageSearchResults.classList.remove('show');
        }
    }

    function initializeLanguageFeatures() {
        if (!languageSearchInput || !languageSearchResults || !currentLanguageDisplay) return;

        // Load saved language
        chrome.storage.sync.get(['targetLanguage', 'recentLanguages'], function(data) {
            currentSelectedLanguage = data.targetLanguage || 'english';
            recentLanguages = data.recentLanguages || [];
            
            if (currentSelectedLanguage && ALL_LANGUAGES[currentSelectedLanguage]) {
                if (currentLanguageText) {
                    const flag = LANGUAGE_FLAGS[currentSelectedLanguage] || '🌐';
                    currentLanguageText.innerHTML = `<span class="language-flag">${flag}</span> ${ALL_LANGUAGES[currentSelectedLanguage]}`;
                    currentLanguageText.classList.add('selected');
                }
            }
            
            if (!data.targetLanguage) {
                chrome.storage.sync.set({ targetLanguage: 'english' });
            }
        });

        // Search input events
        languageSearchInput.addEventListener('input', function() {
            const filter = this.value.trim();
            showLanguageResults(filter);
        });

        languageSearchInput.addEventListener('focus', function() {
            showLanguageResults(this.value.trim());
        });

        // Click outside to close results
        document.addEventListener('click', function(e) {
            if (!languageSearchInput.contains(e.target) && !languageSearchResults.contains(e.target)) {
                hideLanguageResults();
            }
        });
    }

    // Translation functionality
    const translatePageBtn = document.getElementById('translate-page');
    const undoTranslationBtn = document.getElementById('undo-translation');
    const undoTranslationContainer = document.getElementById('undo-translation-container');
    
    // Track translation state for smart button management
    let isPageTranslated = false;
    let hasTranslationCache = false;

    if (translatePageBtn) {
        translatePageBtn.addEventListener('click', function() {
            if (!currentSelectedLanguage) {
                showStatus('Please select a target language first', false);
                return;
            }

            // Disable button and show loading state
            translatePageBtn.disabled = true;
            translatePageBtn.style.opacity = '0.6';
            translatePageBtn.textContent = 'Translating...';
            showStatus('Translating page... (do not close popup)', true);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0]) {
                    // Also save/update website preference when actually translating
                    chrome.storage.sync.get(['autoSaveEnabled'], function(result) {
                        const autoSaveEnabled = result.autoSaveEnabled !== false;
                        if (autoSaveEnabled) {
                            saveTranslationUsage(currentSelectedLanguage, ALL_LANGUAGES[currentSelectedLanguage]);
                        }
                    });
                    
                    chrome.tabs.sendMessage(tabs[0].id, { 
                        action: 'translatePage',
                        targetLanguage: currentSelectedLanguage,
                        languageName: ALL_LANGUAGES[currentSelectedLanguage]
                    }, function(response) {
                        // Clear any runtime errors
                        if (chrome.runtime.lastError) {
                            console.log('Extension communication error (normal):', chrome.runtime.lastError.message);
                            // Reset button state on error
                            translatePageBtn.disabled = false;
                            translatePageBtn.style.opacity = '';
                            translatePageBtn.textContent = 'Translate Page';
                            showStatus('Please refresh the page and try again', false);
                            return;
                        }
                        
                        // Always reset button state first
                        translatePageBtn.disabled = false;
                        translatePageBtn.style.opacity = '';
                        translatePageBtn.textContent = 'Translate Page';

                        if (chrome.runtime.lastError) {
                            showStatus('Failed to translate page', false);
                            updateTranslationButtons(false, false);
                        } else if (response && response.success) {
                            showStatus(`Page translated to ${ALL_LANGUAGES[currentSelectedLanguage]}`, true);
                            isPageTranslated = true;
                            hasTranslationCache = true;
                            updateTranslationButtons(true, true);
                        } else {
                            // Show specific error message if available
                            const errorMsg = response && response.error ? response.error : 'Translation failed';
                            showStatus(errorMsg, false);
                            updateTranslationButtons(false, hasTranslationCache);
                        }
                    });
                } else {
                    translatePageBtn.disabled = false;
                    translatePageBtn.style.opacity = '';
                    translatePageBtn.textContent = 'Translate Page';
                    showStatus('No active tab found', false);
                }
            });
        });
    }

    if (undoTranslationBtn) {
        undoTranslationBtn.addEventListener('click', function() {
            undoTranslationBtn.disabled = true;
            undoTranslationBtn.style.opacity = '0.6';
            
            const action = isPageTranslated ? 'undoTranslation' : 'redoTranslation';
            const statusMessage = isPageTranslated ? 'Restoring original text...' : 'Restoring translation...';
            showStatus(statusMessage, true);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, { 
                        action: action
                    }, function(response) {
                        // Clear any runtime errors
                        if (chrome.runtime.lastError) {
                            console.log('Extension communication error (normal):', chrome.runtime.lastError.message);
                            undoTranslationBtn.disabled = false;
                            undoTranslationBtn.style.opacity = '';
                            showStatus('Please refresh the page and try again', false);
                            return;
                        }
                        undoTranslationBtn.disabled = false;
                        undoTranslationBtn.style.opacity = '';

                        if (chrome.runtime.lastError) {
                            console.log('Toggle message error:', chrome.runtime.lastError.message);
                            showStatus('Please refresh the page and try again', false);
                            return;
                        }
                        
                        if (response && response.success) {
                            isPageTranslated = !isPageTranslated;
                            const successMessage = isPageTranslated ? 'Translation restored' : 'Original text restored';
                            showStatus(successMessage, true);
                            updateTranslationButtons(isPageTranslated, hasTranslationCache);
                        } else {
                            showStatus('Operation failed', false);
                        }
                    });
                } else {
                    undoTranslationBtn.disabled = false;
                    undoTranslationBtn.style.opacity = '';
                    showStatus('No active tab found', false);
                }
            });
        });
    }
    
    // Function to update button states based on translation status
    function updateTranslationButtons(translated, hasCache) {
        if (translatePageBtn) {
            if (hasCache) {
                // Hide translate button when we have cached translation
                translatePageBtn.style.display = 'none';
            } else {
                // Show translate button when no cache
                translatePageBtn.style.display = 'inline-flex';
                translatePageBtn.textContent = 'Translate Page';
            }
        }
        
        if (undoTranslationContainer && undoTranslationBtn) {
            if (hasCache) {
                // Show undo/redo button when we have cached translation
                undoTranslationContainer.style.display = 'flex';
                if (translated) {
                    undoTranslationBtn.textContent = 'Show Original';
                    undoTranslationBtn.title = 'Switch back to original text';
                } else {
                    undoTranslationBtn.textContent = 'Show Translation';
                    undoTranslationBtn.title = 'Switch back to translated text';
                }
            } else {
                // Hide undo button when no cache
                undoTranslationContainer.style.display = 'none';
            }
        }
    }

    // Load settings expanded state
    if (additionalSettingsToggle && additionalSettings) {
        chrome.storage.sync.get(['settingsExpanded'], function(result) {
            if (result.settingsExpanded) {
                additionalSettingsToggle.classList.add('expanded');
                additionalSettings.classList.add('expanded');
            }
        });

        // Handle additional settings toggle
        additionalSettingsToggle.addEventListener('click', function() {
            const isExpanded = additionalSettingsToggle.classList.toggle('expanded');
            additionalSettings.classList.toggle('expanded');
            chrome.storage.sync.set({ settingsExpanded: isExpanded });
        });
    }

    // Handle tooltip toggle
    if (tooltipToggle) {
        tooltipToggle.addEventListener('change', async function() {
            const enabled = this.checked;
            const hostname = await getCurrentHostname();
            chrome.storage.sync.get(['tooltipEnabled', 'disabledWebsites'], function(data) {
                const disabledWebsites = data.disabledWebsites || [];
                chrome.storage.sync.set({
                    tooltipEnabled: enabled,
                }, function() {
                    showStatus(`Tooltip ${enabled ? 'enabled' : 'disabled'}`);
                    if(websiteToggleContainer) websiteToggleContainer.style.display = enabled ? 'flex' : 'none';
                    
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs && tabs[0]) {
                            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleTooltip', enabled: enabled, siteDisabled: hostname ? disabledWebsites.includes(hostname) : false });
                        }
                    });
                });
            });
        });
    }

    // Handle website-specific toggle
    if (websiteToggle) {
        websiteToggle.addEventListener('change', async function() {
            const siteSpecificDisabled = this.checked;
            const hostname = await getCurrentHostname();
            if (!hostname) return;

            chrome.storage.sync.get(['disabledWebsites', 'tooltipEnabled'], function(data) {
                let disabledWebsites = data.disabledWebsites || [];
                const globalTooltipEnabled = data.tooltipEnabled !== false;
                
                if (siteSpecificDisabled) {
                    if (!disabledWebsites.includes(hostname)) {
                        disabledWebsites.push(hostname);
                    }
                } else {
                    disabledWebsites = disabledWebsites.filter(site => site !== hostname);
                }
                
                chrome.storage.sync.set({ disabledWebsites: disabledWebsites }, function() {
                    showStatus(`Tooltip ${siteSpecificDisabled ? 'disabled' : 'enabled'} for this website`);
                    
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs && tabs[0]) {
                            const actualEnabledState = globalTooltipEnabled && !siteSpecificDisabled;
                            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleTooltip', enabled: actualEnabledState, siteDisabled: siteSpecificDisabled });
                        }
                    });
                });
            });
        });
    }

    // Load initial settings
    async function loadInitialSettings() {
        const hostname = await getCurrentHostname();
        
        chrome.storage.sync.get(['tooltipEnabled', 'disabledWebsites'], function(data) {
            const enabled = data.tooltipEnabled !== false;
            const disabledWebsites = data.disabledWebsites || [];
            if (tooltipToggle) {
                tooltipToggle.checked = enabled;
            }
            if(websiteToggleContainer) websiteToggleContainer.style.display = enabled ? 'flex' : 'none';
            if (hostname && websiteToggle) {
                websiteToggle.checked = disabledWebsites.includes(hostname);
            }
        });
    }

    // AI Configuration functionality - Multi-provider support
    function initializeAiConfiguration() {
        const providerSelect = document.getElementById('providerSelect');
        const apiKeyInput = document.getElementById('apiKey');
        const apiKeyLabel = document.getElementById('apiKeyLabel');
        const aiModelSelect = document.getElementById('aiModel');
        const saveAiConfigBtn = document.getElementById('saveAiConfig');
        const testConnectionBtn = document.getElementById('testConnection');
        const refreshModelsBtn = document.getElementById('refreshModels');
        const aiStatusDisplay = document.getElementById('aiStatus');
        const statusText = document.getElementById('statusText');
        const customUrlGroup = document.getElementById('customUrlGroup');
        const customModelGroup = document.getElementById('customModelGroup');

        if (!providerSelect || !apiKeyInput || !aiModelSelect || !saveAiConfigBtn) {
            console.log('Missing essential AI config elements');
            return;
        }

        let currentProvider = 'gemini';
        let providerApiKeys = {};
        
        // Load saved configuration
        chrome.storage.sync.get(['selectedProvider', 'providerApiKeys', 'selectedAiModel', 'googleAiApiKey'], function(result) {
            currentProvider = result.selectedProvider || 'gemini';
            providerApiKeys = result.providerApiKeys || {};
            
            // Handle legacy Gemini API key
            if (result.googleAiApiKey && !providerApiKeys.gemini) {
                providerApiKeys.gemini = result.googleAiApiKey;
            }
            
            // Set provider dropdown
            if (providerSelect) {
                providerSelect.value = currentProvider;
            }
            
            // Apply provider settings
            handleProviderChange(currentProvider);
            
            // Load selected model after a delay
            if (result.selectedAiModel) {
                setTimeout(() => {
                    if (aiModelSelect) {
                        aiModelSelect.value = result.selectedAiModel;
                    }
                }, 1000);
            }
        });

        // Provider selection handler
        if (providerSelect) {
            providerSelect.addEventListener('change', function() {
                const selectedProvider = this.value;
                handleProviderChange(selectedProvider);
            });
        }

        function handleProviderChange(providerId) {
            currentProvider = providerId;
            
            // Provider names
            const providerNames = {
                'gemini': 'Google Gemini',
                'openai': 'OpenAI',
                'anthropic': 'Anthropic Claude',
                'groq': 'Groq',
                'cerebras': 'Cerebras AI',
                'openrouter': 'OpenRouter',
                'custom': 'Custom OpenAI-Compatible'
            };
            
            const providerName = providerNames[providerId] || providerId;
            
            // Update API key label and load saved key
            if (apiKeyLabel) {
                apiKeyLabel.textContent = `${providerName} API Key`;
            }
            if (apiKeyInput) {
                apiKeyInput.placeholder = `Enter your ${providerName} API key...`;
                apiKeyInput.value = providerApiKeys[providerId] || '';
            }

            // Show/hide custom fields and AI model dropdown
            const isCustom = providerId === 'custom';
            const aiModelGroup = document.getElementById('aiModelGroup');
            
            if (customUrlGroup) {
                customUrlGroup.style.display = isCustom ? 'block' : 'none';
            }
            if (customModelGroup) {
                customModelGroup.style.display = isCustom ? 'block' : 'none';
            }
            if (aiModelGroup) {
                aiModelGroup.style.display = isCustom ? 'none' : 'block';
            }

            // Clear model selection first
            if (aiModelSelect) {
                aiModelSelect.innerHTML = '<option value="">Select a model...</option>';
            }

            // Load models for this provider
            loadModelsForProvider(providerId);
            
            // Load saved model for this provider after models are loaded
            chrome.storage.sync.get(['selectedAiModel'], function(result) {
                if (result.selectedAiModel) {
                    setTimeout(() => {
                        if (aiModelSelect && aiModelSelect.querySelector(`option[value="${result.selectedAiModel}"]`)) {
                            aiModelSelect.value = result.selectedAiModel;
                        }
                    }, 2000); // Give more time for models to load
                }
            });
            
            // Save provider selection
            chrome.storage.sync.set({ selectedProvider: providerId });
        }

        async function loadModelsForProvider(providerId) {
            if (!aiModelSelect) return;

            // Clear current models
            aiModelSelect.innerHTML = '<option value="">Loading models...</option>';
            aiModelSelect.disabled = true;

            if (providerId === 'custom') {
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
                
                // Direct API calls - no fallbacks, user needs valid API key
                if (providerId === 'groq') {
                    models = await loadGroqModels(apiKey);
                } else if (providerId === 'cerebras') {
                    models = await loadCerebrasModels(apiKey);
                } else if (providerId === 'gemini') {
                    models = await loadGeminiModels(apiKey);
                } else if (providerId === 'openai') {
                    models = await loadOpenAIModels(apiKey);
                } else if (providerId === 'anthropic') {
                    models = await loadAnthropicModels(apiKey);
                } else if (providerId === 'openrouter') {
                    models = await loadOpenRouterModels(apiKey);
                } else {
                    throw new Error(`Unknown provider: ${providerId}`);
                }

                if (models && models.length > 0) {
                    populateModelSelect(models);
                    const providerName = getProviderName(providerId);
                    showAiStatus('success', `Loaded ${models.length} ${providerName} models from API`);
                } else {
                    aiModelSelect.innerHTML = '<option value="">No models available - check API key</option>';
                    showAiStatus('error', `No models returned from ${getProviderName(providerId)} API`);
                }
            } catch (error) {
                console.error(`Failed to load models for ${providerId}:`, error);
                aiModelSelect.innerHTML = '<option value="">Failed to load models - check API key</option>';
                showAiStatus('error', `API Error: ${error.message}. Please check your API key.`);
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

        // Dynamic model loading functions for each provider
        async function loadGroqModels(apiKey) {
            const response = await fetch('https://api.groq.com/openai/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data.map(model => ({
                id: model.id,
                name: model.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            }));
        }

        async function loadCerebrasModels(apiKey) {
            const response = await fetch('https://api.cerebras.ai/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data.map(model => ({
                id: model.id,
                name: model.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            }));
        }

        async function loadGeminiModels(apiKey) {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.models && Array.isArray(data.models)) {
                return data.models
                    .filter(model => 
                        model.supportedGenerationMethods && 
                        (model.supportedGenerationMethods.includes('generateContent') ||
                         model.supportedGenerationMethods.includes('generateText'))
                    )
                    .map(model => ({
                        id: model.name.replace('models/', ''),
                        name: model.displayName || model.name.replace('models/', '')
                    }));
            }
            return [];
        }

        async function loadOpenAIModels(apiKey) {
            const response = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data
                .filter(model => model.id.includes('gpt') && !model.id.includes('instruct'))
                .map(model => ({
                    id: model.id,
                    name: model.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                }));
        }

        async function loadAnthropicModels(apiKey) {
            const response = await fetch('https://api.anthropic.com/v1/models', {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
                return data.data
                    .filter(model => model.type === 'model')
                    .map(model => ({
                        id: model.id,
                        name: model.display_name || model.id
                    }));
            }
            
            throw new Error('No models found in API response');
        }

        async function loadOpenRouterModels(apiKey) {
            const response = await fetch('https://openrouter.ai/api/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://textmind-pro.extension',
                    'X-Title': 'TextMind Pro'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data
                .filter(model => model.context_length && model.context_length > 1000)
                .map(model => ({
                    id: model.id,
                    name: model.name || model.id
                }));
        }

        // Refresh models when API key changes
        if (apiKeyInput) {
            apiKeyInput.addEventListener('blur', function() {
                if (this.value.trim()) {
                    loadModelsForProvider(currentProvider);
                }
            });
        }

        // Add refresh models button functionality
        if (refreshModelsBtn) {
            refreshModelsBtn.addEventListener('click', function() {
                loadModelsForProvider(currentProvider);
            });
        }

        // Save AI configuration
        saveAiConfigBtn.addEventListener('click', function() {
            const apiKey = apiKeyInput.value.trim();
            const selectedModel = aiModelSelect.value;

            if (!apiKey && currentProvider !== 'custom') {
                showAiStatus('error', 'Please enter an API key');
                return;
            }

            if (currentProvider === 'custom') {
                const customUrl = document.getElementById('customUrl')?.value.trim();
                const customModel = document.getElementById('customModel')?.value.trim();
                if (!customUrl || !customModel) {
                    showAiStatus('error', 'Please enter custom API URL and model ID');
                    return;
                }
                // For custom provider, use the custom model ID as the selected model
                selectedModel = customModel;
            } else if (!selectedModel) {
                showAiStatus('error', 'Please select a model');
                return;
            }

            // Save API key for current provider
            providerApiKeys[currentProvider] = apiKey;

            // Prepare configuration data
            const configData = {
                selectedProvider: currentProvider,
                providerApiKeys: providerApiKeys,
                selectedAiModel: selectedModel
            };

            // Add custom configuration if needed
            if (currentProvider === 'custom') {
                configData.customApiUrl = document.getElementById('customUrl')?.value.trim();
                configData.customModel = document.getElementById('customModel')?.value.trim();
            }

            // Keep legacy Gemini key for backward compatibility
            if (currentProvider === 'gemini') {
                configData.googleAiApiKey = apiKey;
            }

            chrome.storage.sync.set(configData, function() {
                if (chrome.runtime.lastError) {
                    showAiStatus('error', 'Failed to save configuration');
                    console.error('Storage error:', chrome.runtime.lastError);
                } else {
                    showAiStatus('success', 'Configuration saved successfully');
                    console.log('Saved configuration:', configData);
                    
                    // Notify content scripts about the update
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs && tabs[0]) {
                            chrome.tabs.sendMessage(tabs[0].id, {
                                action: 'updateAiConfig',
                                provider: currentProvider,
                                apiKey: apiKey,
                                model: selectedModel
                            });
                        }
                    });
                }
            });
        });

        // Test connection
        if (testConnectionBtn) {
            testConnectionBtn.addEventListener('click', async function() {
                const apiKey = apiKeyInput.value.trim();
                const selectedModel = aiModelSelect.value;

                if (!apiKey && currentProvider !== 'custom') {
                    showAiStatus('error', 'Please enter an API key');
                    return;
                }

                if (currentProvider === 'custom') {
                    const customUrl = document.getElementById('customUrl')?.value.trim();
                    const customModel = document.getElementById('customModel')?.value.trim();
                    if (!customUrl || !customModel) {
                        showAiStatus('error', 'Please enter custom API URL and model');
                        return;
                    }
                } else if (!selectedModel) {
                    showAiStatus('error', 'Please select a model');
                    return;
                }

                showAiStatus('testing', 'Testing connection...');

                try {
                    // Use the AIHandler from providers.js if available
                    if (window.AIHandler && window.AIHandler.testConnection) {
                        const customConfig = currentProvider === 'custom' ? {
                            baseUrl: document.getElementById('customUrl')?.value.trim(),
                            model: document.getElementById('customModel')?.value.trim()
                        } : null;

                        const result = await window.AIHandler.testConnection(
                            currentProvider, 
                            currentProvider === 'custom' ? document.getElementById('customModel')?.value.trim() : selectedModel, 
                            apiKey, 
                            customConfig
                        );

                        if (result && result.success) {
                            showAiStatus('success', 'Connection successful! Model is responding.');
                        } else {
                            showAiStatus('error', `Connection failed: ${result ? result.error : 'Unknown error'}`);
                        }
                    } else {
                        // Fallback test for when AIHandler is not available
                        showAiStatus('success', 'Configuration saved. Test will be available after page refresh.');
                    }
                } catch (error) {
                    console.error('Test connection error:', error);
                    showAiStatus('error', `Connection test failed: ${error.message}`);
                }
            });
        }

        function showAiStatus(type, message) {
            if (!aiStatusDisplay || !statusText) return;

            statusText.textContent = message;
            aiStatusDisplay.className = `status-display ${type}`;
            aiStatusDisplay.style.display = 'block';

            if (type !== 'testing') {
                setTimeout(() => {
                    aiStatusDisplay.style.display = 'none';
                }, 3000);
            }
        }
    }

    // Check if page is already translated on popup open
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs && tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { 
                action: 'checkTranslationStatus'
            }, function(response) {
                if (chrome.runtime.lastError) {
                    // Silently handle connection errors for status check
                    console.log('Status check error:', chrome.runtime.lastError.message);
                    return;
                }
                
                if (response) {
                    isPageTranslated = response.isTranslated || false;
                    hasTranslationCache = response.hasCache || false;
                    updateTranslationButtons(isPageTranslated, hasTranslationCache);
                }
            });
        }
    });

    // Website preferences management
    function initializeWebsitePreferences() {
        const autoSaveToggle = document.getElementById('autoSaveToggle');
        const managePreferencesBtn = document.getElementById('managePreferencesBtn');
        const websitePreferencesList = document.getElementById('websitePreferencesList');
        const clearAllPreferencesBtn = document.getElementById('clearAllPreferencesBtn');

        if (!autoSaveToggle || !managePreferencesBtn) return;

        // Load auto-save setting
        chrome.storage.sync.get(['autoSaveEnabled'], function(result) {
            autoSaveToggle.checked = result.autoSaveEnabled !== false; // Default to enabled
        });

        // Handle auto-save toggle
        autoSaveToggle.addEventListener('change', function() {
            const enabled = this.checked;
            chrome.storage.sync.set({ autoSaveEnabled: enabled }, function() {
                showStatus(`Auto-save ${enabled ? 'enabled' : 'disabled'}`);
            });
        });

        // Handle manage button
        managePreferencesBtn.addEventListener('click', function() {
            const isVisible = websitePreferencesList.style.display !== 'none';
            if (isVisible) {
                websitePreferencesList.style.display = 'none';
                managePreferencesBtn.textContent = 'Manage';
            } else {
                websitePreferencesList.style.display = 'block';
                managePreferencesBtn.textContent = 'Hide';
                loadWebsitePreferencesList();
            }
        });

        // Handle clear all button
        if (clearAllPreferencesBtn) {
            clearAllPreferencesBtn.addEventListener('click', function() {
                // Clear all website language preferences
                if (true) {
                    chrome.storage.sync.set({ websiteLanguagePreferences: {} }, function() {
                        showStatus('All website preferences cleared');
                        loadWebsitePreferencesList();
                    });
                }
            });
        }
    }

    function loadWebsitePreferencesList() {
        const preferencesContent = document.getElementById('preferencesContent');
        if (!preferencesContent) {
            console.error('preferencesContent element not found');
            return;
        }

        chrome.storage.sync.get(['websiteLanguagePreferences'], function(data) {
            console.log('Loading website preferences:', data);
            const preferences = data.websiteLanguagePreferences || {};
            const entries = Object.entries(preferences)
                .sort(([,a], [,b]) => (b.lastUsed || 0) - (a.lastUsed || 0));

            console.log('Website preferences entries:', entries);

            if (entries.length === 0) {
                preferencesContent.innerHTML = '<div class="empty-preferences">No website preferences saved yet</div>';
                return;
            }

            preferencesContent.innerHTML = entries.map(([domain, pref]) => {
                const flag = LANGUAGE_FLAGS[pref.language] || '🌐';
                const usageText = pref.usageCount || 1;
                return `
                    <div class="preference-item">
                        <div class="website-name" title="${domain}">${domain}</div>
                        <div class="language-info" title="${pref.languageName}">${flag} ${pref.languageName}</div>
                        <div class="usage-count">${usageText}x</div>
                        <button class="remove-btn" data-domain="${domain}">Remove</button>
                    </div>
                `;
            }).join('');

            // Add event listeners for remove buttons
            preferencesContent.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const domain = this.dataset.domain;
                    // Remove language preference
                    if (true) {
                        removeWebsitePreference(domain);
                    }
                });
            });
        });
    }

    function removeWebsitePreference(domain) {
        chrome.storage.sync.get(['websiteLanguagePreferences'], function(data) {
            const preferences = data.websiteLanguagePreferences || {};
            delete preferences[domain];
            
            chrome.storage.sync.set({ websiteLanguagePreferences: preferences }, function() {
                showStatus(`Removed preference for ${domain}`);
                loadWebsitePreferencesList();
            });
        });
    }

    // Auto-save translation preferences per website
    async function saveLanguagePreference(langCode, langName) {
        const hostname = await getCurrentHostname();
        
        // Save global preference
        const globalData = { 
            targetLanguage: langCode, 
            recentLanguages: recentLanguages 
        };
        
        // Save website-specific preference if we have a valid hostname
        if (hostname) {
            chrome.storage.sync.get(['websiteLanguagePreferences'], function(data) {
                const websitePrefs = data.websiteLanguagePreferences || {};
                websitePrefs[hostname] = {
                    language: langCode,
                    languageName: langName,
                    lastUsed: Date.now(),
                    usageCount: (websitePrefs[hostname]?.usageCount || 0) + 1
                };
                
                // Keep only the last 50 website preferences to avoid storage limits
                const sortedEntries = Object.entries(websitePrefs)
                    .sort(([,a], [,b]) => (b.lastUsed || 0) - (a.lastUsed || 0))
                    .slice(0, 50);
                
                const trimmedPrefs = Object.fromEntries(sortedEntries);
                
                chrome.storage.sync.set({ 
                    ...globalData,
                    websiteLanguagePreferences: trimmedPrefs 
                }, function() {
                    showStatus(`Translation target: ${langName} ✓ (saved for ${hostname})`);
                    console.log('Website preference saved:', hostname, langName);
                    console.log('All website preferences:', trimmedPrefs);
                });
            });
        } else {
            // No hostname available, just save global preference
            chrome.storage.sync.set(globalData, function() {
                showStatus(`Translation target: ${langName} ✓`);
            });
        }
    }

    async function saveTranslationUsage(langCode, langName) {
        const hostname = await getCurrentHostname();
        if (!hostname) return;
        
        chrome.storage.sync.get(['websiteLanguagePreferences'], function(data) {
            const websitePrefs = data.websiteLanguagePreferences || {};
            
            // Update or create preference for this website
            if (!websitePrefs[hostname]) {
                websitePrefs[hostname] = {
                    language: langCode,
                    languageName: langName,
                    lastUsed: Date.now(),
                    usageCount: 1
                };
            } else {
                websitePrefs[hostname].language = langCode;
                websitePrefs[hostname].languageName = langName;
                websitePrefs[hostname].lastUsed = Date.now();
                websitePrefs[hostname].usageCount = (websitePrefs[hostname].usageCount || 0) + 1;
            }
            
            // Keep only the last 50 website preferences
            const sortedEntries = Object.entries(websitePrefs)
                .sort(([,a], [,b]) => (b.lastUsed || 0) - (a.lastUsed || 0))
                .slice(0, 50);
            
            const trimmedPrefs = Object.fromEntries(sortedEntries);
            
            chrome.storage.sync.set({ websiteLanguagePreferences: trimmedPrefs }, function() {
                console.log('Translation usage saved for:', hostname);
            });
        });
    }

    // Initialize API key toggle functionality
    function initializeApiKeyToggle() {
        const toggleApiKeyBtn = document.getElementById('toggleApiKey');
        const apiKeyInput = document.getElementById('apiKey');
        const eyeIcon = document.getElementById('eye-icon');
        const eyeOffIcon = document.getElementById('eye-off-icon');

        if (toggleApiKeyBtn && apiKeyInput && eyeIcon && eyeOffIcon) {
            toggleApiKeyBtn.addEventListener('click', function() {
                if (apiKeyInput.type === 'password') {
                    // Show password
                    apiKeyInput.type = 'text';
                    eyeIcon.classList.add('icon-hidden');
                    eyeOffIcon.classList.remove('icon-hidden');
                } else {
                    // Hide password
                    apiKeyInput.type = 'password';
                    eyeIcon.classList.remove('icon-hidden');
                    eyeOffIcon.classList.add('icon-hidden');
                }
            });
        }
    }

    // Initialize API key toggle functionality
    initializeApiKeyToggle();


    // Open in Sidebar functionality
    const openInSidebarBtn = document.getElementById('open-in-sidebar');
    if (openInSidebarBtn) {
        openInSidebarBtn.addEventListener('click', function() {
            const originalHTML = openInSidebarBtn.innerHTML;
            openInSidebarBtn.disabled = true;
            openInSidebarBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                </svg>
                Opening...
            `;
            
            console.log('Sending openSidePanel message to background script');
            chrome.runtime.sendMessage({ action: 'openSidePanel' }, function(response) {
                if (chrome.runtime.lastError) {
                    console.log('Side panel error:', chrome.runtime.lastError.message);
                    openInSidebarBtn.disabled = false;
                    openInSidebarBtn.innerHTML = originalHTML;
                    showStatus('Error opening sidebar: ' + chrome.runtime.lastError.message, false);
                } else if (response && response.success) {
                    console.log('Side panel opened successfully');
                    // Close popup after successful sidebar opening
                    window.close();
                } else {
                    console.error('Failed to open sidebar, response:', response);
                    const errorMsg = response && response.error ? response.error : 'Unknown error';
                    openInSidebarBtn.disabled = false;
                    openInSidebarBtn.innerHTML = originalHTML;
                    showStatus('Failed to open sidebar: ' + errorMsg, false);
                }
            });
        });
    }

    // Chat dock functionality - open unified sidebar
    const openChatDockBtn = document.getElementById('open-chat-dock');
    if (openChatDockBtn) {
        openChatDockBtn.addEventListener('click', function() {
            chrome.runtime.sendMessage({ action: 'openSidePanel' }, function(response) {
                if (chrome.runtime.lastError) {
                    console.log('Side panel error:', chrome.runtime.lastError.message);
                    showStatus('Error opening sidebar: ' + chrome.runtime.lastError.message, false);
                } else if (response && response.success) {
                    window.close();
                } else {
                    showStatus('Failed to open sidebar', false);
                }
            });
        });
    }

    // Screenshot functionality
    const screenshotFullBtn = document.getElementById('screenshot-full');
    if (screenshotFullBtn) {
        screenshotFullBtn.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'screenshot_full_translate' }, function(response) {
                        if (chrome.runtime.lastError) {
                            console.log('Screenshot error:', chrome.runtime.lastError.message);
                            showStatus('Please refresh the page and try again', false);
                        } else {
                            window.close();
                        }
                    });
                }
            });
        });
    }

    const screenshotAreaBtn = document.getElementById('screenshot-area');
    if (screenshotAreaBtn) {
        screenshotAreaBtn.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'screenshot_area_translate' }, function(response) {
                        if (chrome.runtime.lastError) {
                            console.log('Screenshot area error:', chrome.runtime.lastError.message);
                            showStatus('Please refresh the page and try again', false);
                        } else {
                            window.close();
                        }
                    });
                }
            });
        });
    }

    // Text Field Translation Toggle
    if (textFieldTranslationToggle) {
        // Load saved setting
        chrome.storage.sync.get(['textFieldTranslationEnabled'], function(result) {
            textFieldTranslationToggle.checked = result.textFieldTranslationEnabled !== false; // Default to true
        });

        // Handle toggle change
        textFieldTranslationToggle.addEventListener('change', function() {
            const isEnabled = textFieldTranslationToggle.checked;
            
            // Save setting
            chrome.storage.sync.set({ textFieldTranslationEnabled: isEnabled }, function() {
                // Notify content scripts about the change
                chrome.tabs.query({}, function(tabs) {
                    tabs.forEach(tab => {
                        chrome.tabs.sendMessage(tab.id, {
                            action: 'updateTextFieldTranslationSettings'
                        }, function(response) {
                            // Ignore errors for tabs that don't have the content script
                            if (chrome.runtime.lastError) {
                                // Silent fail for tabs without content script
                            }
                        });
                    });
                });
                
                // Show status
                showStatus(isEnabled ? 'Text field translation enabled' : 'Text field translation disabled', true);
            });
        });
    }

    // Initialize everything
    initializeLanguageFeatures();
    loadInitialSettings();
    initializeAiConfiguration();
    initializeWebsitePreferences();
});