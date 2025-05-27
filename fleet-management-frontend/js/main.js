document.addEventListener("DOMContentLoaded", function () {
    // 🔥 Função para alternar entre as seções
    function navigateToSection(sectionId) {
        const sections = document.querySelectorAll("main section");
        sections.forEach(section => section.style.display = "none");

        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
        }
    }

    // 🔥 Gerenciar eventos de clique no menu de navegação
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("href");
            navigateToSection(target);
        });
    });

    // 🔥 Definir a seção inicial visível (por padrão, "Solicitar Veículo")
    navigateToSection("#solicitar");

    // 🔥 Alternar botão de Login para Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.innerText = "Logout";
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token"); // Remove o token de autenticação
            window.location.href = "login.html"; // Redireciona para a tela de login
        });
    }

    // 🔥 Gerenciar botões de navegação para "Motoristas", "Carros" e "Eventos"
    const gerenciarMotoristasBtn = document.getElementById("gerenciarMotoristasBtn");
    const gerenciarCarrosBtn = document.getElementById("gerenciarCarrosBtn");
    const gerenciarEventosBtn = document.getElementById("gerenciarEventosBtn");

    if (gerenciarMotoristasBtn) {
        gerenciarMotoristasBtn.addEventListener("click", () => window.location.href = "motoristas.html");
    }

    if (gerenciarCarrosBtn) {
        gerenciarCarrosBtn.addEventListener("click", () => window.location.href = "carros.html");
    }

    if (gerenciarEventosBtn) {
        gerenciarEventosBtn.addEventListener("click", () => window.location.href = "eventos.html");
    }
});