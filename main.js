// Основные переменные
let currentColor = 'black'; // Текущий цвет для рисования
let isDrawing = false; // Флаг для отслеживания зажатой кнопки мыши

const grid = document.getElementById('grid');
const palette = document.getElementById('palette');

// Функция создания сетки пикселей
function createGrid() {
    for (let i = 0; i < 32 * 32; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', colorPixel);
        pixel.addEventListener('mousemove', colorPixelWhileDrawing);
        grid.appendChild(pixel);
    }
}

// Обработка событий мыши
grid.addEventListener('mousedown', () => (isDrawing = true));
grid.addEventListener('mouseup', () => (isDrawing = false));

// Выбор цвета из палитры
palette.addEventListener('click', (event) => {
    if (event.target.classList.contains('color')) {
        currentColor = event.target.style.backgroundColor;
    }
});

// Функция изменения цвета пикселя
function colorPixel(event) {
    event.target.style.backgroundColor = currentColor;
}

// Функция закрашивания пикселей при зажатой кнопке мыши
function colorPixelWhileDrawing(event) {
    if (isDrawing) {
        event.target.style.backgroundColor = currentColor;
    }
}


// Функция очистки экрана
document.getElementById('clear').addEventListener('click', () => {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    });
});

// Функция заливки всего экрана
document.getElementById('fill').addEventListener('click', () => {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = currentColor;
    });
});

// Функция сохранения изображения
document.getElementById('save').addEventListener('click', () => {
    html2canvas(grid).then(canvas => {
        const link = document.createElement('a');
        link.download = 'pixel_art.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});


// Инициализация сетки
createGrid();