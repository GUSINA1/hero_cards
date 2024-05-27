let heroes = getHeroesFromLocalStorage();


// Функция для отображения карточек персонажей
function displayHeroes() {
    heroesContainer.innerHTML = '';

    heroes.forEach(function (heroData, index) {
        let heroCardContent = '<div class="hero-card">';
        heroCardContent += '<h2>Карточка героя</h2>';
        heroCardContent += '<p><strong>Имя:</strong> ' + heroData[0] + '</p>';
        heroCardContent += '<p><strong>Класс:</strong> ' + heroData[1] + '</p>';
        heroCardContent += '<button onclick="deleteHero(' + index + ')">Удалить</button>';
        heroCardContent += '</div>';

        heroesContainer.innerHTML += heroCardContent;
    });
}

// Функция для добавления нового героя
function addHero() {
  let nameInput = document.getElementById("heroName");
  let classInput = document.getElementById("heroClass");
  
  let newHero = [nameInput.value, classInput.value];



    // Проверяем, что поля не пустые
    if (!newHero[0] || !newHero[1]) {
        alert('Пожалуйста, введите данные');
        return;
    }

    // Проверяем, не превышает ли количество символов лимит
    if (newHero[0].length > 20 || newHero[1].length > 20) {
        alert('Лимит символов превышен!');
        return;
    }
    heroes.push(newHero);
    saveHeroesToLocalStorage();
    

    // Обновляем отображение карточек
    displayHeroes();

    // Очищаем поля ввода
    nameInput.value = '';
    classInput.value = '';

    // Обновляем счетчики символов
    updateCharCounter('heroNameCounter', '');
    updateCharCounter('heroClassCounter', '');
}
function updateCharCounter(counterId, value) {
  var counterElement = document.getElementById(counterId);
  counterElement.textContent = value.length + ' / 20';

  // Если превышен лимит
  if (value.length > 20) {
      counterElement.style.color = 'red';
      counterElement.style.fontWeight = 'bold';
  } else {
      counterElement.style.color = 'green';
      counterElement.style.fontWeight = 'normal';
  }
}
// Обновляем счетчики символов
document.getElementById('heroName').addEventListener('input', function () {
  updateCharCounter('heroNameCounter', this.value);
});

document.getElementById('heroClass').addEventListener('input', function () {
  updateCharCounter('heroClassCounter', this.value);
});

// Функция для удаления героя
function deleteHero(index) {
  // Удаляем героя с указанным индексом из массива
  heroes.splice(index, 1);
 // Сохраняем данные в локальное хранилище
 saveHeroesToLocalStorage();
  // Обновляем отображение карточек
  displayHeroes();
}

// Функция для фильтрации героев по классу
function filterByClass() {
  let selectedClass = document.getElementById("classFilter").value;

  let filteredHeroes = heroes.filter(function (hero) {
      return selectedClass === '' || hero[1] === selectedClass;
  });

  // Обновляем отображение карточек
  displayFilteredHeroes(filteredHeroes);
}

// Функция для отображения отфильтрованных карточек
function displayFilteredHeroes(filteredHeroes) {
  heroesContainer.innerHTML = '';

  filteredHeroes.forEach(function (heroData, index) {
      let heroCardContent = '<div class="hero-card">';
      heroCardContent += '<h2>Карточка героя</h2>';
      heroCardContent += '<p><strong>Имя:</strong> ' + heroData[0] + '</p>';
      heroCardContent += '<p><strong>Класс:</strong> ' + heroData[1] + '</p>';
      heroCardContent += '<button onclick="deleteHero(' + index + ')">Удалить</button>';
      heroCardContent += '</div>';

      heroesContainer.innerHTML += heroCardContent;
  });
}

// Функция для сохранения данных в локальное хранилище
function saveHeroesToLocalStorage() {
  localStorage.setItem('heroes', JSON.stringify(heroes));
}

// Функция для получения данных из локального хранилища
function getHeroesFromLocalStorage() {
  let storedHeroes = localStorage.getItem('heroes');
  return storedHeroes ? JSON.parse(storedHeroes) : [];
}

displayHeroes();