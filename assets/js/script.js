const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item'; 
    const sliderRootSelector = '.js-slider';

    const imagesList = document.querySelectorAll(imagesSelector); // zmienna ImagesList - nodeList ze wszystkimi zdjęciami, ktore maja klase .gallery__item
    const sliderRootElement = document.querySelector(sliderRootSelector); //zmienna sliderRootElement - zawiera  sekcje js-slider - sekcja do pokazu slajdow

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) { // do kazdego zdjecia dodajemy nasluchiwanie na klikniecie i wywolujemy f-cje fireCustomEvent
            fireCustomEvent(e.currentTarget, 'js-slider-img-click'); // wywołanie funkcji, ktora ma dwa argumenty, klikniety element (e.currentTarget) i string 'js-slider-img-click'
        });
    });

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]
    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    navNext.addEventListener('click', function(e){
        fireCustomEvent(e.currentTarget, 'js-slider-img-next');
        e.stopPropagation();
    });

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    navPrev.addEventListener('click',function(e){
        fireCustomEvent(e.currentTarget, 'js-slider-img-prev');
        e.stopPropagation();
    });


    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    zoom.addEventListener('click',function(e){
        // if(e.target === zoom){ // alternatywa do e.stopPropagation()
        fireCustomEvent(e.currentTarget,'js-slider-close');
        // }
    })
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

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext); // wywołanie własnych zdarzen
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose); //sliderRootSelector = '.js-slider';
}

const onImageClick = function(event, sliderRootElement, imagesSelector) {// (event, section-js-slider, klasa-.gallery__item)
    // todo:
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany

    sliderRootElement.classList.add('js-slider--active');

    const currentImagClassName = 'js-slider__thumbs-image--current';
    const emptyImgElement = 'js-slider__thumbs-item--prototype';

    const newImageSlide = sliderRootElement.querySelector('.js-slider__image');
    const imageTypeName = document.querySelectorAll(imagesSelector);
    const identicalImageType = [...imageTypeName];
    const sliderThumb = sliderRootElement.querySelector('.js-slider__thumbs');
    const thumbPrototype = sliderThumb.querySelector('.js-slider__thumbs-item');

    let imgSrcTarget;
    if(event.target.hasChildNodes()){
        const imgTag = event.target.firstElementChild;
        imgSrcTarget = imgTag.getAttribute('src');
        newImageSlide.setAttribute('src',imgSrcTarget);
    }
    const clickImageTypeName = event.target.dataset.sliderGroupName;
    const thumbGroup = identicalImageType.filter(function(item){
        if(item.dataset.sliderGroupName === clickImageTypeName){
            return item;
            }
        });

    if(sliderThumb && thumbPrototype){ //lepsze rozwiązanie metoda forEach() 
        for(i=0; i<thumbGroup.length; i++){

        const cloneThumb = thumbPrototype.cloneNode(true);
        sliderThumb.appendChild(cloneThumb).classList.remove(emptyImgElement);

        const child = thumbGroup[i].firstElementChild;
        const imgSrc = child.getAttribute('src');

        const thumbChildren = cloneThumb.children; 
        const newThumbChildren = [...thumbChildren];
        newThumbChildren.forEach(function(elem){
            elem.setAttribute('src',imgSrc);
                if(imgSrc === imgSrcTarget){
                    elem.classList.add(currentImagClassName);
                }
            });
        }
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

    const currentImagClassName = 'js-slider__thumbs-image--current';
    const emptyImgElement = 'js-slider__thumbs-item--prototype';

    const parentAllSection = document.querySelector('.js-slider__thumbs');
    const currentImg = parentAllSection.querySelector('.js-slider__thumbs-image--current');
    const parentCurrentImg = currentImg.parentElement;
    const nextParrentImg = parentCurrentImg.nextElementSibling;
    const firstImg = parentAllSection.firstElementChild;

    if(nextParrentImg !== null){
        nextParrentImg.querySelector('img').classList.add(currentImagClassName);
        parentCurrentImg.querySelector('img').classList.remove(currentImagClassName);
        const imgSrc = nextParrentImg.querySelector('img').getAttribute('src');
        const curretSliderImg = document.querySelector('.js-slider__image');
        curretSliderImg.setAttribute('src',imgSrc);
    }
    else { // ZADANIE DODATKOWE NR 1
        firstImg.classList.contains(emptyImgElement);
        const correctImg = firstImg.nextElementSibling;
        correctImg.querySelector('img').classList.add(currentImagClassName);
        parentCurrentImg.querySelector('img').classList.remove(currentImagClassName);

        const imgSrc = correctImg.querySelector('img').getAttribute('src');
        const curretSliderImg = document.querySelector('.js-slider__image');
        curretSliderImg.setAttribute('src',imgSrc);
    }
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

    const currentImagClassName = 'js-slider__thumbs-image--current';
    const emptyImgElement = 'js-slider__thumbs-item--prototype';

    const parentAllSection = document.querySelector('.js-slider__thumbs');
    const currentImg = parentAllSection.querySelector('.js-slider__thumbs-image--current');
    const parentCurrentImg = currentImg.parentElement;
    const prevParrentImg = parentCurrentImg.previousElementSibling;
    const lastImg = parentAllSection.lastElementChild;

    if(prevParrentImg && !prevParrentImg.classList.contains(emptyImgElement)){
        prevParrentImg.querySelector('img').classList.add(currentImagClassName)
        parentCurrentImg.querySelector('img').classList.remove(currentImagClassName);

        const imgSrc = prevParrentImg.querySelector('img').getAttribute('src');
        const curretSliderImg = document.querySelector('.js-slider__image');
        curretSliderImg.setAttribute('src',imgSrc);
    }
    else { // ZADANIE DODATKOWE NR 1
        lastImg.querySelector('img').classList.add(currentImagClassName)
        parentCurrentImg.querySelector('img').classList.remove(currentImagClassName);

        const imgSrc = lastImg.querySelector('img').getAttribute('src');
        const curretSliderImg = document.querySelector('.js-slider__image');
        curretSliderImg.setAttribute('src',imgSrc);
    }
}

const onClose = function(event) {
    // todo:
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]

    console.log(event.target); //js-slider__zoom
    console.log(event.currentTarget) //js-slider

    const zoom = event.currentTarget.querySelector('.js-slider__zoom');
        if(event.target === zoom){
        event.currentTarget.classList.remove('js-slider--active');
    }

    const emptyImgElement = 'js-slider__thumbs-item--prototype';
    const sliderThumb = event.currentTarget.querySelector('.js-slider__thumbs');
    if(sliderThumb && sliderThumb.hasChildNodes()){
        const childThumb = sliderThumb.children;
        const childArray = [...childThumb];
        childArray.forEach(function(item){
            if(!item.classList.contains(emptyImgElement)){
            sliderThumb.removeChild(item);
            }
        });
    }

}

