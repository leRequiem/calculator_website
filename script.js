document.addEventListener("DOMContentLoaded", function () {
    const nInput = document.getElementById("n");
    const kInput = document.getElementById("k");
    const mInput = document.getElementById("m");
    const rInput = document.getElementById("r");
    const k1knInput = document.getElementById("k1...kn");
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
        let n = Number(nInput.value);
        let k = Number(kInput.value);
        let m = Number(mInput.value);
        let r = Number(rInput.value);
        let kArray = k1knInput.value.trim().split(/\s+/).map(Number);
        let kSum = sumArrayElements(kArray);
        let res;

        // Дополнительные проверки в зависимости от нажатой кнопки
        switch (buttonId) {
            case "button__placement-without-repetition":
            case "button__placement-with-repetition":
            case "button__permutation-without-repetition":
            case "button__combination-without-repetition":
            case "button__combination-with-repetition":
                if (isNaN(n) || isNaN(k) || n < 0 || k < 0 || k >= n) {
                    resultText.textContent = "Пожалуйста, введите корректные данные";
                    return;
                }
                break;
            case "button__permutation-with-repetition":
                if (isNaN(n) || isNaN(kSum) || n < 0 || kSum !== n) {
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
                if (isNaN(n) || isNaN(m) || isNaN(k) || isNaN(r) || n < 0 || m < 0 || k < 0 || r <= 0 || m >= n || k >= m || r >= k) {
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
                res = calculatePlacementWithoutRepetition(n, k);
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__placement-with-repetition":
                res = calculatePlacementWithRepetition(n, k)
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__permutation-without-repetition":
                res = calculatePermutationWithoutRepetition(n);
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__permutation-with-repetition":
                res = calculatePermutationWithRepetition(n, kArray);
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__combination-without-repetition":
                res = calculateCombinationWithoutRepetition(n, k);
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__combination-with-repetition":
                res = calculateCombinationWithRepetition(n, k)
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__urn-model-one":
                res = calculateUrnModelOne(n, m, k)
                resultText.textContent = res;
                sendResultToServer(res);
                break;
            case "button__urn-model-two":
                res = calculateUrnModelTwo(n, m, k, r);
                resultText.textContent = res;
                sendResultToServer(res);
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
        return result;
    }

    function calculatePlacementWithRepetition(n, k) {
        // Расчет размещения с повторениями: n^k
        const result = Math.pow(n, k);
        saveResultToLocalStorage(result);
        return  result;
    }

    function calculatePermutationWithoutRepetition(n) {
        // Расчет перестановки без повторений: n!
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        saveResultToLocalStorage(result);
        return result;
    }

    function calculatePermutationWithRepetition(n, kArray) {
        // Расчет перестановки с повторениями: n! / (k1! * k2! * ... * kn!)
        const kFactorial = kArray.reduce((total, k) => total * factorial(k), 1);
        const result = factorial(n) / kFactorial;
        saveResultToLocalStorage(result);
        return result;
    }

    function calculateCombinationWithoutRepetition(n, k) {
        // Расчет сочетания без повторений: n! / (k! * (n - k)!)
        let result = factorial(n) / (factorial(k) * factorial(n - k));
        saveResultToLocalStorage(result);
        return result;
    }

    function calculateCombinationWithRepetition(n, k) {
        // Расчет сочетания с повторениями: (n + k - 1)! / (k! * (n - 1)!)
        let result = factorial(n + k - 1) / (factorial(k) * factorial(n - 1));
        saveResultToLocalStorage(result);
        return result;
    }

    function calculateUrnModelOne(n, m, k) {
        // Расчет урновой модели 1
        const numerator = calculateCombinationWithoutRepetition(m, k);
        const denominator = calculateCombinationWithoutRepetition(n, k);
        const result = (numerator / denominator).toFixed(5);
        saveResultToLocalStorage(result);
        return result;
    }

    function calculateUrnModelTwo(n, m, k, r) {
        // Расчет урновой модели 2
        const numerator = (calculateCombinationWithoutRepetition(m, r) * calculateCombinationWithoutRepetition(n - m, k - r));
        const denominator = calculateCombinationWithoutRepetition(n, k);
        const result = (numerator / denominator).toFixed(5);
        saveResultToLocalStorage(result);
        return result;
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

    function sumArrayElements(arr) {
        if (Array.isArray(arr)) {
            return arr.reduce((sum, element) => sum + element, 0);
        } else
            return NaN;
    }

    function sendResultToServer(result) {
        const formValues = {
            result: result
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(formValues)
        })
            .then(response => {
                if (response.ok) {
                    alert('Ваш ответ отправлен!');
                } else {
                    throw new Error('Ошибка при отправке данных');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});
