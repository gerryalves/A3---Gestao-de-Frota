document.addEventListener("DOMContentLoaded", function () {
    // Função para alternar entre as seções dentro da página principal
    function navigateToSection(sectionId) {
        const sections = document.querySelectorAll("main section");
        sections.forEach(section => section.style.display = "none");

        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
        }
    }

    // Gerencia eventos de clique no menu de navegação dentro da página principal
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("href");
            navigateToSection(target);
        });
    });

    // Define a seção inicial visível (por padrão, "Solicitar Veículo")
    navigateToSection("#solicitar");

    // Alterna botão de Login para Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.innerText = "Logout";
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token"); // Remove o token de autenticação
            window.location.href = "login.html"; // Redireciona para a tela de login
        });
    }

    // Redireciona para as páginas de Gerenciamento ao clicar nos botões
    const gerenciarMotoristasBtn = document.getElementById("gerenciarMotoristasBtn");
    const gerenciarCarrosBtn = document.getElementById("gerenciarCarrosBtn");
    const gerenciarEventosBtn = document.getElementById("gerenciarEventosBtn");

    if (gerenciarMotoristasBtn) {
        gerenciarMotoristasBtn.addEventListener("click", () => {
            window.location.href = "motoristas.html";
        });
    }

    if (gerenciarCarrosBtn) {
        gerenciarCarrosBtn.addEventListener("click", () => {
            window.location.href = "carros.html";
        });
    }

    if (gerenciarEventosBtn) {
        gerenciarEventosBtn.addEventListener("click", () => {
            window.location.href = "eventos.html";
        });
    }
});