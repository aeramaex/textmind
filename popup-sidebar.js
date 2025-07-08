// Popup Sidebar Integration
class PopupSidebar {
    constructor() {
        this.currentTab = 'popup';
        this.chatHistory = [];
        
        this.init();
    }

    init() {
        console.log('Popup Sidebar initialized');
        
        // Initialize all the same functionality as popup but in sidebar context
        this.initSidebarSpecificFeatures();
    }

    initSidebarSpecificFeatures() {
        // Remove the "Open in Sidebar" button since we're already in sidebar
        const openInSidebarBtn = document.getElementById('open-in-sidebar');
        if (openInSidebarBtn) {
            openInSidebarBtn.style.display = 'none';
        }

        // Add any sidebar-specific functionality here
        console.log('Sidebar-specific features initialized');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the popup-dark.js to initialize first
    setTimeout(() => {
        new PopupSidebar();
    }, 100);
});