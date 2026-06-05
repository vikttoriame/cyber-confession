// ================= 1. БАЗА ДАННЫХ ГРЕХОВ ПО КАТЕГОРИЯМ =================
const SINS_DATABASE = {
    relations: {
        title: "Грехи в отношениях",
        list: [
            "Токсично срывался(ась) на близких людей вместо экологичного проживания эмоций",
            "Перемывал(а) кости друзьям, партнерам или коллегам в тайных чатах и сплетничал(а)",
            "Игнорил(а) важные сообщения близких, прикрываясь 'отсутствием ресурса'",
            "Обещал(а) помочь человеку, но слился(ась) в самый последний момент",
            "Манипулировал(а) чужими чувствами ради собственной выгоды или эго",
            "Держал(а) обиду на родителей вместо того, чтобы искренне поговорить"
        ]
    },
    self: {
        title: "Грехи против своего «Я»",
        list: [
            "Забивал(а) на ментальное и физическое здоровье, выбирая путь саморазрушения",
            "Завидовал(а) чужой идеальной жизни в соцсетях вместо фокуса на своем росте",
            "Создавал(а) фейковую 'успешную' жизнь перед другими, обманывая саму себя",
            "Думскроллил(а) плохие новости часами, осознаннно вгоняя себя в апатию и уныние",
            "Грыз(ла) себя за прошлые ошибки, не позволяя себе двигаться дальше",
            "Ждал(а) идеального момента или 'понедельника', сливая свою настоящую жизнь"
        ]
    },
    digital: {
        title: "Цифровые грехи",
        list: [
            "Прожигал(а) лучшие часы жизни в TikTok и Reels, ловя дешевый дофамин",
            "Тратил(а) последние деньги на импульсивные покупки в маркетплейсах",
            "Стал(а) зависимым от лайков, охватов и мнения абсолютно чужих людей в сети",
            "Оставлял(а) едкие комменты или пассивно-агрессивно реагировал(а) на посты",
            "Писал(а) 'уже выхожу', хотя на самом деле даже не вставал(а) с кровати",
            "Прятался(ась) от реальных проблем в виртуальном мире или видеоиграх"
        ]
    },
    work: {
        title: "Грехи в делах и учебе",
        list: [
            "Прокрастинировал(а) неделями, жестко забивая на дедлайны и подставляя команду",
            "Принимался(ась) за сто дел одновременно и бросал(а) их на полпути",
            "Списывал(а) работы или делал(а) проекты 'тяп-ляп', лишь бы просто отвязались",
            "Жаловался(ась) на нехватку времени, хотя сам(а) тратил(а) его на ерунду",
            "Обманывал(а) преподавателей, клиентов или босса ради сиюминутного покоя",
            "Забивал(а) на саморазвитие, выбирая лень и зону комфорта"
        ]
    }
};

// База Епитимий (Добрых дел)
const EPITIMIAS = [
    "Позвони сегодня родителям или близким и просто скажи, что любишь их и ценишь всё, что они делают.",
    "Переведи любую комфортную сумму (хоть 50–100 рублей) в проверенный приют для животных или благотворительный фонд.",
    "Напиши старому другу, с которым давно не общался(ась), теплое и поддерживающее сообщение.",
    "Сделай одно экологичное дело сегодня: разбери хлам на рабочем столе, выброси старые вещи или сдай пластик на переработку.",
    "Скажи сегодня как минимум трем людям искренние, небанальные комплименты.",
    "Проведи сегодняшний вечер без соцсетей и думскроллинга — почитай книгу или побудь наедине с мыслями.",
    "Сделай маленькое доброе дело анонимно: угости коллегу кофе, придержи дверь или помоги кому-то донести тяжелую сумку."
];

// Хранилище состояния
let selectedSins = new Set();
let currentCategory = "";
let sphereHP = 100;

// Имитация базы данных Стены грехов
let wallConfessions = [
    { text: "Мне стыдно, что я трачу родительские деньги на дорогую косметику и маркетплейсы, а потом вру, что мне не хватает на учебники...", tag: "Цифровая жизнь", allowSupport: true },
    { text: "Вчера пассивно-агрессивно сорвалась на маму из-за ерунды. Она просто хотела помочь. Сижу и плачу, не могу переступить через гордость и извиниться.", tag: "Отношения", allowSupport: true },
    { text: "Уже неделю жестко прокрастинирую и сливаю дедлайны по командному проекту. Ребята думают, что я приболел, а я просто играю в игры сутками.", tag: "Дела & Учеба", allowSupport: true },
    { text: "Создал фейковую красивую жизнь в соцсетях, фоткаю дорогие места, а сам по уши в долгах. Устал врать окружающим и самому себе.", tag: "Внутреннее «Я»", allowSupport: true }
];

