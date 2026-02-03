const STORAGE_KEY = 'aura-kanban-cards';
let cards = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let editingId = null;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function render() {
    $$('.cards').forEach(col => col.innerHTML = '');
    cards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'card';
        el.draggable = true;
        el.dataset.id = card.id;
        el.innerHTML = `<h4>${esc(card.title)}</h4>${card.desc ? `<p>${esc(card.desc)}</p>` : ''}`;
        el.addEventListener('dragstart', onDragStart);
        el.addEventListener('dragend', onDragEnd);
        el.addEventListener('click', () => openModal(card));
        $(`.cards[data-status="${card.status}"]`).appendChild(el);
    });
}

function esc(s) {
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function openModal(card = null) {
    editingId = card?.id || null;
    $('#modalTitle').textContent = card ? 'Edit Card' : 'Add Card';
    $('#cardTitle').value = card?.title || '';
    $('#cardDesc').value = card?.desc || '';
    $('#deleteCard').classList.toggle('hidden', !card);
    $('#modal').classList.remove('hidden');
    $('#cardTitle').focus();
}

function closeModal() {
    $('#modal').classList.add('hidden');
    editingId = null;
}

$('#addCardBtn').onclick = () => openModal();
$('#cancelCard').onclick = closeModal;
$('#modal').onclick = e => { if (e.target === $('#modal')) closeModal(); };

$('#saveCard').onclick = () => {
    const title = $('#cardTitle').value.trim();
    if (!title) return;
    if (editingId) {
        const card = cards.find(c => c.id === editingId);
        card.title = title;
        card.desc = $('#cardDesc').value.trim();
    } else {
        cards.push({
            id: Date.now().toString(),
            title,
            desc: $('#cardDesc').value.trim(),
            status: 'backlog'
        });
    }
    save();
    render();
    closeModal();
};

$('#deleteCard').onclick = () => {
    cards = cards.filter(c => c.id !== editingId);
    save();
    render();
    closeModal();
};

let draggedId = null;
function onDragStart(e) {
    draggedId = e.target.dataset.id;
    e.target.classList.add('dragging');
}
function onDragEnd(e) {
    e.target.classList.remove('dragging');
    $$('.cards').forEach(c => c.classList.remove('drag-over'));
}

$$('.cards').forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();
        col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
        e.preventDefault();
        col.classList.remove('drag-over');
        const card = cards.find(c => c.id === draggedId);
        if (card) {
            card.status = col.dataset.status;
            save();
            render();
        }
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

render();
