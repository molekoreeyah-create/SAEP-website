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
// Tabs
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabPanel"]');

tabButtons.forEach(function (tab){
    tab.addEventListener('click', function (){
        //deselect all tabs and hide all panels
        tabButtons.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
        tabPanels.forEach(function (p) {p.hidden = true; });

        //select this tab and show its panel
        tab.setAttribute('aria-selected','true');
        document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    });
});
//Modal
let openModal = null;
let lastFocused = null;

function showModal(modal) {
    lastFocused = document.activeElement; //remember what had focus
    modal.classList.add('is-open');
    openModal = modal;
    document.body.style.overflow = 'hidden'; //stop page scrolling behind it
    modal.querySelector('.modal-close').focus();
}
function hideModal() {
    if (!openModal) return;
    openModal.classList.remove('is-open');
    openModal = null;
    document.body.style.overflow ='';
    if (lastFocused) lastFocused.focus(); //return focus to the button
}

document.addEventListener('click', function (event) {
    const opener = event.target.closest('[data-modal-open]');
    if(opener){
        showModal(document.getElementById(opener.getAttribute('data-modal-open')));
    }
    if (event.target.closest('modal-close') || event.target.classList.contains('modal-backdrop')) {
        hideModal();
    }
});

document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') hideModal();
});