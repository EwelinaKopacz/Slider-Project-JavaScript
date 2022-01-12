const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); 

    runJSSlider();
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider';

    const imagesList = document.querySelectorAll(imagesSelector); 
    const sliderRootElement = document.querySelector(sliderRootSelector); 

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click'); 
        });
    });

    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');
    navNext.addEventListener('click', function(e){
        fireCustomEvent(e.currentTarget, 'js-slider-img-next');
        e.stopPropagation();
    });

    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    navPrev.addEventListener('click',function(e){
        fireCustomEvent(e.currentTarget, 'js-slider-img-prev');
        e.stopPropagation();
    });

    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    zoom.addEventListener('click',function(e){ 
        fireCustomEvent(e.currentTarget,'js-slider-close');
        // }
    })
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext); 
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose); 
}

const onImageClick = function(event, sliderRootElement, imagesSelector) {

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

    if(sliderThumb && thumbPrototype){
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
    else {
        lastImg.querySelector('img').classList.add(currentImagClassName)
        parentCurrentImg.querySelector('img').classList.remove(currentImagClassName);

        const imgSrc = lastImg.querySelector('img').getAttribute('src');
        const curretSliderImg = document.querySelector('.js-slider__image');
        curretSliderImg.setAttribute('src',imgSrc);
    }
}

const onClose = function(event) {

    console.log(event.target);
    console.log(event.currentTarget)

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

