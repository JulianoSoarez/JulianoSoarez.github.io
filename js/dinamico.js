// Lista de URLs dos tutoriais
const tutorialUrls = [
    "tutoriais/tutorial1.html",
    "tutoriais/tutorial2.html",
    "tutoriais/tutorial3.html",
    "tutoriais/tutorial4.html"
    // Adicione mais URLs conforme necessário
];

// Função para registrar o acesso ao conteúdo com data e hora
function logAccess(url) {
    const now = new Date();
    localStorage.setItem(url, now.toISOString());
}

// Adiciona eventos de clique aos links da lista de conteúdos
document.querySelectorAll('#content-list a').forEach((link, index) => {
    link.addEventListener('click', function(event) {
        const currentIndex = index;
        logAccess(tutorialUrls[currentIndex]);
        console.log("Acesso: "+tutorialUrls[currentIndex]);
        link.classList.add('visited'); // Adiciona a classe 'visited' ao link
    });
});

// Verifica se o tutorial do conteúdo precedente foi acessado
function checkPreviousTutorialAccessed(currentIndex) {
    if (currentIndex === 0) return true; // O primeiro conteúdo está sempre acessível
    const previousTutorialUrl = tutorialUrls[currentIndex - 1];
    return localStorage.getItem(previousTutorialUrl) !== null;
}

// Carrega os acessos anteriores
window.addEventListener('load', function() {
    tutorialUrls.forEach(url => {
        const accessTime = localStorage.getItem(url);
        if (accessTime) {
            document.querySelector(`#content-list a[href="${url}"]`).classList.add('visited');
        }
    });
});