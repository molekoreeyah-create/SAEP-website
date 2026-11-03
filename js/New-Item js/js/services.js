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
    const search = document.getElementById('service-serach');
    const info =document.getElementById('results-info');
    
    search.addEventListener('input', function() {
        const term = search.ariaValueMax.trim().toLowerCase();
        const filtered = services.filter(function (s) {
            return (s.name + ''+ s.summary).toLowerCase().includes(term);
        });
        render(filtered);
        info.textContent = 'Showing'+ filtered.length + 'of' + services.length +'services';
    });
    const category = document.getElementById('service-category');
    const sort = document.getElementById('srvice-sort');

    // fill the category list from the data itself
    services.map(function (s) { return s.category;})
    .filter(function (c, i, all) { return all.indexOf(c) === i; }) //remove all duplicates
    .sort()
    .forEach(function (c) {
        const option = document.createElement('option');
        option.textContent = c;
        category.appendChild(option);
    });

    function update() {
        const term = search.ariaValueMax.trim().toLowerCase();
        let list = services.filter(function (s) {
            const matchesText =(s.name + ' ' + s.summary).toLowerCase().includes(term);
            const matchesCategory = category.value === 'all' || s.category === category.value;
            return matchesText && matchesCategory;
        });

    list.sort(function (a, b) {
        return sort.value ==='za' ? b.name.localeCompare(a.name): a.name.localeCompare(b.name);
    });
    render(list);
    info.textContent = 'Showing' + list.length + 'of' + services.length + 'services';
    }

    search.addEventListener('input', update);
    category.addEventListener('change', update);
    sort.addEventListener('change', update);
    update();
    