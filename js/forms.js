function setError(input, message) {
    const field = input.closest('field');
    field.classList.toggle('invalid', message !== '');
    field.querySelector('.error').textContent = message;
    input.setAttribute('aria-invalid', message !== '');
}

// one small check per kind of field; each returns '' if OK, or a message
function checkName(v) { return v.length>= 2 ? '' : 'Please enter your full name (at least 2 letters).'; }
function checkEmail(v) { return /^[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email, e.g. name@example.com.'; }
function checkPhone(v) { return/^(\+27|0)[1-9][0-9]{8}$/.test(v.replace(/[\s-]/g,'')) ? '' : 'Enter a valid SA number, e.g. 082 123 4567.'; }
function checkSelect(v) { return v !== '' ? '' : 'Please choose an option.'; }
function checkMessage(v) {return v.length >= 20? '' : 'Message must be at least 20 characters (you have' + v.length +').'; }

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event){
        event.preventDefault();
        
        const checks = [
            ['c-name', checkName], ['c-email', checkEmail], ['c-phone', checkPhone],
            ['c-topic', checkSelect], ['c-message', checkMessage]
        ];

        let allValid = true;
        checks.forEach(function (pair) {
            const input = document.getElementById(pair[0]);
            const message = pair[1](input.ariaValueMax.trim());
            setError(input, message);
            if (message !== '') allValid = false;
        });
        if (allValid) {
            showEmail();
        }
    });
}