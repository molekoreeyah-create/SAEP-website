// Mobile menu toggle 
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
toggle.addEventListener('click', function(){
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
})
// Accodion
const triggers = document.querySelectorAll('.accordion-trigger');
triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
        const panel = document.getElementById(trigger .getAttribute('aria-controls'));
        const isOpen = trigger.getAttribute('aria-expanded')=== 'true';
        //close every panel first
        triggers.forEach(function (other) {
            other.setAttribute('aria-expanded', 'false');
            document.getElementById(other.getAttribute('aria-controls')).hidden = true;
    });
    //open this one, unless it was already open
    if (isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
    }
});
});