// ================= 2. ПОИСК ВСЕХ ЭЛЕМЕНТОВ =================
const screenStart = document.getElementById('screen-start');
const screenCategories = document.getElementById('screen-categories');
const screenQuiz = document.getElementById('screen-quiz');
const screenTextConfession = document.getElementById('screen-text-confession');
const screenDestroy = document.getElementById('screen-destroy');
const screenFinish = document.getElementById('screen-finish');

const btnStartYes = document.getElementById('btn-start-yes');
const btnStartNo = document.getElementById('btn-start-no');
const btnBackToCats = document.getElementById('btn-back-to-cats');
const btnToTextConfession = document.getElementById('btn-to-text-confession');
const btnToDestroy = document.getElementById('btn-to-destroy');
const btnRestart = document.getElementById('btn-restart');

const screenWall = document.getElementById('screen-wall');
const btnOpenWall = document.getElementById('btn-open-wall');
const btnBackFromWall = document.getElementById('btn-back-from-wall');
const wallStream = document.getElementById('wall-stream');
const checkboxAllowSupport = document.getElementById('checkbox-allow-support');

const sinsContainer = document.getElementById('sins-container');
const currentCategoryTitle = document.getElementById('current-category-title');
const customConfessionText = document.getElementById('custom-confession-text');
const sinSphere = document.getElementById('sin-sphere');
const sphereHPText = document.getElementById('sphere-hp');
const epitimiaText = document.getElementById('epitimia-text');

// Звуки
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');
const destroySound = document.getElementById('destroy-sound');
const finalSound = document.getElementById('final-sound');

bgMusic.volume = 0.2;

// ================= 3. ЛОГИКА ПЕРЕХОДОВ МЕЖДУ ЭКРАНАМИ =================

// Экран 1 -> Экран 2 (Категории)
if (btnStartYes) {
    btnStartYes.addEventListener('click', () => {
        // Запускаем музыку, если она подключена
        if (typeof bgMusic !== 'undefined' && bgMusic) {
            bgMusic.play().catch(() => {});
        }
        
        // Переключаем экраны с проверкой, что они существуют в HTML
        if (screenStart) screenStart.classList.add('hidden');
        if (screenCategories) screenCategories.classList.remove('hidden');
        
        // На всякий случай гасим стену, если она была открыта
        if (screenWall) screenWall.classList.add('hidden');
    });
}

btnStartNo.addEventListener('click', () => {
    alert("Смелее! Сделать первый шаг к осознанности бывает страшно, но это того стоит. Жми 'Начать исповедь' 🤍");
});

// Открытие стены со стартового экрана
btnOpenWall.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    screenStart.classList.add('hidden');
    screenWall.classList.remove('hidden');
    renderWall(); // Запуск генерации карточек
});

// Возврат со стены на главную
btnBackFromWall.addEventListener('click', () => {
    screenWall.classList.add('hidden');
    screenStart.classList.remove('hidden');
});

// Выбор категории (Нажатие на карточку категории)
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();

        currentCategory = card.getAttribute('data-category');
        
        screenCategories.classList.add('hidden');
        screenQuiz.classList.remove('hidden');
        
        // Рендерим грехи для выбранной категории
        renderSinsForCategory(currentCategory);
    });
});

// Кнопка возврата из квиза к категориям
btnBackToCats.addEventListener('click', () => {
    screenQuiz.classList.add('hidden');
    screenCategories.classList.remove('hidden');
});

// Экран 3 -> Экран 4 (Текстовая исповедь)
btnToTextConfession.addEventListener('click', () => {
    if (selectedSins.size > 0) {
        screenQuiz.classList.add('hidden');
        screenTextConfession.classList.remove('hidden');
    }
});

// Экран 4 -> Экран 5 (Тапалка сферы)
btnToDestroy.addEventListener('click', () => {
    screenTextConfession.classList.add('hidden');
    screenDestroy.classList.remove('hidden');
    
    // Сброс параметров сферы
    sphereHP = 100;
    sphereHPText.innerText = "100%";
    sinSphere.style.transform = "scale(1)";
});

// ================= 4. ГЕНЕРАЦИЯ ГРЕХОВ И АКТИВАЦИЯ КНОПКИ =================
function renderSinsForCategory(categoryKey) {
    const categoryData = SINS_DATABASE[categoryKey];
    currentCategoryTitle.innerText = categoryData.title;
    sinsContainer.innerHTML = '';
    
    categoryData.list.forEach((sinText) => {
        const card = document.createElement('div');
        card.classList.add('sin-card');
        card.innerText = sinText;
        
        // Если грех уже был выбран ранее — подсвечиваем его
        if (selectedSins.has(sinText)) {
            card.classList.add('selected');
        }
        
        card.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();

            if (selectedSins.has(sinText)) {
                selectedSins.delete(sinText);
                card.classList.remove('selected');
            } else {
                selectedSins.add(sinText);
                card.classList.add('selected');
            }
            updateNextButtonState();
        });
        
        sinsContainer.appendChild(card);
    });
    
    updateNextButtonState();
}

