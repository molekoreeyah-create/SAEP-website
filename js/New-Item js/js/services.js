const services =[
    { name:'Education Support', category: 'Learning', summary: 'Tutoring and learning activities to help learners improve their school performance.'},
    { name:'Literacy', category: 'Learning', summary: 'Reading groups and activities that stengthen reading comprehension.'},
    { name:'Life Skills', category: 'Well-being', summary: 'Activities that build confidence, resillience and responsibility.'},
    { name:'Psychological Suport', category: 'Well-being', summary: 'Social-worker access, parent meetings, home visits and referals.'},
    { name:'Career Guidance', category: 'Careers', summary: 'Helping learners understand career options and make informed decisions.'},
    { name:'Environmental Education', category: 'Careers', summary: 'Hikes, Camps and activities that introduce nature and environmental careers.'},
    { name:'ECD Support', category: 'Early Years', summary: 'Training and support for educators ECD centres.'},
    { name:'Tertiary Support', category: 'Tertiary', summary: 'Helping learners transition into and succeed in higher education.'}
]
const grid = document.getElementById('servie-grid');

function render(list) {
    grid.textContent ='';
    list.forEach(function (s){
        const card = document.createElement('article');
        card.className ='card';

        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = s.category;

        const title = document.createElement('h3');
        title.textContent = s.name;

        const text = document.createElement('p');
        text.textContent = s.summary;

        card.append(badge, title, text);
        grid.appendChild(card);
    });
    }
    render (services);