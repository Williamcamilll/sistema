// Verificar se o usuário já está logado
if (localStorage.getItem("logado") === "true") {
  window.location.href = "index.html";
}

// Adicionar evento de submissão ao formulário de login
document.getElementById("formLogin")?.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Capturar os valores dos campos
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("loginMsg");

  // Autenticação simples (pode ser substituída por uma API futuramente)
  if (usuario === "will" && senha === "0000") {
    localStorage.setItem("logado", "true"); // Salva estado de login
    window.location.href = "index.html";    // Redireciona para página principal
  } else {
    // Exibe mensagem de erro
    msg.textContent = "Usuário ou senha inválidos!";
    msg.style.color = "#ff4d4f";
  }
});
document.getElementById("formLogin")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("loginMsg");

  if (usuario === "will" && senha === "0000") {
    localStorage.setItem("logado", "true");

    // ALERTA BONITO AQUI
    Swal.fire({
      title: 'Login realizado!',
      text: 'Bem-vindo de volta!',
      icon: 'success',
      confirmButtonColor: '#4e54c8',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "index.html";
    });

  } else {
    msg.textContent = "Usuário ou senha inválidos!";
    msg.style.color = "#ff4d4f";
  }
});

// Redirecionar se já estiver logado
if (localStorage.getItem("logado") === "true") {
  window.location.href = "index.html";
}