function updateNextButtonState() {
    if (selectedSins.size > 0) {
        btnToTextConfession.classList.remove('disabled');
        btnToTextConfession.removeAttribute('disabled');
    } else {
        btnToTextConfession.classList.add('disabled');
        btnToTextConfession.setAttribute('disabled', 'true');
    }
}

// ================= 5. РАБОТА СФЕРЫ УНИЧТОЖЕНИЯ =================
sinSphere.addEventListener('click', () => {
    if (sphereHP > 0) {
        sphereHP -= 10; // Удар сносит 10% здоровья сферы
        sphereHPText.innerText = sphereHP + "%";
        
        clickSound.currentTime = 0;
        clickSound.play();
        
        sinSphere.classList.add('hit');
        setTimeout(() => sinSphere.classList.remove('hit'), 100);
        
        // Эффект плавного уменьшения сферы при уничтожении
        sinSphere.style.transform = `scale(${0.4 + (sphereHP / 160)})`;

        if (sphereHP <= 0) {
            bgMusic.pause();
            destroySound.currentTime = 0;
            destroySound.play(); // Звук взрыва/очищения

            setTimeout(() => {
                showFinalScreen();
            }, 800);
        }
    }
});

// ================= 6. ФИНАЛЬНЫЙ ЭКРАН И ПЕРЕЗАПУСК =================
function showFinalScreen() {
    screenDestroy.classList.add('hidden');
    screenFinish.classList.remove('hidden');
    
    finalSound.currentTime = 0;
    finalSound.play();
    
    // Рандомный подбор епитимьи
    const randomEpitimia = EPITIMIAS[Math.floor(Math.random() * EPITIMIAS.length)];
    epitimiaText.innerText = randomEpitimia;
}

btnRestart.addEventListener('click', () => {
    // Полная очистка состояния приложения
    selectedSins.clear();
    customConfessionText.value = "";
    finalSound.pause();
    
    bgMusic.currentTime = 0;
    bgMusic.play();
    
    screenFinish.classList.add('hidden');
    screenCategories.classList.remove('hidden'); // Возвращаем на выбор категорий
});
// Функция генерации Стены Живых Грехов
function renderWall() {
    wallStream.innerHTML = '';
    
    // Выводим грехи в обратном порядке (новые сверху)
    [...wallConfessions].reverse().forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('wall-card');
        
        card.innerHTML = `
            <div class="wall-card-text">«${item.text}»</div>
            <div class="wall-card-footer">
                <span class="wall-card-tag"># ${item.tag || 'Исповедь'}</span>
                ${item.allowSupport ? `<button class="btn-support-action">Обнять текстом 🤍</button>` : ''}
            </div>
            <div class="support-area"></div>
        `;
        
        // Логика кнопки поддержки
        if (item.allowSupport) {
            const supportBtn = card.querySelector('.btn-support-action');
            const supportArea = card.querySelector('.support-area');
            
            supportBtn.addEventListener('click', () => {
                if (!card.querySelector('.support-input-block')) {
                    const inputBlock = document.createElement('div');
                    inputBlock.classList.add('support-input-block');
                    inputBlock.innerHTML = `
                        <textarea placeholder="Напиши что-то теплое и поддерживающее..."></textarea>
                        <button class="btn-send-support">Отправить анонимно</button>
                    `;
                    
                    inputBlock.querySelector('.btn-send-support').addEventListener('click', () => {
                        alert("Твои теплые слова анонимно отправлены автору. Спасибо, ты делаешь мир лучше! ✨");
                        inputBlock.remove();
                    });
                    
                    supportArea.appendChild(inputBlock);
                }
            });
        }
        
        wallStream.appendChild(card);
    });
}

// Модифицируем функцию финала, чтобы забирать текст пользователя (если он написан)
// Найди в своем script.js функцию showFinalScreen() и замени её на эту:
function showFinalScreen() {
    screenDestroy.classList.add('hidden');
    screenFinish.classList.remove('hidden');
    
    finalSound.currentTime = 0;
    finalSound.play();
    
    // Если пользователь написал свой текст — анонимно сохраняем его в массив стены!
    const userText = customConfessionText.value.trim();
    if (userText.length > 3) {
        // Определяем тег по выбранной категории
        let categoryName = "Исповедь";
        if (currentCategory === "relations") categoryName = "Отношения";
        if (currentCategory === "self") categoryName = "Внутреннее «Я»";
        if (currentCategory === "digital") categoryName = "Цифровая жизнь";
        if (currentCategory === "work") categoryName = "Дела & Учеба";

        wallConfessions.push({
            text: userText,
            tag: categoryName,
            allowSupport: checkboxAllowSupport.checked // Забираем значение галочки!
        });
    }
    
    const randomEpitimia = EPITIMIAS[Math.floor(Math.random() * EPITIMIAS.length)];
    epitimiaText.innerText = randomEpitimia;
}