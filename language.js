document.addEventListener("DOMContentLoaded", function() {
    let languageToggle = document.createElement("select");
    languageToggle.innerHTML = `
        <option value="pt">Português 🇧🇷</option>
        <option value="en">English 🇺🇸</option>
        <option value="es">Español 🇪🇸</option>
    `;
    languageToggle.style.position = "fixed";
    languageToggle.style.top = "20px";
    languageToggle.style.right = "20px";
    languageToggle.style.padding = "5px";

    document.body.appendChild(languageToggle);

    languageToggle.addEventListener("change", function() {
        let lang = languageToggle.value;
        localStorage.setItem("lang", lang);
        traduzirTexto(lang);
    });

    let langSalvo = localStorage.getItem("lang") || "pt";
    languageToggle.value = langSalvo;
    traduzirTexto(langSalvo);
});

function traduzirTexto(lang) {
    let traducoes = {
        "pt": {
            "title": "Gestão de Plantões - Unimar",
            "button_export": "📄 Exportar Relatório",
        },
        "en": {
            "title": "Shift Management - Unimar",
            "button_export": "📄 Export Report",
        },
        "es": {
            "title": "Gestión de Turnos - Unimar",
            "button_export": "📄 Exportar Informe",
        }
    };

    document.title = traducoes[lang]["title"];
    document.getElementById("exportarPDF").textContent = traducoes[lang]["button_export"];
}
