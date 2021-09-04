let darkMode = localStorage.getItem('darkmode');
const darkModeBtn = document.querySelector('.dark-mode-toggler');

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkmode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkmode', null);
}

if (darkMode === 'enabled') enableDarkMode();

darkModeBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkmode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
