async function sendAjaxRequest() {
            const inputElement = document.getElementById('number-input');
            const outputBox = document.getElementById('output-box');
            const inputValue = inputElement.value;

            // Валідація пустих полів на фронтенді
            if (inputValue === '') {
                showResult('Будь ласка, спочатку введіть число.', true);
                return;
            }

            // Показуємо стан завантаження
            showResult('Очікування відповіді від сервера...', false);

            try {
                // Виконуємо асинхронний AJAX запит до сервера за допомогою Fetch API
                const response = await fetch('http://localhost:3000/calculate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ number: inputValue })
                });

                const data = await response.json();

                if (response.ok) {
                    // Успішно отримали прораховані сервером дані
                    showResult(data.message, false);
                } else {
                    // Сервер повернув помилку (наприклад, 400 Bad Request)
                    showResult(data.error || 'Помилка обробки даних.', true);
                }

            } catch (error) {
                // Помилка з'єднання (якщо сервер вимкнено)
                showResult('Не вдалося зв’язатися із сервером. Перевірте, чи запущено сервер.', true);
                console.error('Помилка AJAX:', error);
            }
        }

        function showResult(text, isError) {
            const outputBox = document.getElementById('output-box');
            outputBox.innerText = text;
            outputBox.style.display = 'block';
            
            if (isError) {
                outputBox.className = 'status-output error';
            } else {
                outputBox.className = 'status-output success';
            }
        }