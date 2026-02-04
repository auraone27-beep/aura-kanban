const STORAGE_KEY = 'aura-kanban-cards';
const ACTIVITY_KEY = 'aura-kanban-activity';

// Initialize with our first day's work if empty
const defaultCards = [
    {
        id: '1738566000001',
        title: 'Set up Aura identity',
        desc: 'Created IDENTITY.md, USER.md, and memory files. Named Aura. ✨',
        status: 'done',
        category: 'build',
        completedAt: '2026-02-02T22:00:00'
    },
    {
        id: '1738566000002',
        title: 'Connect Gmail (auraone27@gmail.com)',
        desc: 'Set up Google Cloud project, OAuth, and gog CLI for email access.',
        status: 'done',
        category: 'automation',
        completedAt: '2026-02-02T22:51:00'
    },
    {
        id: '1738566000003',
        title: 'Build Kanban board v1',
        desc: 'Created project management tool with drag-and-drop, local storage.',
        status: 'done',
        category: 'build',
        completedAt: '2026-02-02T22:53:00'
    },
    {
        id: '1738566000004',
        title: 'Morning briefing automation',
        desc: '7am daily: AI news, fintech, Anthropic jobs, world news, curiosity.',
        status: 'done',
        category: 'automation',
        completedAt: '2026-02-02T23:15:00'
    },
    {
        id: '1738566000005',
        title: 'Upgrade Kanban to Project Hub',
        desc: 'Add stats, activity log, categories, usage tracking.',
        status: 'done',
        category: 'build',
        completedAt: '2026-02-02T23:31:00'
    },
    {
        id: '1738566000006',
        title: 'Improve auragoals.com',
        desc: 'Brandon mentioned this as a future project.',
        status: 'backlog',
        category: 'aurapath',
        completedAt: '2026-02-02T23:31:00'
    },
    {
        id: '1738566000007',
        title: 'Improve auraserv.io',
        desc: 'Brandon mentioned this as a future project.',
        status: 'backlog',
        category: 'aurapath',
        completedAt: '2026-02-02T23:31:00'
    },
    {
        id: '1738566000008',
        title: 'Meet Travis',
        desc: 'Brandon\'s business partner at Aurapath AI.',
        status: 'backlog',
        category: 'other',
        completedAt: '2026-02-02T23:31:00'
    },
    // === AURAPATH COMMAND CENTER ===
    {
        id: '1738620000001',
        title: '✅ Command Center: Project Setup',
        desc: 'Next.js 15 + TypeScript + Tailwind + Supabase client. Dashboard layout with sidebar.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:48:00'
    },
    {
        id: '1738620000002',
        title: '✅ Command Center: Database Schema',
        desc: 'Full schema: clients, projects, prospects, tasks, meetings, social, finance, aura ops.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:48:00'
    },
    {
        id: '1738620000003',
        title: 'Create Supabase Project',
        desc: 'Set up new Supabase project for Command Center, run schema.sql.',
        status: 'todo',
        category: 'aurapath'
    },
    {
        id: '1738620000004',
        title: '✅ Build Clients Page',
        desc: 'Client list, profiles, health scores, project tracking.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:55:00'
    },
    {
        id: '1738620000005',
        title: '✅ Build Pipeline Page',
        desc: 'Prospect tracking, stages, outreach sequences.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:55:00'
    },
    {
        id: '1738620000006',
        title: '✅ Build Calendar Page',
        desc: 'Google Calendar integration for Brandon + Travis.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:58:00'
    },
    {
        id: '1738620000007',
        title: 'Integrate Fathom',
        desc: 'Auto-import meeting notes and action items.',
        status: 'backlog',
        category: 'aurapath'
    },
    {
        id: '1738620000008',
        title: '✅ Build Finance Page',
        desc: 'Invoices, revenue tracking, expenses, P&L.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:56:00'
    },
    {
        id: '1738620000009',
        title: '✅ Build Social Page',
        desc: 'Post scheduler, content calendar, Twitter/LinkedIn/YouTube integration.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T19:05:00'
    },
    {
        id: '1738620000010',
        title: '✅ Build Aura\'s Desk',
        desc: 'Agent orchestration, briefings, activity log.',
        status: 'done',
        category: 'aurapath',
        completedAt: '2026-02-03T18:59:00'
    },
    {
        id: '1738620000011',
        title: 'Add First Client',
        desc: 'Add current Aurapath client to Command Center.',
        status: 'todo',
        category: 'aurapath'
    },
    {
        id: '1738620000012',
        title: 'Deploy to Vercel',
        desc: 'Production deployment of Command Center.',
        status: 'backlog',
        category: 'aurapath'
    }
];

