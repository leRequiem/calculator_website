document.addEventListener("DOMContentLoaded", function () {
    const nInput = document.getElementById("n");
    const kInput = document.getElementById("k");
    const mInput = document.getElementById("m");
    const rInput = document.getElementById("r");
    const buttons = document.querySelectorAll(".calculator__main-buttons button");
    const resultText = document.getElementById("result");

    const lastResult = localStorage.getItem("lastResult");
    if (lastResult) {
        resultText.textContent = "Последний результат: " + lastResult;
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            handleButtonClick(button.id);
        });
    });

    function handleButtonClick(buttonId) {
        const n = Number(nInput.value);
        const k = Number(kInput.value);
        const m = Number(mInput.value);
        const r = Number(rInput.value);

        // Дополнительные проверки в зависимости от нажатой кнопки
        switch (buttonId) {
            case "button__placement-without-repetition":
            case "button__placement-with-repetition":
            case "button__permutation-without-repetition":
            case "button__permutation-with-repetition":
            case "button__combination-with-repetition":
            case "button__combination-without-repetition":
                if (isNaN(n) || isNaN(k) || n < 0 || k < 0 || k >= n) {
                    resultText.textContent = "Пожалуйста, введите корректные данные";
                    return;
                }
                break;
            case "button__urn-model-one":
                if (isNaN(n) || isNaN(m) || isNaN(k) || n < 0 || m < 0 || k < 0 || m >= n || k >= m) {
                    resultText.textContent = "Пожалуйста, введите корректные данные";
                    return;
                }
                break;
            case "button__urn-model-two":
                if (isNaN(n) || isNaN(m) || isNaN(k) || isNaN(r) || n < 0 || m < 0 || k < 0 || r < 0 || m >= n || k >= m || r >= k) {
                    resultText.textContent = "Пожалуйста, введите корректные данные";
                    return;
                }
                break;
            default:
                resultText.textContent = "Пожалуйста, введите корректные данные";
                return;
        }

        switch (buttonId) {
            case "button__placement-without-repetition":
                resultText.textContent = calculatePlacementWithoutRepetition(n, k);
                break;
            case "button__placement-with-repetition":
                resultText.textContent = calculatePlacementWithRepetition(n, k);
                break;
            case "button__permutation-without-repetition":
                resultText.textContent = calculatePermutationWithoutRepetition(n);
                break;
            case "button__permutation-with-repetition":
                resultText.textContent = calculatePermutationWithRepetition(n, k);
                break;
            case "button__combination-without-repetition":
                resultText.textContent = calculateCombinationWithoutRepetition(n, k);
                break;
            case "button__combination-with-repetition":
                resultText.textContent = calculateCombinationWithRepetition(n, k);
                break;
            case "button__urn-model-one":
                resultText.textContent = calculateUrnModelOne(n, m, k);
                break;
            case "button__urn-model-two":
                resultText.textContent = calculateUrnModelTwo(n, m, k, r);
                break;
        }
    }

    function calculatePlacementWithoutRepetition(n, k) {
        // Расчет размещения без повторений: n! / (n - k)!
        let result = 1;
        for (let i = n; i > n - k; i--) {
            result *= i;
        }
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculatePlacementWithRepetition(n, k) {
        // Расчет размещения с повторениями: n^k
        const result = Math.pow(n, k);
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculatePermutationWithoutRepetition(n) {
        // Расчет перестановки без повторений: n!
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculatePermutationWithRepetition(n, k) {
        // Расчет перестановки с повторениями: n^k
        const result = Math.pow(n, k);
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculateCombinationWithoutRepetition(n, k) {
        // Расчет сочетания без повторений: n! / (k! * (n - k)!)
        let result = factorial(n) / (factorial(k) * factorial(n - k));
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculateCombinationWithRepetition(n, k) {
        // Расчет сочетания с повторениями: (n + k - 1)! / (k! * (n - 1)!)
        let result = factorial(n + k - 1) / (factorial(k) * factorial(n - 1));
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculateUrnModelOne(n, m, k) {
        // Расчет урновой модели 1
        const numerator = calculateCombinationWithoutRepetition(m, k);
        const denominator = calculateCombinationWithoutRepetition(n, k);
        const result = (numerator / denominator).toFixed(5);
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function calculateUrnModelTwo(n, m, k, r) {
        // Расчет урновой модели 2
        const numerator = (calculateCombinationWithoutRepetition(m, r) * calculateCombinationWithoutRepetition(n - m, k - r));
        const denominator = calculateCombinationWithoutRepetition(n, k);
        const result = (numerator / denominator).toFixed(5);
        saveResultToLocalStorage(result);
        return "Результат: " + result;
    }

    function saveResultToLocalStorage(result) {
        localStorage.setItem("lastResult", result);
    }

    function factorial(num) {
        if (num <= 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }
});