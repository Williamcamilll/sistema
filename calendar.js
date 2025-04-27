document.addEventListener("DOMContentLoaded", function() {
    let calendarEl = document.getElementById("calendario");
    if (!calendarEl) return;

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: JSON.parse(localStorage.getItem("plantoes")) || [],
    });

    calendar.render();
});
