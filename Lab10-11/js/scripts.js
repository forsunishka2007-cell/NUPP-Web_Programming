const clickSound = new Audio('sounds/click.mp3'); 

    const playSound = () => {
        clickSound.currentTime = 0.1; 
        clickSound.play();
    };

    const formElements = document.querySelectorAll('input, select, button, textarea');

    formElements.forEach(element => {
        element.addEventListener('click', playSound);
    });