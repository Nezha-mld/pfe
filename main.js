// ============================================
// APPLICATION DE GESTION RH UNIVERSITAIRE
// Version améliorée avec design moderne
// ============================================

// Configuration et données initiales
const AppConfig = {
    appName: "UNIRH - Gestion RH",
    version: "1.0.0",
    university: "Université de Paris",
    departments: [
        "Informatique",
        "Mathématiques", 
        "Physique",
        "Chimie",
        "Biologie",
        "Administration",
        "Bibliothèque",
        "Maintenance"
    ],
    positions: [
        "Professeur",
        "Maître de Conférence",
        "Chargé de TD",
        "Chercheur",
        "Administratif",
        "Technicien",
        "Assistant",
        "Directeur"
    ],
    leaveTypes: [
        "Congé annuel",
        "Congé maladie",
        "Congé maternité",
        "Congé paternité",
        "Congé sans solde",
        "Formation",
        "Mission"
    ],
    absenceTypes: [
        "Maladie",
        "Personnel",
        "Formation",
        "Maternité",
        "Accident",
        "Autre"
    ]
};

// Données de l'application
let AppData = {
    personnel: [],
    salaries: [],
    leaves: [],
    absences: [],
    activities: []
};

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Charger les données depuis localStorage
    loadDataFromStorage();
    
    // Initialiser l'interface
    initUI();
    
    // Initialiser les événements
    initEvents();
    
    // Charger les graphiques
    initCharts();
    
    // Mettre à jour l'interface
    updateDashboard();
    updatePersonnelTable();
    updateSalariesTable();
    updateLeavesTable();
    updateAbsencesTable();
    
    // Afficher une notification de bienvenue
    showToast(`Bienvenue dans ${AppConfig.appName} !`, 'success');
}

// ============================================
// GESTION DES DONNÉES
// ============================================

function loadDataFromStorage() {
    // Charger les données depuis localStorage ou utiliser les données de démonstration
    const demoData = getDemoData();
    
    AppData.personnel = JSON.parse(localStorage.getItem('personnel')) || demoData.personnel;
    AppData.salaries = JSON.parse(localStorage.getItem('salaries')) || demoData.salaries;
    AppData.leaves = JSON.parse(localStorage.getItem('leaves')) || demoData.leaves;
    AppData.absences = JSON.parse(localStorage.getItem('absences')) || demoData.absences;
    AppData.activities = JSON.parse(localStorage.getItem('activities')) || demoData.activities;
    
    // Sauvegarder les données si c'est la première utilisation
    if (!localStorage.getItem('initialized')) {
        saveAllData();
        localStorage.setItem('initialized', 'true');
    }
}

function saveAllData() {
    localStorage.setItem('personnel', JSON.stringify(AppData.personnel));
    localStorage.setItem('salaries', JSON.stringify(AppData.salaries));
    localStorage.setItem('leaves', JSON.stringify(AppData.leaves));
    localStorage.setItem('absences', JSON.stringify(AppData.absences));
    localStorage.setItem('activities', JSON.stringify(AppData.activities));
}

function getDemoData() {
    return {
        personnel: [
            {
                id: 'EMP001',
                firstName: 'Jean',
                lastName: 'Dupont',
                email: 'j.dupont@univ-paris.fr',
                phone: '0612345678',
                department: 'Informatique',
                position: 'Professeur',
                status: 'Actif',
                hireDate: '2020-01-15',
                salary: 4500
            },
            {
                id: 'EMP002',
                firstName: 'Marie',
                lastName: 'Martin',
                email: 'm.martin@univ-paris.fr',
                phone: '0623456789',
                department: 'Mathématiques',
                position: 'Maître de Conférence',
                status: 'Actif',
                hireDate: '2019-03-20',
                salary: 3800
            },
            {
                id: 'EMP003',
                firstName: 'Pierre',
                lastName: 'Bernard',
                email: 'p.bernard@univ-paris.fr',
                phone: '0634567890',
                department: 'Administration',
                position: 'Responsable RH',
                status: 'Actif',
                hireDate: '2018-06-10',
                salary: 5200
            }
        ],
        salaries: [
            {
                id: 'SAL001',
                employeeId: 'EMP001',
                employeeName: 'Jean Dupont',
                department: 'Informatique',
                grossSalary: 4500,
                deductions: 500,
                netSalary: 4000,
                month: '2024-01',
                status: 'Payé',
                paymentDate: '2024-01-31'
            },
            {
                id: 'SAL002',
                employeeId: 'EMP002',
                employeeName: 'Marie Martin',
                department: 'Mathématiques',
                grossSalary: 3800,
                deductions: 400,
                netSalary: 3400,
                month: '2024-01',
                status: 'Payé',
                paymentDate: '2024-01-31'
            }
        ],
        leaves: [
            {
                id: 'LEAVE001',
                employeeId: 'EMP001',
                employeeName: 'Jean Dupont',
                type: 'Congé annuel',
                startDate: '2024-02-15',
                endDate: '2024-02-20',
                duration: 5,
                status: 'Approuvé',
                requestDate: '2024-01-10',
                reason: 'Vacances en famille'
            },
            {
                id: 'LEAVE002',
                employeeId: 'EMP002',
                employeeName: 'Marie Martin',
                type: 'Congé maladie',
                startDate: '2024-02-10',
                endDate: '2024-02-12',
                duration: 3,
                status: 'En attente',
                requestDate: '2024-02-09',
                reason: 'Grippe'
            }
        ],
        absences: [
            {
                id: 'ABS001',
                employeeId: 'EMP003',
                employeeName: 'Pierre Bernard',
                type: 'Formation',
                date: '2024-02-05',
                reason: 'Formation management RH',
                justified: true,
                certificate: false
            }
        ],
        activities: [
            {
                id: 'ACT001',
                type: 'salary',
                message: 'Nouveau salaire ajouté pour Jean Dupont',
                date: '2024-02-01 10:30',
                user: 'Admin RH'
            },
            {
                id: 'ACT002',
                type: 'leave',
                message: 'Congé approuvé pour Marie Martin',
                date: '2024-02-02 14:15',
                user: 'Admin RH'
            },
            {
                id: 'ACT003',
                type: 'absence',
                message: 'Absence enregistrée pour Pierre Bernard',
                date: '2024-02-03 09:45',
                user: 'Admin RH'
            }
        ]
    };
}

