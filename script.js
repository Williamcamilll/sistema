document.addEventListener("DOMContentLoaded", () => {
    carregarProfissionais();
    carregarPlantoes();
    atualizarEstatisticas();
    atualizarGrafico();
    carregarCalendario();
});

// 📌 Atualizar Gráfico com Dados dos Plantões
function atualizarGrafico() {
    let ctx = document.getElementById("grafico").getContext("2d");
    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];

    let dados = plantoes.reduce((acc, p) => {
        acc[p.profissional] = (acc[p.profissional] || 0) + 1;
        return acc;
    }, {});

    if (window.graficoPlantao) {
        window.graficoPlantao.destroy(); // 🔥 Remove o gráfico antigo antes de criar um novo
    }

    window.graficoPlantao = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(dados),
            datasets: [{
                label: "Plantões por Profissional",
                data: Object.values(dados),
                backgroundColor: ["#0277BD", "#004D40", "#FF9800", "#E91E63", "#9C27B0"],
            }],
        },
    });
}

// 📌 Atualizar Estatísticas do Dashboard
function atualizarEstatisticas() {
    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];
    let profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];

    document.getElementById("totalPlantoes").innerText = plantoes.length;
    document.getElementById("totalProfissionais").innerText = profissionais.length;
}

// 📌 Salvar Profissional no localStorage e Atualizar a Página
document.getElementById("formProfissional")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nomeProfissional").value.trim();
    let especialidade = document.getElementById("especialidade").value.trim();
    let contato = document.getElementById("contatoProfissional").value.trim();

    if (!nome || !especialidade || !contato) {
        alert("❌ Preencha todos os campos!");
        return;
    }

    let profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
    profissionais.push({ nome, especialidade, contato });
    localStorage.setItem("profissionais", JSON.stringify(profissionais));

    alert("✅ Profissional cadastrado com sucesso!");
    
    document.getElementById("formProfissional").reset();
    atualizarEstatisticas();
    carregarProfissionais();
});

// 📌 Carregar Profissionais na Tabela
function carregarProfissionais() {
    let profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
    let lista = document.getElementById("listaProfissionais");

    if (!lista) return;

    lista.innerHTML = "";
    profissionais.forEach((prof) => {
        lista.innerHTML += `<tr>
            <td>${prof.nome}</td>
            <td>${prof.especialidade}</td>
            <td>${prof.contato}</td>
        </tr>`;
    });
}

// 📌 Salvar Plantão no localStorage e Atualizar Tabela, Gráfico e Estatísticas
document.getElementById("formPlantao")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    let profissional = document.getElementById("profissional").value.trim();

    if (!data || !hora || !profissional) {
        alert("❌ Preencha todos os campos!");
        return;
    }

    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];
    plantoes.push({ data, hora, profissional });
    localStorage.setItem("plantoes", JSON.stringify(plantoes));

    alert("✅ Plantão cadastrado com sucesso!");
    
    document.getElementById("formPlantao").reset();
    atualizarGrafico();
    atualizarEstatisticas();
    carregarPlantoes();
    carregarCalendario();
});

// 📌 Carregar Plantões na Tabela
function carregarPlantoes() {
    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];
    let tabela = document.getElementById("listaPlantoes");

    if (!tabela) return;

    tabela.innerHTML = "";
    plantoes.forEach((p) => {
        tabela.innerHTML += `<tr>
            <td>${p.data}</td>
            <td>${p.hora}</td>
            <td>${p.profissional}</td>
        </tr>`;
    });
}

// 📌 Exibir Plantões no Calendário
function carregarCalendario() {
    var calendarEl = document.getElementById("calendario");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: carregarEventos(),
    });

    calendar.render();
}

// 📌 Carregar Plantões para o Calendário
function carregarEventos() {
    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];
    return plantoes.map((p) => ({
        title: p.profissional,
        start: p.data,
    }));
}

// 📌 Exportar Relatório em PDF
document.getElementById("exportarPDF")?.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Plantões", 70, 20);
    doc.setFontSize(12);

    let plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];
    let y = 40;

    if (plantoes.length === 0) {
        doc.text("Nenhum plantão cadastrado.", 20, y);
    } else {
        doc.text("Data     | Horário   | Profissional", 20, y);
        doc.line(20, y + 2, 180, y + 2);
        y += 10;

        plantoes.forEach((p) => {
            doc.text(`${p.data} | ${p.hora} | ${p.profissional}`, 20, y);
            y += 10;
        });
    }

    doc.save("Relatorio_Plantões.pdf");
    alert("✅ Relatório exportado com sucesso!");
});

// 📌 Fazer Backup dos Dados
document.getElementById("backupDados")?.addEventListener("click", function () {
    let dados = {
        profissionais: JSON.parse(localStorage.getItem("profissionais")) || [],
        plantoes: JSON.parse(localStorage.getItem("plantoes")) || [],
    };

    let blob = new Blob([JSON.stringify(dados)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "backup_plantao.json";
    a.click();
    alert("✅ Backup realizado com sucesso!");
});

// 📌 Restaurar Backup dos Dados
document.getElementById("restaurarDados")?.addEventListener("click", function () {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.addEventListener("change", function () {
        let file = input.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            let dados = JSON.parse(e.target.result);
            localStorage.setItem("profissionais", JSON.stringify(dados.profissionais));
            localStorage.setItem("plantoes", JSON.stringify(dados.plantoes));
            alert("✅ Backup restaurado com sucesso!");
            carregarProfissionais();
            carregarPlantoes();
            atualizarEstatisticas();
            atualizarGrafico();
            carregarCalendario();
        };
        reader.readAsText(file);
    });
    input.click();
});
