document.getElementById("exportarPDF")?.addEventListener("click", function() {
    let doc = new jsPDF();
    doc.text("Relatório de Plantões", 10, 10);

    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];
    let y = 20;
    
    plantoes.forEach((p, index) => {
        doc.text(`${index + 1}. ${p.data} - ${p.hora} - ${p.profissional}`, 10, y);
        y += 10;
    });

    doc.save("plantao_relatorio.pdf");
});