// ============================================
// INITIALISATION DE L'INTERFACE
// ============================================

function initUI() {
    // Mettre à jour la date actuelle
    updateCurrentDate();
    
    // Initialiser la sidebar
    initSidebar();
    
    // Initialiser les onglets
    initTabs();
}

function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('fr-FR', options);
    document.getElementById('current-date').textContent = dateString;
}

function initSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Gestion des clics sur les items de la sidebar
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Mettre à jour l'état actif
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Changer d'onglet
            switchTab(tabId);
            
            // Mettre à jour le titre de la page
            updatePageTitle(this.querySelector('span').textContent);
            
            // Fermer la sidebar sur mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}

function initTabs() {
    // Cacher tous les onglets sauf le premier
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (!tab.classList.contains('active')) {
            tab.style.display = 'none';
        }
    });
}

function switchTab(tabId) {
    // Cacher tous les onglets
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });
    
    // Afficher l'onglet sélectionné
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
        setTimeout(() => {
            activeTab.classList.add('active');
        }, 10);
    }
}

function updatePageTitle(title) {
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    if (pageTitle) {
        pageTitle.textContent = title;
    }
    
    // Mettre à jour le sous-titre selon l'onglet
    const subtitles = {
        'dashboard': 'Vue d\'ensemble de la gestion RH',
        'personnel': 'Gestion du personnel universitaire',
        'salaries': 'Gestion des salaires et paiements',
        'conges': 'Gestion des congés et autorisations',
        'absences': 'Suivi des absences du personnel',
        'reports': 'Rapports et statistiques détaillés'
    };
    
    if (pageSubtitle && subtitles[title.toLowerCase().split(' ')[0]]) {
        pageSubtitle.textContent = subtitles[title.toLowerCase().split(' ')[0]];
    }
}

// ============================================
// INITIALISATION DES ÉVÉNEMENTS
// ============================================

function initEvents() {
    // Boutons d'ajout
    document.getElementById('add-employee-btn')?.addEventListener('click', showAddEmployeeModal);
    document.getElementById('add-salary-btn')?.addEventListener('click', showAddSalaryModal);
    document.getElementById('request-leave-btn')?.addEventListener('click', showRequestLeaveModal);
    document.getElementById('add-absence-btn')?.addEventListener('click', showAddAbsenceModal);
    document.getElementById('generate-report-btn')?.addEventListener('click', generateReport);
    
    // Boutons d'actions rapides
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
    
    // Boutons de rapports
    document.querySelectorAll('.view-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.dataset.report;
            viewReport(reportType);
        });
    });
    
    // Recherche globale
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('input', function(e) {
            performGlobalSearch(e.target.value);
        });
    }
    
    // Filtres
    document.getElementById('filter-department')?.addEventListener('change', filterPersonnel);
    document.getElementById('filter-status')?.addEventListener('change', filterPersonnel);
    document.getElementById('search-personnel')?.addEventListener('input', searchPersonnel);
    
    // Modal
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    document.getElementById('modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Logout
    document.querySelector('.logout-btn')?.addEventListener('click', logout);
    
    // Notifications
    document.getElementById('notifications-btn')?.addEventListener('click', showNotifications);
}

// ============================================
// GESTION DU TABLEAU DE BORD
// ============================================

function updateDashboard() {
    // Mettre à jour les statistiques
    updateStatistics();
    
    // Mettre à jour l'activité récente
    updateRecentActivity();
    
    // Mettre à jour les graphiques
    updateCharts();
}

function updateStatistics() {
    // Nombre total d'employés actifs
    const activeEmployees = AppData.personnel.filter(emp => emp.status === 'Actif').length;
    document.getElementById('total-employees').textContent = activeEmployees;
    
    // Masse salariale totale (somme des salaires nets du dernier mois)
    const currentMonth = new Date().toISOString().slice(0, 7);
    const currentSalaries = AppData.salaries.filter(s => s.month === currentMonth);
    const totalSalary = currentSalaries.reduce((sum, salary) => sum + salary.netSalary, 0);
    document.getElementById('total-salary').textContent = `${totalSalary.toLocaleString('fr-FR')} €`;
    
    // Congés en attente
    const pendingLeaves = AppData.leaves.filter(leave => leave.status === 'En attente').length;
    document.getElementById('pending-leaves').textContent = pendingLeaves;
    
    // Absences d'aujourd'hui
    const today = new Date().toISOString().slice(0, 10);
    const todayAbsences = AppData.absences.filter(abs => abs.date === today).length;
    document.getElementById('today-absences').textContent = todayAbsences;
}

