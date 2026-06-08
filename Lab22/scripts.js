// 1. Залишок секунд
        function runTask1() {
            const total = parseInt(document.getElementById('task1-input').value) || 0;
            const res = total % 60;
            document.getElementById('task1-result').innerText = `Залишок секунд: ${res}`;
        }

        // 2. Периметр
        function runTask2() {
            const side = parseFloat(document.getElementById('task2-side').value) || 0;
            const count = parseInt(document.getElementById('task2-count').value) || 0;
            const res = side * count;
            document.getElementById('task2-result').innerText = `Периметр: ${res}`;
        }

        // 3. FizzBuzz
        function runTask3() {
            const n = parseInt(document.getElementById('task3-input').value) || 0;
            let output = [];
            for (let i = 1; i <= n; i++) {
                if (i % 3 === 0 && i % 5 === 0) output.push("fizzbuzz");
                else if (i % 3 === 0) output.push("fizz");
                else if (i % 5 === 0) output.push("buzz");
                else output.push(i);
            }
            document.getElementById('task3-result').innerText = output.join('\n');
        }

        // 4. Calculate (Середнє арифметичне)
        function runTask4() {
            const a = parseFloat(document.getElementById('task4-a').value) || 0;
            const b = parseFloat(document.getElementById('task4-b').value) || 0;
            const c = parseFloat(document.getElementById('task4-c').value) || 0;
            const avg = (a + b + c) / 3;
            document.getElementById('task4-result').innerText = `Середнє значення: ${avg.toFixed(2)}`;
        }

        // 5. isDivisible
        function runTask5() {
            const n = parseInt(document.getElementById('task5-n').value) || 0;
            const x = parseInt(document.getElementById('task5-x').value) || 1;
            const y = parseInt(document.getElementById('task5-y').value) || 1;

            const resIf = (n % x === 0 && n % y === 0) ? true : false;
            const resTernary = (n % x === 0 && n % y === 0) ? "Так" : "Ні";
            const resPure = n % x === 0 && n % y === 0;

            document.getElementById('task5-result').innerText = 
                `З конструкцією IF (bool): ${n % x === 0 && n % y === 0}\n` +
                `Тернарний оператор: ${resTernary}\n` +
                `Без IF та тернарного: ${resPure}`;
        }

        // 6. Робота з одновимірним масивом
        function runTask6() {
            const N = parseInt(document.getElementById('task6-n').value) || 0;
            if(N <= 0) {
                document.getElementById('task6-result').innerText = "Введіть N > 0";
                return;
            }
            
            let arr = [];
            for (let i = 0; i < N; i++) {
                arr.push(Math.floor(Math.random() * 100) + 1);
            }

            let min = arr[0], max = arr[0], sum = 0, odds = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < min) min = arr[i];
                if (arr[i] > max) max = arr[i];
                sum += arr[i];
                if (arr[i] % 2 !== 0) odds.push(arr[i]);
            }

            document.getElementById('task6-result').innerText = 
                `Масив: [${arr.join(', ')}]\n` +
                `Найменше: ${min}\n` +
                `Найбільше: ${max}\n` +
                `Сума: ${sum}\n` +
                `Сер. арифм.: ${(sum / N).toFixed(2)}\n` +
                `Непарні: [${odds.join(', ')}]`;
        }

        // 7. Двовимірний масив 5х5
        function runTask7() {
            let matrix = [];
            let initialStr = "Початкова:\n";
            let modifiedStr = "Модифікована (головна діагональ):\n";

            for (let i = 0; i < 5; i++) {
                matrix[i] = [];
                for (let j = 0; j < 5; j++) {
                    matrix[i][j] = Math.floor(Math.random() * 21) - 10; // від -10 до 10
                }
                initialStr += `[ ${matrix[i].map(n => String(n).padStart(3, ' ')).join(', ')} ]\n`;
            }

            for (let i = 0; i < 5; i++) {
                if (matrix[i][i] < 0) matrix[i][i] = 0;
                else if (matrix[i][i] > 0) matrix[i][i] = 1;
            }

            for (let i = 0; i < 5; i++) {
                modifiedStr += `[ ${matrix[i].map(n => String(n).padStart(3, ' ')).join(', ')} ]\n`;
            }

            document.getElementById('task7-result').innerText = initialStr + "\n" + modifiedStr;
        }

        // 8. Калькулятор
        function runTask8() {
            const a = parseFloat(document.getElementById('task8-a').value) || 0;
            const b = parseFloat(document.getElementById('task8-b').value) || 0;
            const op = document.getElementById('task8-op').value;
            let res = "";

            if (op === 'add') res = `Результат: ${a + b}`;
            else if (op === 'sub') res = `Результат: ${a - b}`;
            else if (op === 'mul') res = `Результат: ${a * b}`;
            else if (op === 'div') {
                res = (b === 0) ? "Помилка: Ділення на нуль!" : `Результат: ${a / b}`;
            }

            document.getElementById('task8-result').innerText = res;
        }

        // 9. Властивості числа
        function runTask9() {
            const num = parseInt(document.getElementById('task9-input').value) || 0;
            
            let sign = num > 0 ? "Позитивне" : num < 0 ? "Негативне" : "Нуль";
            
            let isPrime = num > 1;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) { isPrime = false; break; }
            }
            let primeStr = isPrime ? "Просте" : "Не є простим";

            let divRes = [];
            [2, 5, 3, 6, 9].forEach(d => {
                if (num % d === 0) divRes.push(d);
            });
            let divStr = divRes.length > 0 ? `Ділиться без залишку на: ${divRes.join(', ')}` : "Не ділиться без залишку на 2,5,3,6,9";

            document.getElementById('task9-result').innerText = 
                `Знак: ${sign}\n` +
                `Тип: ${primeStr}\n` +
                `${divStr}`;
        }

        // 10. Модифікація та реверс масиву
        function runTask10() {
            const rawInput = document.getElementById('task10-input').value;
            let arr = rawInput.split(',').map(item => {
                let trimmed = item.trim();
                if (trimmed.toLowerCase() === 'true') return true;
                if (trimmed.toLowerCase() === 'false') return false;
                return !isNaN(trimmed) && trimmed !== "" ? Number(trimmed) : trimmed;
            });

            let transformed = arr.map(item => typeof item === 'number' ? item ** 2 : item);
            transformed.reverse();

            document.getElementById('task10-result').innerText = `Результат: [ ${transformed.join(', ')} ]`;
        }

        // 11. Видалення дублікатів
        function runTask11() {
            const rawInput = document.getElementById('task11-input').value;
            let arr = rawInput.split(',').map(item => item.trim());
            let unique = [...new Set(arr)];

            document.getElementById('task11-result').innerText = `Без дублікатів: [ ${unique.join(', ')} ]`;
        }