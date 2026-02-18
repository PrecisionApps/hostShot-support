/* ============================================
   HostShot Support Page — Script
   Tab switching and smooth interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    handleHashNavigation();
});

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
}

function activateTab(tabId) {
    // Deactivate all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Activate selected tab
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const activePanel = document.getElementById(`panel-${tabId}`);

    if (activeBtn && activePanel) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
        activePanel.classList.add('active');

        // Update URL hash without scrolling
        history.replaceState(null, null, `#${tabId}`);

        // Scroll to top of content smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function switchToTab(tabId) {
    activateTab(tabId);
}

function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`.tab-btn[data-tab="${hash}"]`)) {
        activateTab(hash);
    }
}

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    handleHashNavigation();
});
