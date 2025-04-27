
document.addEventListener("DOMContentLoaded", () => {
  const btnExcel = document.getElementById("exportarExcel");
  if (!btnExcel) return;

  btnExcel.addEventListener("click", () => {
    const plantoes = JSON.parse(localStorage.getItem("plantoes")) || [];

    const csvHeader = ["Data", "Hora", "Profissional"];
    const csvRows = plantoes.map(p => [p.data, p.hora, p.profissional]);

    const csvContent = [
      csvHeader.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "plantoes_unimar.csv");
    link.click();
  });
});
