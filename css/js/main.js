// Código principal para gerenciar a navegação e inicialização
document.addEventListener('DOMContentLoaded', function () {
    // Função para alternar entre as seções
    function navigateToSection(sectionId) {
        // Ocultar todas as seções
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar a seção selecionada
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // Gerenciar eventos de clique no menu de navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            navigateToSection(target);
        });
    });

    // Definir a seção inicial visível (por padrão, "Solicitar Veículo")
    navigateToSection('#solicitar');
});
