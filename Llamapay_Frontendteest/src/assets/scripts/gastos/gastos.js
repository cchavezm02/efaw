document.addEventListener("DOMContentLoaded", function() {
    localStorage.clear();
    
    // Obtener elementos del DOM
    const calendarContainer = document.getElementById("calendar-container");
    const expenseForm = document.getElementById("expense-form");
    const expenseCategory = document.getElementById("expense-category");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseDate = document.getElementById("expense-date");
    const chart = document.getElementById("chart");

    // Obtener fecha actual
    var currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    // Estructura de datos para guardar los días ingresados por el usuario
    const markedDays = {};

    // Generar calendario
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());

    // Actualizar max en el campo de fecha
    expenseDate.max = currentDate.toISOString().split("T")[0];

    // Agregar evento al formulario de gasto
    expenseForm.addEventListener("submit", function(event) {
        formContainer_i.style.left = '-100%';
        event.preventDefault();

        // Obtener valores del formulario
        const category = expenseCategory.value;
        const amount = parseFloat(expenseAmount.value);
        const date = expenseDate.value;

        // Validar que la fecha no sea mayor a la actual
        const selectedDate = new Date(date);
        selectedDate.setDate(selectedDate.getDate()+1);

        if (selectedDate > currentDate) {
            alert("La fecha no puede ser mayor a la actual");
            return;
        }

        // Agregar gasto al calendario
        addExpenseToCalendar(selectedDate.getDate());

        // Actualizar gráfico
        updateChart(category, amount);

        // Limpiar formulario
        expenseForm.reset();
    });

    // Generar calendario del mes actual
    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const calendarTable = document.createElement("table");
        
        // Cabecera del calendario
        const calendarHeader = document.createElement("thead");
        const headerRow = document.createElement("tr");

        ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].forEach(function(day) {
            const headerCell = document.createElement("th");
            headerCell.textContent = day;
            headerRow.appendChild(headerCell);
        });

        calendarHeader.appendChild(headerRow);
        calendarTable.appendChild(calendarHeader);

        // Cuerpo del calendario
        const calendarBody = document.createElement("tbody");
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const emptyCell = document.createElement("td");
                    weekRow.appendChild(emptyCell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const dayCell = document.createElement("td");
                    dayCell.textContent = date;

                    if (markedDays[year] && markedDays[year][month] && markedDays[year][month].includes(date)) {
                        dayCell.classList.add("expense-day");
                    }

                    weekRow.appendChild(dayCell);
                    date++;
                }
            }

            calendarBody.appendChild(weekRow);
        }

        calendarTable.appendChild(calendarBody);

        // Agregar calendario al contenedor
        calendarContainer.innerHTML = "";

        const calendarTitle = document.createElement("h3");
        calendarTitle.id='title-month';
        calendarTitle.textContent = getMonthName(month) + ", " + year;

        const prevMonthBtn = document.createElement("button");
        prevMonthBtn.className='btn-calendar';
        prevMonthBtn.textContent = "<";
        prevMonthBtn.addEventListener("click", function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
            drawChart();
        });

        const nextMonthBtn = document.createElement("button");
        nextMonthBtn.className='btn-calendar';
        nextMonthBtn.textContent = ">";
        nextMonthBtn.addEventListener("click", function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
            drawChart();
        });

        calendarContainer.appendChild(calendarTitle);
        calendarContainer.appendChild(calendarTable);
        calendarContainer.appendChild(prevMonthBtn);
        calendarContainer.appendChild(nextMonthBtn);
    }

    // Obtener el nombre del mes a partir del número de mes
    function getMonthName(month) {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return monthNames[month];
    }

    // Agregar distintivo a un día del calendario
    function addExpenseToCalendar(day) {
        const dayCells = calendarContainer.querySelectorAll("td");

        dayCells.forEach(function(cell) {
            if (parseInt(cell.textContent) === day) {
                cell.classList.add("expense-day");

                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();

                if (!markedDays[year]) {
                    markedDays[year] = {};
                }

                if (!markedDays[year][month]) {
                    markedDays[year][month] = [];
                }

                if (!markedDays[year][month].includes(day)) {
                    markedDays[year][month].push(day);
                }
            }
        });
    }

    // Actualizar gráfico de barras
    function updateChart(category, amount) {
        const chartData = JSON.parse(localStorage.getItem("chartData")) || {};

        if (!chartData[currentDate.getFullYear()]) {
            chartData[currentDate.getFullYear()] = {};
        }

        if (!chartData[currentDate.getFullYear()][currentDate.getMonth()]) {
            chartData[currentDate.getFullYear()][currentDate.getMonth()] = {};
        }

        if (!chartData[currentDate.getFullYear()][currentDate.getMonth()][category]) {
            chartData[currentDate.getFullYear()][currentDate.getMonth()][category] = amount;
        } else {
            chartData[currentDate.getFullYear()][currentDate.getMonth()][category] += amount;
        }

        localStorage.setItem("chartData", JSON.stringify(chartData));

        drawChart();
    }

    // Dibujar gráfico de barras
    function drawChart() {
        document.getElementById('chart').innerHTML = "";
        var canvas = document.createElement('canvas');

        canvas.id = 'canva-o';

        document.getElementById('chart').appendChild(canvas);

        const context = document.getElementById('canva-o');

        const chartData = JSON.parse(localStorage.getItem("chartData")) || {};
        var chartLabels = Object.keys(chartData[currentDate.getFullYear()][currentDate.getMonth()]);
        var chartValues = Object.values(chartData[currentDate.getFullYear()][currentDate.getMonth()]);

        chartLabels.unshift('');
        chartValues.unshift(0);

        new Chart(context, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Categorías',
                        data: chartValues,
                        backgroundColor: "#506C4D",
                        borderWidth: 2
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Monto por categoría',
                    fontColor: '#000',
                    fontSize: 18
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Categoría',
                                fontSize: 16,
                                fontStyle: 'bold'
                            },
                            ticks: {
                                fontSize: 14
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Monto (S/.)',
                                fontSize: 16,
                                fontStyle: 'bold'
                            },
                            ticks: {
                                fontSize: 14
                            }
                        }
                    ]
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20
                    }
                }
            }
        });
    }

    // Obtener datos del gráfico almacenados en el localStorage
    drawChart();
});
