document.addEventListener("DOMContentLoaded", () => {
    verificarAcesso();
});

// 📌 Verifica se o usuário está autenticado antes de acessar a página
function verificarAcesso() {
    if (!localStorage.getItem("usuarioLogado")) {
        window.location.href = "login.html"; // Redireciona para o login
    }
}

// 📌 Logout do Sistema
function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}
