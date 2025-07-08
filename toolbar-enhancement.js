// Toolbar Enhancement Script - Ensures all toolbar functionality is restored and enhanced
(function() {
    'use strict';
    
    // Wait for DOM and main content script to be ready
    function initializeToolbarEnhancements() {
        // Check if main content script is loaded
        if (typeof window.TextMindPro === 'undefined') {
            setTimeout(initializeToolbarEnhancements, 100);
            return;
        }
        
        // Ensure tooltip has all necessary buttons and styles
        enhanceTooltipButtons();
        
        // Ensure chat dock has all features
        enhanceChatDock();
        
        // Add any missing event listeners
        addMissingEventListeners();
        
        // Apply theme consistency
        ensureThemeConsistency();
    }
    
    function enhanceTooltipButtons() {
        // Watch for tooltip creation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.id === 'select-act-tooltip') {
                        // Tooltip was created, enhance it
                        setTimeout(enhanceTooltip, 50);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: false
        });
        
        // Also check if tooltip already exists
        const existingTooltip = document.getElementById('select-act-tooltip');
        if (existingTooltip) {
            enhanceTooltip();
        }
    }
    
    function enhanceTooltip() {
        const tooltip = document.getElementById('select-act-tooltip');
        if (!tooltip) return;
        
        // Ensure all necessary classes and attributes
        tooltip.classList.add('sa-tooltip-enhanced');
        
        // Enhance button container
        const buttonContainer = tooltip.querySelector('#select-act-tooltip-buttons-default');
        if (buttonContainer) {
            buttonContainer.style.display = 'flex';
            buttonContainer.style.flexWrap = 'wrap';
            buttonContainer.style.gap = '2px';
            buttonContainer.style.padding = '0 4px';
            buttonContainer.style.justifyContent = 'flex-start';
            buttonContainer.style.alignItems = 'center';
        }
        
        // Enhance all buttons
        const buttons = tooltip.querySelectorAll('.sa-tooltip-button');
        buttons.forEach(enhanceButton);
        
        // Ensure footer is properly styled
        const footer = tooltip.querySelector('#select-act-tooltip-footer');
        if (footer) {
            footer.style.display = 'flex';
            footer.style.alignItems = 'center';
            footer.style.justifyContent = 'space-between';
            footer.style.padding = '4px 12px';
            footer.style.gap = '8px';
        }
    }
    
    function enhanceButton(button) {
        if (!button) return;
        
        // Ensure proper button styling
        button.style.backgroundColor = 'transparent';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '4px 6px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '11px';
        button.style.fontWeight = '500';
        button.style.display = 'inline-flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.gap = '4px';
        button.style.transition = 'all 0.2s ease';
        button.style.whiteSpace = 'nowrap';
        button.style.userSelect = 'none';
        button.style.lineHeight = '1.2';
        button.style.minHeight = '20px';
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-1px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Ensure icons are properly sized
        const icon = button.querySelector('.sa-icon');
        if (icon) {
            icon.style.width = '14px';
            icon.style.height = '14px';
            icon.style.stroke = 'currentColor';
            icon.style.fill = 'none';
            icon.style.strokeWidth = '2';
            icon.style.strokeLinecap = 'round';
            icon.style.strokeLinejoin = 'round';
        }
    }
    
    function enhanceChatDock() {
        // Watch for chat dock creation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.id === 'select-act-chat-dock') {
                        // Chat dock was created, enhance it
                        setTimeout(enhanceDock, 50);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: false
        });
        
        // Also check if chat dock already exists
        const existingDock = document.getElementById('select-act-chat-dock');
        if (existingDock) {
            enhanceDock();
        }
    }
    
    function enhanceDock() {
        const dock = document.getElementById('select-act-chat-dock');
        if (!dock) return;
        
        // Ensure proper chat dock styling
        dock.style.position = 'fixed';
        dock.style.zIndex = '2147483646';
        dock.style.fontFamily = 'var(--sa-font-family)';
        dock.style.display = 'flex';
        dock.style.flexDirection = 'column';
        dock.style.borderRadius = '12px';
        dock.style.overflow = 'hidden';
        
        // Enhance chat header
        const header = dock.querySelector('#sa-chat-header');
        if (header) {
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.padding = '8px 12px';
            header.style.cursor = 'grab';
        }
        
        // Enhance chat history
        const history = dock.querySelector('#sa-chat-history');
        if (history) {
            history.style.flex = '1';
            history.style.padding = '12px';
            history.style.overflowY = 'auto';
            history.style.display = 'flex';
            history.style.flexDirection = 'column';
            history.style.gap = '8px';
        }
        
        // Enhance input area
        const inputArea = dock.querySelector('#sa-chat-input-area');
        if (inputArea) {
            inputArea.style.padding = '12px';
            inputArea.style.display = 'flex';
            inputArea.style.gap = '8px';
            inputArea.style.alignItems = 'flex-end';
        }
        
        // Enhance all chat dock buttons
        const dockButtons = dock.querySelectorAll('.sa-tooltip-button');
        dockButtons.forEach(enhanceButton);
    }
    
    function addMissingEventListeners() {
        // Add any missing event listeners that might have been lost
        // This is a safeguard to ensure all functionality works
        
        // Ensure keyboard shortcuts work
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const tooltip = document.getElementById('select-act-tooltip');
                if (tooltip && tooltip.classList.contains('sa-visible')) {
                    // Close tooltip if visible
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.classList.remove('sa-visible');
                }
            }
        });
    }
    
    function ensureThemeConsistency() {
        // Ensure theme is properly applied to all elements
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme) {
            // Apply theme to tooltip and chat dock
            const tooltip = document.getElementById('select-act-tooltip');
            const chatDock = document.getElementById('select-act-chat-dock');
            
            [tooltip, chatDock].forEach(element => {
                if (element) {
                    element.setAttribute('data-theme', currentTheme);
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeToolbarEnhancements);
    } else {
        initializeToolbarEnhancements();
    }
    
    // Also initialize after a short delay to catch any late-loading content
    setTimeout(initializeToolbarEnhancements, 1000);
    
})();
