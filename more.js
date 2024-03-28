document.addEventListener('DOMContentLoaded', (event) => {
    const inputNumber = document.getElementById('timeValue');
    let timerId;
    let delay = 50; // начальная задержка между изменениями
    const minDelay = 50; // минимальная задержка
    const acceleration = 50; // ускорение (уменьшение задержки)

    // Функция изменения значения
    function modifyValue(delta) {
        const currentValue = Number(inputNumber.value) || 0;
        inputNumber.value = currentValue + delta;
    }

    // Функция начала изменения
    function startChange(delta) {
        if (timerId) {
            clearInterval(timerId); // очистка предыдущего интервала, если он есть
        }
        modifyValue(delta);

        // Установка интервала изменения с ускорением
        timerId = setInterval(() => {
            delay = Math.max(minDelay, delay - acceleration); // уменьшение задержки для ускорения
            modifyValue(delta);
        }, delay);
    }

    // Функция остановки изменения
    function stopChange() {
        clearInterval(timerId);
        timerId = null;
        delay = 500; // сброс задержки до начального значения
    }

    // Обработчики для кнопок увеличения и уменьшения
    inputNumber.addEventListener('mousedown', (event) => {
        if (event.target.type === 'number') {
            const delta = event.target.className === 'increase' ? 1 : -1; // определение направления изменения
            startChange(delta);
        }
    });

    // Остановка изменения при отпускании кнопки мыши
    document.addEventListener('mouseup', stopChange);

    // Для случаев, когда курсор выходит за пределы элемента при зажатии
    inputNumber.addEventListener('mouseleave', stopChange);
});
