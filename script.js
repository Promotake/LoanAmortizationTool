function calculateAmortization() {
    let totalSum = parseFloat(document.getElementById("totalSum").value);
    let timeValue = parseInt(document.getElementById("timeValue").value);
    let accelerationFactor = parseFloat(document.getElementById("accelerationFactor").value);

    let output = document.getElementById("output");
    let resultsContainer = document.getElementById("resultsContainer");

    // Проверка корректности коэффициента ускорения
    if (accelerationFactor < 1 || accelerationFactor > 3) {
        output.innerHTML = 'Ошибка: Коэффициент ускорения должен быть не менее 1 и не более 3.';
        resultsContainer.style.display = "block";
        return; // Прекращаем выполнение функции
    }

    let annualDepreciationRate = 100 / timeValue;
    let remainder = totalSum;
    let year = 1;
    
    output.innerHTML = ''; // Очистить предыдущий вывод
    resultsContainer.style.display = "block"; // Показываем контейнер с результатами

    while (year <= timeValue && remainder > 0) {
        let annualAmortization;
        if (year === timeValue) {
            annualAmortization = remainder; // В последний год вся оставшаяся сумма амортизируется
        } else {
            annualAmortization = remainder * (annualDepreciationRate / 100) * accelerationFactor;
        }
        remainder -= annualAmortization;

        if (remainder < 0) {
            remainder = 0;
        }

        output.innerHTML += `Год: ${year} - <span style="color:green;"> Остаток: ${remainder.toFixed(2)}, <span style="color:red;"> амортизация: ${annualAmortization.toFixed(2)}<br>`;
        year += 1;
    }
}
