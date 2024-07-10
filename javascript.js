document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const bookingForm = document.getElementById("bookingForm");
    const closeModal = document.querySelector(".close");
    const dateInput = document.getElementById("date");

    function createCalendar(year, month) {
        const date = new Date(year, month);
        const monthName = date.toLocaleString('default', { month: 'long' });
        let table = `<table><thead><tr><th colspan="7">${monthName} ${year}</th></tr><tr>`;
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        for (let day of days) {
            table += `<th>${day}</th>`;
        }
        table += `</tr></thead><tbody><tr>`;

        for (let i = 0; i < date.getDay(); i++) {
            table += "<td></td>";
        }

        while (date.getMonth() === month) {
            table += `<td>${date.getDate()}</td>`;
            if (date.getDay() % 7 === 6) {
                table += "</tr><tr>";
            }
            date.setDate(date.getDate() + 1);
        }

        for (let i = date.getDay(); i < 7; i++) {
            table += "<td></td>";
        }

        table += "</tr></tbody></table>";
        calendar.innerHTML = table;

        calendar.querySelectorAll("td").forEach(td => {
            if (td.innerText) {
                td.addEventListener("click", () => {
                    bookingForm.style.display = "block";
                    dateInput.value = `${monthName} ${td.innerText}, ${year}`;
                });
            }
        });
    }

    closeModal.addEventListener("click", () => {
        bookingForm.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target == bookingForm) {
            bookingForm.style.display = "none";
        }
    }

    createCalendar(new Date().getFullYear(), new Date().getMonth());
});