const defaultActivity = [
    { text: 'Partnership began', date: '2026-02-02T21:51:00' },
    { text: 'Aura identity created', date: '2026-02-02T22:00:00' },
    { text: 'Gmail connected', date: '2026-02-02T22:51:00' },
    { text: 'Kanban v1 built', date: '2026-02-02T22:53:00' },
    { text: 'Morning briefing scheduled', date: '2026-02-02T23:15:00' },
    { text: 'Command Center initialized', date: '2026-02-03T18:48:00' }
];

// Merge new default cards into existing localStorage (so Aura can add tasks)
function mergeNewDefaults(existing, defaults) {
    const existingIds = new Set(existing.map(c => c.id));
    const newCards = defaults.filter(c => !existingIds.has(c.id));
    return [...existing, ...newCards];
}

let storedCards = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
let cards = storedCards ? mergeNewDefaults(storedCards, defaultCards) : defaultCards;
let activity = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || 'null') || defaultActivity;
let editingId = null;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const categoryLabels = {
    build: '🔨 Build',
    research: '🔍 Research',
    automation: '⚙️ Automation',
    learning: '📚 Learning',
    aurapath: '🚀 Aurapath',
    other: '📌 Other'
};

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
}

function addActivity(text) {
    activity.unshift({ text, date: new Date().toISOString() });
    if (activity.length > 50) activity = activity.slice(0, 50);
    save();
    renderActivity();
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function render() {
    $$('.cards').forEach(col => col.innerHTML = '');
    
    let completed = 0, inProgress = 0;
    
    cards.forEach(card => {
        if (card.status === 'done') completed++;
        if (card.status === 'progress') inProgress++;
        
        const el = document.createElement('div');
        el.className = 'card';
        el.draggable = true;
        el.dataset.id = card.id;
        el.dataset.category = card.category || 'other';
        
        let html = `<h4>${esc(card.title)}</h4>`;
        if (card.desc) html += `<p>${esc(card.desc)}</p>`;
        html += `<div class="category">${categoryLabels[card.category] || '📌 Other'}</div>`;
        if (card.completedAt && card.status === 'done') {
            html += `<div class="completed-date">✓ ${formatDate(card.completedAt)}</div>`;
        }
        
        el.innerHTML = html;
        el.addEventListener('dragstart', onDragStart);
        el.addEventListener('dragend', onDragEnd);
        el.addEventListener('click', () => openModal(card));
        $(`.cards[data-status="${card.status}"]`).appendChild(el);
    });
    
    $('#completedCount').textContent = completed;
    $('#progressCount').textContent = inProgress;
}

function renderActivity() {
    const log = $('#activityLog');
    log.innerHTML = activity.slice(0, 10).map(a => `
        <div class="activity-item">
            ${esc(a.text)}
            <div class="activity-date">${formatDate(a.date)} ${formatTime(a.date)}</div>
        </div>
    `).join('');
}

function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function openModal(card = null) {
    editingId = card?.id || null;
    $('#modalTitle').textContent = card ? 'Edit Task' : 'Add Task';
    $('#cardTitle').value = card?.title || '';
    $('#cardDesc').value = card?.desc || '';
    $('#cardCategory').value = card?.category || 'build';
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
        card.category = $('#cardCategory').value;
        addActivity(`Updated: ${title}`);
    } else {
        cards.push({
            id: Date.now().toString(),
            title,
            desc: $('#cardDesc').value.trim(),
            status: 'backlog',
            category: $('#cardCategory').value,
            completedAt: '2026-02-02T23:31:00'
        });
        addActivity(`Added: ${title}`);
    }
    save();
    render();
    closeModal();
};

$('#deleteCard').onclick = () => {
    const card = cards.find(c => c.id === editingId);
    if (card) addActivity(`Deleted: ${card.title}`);
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
            const oldStatus = card.status;
            const newStatus = col.dataset.status;
            if (oldStatus !== newStatus) {
                card.status = newStatus;
                if (newStatus === 'done' && !card.completedAt) {
                    card.completedAt = new Date().toISOString();
                    addActivity(`Completed: ${card.title}`);
                } else if (oldStatus === 'done' && newStatus !== 'done') {
                    card.completedAt = null;
                    addActivity(`Reopened: ${card.title}`);
                } else {
                    const statusNames = { backlog: 'Backlog', progress: 'In Progress', review: 'Review', done: 'Done' };
                    addActivity(`Moved "${card.title}" to ${statusNames[newStatus]}`);
                }
                save();
                render();
            }
        }
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// Initial render
render();
renderActivity();
