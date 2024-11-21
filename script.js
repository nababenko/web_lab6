//TASK 1
/// Функція для створення товару та виклику колбеку
function createProduct(obj, callback) {
    // Генерація унікального ідентифікатора для товару
    const product = { ...obj, id: Date.now() }; // Використовуємо timestamp як унікальний id
    callback(product); // Викликаємо колбек з новим об'єктом товару
}

// Колбек для логування товару в консоль
function logProduct(product) {
    console.log("Товар створено:", product);
}

// Колбек для логування загальної вартості товару
function logTotalPrice(product) {
    const totalPrice = product.price * product.quantity;
    console.log(`Загальна вартість ${product.name}: ${totalPrice} грн`);
}

// Обробка форми
function handleFormTask1(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    // Перевірка, щоб ціна та кількість були більші за 0
    if (price <= 0 || quantity <= 0) {
        alert("Ціна та кількість повинні бути більше 0.");
        return;
    }

    const product = { name, price, quantity };

    createProduct(product, logProduct);
    createProduct(product, logTotalPrice);
}



// TASK 3
const medicines = {
    Агалгін: new Date("2022-05-01"),
    Ношпа: new Date("2025-07-02"),
    Альфахолін: new Date("2024-12-21"),
    Аспірин: new Date("2022-08-15"),
    Аспаркам: new Date("2024-04-18"),
};

// Обробка та виведення у консоль
const showValidMedicines = () => {
    const currentDate = new Date(); // Поточна дата

    const validMedicines = Object.entries(medicines) // Отримуємо масив пар [назва, дата]
        .filter(([name, expiryDate]) => expiryDate > currentDate) // Прибираємо прострочені медикаменти
        .sort(([, dateA], [, dateB]) => dateA - dateB) // Сортуємо за датою
        .map(([name]) => name); // Повертаємо лише назви

    console.log(validMedicines);
    alert("У консоль виведено у хронологічному порядку медикаменти, у яких термін придатності ще не вийшов ")
};





// TASK 5
const fruits = [
    { name: "apple", price: 200 },
    { name: "orange", price: 300 },
    { name: "grapes", price: 750 },
];

// Функція для обробки масиву
const applyDiscountAndAddId = (array) => {
    return array.map((fruit, index) => ({
        ...fruit,
        price: fruit.price * 0.8, // Знижка 20%
        id: index + 1, // Додаємо унікальний ID
    }));
};

const showFruits = () => {
    const updatedFruits = applyDiscountAndAddId(fruits); // Обробка масиву
    console.log(updatedFruits); // Виведення результату у консоль
    alert("У консоль виведено масив фруктів з новими цінами та айді");
};





// TASK 7
class Client {
    #login;
    #email;

    constructor(login, email) {
        this.login = login; // Використовуємо сеттер
        this.email = email; // Використовуємо сеттер
    }

    // Геттер для login
    get login() {
        return this.#login;
    }

    // Сеттер для login
    set login(newLogin) {
        if (typeof newLogin === 'string' && newLogin.trim() !== '') {
            this.#login = newLogin;
        } else {
            console.error('Invalid login. It must be a non-empty string.');
        }
    }

    // Геттер для email
    get email() {
        return this.#email;
    }

    // Сеттер для email
    set email(newEmail) {
        if (this.#validateEmail(newEmail)) {
            this.#email = newEmail;
        } else {
            console.error('Invalid email format.');
        }
    }

    // Приватний метод для перевірки email
    #validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Обробка форми
const handleFormSubmit = (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    const login = document.getElementById('login').value;
    const email = document.getElementById('email').value;

    const client = new Client(login, email);

    console.log('Логін:', client.login);
    console.log('Емейл:', client.email);
    alert("Дані надіслано!");
};



//TASK 9
// Функція для підрахунку тегів
function countTags(tweets) {
    const tagCount = {}; // Об'єкт для зберігання кількості тегів

    tweets.forEach(tweet => {
        tweet.tags.forEach(tag => {
            if (tagCount[tag]) {
                tagCount[tag] += 1;
            } else {
                tagCount[tag] = 1;
            }
        });
    });

    return tagCount;
}

// Масив твітів
const tweets = [
    { id: "000", likes: 5, tags: ["js", "nodejs"] },
    { id: "001", likes: 2, tags: ["html", "css"] },
    { id: "002", likes: 17, tags: ["html", "js", "nodejs"] },
    { id: "003", likes: 8, tags: ["css", "react"] },
    { id: "004", likes: 0, tags: ["js", "nodejs", "react"] },
];

// Функція для виведення результату в консоль
function showResult() {
    const result = countTags(tweets);
    console.log(result);
    alert("У консоль виведено результат підрахунку")
}



// TASK 10
// Функція для перевірки правильності дужок
function checkBrackets(str) {
    const stack = []; // Стек для відслідковування відкритих дужок
    const openingBrackets = '({[';
    const closingBrackets = ')}]';
    const matchingBrackets = { '(': ')', '{': '}', '[': ']' };

    for (let char of str) {
        // Якщо символ є відкритою дужкою, додаємо його в стек
        if (openingBrackets.includes(char)) {
            stack.push(char);
        }
        // Якщо символ є закритою дужкою
        else if (closingBrackets.includes(char)) {
            // Перевіряємо, чи стек не порожній і чи відповідає остання відкриваюча дужка
            const lastOpeningBracket = stack.pop();
            if (matchingBrackets[lastOpeningBracket] !== char) {
                return false; // Якщо не співпадає, то неправильне закриття
            }
        }
    }

    // Якщо стек порожній, значить всі дужки закриті коректно
    return stack.length === 0;
}

// Функція для обробки введеного рядка через форму
function handleForm(event) {
    event.preventDefault();
    const code = document.getElementById('codeInput').value;
    const result = checkBrackets(code);
    const resultMessage = result ? 'Дужки закриті правильно!' : 'Помилка! Дужки розставлено неправильно.';
    alert(resultMessage);
}