// 1. Прості числа від 0 до 100
        function runPrimeNumbers() {
            let num = 2;
            let primes = [];
            
            while (num <= 100) {
                let isPrime = true;
                let divider = 2;
                
                while (divider <= Math.sqrt(num)) {
                    if (num % divider === 0) {
                        isPrime = false;
                        break;
                    }
                    divider++;
                }
                
                if (isPrime) {
                    primes.push(num);
                }
                num++;
            }
            document.getElementById('res-primes').innerText = `Прості числа:\n${primes.join(', ')}`;
        }

        // 2. Аналіз чисел від 0 до 10
        function runDoWhileAnalysis() {
            let i = 0;
            let output = [];
            
            do {
                if (i === 0) {
                    output.push(`${i} – це нуль`);
                } else if (i % 2 === 0) {
                    output.push(`${i} – парне число`);
                } else {
                    output.push(`${i} – непарне число`);
                }
                i++;
            } while (i <= 10);
            
            document.getElementById('res-dowhile').innerText = output.join('\n');
        }

        // 3. Ділення числа 10000
        function runDivisionLoop() {
            let numb = 10000;
            let counter = 0;
            
            while (numb >= 50) {
                numb = numb / 2;
                counter++;
            }
            
            let result = numb;
            document.getElementById('res-division').innerText = 
                `Отримане число (result): ${result}\nКількість ітерацій (counter): ${counter}`;
            
        }

        // 4. Пори року та назва місяця
        function runSeasonFinder() {
            const monthsData = [
                { name: "Січень", season: "Зима" }, { name: "Лютий", season: "Зима" },
                { name: "Березень", season: "Весна" }, { name: "Квітень", season: "Весна" }, { name: "Травень", season: "Весна" },
                { name: "Червень", season: "Літо" }, { name: "Липень", season: "Літо" }, { name: "Серпень", season: "Літо" },
                { name: "Вересень", season: "Осінь" }, { name: "Жовтень", season: "Осінь" }, { name: "Листопад", season: "Осінь" },
                { name: "Грудень", season: "Зима" }
            ];

            let input = prompt("Введіть число місяця від 1 до 12:");
            if (input === null) return;
            
            let month = parseInt(input.trim(), 10);

            if (!isNaN(month) && month >= 1 && month <= 12) {
                let currentMonth = monthsData[month - 1];
                alert(`Місяць: ${currentMonth.name}\nПора року: ${currentMonth.season}`);
            } else {
                alert("Неправильний ввід! Вкажіть число від 1 до 12.");
            }
        }

        // 5. Конвертер Цельсій -> Фаренгейт
        function runTempConverter() {
            let input = prompt("Введіть температуру в градусах за Цельсієм (°C):");
            if (input === null) return;

            let tc = parseFloat(input.trim());

            if (!isNaN(tc)) {
                let tf = (9 / 5) * tc + 32;
                alert(`${tc}°C = ${tf.toFixed(1)}°F`);
            } else {
                alert("Помилка! Ви ввели не число.");
            }
        }

        // 6. День тижня (Виведення на сторінку замість document.write, щоб не ламати структуру)
        function runDayOfWeek() {
            const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"];
            
            let input = prompt("Введіть число від 1 до 7:");
            if (input === null) return;

            let dayNum = parseInt(input.trim(), 10);
            const resBox = document.getElementById('res-day');

            if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 7) {
                resBox.innerText = `Обраний день: ${days[dayNum - 1]}`;
            } else {
                resBox.innerText = `Помилка: введіть число суворо від 1 до 7!`;
            }
        }