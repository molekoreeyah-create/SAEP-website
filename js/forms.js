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
function showEmail() {
    const RECIPIENT = 'info@saep.org';
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const topic = document.getElementById('c-topic').value.trim();
    const message = document.getElementById('c-message').value.trim();

    const subject = '[' + topic + '] Message from ' + name;
    const body = 'Hello SAEP team,\n\n' + message + 'n\n--\nName: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone;

    const result = document.getElementById('contact-result');
    result.textContent = '';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Your email is ready';

    const preview = document.createElement('pre');
    preview.textContent = 'To: ' + RECIPIENT + '\nSubject: ' + subject + '\n\n' + body;

    const link = document.createElement('a');
    link.className = 'btn btn-dark';
    link.textContent = 'Open in my email app';
    link.href = 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    result.append(heading, preview, link);
}
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
    //show only the section for the chosen type
    enquiryForm.addEventListener('change', function (event){
        if (event.target.name === 'type') {
            document.querySelectorAll('.conditional').forEach(function (sec) {
                sec.classList.toggle('is-active', sec.id === 'sec-' + event.target.value);
            });
        }
    });
    enquiryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const typeInput = enquiryForm.querySelector('input'[name="type"], 'checked');
        const radioError = enquiryForm.querySelector('fieldset .error'); 
        radioError.textContent = typeInput ? '' : 'Please choose one option.';

        const nameInput = document.getElementById('e-name');
        const emailInput = document.getElementById('e-email');
        let nameMsg; checkName(nameInput.value.trim());
        setError(nameInput, nameMsg);
        if (!typeInput || nameMsg || emailMsg) return;

        let extra = '';
        if (typeInput.value === 'volunteer'){
            const g = document.getElementById('e-grade');
            const n = Number(g.value);
            extra = (g.value === '' || n < 2 || n > 12 || !Number.isInteger(n)) ? 'Enter whole hours from 2 to 20.' :
            setError(g, extra);
        } else if (typeInput.value === 'service') {
            const h = document.getElementById('e-grade');
            const n = Number(h.value);
            extra = (g.value === '' || n < 0 || n > 12 || !Number.isInteger(n)) ? "Enter a grade from 0 to 12. ' : " :

        } else {
            const a = document.getElementById('e-amount')
            const n = Number(h.value);
            extra = (a.value === '' || n < 50 ) ? 'Enter an amount of R50 or more.': '';
            setError(a, extra);
        }
        if (extra) return;
         showEnquiryResponse(typeInput.value, nameInput.value.trim());
    });
}

function showEnquiryResponse(type, name) {
    let text;
    if (type === 'service') {
        text = 'Our programmessare free for leaners from parter communities. Place depend on your area and grade, and a coordinator will confirm availability.';
    } else if (type === 'volunteer') {
        const hours = Number(document.getElementById('e-hours').value);
        text = 'You can give about' + hours * 10 + 'hours in a ten-week term. We will confirm the next orientation date.';
    } else {
        const monthly = Number(document.getElementById('e-amount').value);
        text = 'Your pledge is R' + monthly + 'per month (R' + montly * 12 + 'per year. We will send the banking details.';
    }
    const result = document.getElementById('enquiry-result');
    result.textContent = 'Thank you, ' + name + '. ' + text ;
}