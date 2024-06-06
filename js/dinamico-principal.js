// Função para registrar o nome do aluno
function setStudentName() {
    const studentName = document.getElementById('student-name').value;
    localStorage.setItem('studentName', studentName);
}

// Função para obter o nome do aluno
function getStudentName() {
    return localStorage.getItem('studentName');
}

// Função para limpar o log de acessos
function clearAccessLog() {
    const confirmClear = confirm("Tem certeza de que deseja limpar o log de acessos?");
    if (confirmClear) {
        tutorialUrls.forEach(url => {
            localStorage.removeItem(url);
        });
        localStorage.removeItem('studentName');
        alert('Log de acessos limpo com sucesso.');
        location.reload();
    }
}

// Função para gerar o relatório de acessos
function generateAccessReport() {
    let report = `Relatório de Acessos do Aluno: ${getStudentName()}\n\n`;
    tutorialUrls.forEach(url => {
        const accessTime = localStorage.getItem(url);
        if (accessTime) {
            report += `URL: ${url} - Acesso: ${new Date(accessTime).toLocaleString()}\n`;
        }
    });
    return report;
}

// Função para imprimir o relatório de acessos
function printAccessReport() {
    const report = generateAccessReport();
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre>' + report + '</pre>');
    printWindow.document.close();
    printWindow.print();
}

// Adiciona evento de clique ao botão de relatório
document.getElementById('report-btn').addEventListener('click', function() {
    setStudentName();
    printAccessReport();
});

// Adiciona evento de clique ao botão de limpar log
document.getElementById('clear-log-btn').addEventListener('click', clearAccessLog);

// Preenche o campo de nome do aluno, se já preenchido anteriormente
const savedStudentName = getStudentName();
if (savedStudentName) {
    document.getElementById('student-name').value = savedStudentName;
}