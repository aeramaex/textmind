// Dark Mode Theme Manager for TextMind Pro Content Script
(function() {
    'use strict';

    let currentTheme = 'light';
    let themeLoaded = false;
    
    // Function to apply theme to document
    function applyTheme(theme, isDarkMode) {
        // Support both new theme system and legacy dark mode
        if (theme) {
            currentTheme = theme;
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
        } else if (typeof isDarkMode !== 'undefined') {
            // Legacy support
            currentTheme = isDarkMode ? 'dark' : 'light';
            if (isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
        
        // Mark theme as loaded
        themeLoaded = true;
        
        // Apply theme to existing shadow DOM elements immediately
        applyShadowThemes();
    }
    
    // Function to apply theme to all shadow DOM elements
    function applyShadowThemes() {
        // Apply theme to existing tooltip and chat dock elements
        const tooltip = document.getElementById('select-act-tooltip');
        const chatDock = document.getElementById('select-act-chat-dock');
        
        [tooltip, chatDock].forEach(element => {
            if (element) {
                if (currentTheme === 'light') {
                    element.removeAttribute('data-theme');
                } else {
                    element.setAttribute('data-theme', currentTheme);
                }
                
                // If element uses shadow DOM, set data-theme on shadow host
                if (element.shadowRoot) {
                    if (currentTheme === 'light') {
                        element.removeAttribute('data-theme');
                    } else {
                        element.setAttribute('data-theme', currentTheme);
                    }
                }
            }
        });
        
        // Apply theme to all elements with shadow DOM
        const shadowHosts = document.querySelectorAll('[id*="select-act"]');
        shadowHosts.forEach(host => {
            if (host.shadowRoot || host.id === 'select-act-tooltip' || host.id === 'select-act-chat-dock') {
                if (currentTheme === 'light') {
                    host.removeAttribute('data-theme');
                } else {
                    host.setAttribute('data-theme', currentTheme);
                }
            }
        });
    }

    // Load initial theme setting
    function loadTheme() {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get(['selectedTheme', 'darkMode'], function(result) {
                if (result.selectedTheme) {
                    applyTheme(result.selectedTheme);
                } else {
                    // Default to device theme if no preference is set
                    applyTheme('device');
                }
                // Apply themes to any existing shadow elements
                applyShadowThemes();
            });
        }
    }

    // Listen for system theme changes when device theme is selected
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function(e) {
        if (currentTheme === 'device') {
            applyTheme('device'); // Reapply device theme to pick up system change
            applyShadowThemes(); // Update shadow DOM elements
        }
    });

    // Listen for theme update messages from popup
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.action === 'updateTheme') {
                if (request.theme) {
                    applyTheme(request.theme);
                } else {
                    // Legacy support
                    applyTheme(null, request.darkMode);
                }
                sendResponse({success: true});
                return true;
            }
        });
    }    
    
    // Monitor for dynamically created elements and apply theme
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    if (node.id === 'select-act-tooltip' || node.id === 'select-act-chat-dock') {
                        // Apply theme immediately to newly created elements
                        if (themeLoaded) {
                            if (currentTheme !== 'light') {
                                node.setAttribute('data-theme', currentTheme);
                            }
                        }
                        
                        // Set up a small delay to ensure shadow DOM is initialized
                        setTimeout(() => {
                            if (currentTheme !== 'light') {
                                node.setAttribute('data-theme', currentTheme);
                            }
                            
                            // Handle shadow DOM
                            if (node.shadowRoot) {
                                if (currentTheme !== 'light') {
                                    node.setAttribute('data-theme', currentTheme);
                                }
                            }
                        }, 10);
                    }
                    
                    // Also check child elements
                    const tooltipChild = node.querySelector && node.querySelector('#select-act-tooltip');
                    const chatDockChild = node.querySelector && node.querySelector('#select-act-chat-dock');
                    
                    if (tooltipChild && themeLoaded && currentTheme !== 'light') {
                        tooltipChild.setAttribute('data-theme', currentTheme);
                        setTimeout(() => {
                            tooltipChild.setAttribute('data-theme', currentTheme);
                            if (tooltipChild.shadowRoot) {
                                tooltipChild.setAttribute('data-theme', currentTheme);
                            }
                        }, 10);
                    }
                    
                    if (chatDockChild && themeLoaded && currentTheme !== 'light') {
                        chatDockChild.setAttribute('data-theme', currentTheme);
                        setTimeout(() => {
                            chatDockChild.setAttribute('data-theme', currentTheme);
                            if (chatDockChild.shadowRoot) {
                                chatDockChild.setAttribute('data-theme', currentTheme);
                            }
                        }, 10);
                    }
                    
                    // Handle any shadow hosts
                    const shadowHosts = node.querySelectorAll && node.querySelectorAll('[id*="select-act"]');
                    if (shadowHosts) {
                        shadowHosts.forEach(host => {
                            if ((host.shadowRoot || host.id === 'select-act-tooltip' || host.id === 'select-act-chat-dock') && themeLoaded && currentTheme !== 'light') {
                                host.setAttribute('data-theme', currentTheme);
                                setTimeout(() => {
                                    host.setAttribute('data-theme', currentTheme);
                                }, 10);
                            }
                        });
                    }
                }
            });
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initialize theme on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadTheme);
    } else {
        loadTheme();
    }
    
    // Periodically reapply themes to ensure consistency (fallback)
    setInterval(() => {
        if (themeLoaded) {
            applyShadowThemes();
        }
    }, 1000); // Check every second

})();
