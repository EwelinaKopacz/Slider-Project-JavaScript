const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item'; // przypisannie do zmiennej klasy
    const sliderRootSelector = '.js-slider';

    const imagesList = document.querySelectorAll(imagesSelector); // zmienna ImagesList - nodeList ze wszystkimi zdjęciami, ktore maja klase .gallery__item
    // console.log(imagesList);
    const sliderRootElement = document.querySelector(sliderRootSelector); //zmienna sliderRootElement - zawiera  sekcje js-slider - sekcja do pokazu slajdow
    // console.log(sliderRootElement);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) { // do kazdego zdjecia dodajemy nasluchiwanie na klikniecie i wywolujemy f-cje fireCustomEvent
            fireCustomEvent(e.currentTarget, 'js-slider-img-click'); // wywołanie funkcji, ktora ma dwa argumenty, klikniety element (e.currentTarget) i string 'js-slider-img-click'
            // console.log(e.currentTarget);
        });
    });

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');


    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event ); // na kazdym elemencie wykonuje customEvent = 'event'
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) { //wywołanie własnego zdarzenia "js-slider-img-click"
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

const onImageClick = function(event, sliderRootElement, imagesSelector) {// (event, section-js-slider, klasa-.gallery__item)
    // todo:
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany

    const newImageSlider = document.querySelector('.js-slider__image');
    const groupName = document.querySelectorAll(imagesSelector);
    const newGroupName = [...groupName];
    const sliderThumb = document.querySelector('.js-slider__thumbs');
    const thumbPrototype = document.querySelector('.js-slider__thumbs-item');

    if(event.target.tagName === 'FIGURE'){
        sliderRootElement.classList.add('js-slider--active');
        const parent = event.target;
        if(parent.hasChildNodes()){
            const imgTag = parent.firstElementChild;
            const imgSrc = imgTag.getAttribute('src');
            newImageSlider.setAttribute('src',imgSrc);
        }
        const groupName = event.target.dataset.sliderGroupName;
        const thumbGroup = newGroupName.filter(function(item){
            if(item.dataset.sliderGroupName === groupName){
                return item;
            }
        });
        if(sliderThumb && thumbPrototype){
            for(i=0; i<thumbGroup.length; i++){
            thumbPrototype.classList.remove('js-slider__thumbs-item--prototype');
            const cloneThumb = thumbPrototype.cloneNode(true);
            sliderThumb.appendChild(cloneThumb);
            const child = thumbGroup[i].firstElementChild;
            const imgSrc = child.getAttribute('src');
            const thumbChildren = cloneThumb.children;
            const newThumbChildren = [...thumbChildren];
            newThumbChildren.forEach(function(ele){
                ele.setAttribute('src',imgSrc);
                console.log(imgSrc);
                })
            }
        }
        const sliderThumbFirst = sliderThumb.firstElementChild;
        sliderThumb.removeChild(sliderThumbFirst);
    }
}

const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]

    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
}

const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]

    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    // 5. podmienić atrybut [src] dla [.js-slider__image]
}

const onClose = function(event) {
    // todo:
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
}