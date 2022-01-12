# JavaScript Events - Slider Project

## About the project:
The aim of this project was create slider after clicking by choosen image. I got a part of code from another developer. HTML and CSS code was ready and I couldn't modify those files. Another developer prepared a part of JS code. I had to finish the project keeping the existing convention  The project is based on CustomEvents. My task was to add:
* event listener to fire appropriate events
* create functions like:
    * 'onImageClick' - function to show clicked image, group the imges with the same group name and show them below in the thumbnail and mark the current image by adding the right class (the yellow border).
    * 'onImageNext' - function: change the image after clicking 'next' arrow on the slider. If you change a image (click next arrow) mark of current image moves too).
    * 'onImagePrev' - function: change the image after clicking 'prev' arrow on the slider. If you change a image (click prev arrow) mark of current image moves too).
    * 'onClose' - function: close the slider and back to the home view.

* when you reach to the last photo, you will get a first one.


## How to use it
Please visit the website below and click on the choosen image to see how slider works.

## Technologies:

* JavaScript
* HTML
* CSS
* Desktop only version

## Links

* Live Site URL: [E.Kopacz JS Events Slider Project](https://ekopacz-js-events-project.netlify.app)

## Solutions
By creating this project I had a opportunity to practice:

* understand the code written by another developer and create my part of solution. I think it was the most difficult thing to do,
* using Event Object,
* walking the DOM elements,
* add and remove class from picked elements,
* using string methods like "contains",
* get and set attribute to the elements,
* how to use e.stopPropagation() Event method,
* using Spread Operator.

Below you can find a piece of code. 
Close the slider only if the clicked element is the "zoom" area.

```const zoom = event.currentTarget.querySelector('.js-slider__zoom');
    if(event.target === zoom){
    event.currentTarget.classList.remove('js-slider--active');
    }
```
I used e.stopPropagation() to make it work, I added it to navPrev.addEventListener and navNext.addEventListener

```
const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');
    navPrev.addEventListener('click',function(e){
        fireCustomEvent(e.currentTarget, 'js-slider-img-prev');
        e.stopPropagation();
    });
```

### Feel free to contact me:

* [Linkedin](https://www.linkedin.com/in/ewelina-kopacz-929559100/) - Ewelina Kopacz

### Project preview

Before clicking
![Project-preview](./assets/preview/screen1.png)

After clicking
![Project-preview](./assets/preview/screen2.png)


### Thanks for project and support to Mateusz Bogolubow:
* Mentor i Trener Programowania JavaScript - [See a website](https://devmentor.pl/) - Mateusz Bogolubow