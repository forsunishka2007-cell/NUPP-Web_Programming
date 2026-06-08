        const localization = {
            ua: {
                dayQuestion: "Введіть номер дня неділі від 1 до 7?",
                invalidInput: "Неправильний ввід даних! Спробуйте ще раз.",
                days: { 1: "Понеділок", 2: "Вівторок", 3: "Середа", 4: "Четвер", 5: "П'ятниця", 6: "Субота", 7: "Неділя" }
            },
            en: {
                dayQuestion: "Enter the day number of the week (from 1 to 7)?",
                invalidInput: "Invalid data input! Please try again.",
                days: { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday" }
            }
        };

        function runLanguageApp() {
            let lang = "";
            while (true) {
                let inputLang = prompt("Виберіть мову “ua” або “en”?");
                if (inputLang === null) return;

                lang = inputLang.trim().toLowerCase();
                if (lang === "ua" || lang === "en") break;
                alert("Неправильний ввід даних / Invalid input!");
            }

            const currentLangPack = localization[lang];
            let dayNumber;

            while (true) {
                let inputDay = prompt(currentLangPack.dayQuestion);
                if (inputDay === null) return;

                dayNumber = parseInt(inputDay.trim(), 10);
                if (!isNaN(dayNumber) && dayNumber >= 1 && dayNumber <= 7) break;
                alert(currentLangPack.invalidInput);
            }

            alert(currentLangPack.days[dayNumber]);
        }


        class GridElement {
            constructor(name) { this.name = name; }
            getOutputDay() { return 0; }
            getOutputNight() { return 0; }
        }

        class PowerPlant extends GridElement {
            constructor(name, powerMW) {
                super(name);
                this.powerMW = Math.max(1, Math.min(100, powerMW));
            }
            getOutputDay() { return this.powerMW; }
            getOutputNight() { return this.powerMW; }
        }

        class SolarPanel extends GridElement {
            constructor(name, dayPowerMW) {
                super(name);
                this.dayPowerMW = Math.max(1, Math.min(5, dayPowerMW));
            }
            getOutputDay() { return this.dayPowerMW; }
            getOutputNight() { return 0; }
        }

        class House extends GridElement {
            constructor(name, apartmentsCount) {
                super(name);
                this.apartmentsCount = Math.max(1, Math.min(400, apartmentsCount));
            }
            getOutputDay() { return -(this.apartmentsCount * 4) / 1000; }
            getOutputNight() { return -(this.apartmentsCount * 1) / 1000; }
        }

        class TransmissionLine {
            constructor(name, capacityMW, pricePerMW) {
                this.name = name;
                this.capacityMW = capacityMW;
                this.pricePerMW = pricePerMW;
            }
        }

        class PowerGridSystem {
            constructor() {
                this.elements = [];
                this.lines = [];
            }
            addElement(element) { this.elements.push(element); }
            addLine(line) { this.lines.push(line); }

            calculateBalanceFor(timeOfDay) {
                let internalBalance = 0;
                this.elements.forEach(el => {
                    internalBalance += (timeOfDay === 'day') ? el.getOutputDay() : el.getOutputNight();
                });

                let financialResult = 0;
                let remainingBalance = internalBalance;

                if (internalBalance > 0) {
                    let exportLines = [...this.lines].sort((a, b) => b.pricePerMW - a.pricePerMW);
                    for (let line of exportLines) {
                        if (remainingBalance <= 0) break;
                        let energyToExport = Math.min(remainingBalance, line.capacityMW);
                        remainingBalance -= energyToExport;
                        financialResult += energyToExport * line.pricePerMW;
                    }
                    return { balance: internalBalance, remaining: remainingBalance, status: "Надлишок", money: financialResult };
                } else {
                    let importLines = [...this.lines].sort((a, b) => a.pricePerMW - b.pricePerMW);
                    let currentNeeded = Math.abs(internalBalance);
                    for (let line of importLines) {
                        if (currentNeeded <= 0) break;
                        let energyToImport = Math.min(currentNeeded, line.capacityMW);
                        currentNeeded -= energyToImport;
                        financialResult += energyToImport * line.pricePerMW;
                    }
                    return { balance: internalBalance, remaining: currentNeeded, status: "Дефіцит", money: -financialResult };
                }
            }
        }

        function runGridSimulation() {
            const plantPower = parseFloat(document.getElementById('param-plant').value) || 0;
            const solarPower = parseFloat(document.getElementById('param-solar').value) || 0;
            const houseCount = parseInt(document.getElementById('param-house').value) || 0;
            const linePrice = parseFloat(document.getElementById('param-price').value) || 0;

            const grid = new PowerGridSystem();
            grid.addElement(new PowerPlant("ТЕС-1", plantPower));
            grid.addElement(new SolarPanel("СЕС-Основна", solarPower));
            grid.addElement(new House("Житловий масив", houseCount));
            
            grid.addLine(new TransmissionLine("ЛЕП-Основна", 15, linePrice));

            const dayRes = grid.calculateBalanceFor('day');
            const nightRes = grid.calculateBalanceFor('night');

            let report = `=== ЗВІТ ЕНЕРГОСИСТЕМИ МІСТА ===\n\n`;
            
            report += `[ДЕНЬ]:\n`;
            report += `  • Внутрішній баланс: ${dayRes.balance.toFixed(3)} МВт\n`;
            if (dayRes.money >= 0) {
                report += `  • Статус: Продаж енергії\n  • Прибуток: +${dayRes.money.toFixed(2)} грн\n`;
            } else {
                report += `  • Статус: Закупівля енергії\n  • Витрати: ${dayRes.money.toFixed(2)} грн\n`;
            }
            report += `  • Нерозподілено/невистачає: ${dayRes.remaining.toFixed(3)} МВт\n\n`;

            report += `[НІЧ]:\n`;
            report += `  • Внутрішній баланс: ${nightRes.balance.toFixed(3)} МВт\n`;
            if (nightRes.money >= 0) {
                report += `  • Статус: Продаж енергії\n  • Прибуток: +${nightRes.money.toFixed(2)} грн\n`;
            } else {
                report += `  • Статус: Закупівля енергії\n  • Витрати: ${nightRes.money.toFixed(2)} грн\n`;
            }
            report += `  • Нерозподілено/невистачає: ${nightRes.remaining.toFixed(3)} МВт`;

            const reportBox = document.getElementById('grid-report');
            reportBox.innerText = report;
            reportBox.style.display = 'block';
        }