function updateRecentActivity() {
    const activityList = document.getElementById('recent-activity');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    // Afficher les 5 dernières activités
    const recentActivities = [...AppData.activities]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    recentActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const icon = getActivityIcon(activity.type);
        const time = formatDateTime(activity.date);
        
        activityItem.innerHTML = `
            <div class="activity-icon">${icon}</div>
            <div class="activity-content">
                <p class="activity-message">${activity.message}</p>
                <small class="activity-time">${time} • ${activity.user}</small>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function getActivityIcon(type) {
    const icons = {
        'salary': '<i class="fas fa-euro-sign"></i>',
        'leave': '<i class="fas fa-umbrella-beach"></i>',
        'absence': '<i class="fas fa-calendar-times"></i>',
        'employee': '<i class="fas fa-user-plus"></i>',
        'report': '<i class="fas fa-chart-bar"></i>'
    };
    
    return icons[type] || '<i class="fas fa-info-circle"></i>';
}

// ============================================
// GESTION DU PERSONNEL
// ============================================

function updatePersonnelTable() {
    const tableBody = document.querySelector('#personnel-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    AppData.personnel.forEach(employee => {
        const row = document.createElement('tr');
        
        const hireDate = new Date(employee.hireDate);
        const formattedDate = hireDate.toLocaleDateString('fr-FR');
        
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>
                <strong>${employee.firstName} ${employee.lastName}</strong>
                <small>${employee.phone}</small>
            </td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td><span class="badge ${employee.status.toLowerCase()}">${employee.status}</span></td>
            <td>${formattedDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon small edit-employee" data-id="${employee.id}" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon small view-employee" data-id="${employee.id}" title="Voir détails">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon small delete-employee" data-id="${employee.id}" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Ajouter les événements aux boutons d'action
    attachEmployeeEvents();
}

function attachEmployeeEvents() {
    // Éditer employé
    document.querySelectorAll('.edit-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.id;
            editEmployee(employeeId);
        });
    });
    
    // Voir détails
    document.querySelectorAll('.view-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.id;
            viewEmployeeDetails(employeeId);
        });
    });
    
    // Supprimer employé
    document.querySelectorAll('.delete-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            const employeeId = this.dataset.id;
            deleteEmployee(employeeId);
        });
    });
}

function showAddEmployeeModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Ajouter un Nouvel Employé';
    
    // Générer un ID unique
    const newId = `EMP${String(AppData.personnel.length + 1).padStart(3, '0')}`;
    
    modalBody.innerHTML = `
        <form id="employee-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="employee-id">ID Employé *</label>
                    <input type="text" id="employee-id" value="${newId}" required readonly>
                </div>
                <div class="form-group">
                    <label for="employee-status">Statut *</label>
                    <select id="employee-status" required>
                        <option value="Actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                        <option value="En congé">En congé</option>
                        <option value="En formation">En formation</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="employee-firstname">Prénom *</label>
                    <input type="text" id="employee-firstname" required>
                </div>
                <div class="form-group">
                    <label for="employee-lastname">Nom *</label>
                    <input type="text" id="employee-lastname" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="employee-email">Email *</label>
                    <input type="email" id="employee-email" required>
                </div>
                <div class="form-group">
                    <label for="employee-phone">Téléphone</label>
                    <input type="tel" id="employee-phone">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="employee-department">Département *</label>
                    <select id="employee-department" required>
                        <option value="">Sélectionner...</option>
                        ${AppConfig.departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="employee-position">Poste *</label>
                    <select id="employee-position" required>
                        <option value="">Sélectionner...</option>
                        ${AppConfig.positions.map(pos => `<option value="${pos}">${pos}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="employee-hiredate">Date d'embauche *</label>
                    <input type="date" id="employee-hiredate" required>
                </div>
                <div class="form-group">
                    <label for="employee-salary">Salaire mensuel (€)</label>
                    <input type="number" id="employee-salary" min="0" step="100">
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary close-modal">Annuler</button>
                <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
        </form>
    `;
    
    // Pré-remplir la date d'aujourd'hui
    document.getElementById('employee-hiredate').value = new Date().toISOString().split('T')[0];
    
    // Gérer la soumission du formulaire
    const form = document.getElementById('employee-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveEmployee();
    });
    
    // Afficher la modal
    modal.classList.add('active');
}

function saveEmployee() {
    const employee = {
        id: document.getElementById('employee-id').value,
        firstName: document.getElementById('employee-firstname').value,
        lastName: document.getElementById('employee-lastname').value,
        email: document.getElementById('employee-email').value,
        phone: document.getElementById('employee-phone').value,
        department: document.getElementById('employee-department').value,
        position: document.getElementById('employee-position').value,
        status: document.getElementById('employee-status').value,
        hireDate: document.getElementById('employee-hiredate').value,
        salary: parseFloat(document.getElementById('employee-salary').value) || 0
    };
    
    // Ajouter l'employé
    AppData.personnel.push(employee);
    
    // Ajouter une activité
    addActivity('employee', `Nouvel employé ajouté: ${employee.firstName} ${employee.lastName}`);
    
    // Sauvegarder les données
    saveAllData();
    
    // Mettre à jour l'interface
    updatePersonnelTable();
    updateDashboard();
    
    // Fermer la modal
    closeModal();
    
    // Afficher une notification
    showToast('Employé ajouté avec succès !', 'success');
}

function editEmployee(employeeId) {
    const employee = AppData.personnel.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    showToast('Fonctionnalité d\'édition bientôt disponible !', 'info');
}

function viewEmployeeDetails(employeeId) {
    const employee = AppData.personnel.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = `Détails de l'employé: ${employee.firstName} ${employee.lastName}`;
    
    const hireDate = new Date(employee.hireDate);
    const formattedDate = hireDate.toLocaleDateString('fr-FR');
    
    modalBody.innerHTML = `
        <div class="employee-details">
            <div class="detail-row">
                <strong>ID:</strong>
                <span>${employee.id}</span>
            </div>
            <div class="detail-row">
                <strong>Nom complet:</strong>
                <span>${employee.firstName} ${employee.lastName}</span>
            </div>
            <div class="detail-row">
                <strong>Email:</strong>
                <span>${employee.email}</span>
            </div>
            <div class="detail-row">
                <strong>Téléphone:</strong>
                <span>${employee.phone || 'Non renseigné'}</span>
            </div>
            <div class="detail-row">
                <strong>Département:</strong>
                <span>${employee.department}</span>
            </div>
            <div class="detail-row">
                <strong>Poste:</strong>
                <span>${employee.position}</span>
            </div>
            <div class="detail-row">
                <strong>Statut:</strong>
                <span class="badge ${employee.status.toLowerCase()}">${employee.status}</span>
            </div>
            <div class="detail-row">
                <strong>Date d'embauche:</strong>
                <span>${formattedDate}</span>
            </div>
            <div class="detail-row">
                <strong>Salaire mensuel:</strong>
                <span>${employee.salary ? employee.salary + ' €' : 'Non renseigné'}</span>
            </div>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn-secondary close-modal">Fermer</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function deleteEmployee(employeeId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        AppData.personnel = AppData.personnel.filter(emp => emp.id !== employeeId);
        
        // Ajouter une activité
        addActivity('employee', `Employé supprimé: ID ${employeeId}`);
        
        // Sauvegarder les données
        saveAllData();
        
        // Mettre à jour l'interface
        updatePersonnelTable();
        updateDashboard();
        
        showToast('Employé supprimé avec succès', 'success');
    }
}

function filterPersonnel() {
    const department = document.getElementById('filter-department').value;
    const status = document.getElementById('filter-status').value;
    
    const rows = document.querySelectorAll('#personnel-table tbody tr');
    
    rows.forEach(row => {
        const rowDept = row.cells[3].textContent;
        const rowStatus = row.cells[5].querySelector('.badge').textContent;
        
        const showDept = !department || rowDept === department;
        const showStatus = !status || rowStatus === status;
        
        row.style.display = showDept && showStatus ? '' : 'none';
    });
}

function searchPersonnel() {
    const searchTerm = document.getElementById('search-personnel').value.toLowerCase();
    const rows = document.querySelectorAll('#personnel-table tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const email = row.cells[2].textContent.toLowerCase();
        
        const matches = name.includes(searchTerm) || email.includes(searchTerm);
        row.style.display = matches ? '' : 'none';
    });
}

// ============================================
// GESTION DES SALAIRES
// ============================================

function updateSalariesTable() {
    const tableBody = document.querySelector('#salaries-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Calculer les statistiques
    const netSalaries = AppData.salaries.map(s => s.netSalary);
    const avgSalary = netSalaries.length > 0 ? 
        netSalaries.reduce((a, b) => a + b) / netSalaries.length : 0;
    const minSalary = netSalaries.length > 0 ? Math.min(...netSalaries) : 0;
    const maxSalary = netSalaries.length > 0 ? Math.max(...netSalaries) : 0;
    
    document.getElementById('avg-salary').textContent = `${avgSalary.toFixed(0)} €`;
    document.getElementById('min-salary').textContent = `${minSalary.toFixed(0)} €`;
    document.getElementById('max-salary').textContent = `${maxSalary.toFixed(0)} €`;
    
    // Remplir le tableau
    AppData.salaries.forEach(salary => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <strong>${salary.employeeName}</strong>
                <small>${salary.employeeId}</small>
            </td>
            <td>${salary.department}</td>
            <td>${salary.grossSalary.toLocaleString('fr-FR')} €</td>
            <td>${salary.deductions.toLocaleString('fr-FR')} €</td>
            <td><strong>${salary.netSalary.toLocaleString('fr-FR')} €</strong></td>
            <td>${salary.month}</td>
            <td><span class="badge ${salary.status === 'Payé' ? 'approved' : 'pending'}">${salary.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon small pay-salary" data-id="${salary.id}" title="Marquer comme payé">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="btn-icon small edit-salary" data-id="${salary.id}" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Attacher les événements
    attachSalaryEvents();
}

function attachSalaryEvents() {
    document.querySelectorAll('.pay-salary').forEach(btn => {
        btn.addEventListener('click', function() {
            const salaryId = this.dataset.id;
            markSalaryAsPaid(salaryId);
        });
    });
}

function showAddSalaryModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Ajouter un Salaire';
    
    // Générer un ID unique
    const newId = `SAL${String(AppData.salaries.length + 1).padStart(3, '0')}`;
    
    // Options des employés
    const employeeOptions = AppData.personnel
        .filter(emp => emp.status === 'Actif')
        .map(emp => `<option value="${emp.id}">${emp.firstName} ${emp.lastName} - ${emp.department}</option>`)
        .join('');
    
    modalBody.innerHTML = `
        <form id="salary-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="salary-id">ID Salaire *</label>
                    <input type="text" id="salary-id" value="${newId}" required readonly>
                </div>
                <div class="form-group">
                    <label for="salary-employee">Employé *</label>
                    <select id="salary-employee" required>
                        <option value="">Sélectionner un employé...</option>
                        ${employeeOptions}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="salary-gross">Salaire Brut (€) *</label>
                    <input type="number" id="salary-gross" min="0" required>
                </div>
                <div class="form-group">
                    <label for="salary-deductions">Déductions (€)</label>
                    <input type="number" id="salary-deductions" min="0" value="0">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="salary-month">Mois *</label>
                    <input type="month" id="salary-month" required>
                </div>
                <div class="form-group">
                    <label for="salary-status">Statut *</label>
                    <select id="salary-status" required>
                        <option value="À payer">À payer</option>
                        <option value="Payé">Payé</option>
                    </select>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary close-modal">Annuler</button>
                <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
        </form>
    `;
    
    // Pré-remplir le mois actuel
    document.getElementById('salary-month').value = new Date().toISOString().slice(0, 7);
    
    // Calculer le salaire net automatiquement
    const grossInput = document.getElementById('salary-gross');
    const deductionsInput = document.getElementById('salary-deductions');
    const employeeSelect = document.getElementById('salary-employee');
    
    // Pré-remplir le salaire brut quand un employé est sélectionné
    employeeSelect.addEventListener('change', function() {
        const employeeId = this.value;
        const employee = AppData.personnel.find(emp => emp.id === employeeId);
        if (employee && employee.salary) {
            grossInput.value = employee.salary;
        }
    });
    
    // Gérer la soumission du formulaire
    const form = document.getElementById('salary-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSalary();
    });
    
    modal.classList.add('active');
}

function saveSalary() {
    const employeeId = document.getElementById('salary-employee').value;
    const employee = AppData.personnel.find(emp => emp.id === employeeId);
    
    if (!employee) {
        showToast('Veuillez sélectionner un employé valide', 'error');
        return;
    }
    
    const grossSalary = parseFloat(document.getElementById('salary-gross').value);
    const deductions = parseFloat(document.getElementById('salary-deductions').value) || 0;
    const netSalary = grossSalary - deductions;
    
    const salary = {
        id: document.getElementById('salary-id').value,
        employeeId: employeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        department: employee.department,
        grossSalary: grossSalary,
        deductions: deductions,
        netSalary: netSalary,
        month: document.getElementById('salary-month').value,
        status: document.getElementById('salary-status').value,
        paymentDate: document.getElementById('salary-status').value === 'Payé' ? 
            new Date().toISOString().split('T')[0] : null
    };
    
    AppData.salaries.push(salary);
    
    // Ajouter une activité
    addActivity('salary', `Salaire ajouté pour ${salary.employeeName}`);
    
    // Sauvegarder les données
    saveAllData();
    
    // Mettre à jour l'interface
    updateSalariesTable();
    updateDashboard();
    
    // Fermer la modal
    closeModal();
    
    // Afficher une notification
    showToast('Salaire ajouté avec succès !', 'success');
}

function markSalaryAsPaid(salaryId) {
    const salary = AppData.salaries.find(s => s.id === salaryId);
    if (salary) {
        salary.status = 'Payé';
        salary.paymentDate = new Date().toISOString().split('T')[0];
        
        // Ajouter une activité
        addActivity('salary', `Salaire payé pour ${salary.employeeName}`);
        
        // Sauvegarder les données
        saveAllData();
        
        // Mettre à jour l'interface
        updateSalariesTable();
        
        showToast('Salaire marqué comme payé', 'success');
    }
}

// ============================================
// GESTION DES CONGÉS
// ============================================

function updateLeavesTable() {
    const tableBody = document.querySelector('#leaves-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Mettre à jour les statistiques
    const approvedLeaves = AppData.leaves.filter(l => l.status === 'Approuvé').length;
    const pendingLeaves = AppData.leaves.filter(l => l.status === 'En attente').length;
    const rejectedLeaves = AppData.leaves.filter(l => l.status === 'Refusé').length;
    
    document.getElementById('approved-leaves').textContent = approvedLeaves;
    document.getElementById('pending-leaves-count').textContent = pendingLeaves;
    document.getElementById('rejected-leaves').textContent = rejectedLeaves;
    
    // Remplir le tableau
    AppData.leaves.forEach(leave => {
        const row = document.createElement('tr');
        
        const startDate = new Date(leave.startDate).toLocaleDateString('fr-FR');
        const endDate = new Date(leave.endDate).toLocaleDateString('fr-FR');
        const requestDate = new Date(leave.requestDate).toLocaleDateString('fr-FR');
        
        row.innerHTML = `
            <td>
                <strong>${leave.employeeName}</strong>
                <small>${leave.employeeId}</small>
            </td>
            <td>${leave.type}</td>
            <td>${startDate} - ${endDate}</td>
            <td>${leave.duration} jours</td>
            <td><span class="badge ${leave.status === 'Approuvé' ? 'approved' : 
                                      leave.status === 'En attente' ? 'pending' : 'rejected'}">${leave.status}</span></td>
            <td>${requestDate}</td>
            <td>
                <div class="action-buttons">
                    ${leave.status === 'En attente' ? `
                        <button class="btn-icon small approve-leave" data-id="${leave.id}" title="Approuver">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon small reject-leave" data-id="${leave.id}" title="Refuser">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    <button class="btn-icon small view-leave" data-id="${leave.id}" title="Voir détails">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Attacher les événements
    attachLeaveEvents();
}

function attachLeaveEvents() {
    document.querySelectorAll('.approve-leave').forEach(btn => {
        btn.addEventListener('click', function() {
            const leaveId = this.dataset.id;
            updateLeaveStatus(leaveId, 'Approuvé');
        });
    });
    
    document.querySelectorAll('.reject-leave').forEach(btn => {
        btn.addEventListener('click', function() {
            const leaveId = this.dataset.id;
            updateLeaveStatus(leaveId, 'Refusé');
        });
    });
}

function showRequestLeaveModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Demander un Congé';
    
    // Générer un ID unique
    const newId = `LEAVE${String(AppData.leaves.length + 1).padStart(3, '0')}`;
    
    // Options des employés
    const employeeOptions = AppData.personnel
        .filter(emp => emp.status === 'Actif')
        .map(emp => `<option value="${emp.id}">${emp.firstName} ${emp.lastName} - ${emp.department}</option>`)
        .join('');
    
    modalBody.innerHTML = `
        <form id="leave-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="leave-id">ID Congé *</label>
                    <input type="text" id="leave-id" value="${newId}" required readonly>
                </div>
                <div class="form-group">
                    <label for="leave-employee">Employé *</label>
                    <select id="leave-employee" required>
                        <option value="">Sélectionner un employé...</option>
                        ${employeeOptions}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="leave-type">Type de congé *</label>
                    <select id="leave-type" required>
                        <option value="">Sélectionner...</option>
                        ${AppConfig.leaveTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="leave-duration">Durée (jours) *</label>
                    <input type="number" id="leave-duration" min="1" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="leave-start">Date début *</label>
                    <input type="date" id="leave-start" required>
                </div>
                <div class="form-group">
                    <label for="leave-end">Date fin *</label>
                    <input type="date" id="leave-end" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="leave-reason">Raison *</label>
                <textarea id="leave-reason" rows="3" required></textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary close-modal">Annuler</button>
                <button type="submit" class="btn-primary">Demander le congé</button>
            </div>
        </form>
    `;
    
    // Pré-remplir la date de début (demain)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('leave-start').value = tomorrow.toISOString().split('T')[0];
    
    // Calculer automatiquement la date de fin et la durée
    const startInput = document.getElementById('leave-start');
    const endInput = document.getElementById('leave-end');
    const durationInput = document.getElementById('leave-duration');
    
    startInput.addEventListener('change', updateLeaveDates);
    endInput.addEventListener('change', updateLeaveDuration);
    durationInput.addEventListener('change', updateLeaveEndDate);
    
    // Gérer la soumission du formulaire
    const form = document.getElementById('leave-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveLeaveRequest();
    });
    
    modal.classList.add('active');
}

function updateLeaveDates() {
    const startDate = new Date(document.getElementById('leave-start').value);
    const duration = parseInt(document.getElementById('leave-duration').value) || 1;
    
    if (!isNaN(startDate.getTime())) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration - 1);
        document.getElementById('leave-end').value = endDate.toISOString().split('T')[0];
    }
}

function updateLeaveDuration() {
    const startDate = new Date(document.getElementById('leave-start').value);
    const endDate = new Date(document.getElementById('leave-end').value);
    
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('leave-duration').value = diffDays;
    }
}

function updateLeaveEndDate() {
    const startDate = new Date(document.getElementById('leave-start').value);
    const duration = parseInt(document.getElementById('leave-duration').value) || 1;
    
    if (!isNaN(startDate.getTime())) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration - 1);
        document.getElementById('leave-end').value = endDate.toISOString().split('T')[0];
    }
}

function saveLeaveRequest() {
    const employeeId = document.getElementById('leave-employee').value;
    const employee = AppData.personnel.find(emp => emp.id === employeeId);
    
    if (!employee) {
        showToast('Veuillez sélectionner un employé valide', 'error');
        return;
    }
    
    const startDate = document.getElementById('leave-start').value;
    const endDate = document.getElementById('leave-end').value;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = parseInt(document.getElementById('leave-duration').value);
    
    const leave = {
        id: document.getElementById('leave-id').value,
        employeeId: employeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        type: document.getElementById('leave-type').value,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        status: 'En attente',
        requestDate: new Date().toISOString().split('T')[0],
        reason: document.getElementById('leave-reason').value
    };
    
    AppData.leaves.push(leave);
    
    // Ajouter une activité
    addActivity('leave', `Nouvelle demande de congé pour ${leave.employeeName}`);
    
    // Sauvegarder les données
    saveAllData();
    
    // Mettre à jour l'interface
    updateLeavesTable();
    updateDashboard();
    
    // Fermer la modal
    closeModal();
    
    // Afficher une notification
    showToast('Demande de congé envoyée avec succès !', 'success');
}

function updateLeaveStatus(leaveId, status) {
    const leave = AppData.leaves.find(l => l.id === leaveId);
    if (leave) {
        leave.status = status;
        
        // Ajouter une activité
        addActivity('leave', `Congé ${status.toLowerCase()} pour ${leave.employeeName}`);
        
        // Sauvegarder les données
        saveAllData();
        
        // Mettre à jour l'interface
        updateLeavesTable();
        updateDashboard();
        
        showToast(`Congé ${status.toLowerCase()}`, 'success');
    }
}

// ============================================
// GESTION DES ABSENCES
// ============================================

function updateAbsencesTable() {
    const tableBody = document.querySelector('#absences-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Mettre à jour les statistiques
    const maladieCount = AppData.absences.filter(a => a.type === 'Maladie').length;
    const personnelCount = AppData.absences.filter(a => a.type === 'Personnel').length;
    const formationCount = AppData.absences.filter(a => a.type === 'Formation').length;
    const autreCount = AppData.absences.filter(a => !['Maladie', 'Personnel', 'Formation'].includes(a.type)).length;
    
    document.getElementById('maladie-count').textContent = maladieCount;
    document.getElementById('personnel-count').textContent = personnelCount;
    document.getElementById('formation-count').textContent = formationCount;
    document.getElementById('autre-count').textContent = autreCount;
    
    // Remplir le tableau
    AppData.absences.forEach(absence => {
        const row = document.createElement('tr');
        
        const date = new Date(absence.date).toLocaleDateString('fr-FR');
        
        row.innerHTML = `
            <td>
                <strong>${absence.employeeName}</strong>
                <small>${absence.employeeId}</small>
            </td>
            <td><span class="badge">${absence.type}</span></td>
            <td>${date}</td>
            <td>${absence.reason}</td>
            <td><span class="badge ${absence.justified ? 'approved' : 'pending'}">${absence.justified ? 'Oui' : 'Non'}</span></td>
            <td>
                <div class="action-buttons">
                    ${!absence.justified ? `
                        <button class="btn-icon small justify-absence" data-id="${absence.id}" title="Justifier">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-icon small delete-absence" data-id="${absence.id}" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Attacher les événements
    attachAbsenceEvents();
}

function attachAbsenceEvents() {
    document.querySelectorAll('.justify-absence').forEach(btn => {
        btn.addEventListener('click', function() {
            const absenceId = this.dataset.id;
            justifyAbsence(absenceId);
        });
    });
    
    document.querySelectorAll('.delete-absence').forEach(btn => {
        btn.addEventListener('click', function() {
            const absenceId = this.dataset.id;
            deleteAbsence(absenceId);
        });
    });
}

function showAddAbsenceModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Enregistrer une Absence';
    
    // Générer un ID unique
    const newId = `ABS${String(AppData.absences.length + 1).padStart(3, '0')}`;
    
    // Options des employés
    const employeeOptions = AppData.personnel
        .filter(emp => emp.status === 'Actif')
        .map(emp => `<option value="${emp.id}">${emp.firstName} ${emp.lastName} - ${emp.department}</option>`)
        .join('');
    
    modalBody.innerHTML = `
        <form id="absence-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="absence-id">ID Absence *</label>
                    <input type="text" id="absence-id" value="${newId}" required readonly>
                </div>
                <div class="form-group">
                    <label for="absence-employee">Employé *</label>
                    <select id="absence-employee" required>
                        <option value="">Sélectionner un employé...</option>
                        ${employeeOptions}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="absence-type">Type *</label>
                    <select id="absence-type" required>
                        <option value="">Sélectionner...</option>
                        ${AppConfig.absenceTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="absence-date">Date *</label>
                    <input type="date" id="absence-date" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="absence-reason">Raison *</label>
                <textarea id="absence-reason" rows="3" required></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="absence-justified">Justifiée ?</label>
                    <select id="absence-justified">
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="absence-certificate">Certificat médical ?</label>
                    <select id="absence-certificate">
                        <option value="false">Non</option>
                        <option value="true">Oui</option>
                    </select>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary close-modal">Annuler</button>
                <button type="submit" class="btn-primary">Enregistrer</button>
            </div>
        </form>
    `;
    
    // Pré-remplir la date d'aujourd'hui
    document.getElementById('absence-date').value = new Date().toISOString().split('T')[0];
    
    // Gérer la soumission du formulaire
    const form = document.getElementById('absence-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveAbsence();
    });
    
    modal.classList.add('active');
}

function saveAbsence() {
    const employeeId = document.getElementById('absence-employee').value;
    const employee = AppData.personnel.find(emp => emp.id === employeeId);
    
    if (!employee) {
        showToast('Veuillez sélectionner un employé valide', 'error');
        return;
    }
    
    const absence = {
        id: document.getElementById('absence-id').value,
        employeeId: employeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        type: document.getElementById('absence-type').value,
        date: document.getElementById('absence-date').value,
        reason: document.getElementById('absence-reason').value,
        justified: document.getElementById('absence-justified').value === 'true',
        certificate: document.getElementById('absence-certificate').value === 'true'
    };
    
    AppData.absences.push(absence);
    
    // Ajouter une activité
    addActivity('absence', `Absence enregistrée pour ${absence.employeeName}`);
    
    // Sauvegarder les données
    saveAllData();
    
    // Mettre à jour l'interface
    updateAbsencesTable();
    updateDashboard();
    
    // Fermer la modal
    closeModal();
    
    // Afficher une notification
    showToast('Absence enregistrée avec succès !', 'success');
}

function justifyAbsence(absenceId) {
    const absence = AppData.absences.find(a => a.id === absenceId);
    if (absence) {
        absence.justified = true;
        
        // Ajouter une activité
        addActivity('absence', `Absence justifiée pour ${absence.employeeName}`);
        
        // Sauvegarder les données
        saveAllData();
        
        // Mettre à jour l'interface
        updateAbsencesTable();
        
        showToast('Absence justifiée', 'success');
    }
}

function deleteAbsence(absenceId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette absence ?')) {
        AppData.absences = AppData.absences.filter(a => a.id !== absenceId);
        
        // Ajouter une activité
        addActivity('absence', `Absence supprimée: ID ${absenceId}`);
        
        // Sauvegarder les données
        saveAllData();
        
        // Mettre à jour l'interface
        updateAbsencesTable();
        
        showToast('Absence supprimée', 'success');
    }
}

// ============================================
// GRAPHIQUES
// ============================================

let salaryChart = null;
let leaveChart = null;

function initCharts() {
    createSalaryChart();
    createLeaveChart();
}

function createSalaryChart() {
    const ctx = document.getElementById('salaryChart')?.getContext('2d');
    if (!ctx) return;
    
    // Préparer les données
    const departments = [...new Set(AppData.personnel.map(emp => emp.department))];
    const avgSalaries = departments.map(dept => {
        const deptEmployees = AppData.personnel.filter(emp => emp.department === dept);
        const avg = deptEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / deptEmployees.length;
        return Math.round(avg);
    });
    
    salaryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: departments,
            datasets: [{
                label: 'Salaire Moyen (€)',
                data: avgSalaries,
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(231, 76, 60, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + ' €';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createLeaveChart() {
    const ctx = document.getElementById('leaveChart')?.getContext('2d');
    if (!ctx) return;
    
    const approved = AppData.leaves.filter(l => l.status === 'Approuvé').length;
    const pending = AppData.leaves.filter(l => l.status === 'En attente').length;
    const rejected = AppData.leaves.filter(l => l.status === 'Refusé').length;
    
    leaveChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Approuvés', 'En attente', 'Refusés'],
            datasets: [{
                data: [approved, pending, rejected],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(231, 76, 60, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function updateCharts() {
    if (salaryChart) {
        salaryChart.destroy();
        createSalaryChart();
    }
    
    if (leaveChart) {
        leaveChart.destroy();
        createLeaveChart();
    }
}

// ============================================
// RAPPORTS
// ============================================

function generateReport() {
    // Créer un rapport complet
    const report = {
        title: `Rapport RH - ${AppConfig.university}`,
        date: new Date().toLocaleDateString('fr-FR'),
        generatedBy: 'Admin RH',
        summary: {
            totalEmployees: AppData.personnel.length,
            activeEmployees: AppData.personnel.filter(emp => emp.status === 'Actif').length,
            totalSalaryMass: AppData.salaries.reduce((sum, s) => sum + s.netSalary, 0),
            pendingLeaves: AppData.leaves.filter(l => l.status === 'En attente').length,
            todayAbsences: AppData.absences.filter(a => a.date === new Date().toISOString().split('T')[0]).length
        },
        departments: {},
        salaries: AppData.salaries,
        leaves: AppData.leaves,
        absences: AppData.absences
    };
    
    // Analyser par département
    AppConfig.departments.forEach(dept => {
        const deptEmployees = AppData.personnel.filter(emp => emp.department === dept);
        if (deptEmployees.length > 0) {
            report.departments[dept] = {
                count: deptEmployees.length,
                avgSalary: Math.round(deptEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / deptEmployees.length)
            };
        }
    });
    
    // Convertir en texte
    let reportText = `=== RAPPORT RH - ${AppConfig.university} ===\n\n`;
    reportText += `Date: ${report.date}\n`;
    reportText += `Généré par: ${report.generatedBy}\n\n`;
    
    reportText += `=== STATISTIQUES GÉNÉRALES ===\n`;
    reportText += `Personnel total: ${report.summary.totalEmployees}\n`;
    reportText += `Personnel actif: ${report.summary.activeEmployees}\n`;
    reportText += `Masse salariale: ${report.summary.totalSalaryMass.toLocaleString('fr-FR')} €\n`;
    reportText += `Congés en attente: ${report.summary.pendingLeaves}\n`;
    reportText += `Absences aujourd'hui: ${report.summary.todayAbsences}\n\n`;
    
    reportText += `=== ANALYSE PAR DÉPARTEMENT ===\n`;
    Object.entries(report.departments).forEach(([dept, data]) => {
        reportText += `${dept}: ${data.count} employés, Salaire moyen: ${data.avgSalary} €\n`;
    });
    
    // Télécharger le rapport
    downloadReport(reportText);
    
    // Ajouter une activité
    addActivity('report', 'Rapport mensuel généré');
    
    // Afficher une notification
    showToast('Rapport généré avec succès !', 'success');
}

function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-rh-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function viewReport(reportType) {
    switch(reportType) {
        case 'salary':
            showSalaryReport();
            break;
        case 'leave':
            showLeaveReport();
            break;
        case 'absence':
            showAbsenceReport();
            break;
        case 'personnel':
            showPersonnelReport();
            break;
    }
}

function showSalaryReport() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Rapport Salarial Détaillé';
    
    let content = '<div class="report-view">';
    
    // Statistiques salariales
    const netSalaries = AppData.salaries.map(s => s.netSalary);
    const avgSalary = netSalaries.length > 0 ? 
        Math.round(netSalaries.reduce((a, b) => a + b) / netSalaries.length) : 0;
    const minSalary = netSalaries.length > 0 ? Math.min(...netSalaries) : 0;
    const maxSalary = netSalaries.length > 0 ? Math.max(...netSalaries) : 0;
    const totalSalary = netSalaries.reduce((a, b) => a + b, 0);
    
    content += `
        <h4><i class="fas fa-chart-line"></i> Statistiques Salariales</h4>
        <div class="stats-grid">
            <div class="stat">
                <strong>Salaire Moyen</strong>
                <p>${avgSalary.toLocaleString('fr-FR')} €</p>
            </div>
            <div class="stat">
                <strong>Salaire Minimum</strong>
                <p>${minSalary.toLocaleString('fr-FR')} €</p>
            </div>
            <div class="stat">
                <strong>Salaire Maximum</strong>
                <p>${maxSalary.toLocaleString('fr-FR')} €</p>
            </div>
            <div class="stat">
                <strong>Masse Salariale</strong>
                <p>${totalSalary.toLocaleString('fr-FR')} €</p>
            </div>
        </div>
        
        <h4><i class="fas fa-users"></i> Salaires par Département</h4>
        <div class="dept-salaries">
    `;
    
    // Salaires par département
    const deptSalaries = {};
    AppData.salaries.forEach(salary => {
        if (!deptSalaries[salary.department]) {
            deptSalaries[salary.department] = [];
        }
        deptSalaries[salary.department].push(salary.netSalary);
    });
    
    Object.entries(deptSalaries).forEach(([dept, salaries]) => {
        const avg = Math.round(salaries.reduce((a, b) => a + b) / salaries.length);
        const total = salaries.reduce((a, b) => a + b);
        
        content += `
            <div class="dept-row">
                <strong>${dept}</strong>
                <div>
                    <span>${salaries.length} employés</span>
                    <span>Moyenne: ${avg.toLocaleString('fr-FR')} €</span>
                    <span>Total: ${total.toLocaleString('fr-FR')} €</span>
                </div>
            </div>
        `;
    });
    
    content += '</div></div>';
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

function addActivity(type, message) {
    const activity = {
        id: `ACT${String(AppData.activities.length + 1).padStart(3, '0')}`,
        type: type,
        message: message,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user: 'Admin RH'
    };
    
    AppData.activities.unshift(activity);
    
    // Garder seulement les 50 dernières activités
    if (AppData.activities.length > 50) {
        AppData.activities = AppData.activities.slice(0, 50);
    }
    
    localStorage.setItem('activities', JSON.stringify(AppData.activities));
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
        return `Il y a ${diffMins} min`;
    } else if (diffHours < 24) {
        return `Il y a ${diffHours} h`;
    } else if (diffDays < 7) {
        return `Il y a ${diffDays} j`;
    } else {
        return date.toLocaleDateString('fr-FR');
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Définir la couleur selon le type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    toast.textContent = message;
    toast.style.backgroundColor = colors[type] || colors.info;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        // Ici, vous pourriez rediriger vers une page de login
        showToast('Déconnexion réussie', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}

function showNotifications() {
    showToast('Aucune nouvelle notification', 'info');
}

function performGlobalSearch(term) {
    if (term.length < 2) return;
    
    // Rechercher dans toutes les données
    const results = {
        personnel: AppData.personnel.filter(emp => 
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term.toLowerCase()) ||
            emp.email.toLowerCase().includes(term.toLowerCase()) ||
            emp.department.toLowerCase().includes(term.toLowerCase())
        ),
        salaries: AppData.salaries.filter(sal => 
            sal.employeeName.toLowerCase().includes(term.toLowerCase())
        ),
        leaves: AppData.leaves.filter(leave => 
            leave.employeeName.toLowerCase().includes(term.toLowerCase())
        ),
        absences: AppData.absences.filter(abs => 
            abs.employeeName.toLowerCase().includes(term.toLowerCase())
        )
    };
    
    // Afficher les résultats dans une modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = `Résultats de recherche: "${term}"`;
    
    let content = '<div class="search-results">';
    
    if (results.personnel.length > 0) {
        content += '<h4><i class="fas fa-users"></i> Personnel</h4>';
        results.personnel.forEach(emp => {
            content += `<p>${emp.firstName} ${emp.lastName} - ${emp.department} - ${emp.position}</p>`;
        });
    }
    
    if (results.salaries.length > 0) {
        content += '<h4><i class="fas fa-euro-sign"></i> Salaires</h4>';
        results.salaries.forEach(sal => {
            content += `<p>${sal.employeeName} - ${sal.month} - ${sal.netSalary} €</p>`;
        });
    }
    
    if (results.leaves.length > 0) {
        content += '<h4><i class="fas fa-umbrella-beach"></i> Congés</h4>';
        results.leaves.forEach(leave => {
            content += `<p>${leave.employeeName} - ${leave.type} - ${leave.status}</p>`;
        });
    }
    
    if (results.absences.length > 0) {
        content += '<h4><i class="fas fa-calendar-times"></i> Absences</h4>';
        results.absences.forEach(abs => {
            content += `<p>${abs.employeeName} - ${abs.type} - ${abs.date}</p>`;
        });
    }
    
    if (Object.values(results).every(arr => arr.length === 0)) {
        content += '<p class="no-results">Aucun résultat trouvé.</p>';
    }
    
    content += '</div>';
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function handleQuickAction(action) {
    switch(action) {
        case 'add-employee':
            showAddEmployeeModal();
            break;
        case 'add-salary':
            showAddSalaryModal();
            break;
        case 'request-leave':
            showRequestLeaveModal();
            break;
        case 'generate-report':
            generateReport();
            break;
    }
}

// ============================================
// EXPORT GLOBAL (pour le débogage)
// ============================================

window.AppData = AppData;
window.AppConfig = AppConfig;