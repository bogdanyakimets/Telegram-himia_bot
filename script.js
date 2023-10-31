const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '6599900167:AAFQPgI1LGlZZF-MgzIFHEuMQlDt__amJWE';
const bot = new TelegramBot(token, { polling: true });
const elementsData = require('./elements.json');

const helpText = `Пошук інформації про хімічний елемент:
Щоб знайти інформацію про конкретний хімічний елемент, ви можете ввести одне з наступних:

- Ім'я елемента: Введіть повне або скорочене ім'я елемента. Наприклад, "гідроген" або "H".
- Номер елемента: Введіть номер елемента в періодичній таблиці Менделєєва. Наприклад, "1" для водню.
- Символ елемента: Введіть хімічний символ елемента. Наприклад, "H" для водню.

Отримання інформації:
Після введення імені, символу або номера елемента, бот відповість інформацією про цей елемент. Відповідь містить такі дані:

- Ім'я елемента: Повне ім'я хімічного елемента.
- Символ елемента: Хімічний символ елемента.
- Атомна маса: Атомна маса елемента.
- Номер: Номер елемента в періодичній таблиці Менделєєва.
- Період: Номер періоду, до якого входить елемент.

Неуспішний пошук:
Якщо ви введете невірну назву, символ або номер елемента, бот повідомить вам, що елемент не знайдено та запропонує спробувати інше запит.

Інструкція:
Щоб отримати інструкцію знову, ви можете ввести команду /help. Бот надішле вам текстову інструкцію.

Таким чином, ви можете використовувати цього бота для отримання інформації про хімічні елементи.`;

bot.onText(/\/start|\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, helpText, { parse_mode: 'Markdown' });
});

bot.on('text', (msg) => {
    const userInput = msg.text.trim().toLowerCase();
    
    if (userInput === '/start' || userInput === '/help') {
    
        return;
    }

    const elementInfo = findElement(userInput);

    if (elementInfo) {
        const response = `Елемент: ${elementInfo.symbol}\nНазва: ${elementInfo.name}\nАтомна маса: ${elementInfo.atomic_mass}\nНомер: ${elementInfo.number}\nПеріод: ${elementInfo.period}`;
        bot.sendMessage(msg.chat.id, response);
    } else {
        bot.sendMessage(msg.chat.id, 'Елемент не знайдено. Спробуйте ввести інше ім\'я елемента, символ або номер.');
    }
});

function findElement(userInput) {
    for (const elementName in elementsData) {
        const element = elementsData[elementName];
        if (
            element.number.toString() === userInput ||
            element.symbol.toLowerCase() === userInput ||
            element.name.toLowerCase() === userInput ||
            element.symbol.toLowerCase() === userInput ||
            element.name.toLowerCase() === userInput
        ) {
            return element;
        }
    }
    return null;
}
