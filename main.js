// ========== ÉTAT GLOBAL ET DONNÉES SIMULÉES ==========
let currentUser = null;
const users = [
    { username: "admin", password: "admin123", role: "agent", name: "M. Martin Responsable" },
    { username: "employe", password: "employe123", role: "employe", name: "Mme Sophie Enseignante" }
];

let employees = [
    { id: 1, nom: "Dupont", prenom: "Jean", email: "j.dupont@universite.fr", role: "Enseignant", grade: "Professeur", dateEmbauche: "2018-09-01" },
    { id: 2, nom: "Martin", prenom: "Marie", email: "m.martin@universite.fr", role: "Administratif", grade: "Cadre", dateEmbauche: "2020-03-15" },
    { id: 3, nom: "Bernard", prenom: "Pierre", email: "p.bernard@universite.fr", role: "Technique", grade: "Technicien", dateEmbauche: "2021-11-10" }
];

let leaveRequests = [
    { id: 1, employeeId: 1, employeeName: "Jean Dupont", type: "Congés payés", startDate: "2024-06-10", endDate: "2024-06-14", days: 5, balance: 20, status: "En attente", requestDate: "2024-05-15" },
    { id: 2, employeeId: 2, employeeName: "Marie Martin", type: "RTT", startDate: "2024-06-05", endDate: "2024-06-06", days: 2, balance: 12, status: "En attente", requestDate: "2024-05-10" }
];

let myLeaveRequests = [
    { id: 101, type: "Congés payés", startDate: "2024-05-01", endDate: "2024-05-05", days: 5, status: "Validé", requestDate: "2024-04-15" },
    { id: 102, type: "Maladie", startDate: "2024-04-10", endDate: "2024-04-11", days: 2, status: "Validé", requestDate: "2024-04-05" },
    { id: 103, type: "RTT", startDate: "2024-06-20", endDate: "2024-06-21", days: 2, status: "En attente", requestDate: "2024-05-20" }
];

// ========== GESTION DE L'AUTHENTIFICATION ==========
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Vérification des identifiants
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user && user.role === role) {
        currentUser = user;
        
        // Masquer la page de connexion
        document.getElementById('loginPage').classList.add('hidden');
        
        // Afficher le tableau de bord approprié
        if (role === 'agent') {
            document.getElementById('agentDashboard').classList.remove('hidden');
            document.getElementById('agentName').textContent = user.name;
            loadAgentData();
        } else if (role === 'employe') {
            document.getElementById('employeeDashboard').classList.remove('hidden');
            document.getElementById('employeeName').textContent = user.name;
            loadEmployeeData();
        }
        
        // Réinitialiser le formulaire
        this.reset();
    } else {
        alert('Identifiants incorrects ou rôle ne correspond pas. Utilisez les identifiants de démo.');
    }
});

// Déconnexion
document.getElementById('logoutBtn')?.addEventListener('click', logout);
document.getElementById('logoutBtnEmployee')?.addEventListener('click', logout);

function logout() {
    currentUser = null;
    // Masquer tous les tableaux de bord
    document.querySelectorAll('.dashboard').forEach(dash => dash.classList.add('hidden'));
    // Afficher la page de connexion
    document.getElementById('loginPage').classList.remove('hidden');
}

// ========== FONCTIONS POUR AGENT ADMINISTRATIF ==========
function loadAgentData() {
    loadEmployeeTable();
    loadLeaveRequestsTable();
}

// Gestion des onglets
function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll('.tab-pane');
    tabcontent.forEach(tab => tab.classList.remove('active'));
    
    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach(link => link.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Charger le tableau des employés
function loadEmployeeTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    
    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.nom}</td>
            <td>${emp.prenom}</td>
            <td>${emp.email}</td>
            <td><span class="badge">${emp.role}</span></td>
            <td>${emp.grade}</td>
            <td>${formatDate(emp.dateEmbauche)}</td>
            <td>
                <button class="btn-action btn-edit" onclick="editEmployee(${emp.id})"><i class="fas fa-edit"></i> Modifier</button>
                <button class="btn-action btn-delete" onclick="deleteEmployee(${emp.id})"><i class="fas fa-trash"></i> Supprimer</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Charger les demandes de congés
function loadLeaveRequestsTable() {
    const tbody = document.querySelector('#leaveRequestsTable tbody');
    tbody.innerHTML = '';
    
    leaveRequests.forEach(req => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${req.employeeName}</td>
            <td>${req.type}</td>
            <td>${formatDate(req.startDate)}</td>
            <td>${formatDate(req.endDate)}</td>
            <td>${req.days} jours</td>
            <td>${req.balance} jours</td>
            <td>
                <button class="btn-action btn-validate" onclick="validateLeave(${req.id})"><i class="fas fa-check"></i> Valider</button>
                <button class="btn-action btn-reject" onclick="rejectLeave(${req.id})"><i class="fas fa-times"></i> Refuser</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterLeaves() {
    const input = document.getElementById('searchLeave').value.toLowerCase();
    const rows = document.querySelectorAll('#leaveRequestsTable tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        row.style.display = name.includes(input) ? '' : 'none';
    });
}

// Actions sur les congés
function validateLeave(leaveId) {
    const request = leaveRequests.find(req => req.id === leaveId);
    if (request) {
        request.status = "Validé";
        alert(`Congé de ${request.employeeName} validé avec succès.`);
        loadLeaveRequestsTable();
    }
}

function rejectLeave(leaveId) {
    const request = leaveRequests.find(req => req.id === leaveId);
    if (request) {
        request.status = "Refusé";
        alert(`Congé de ${request.employeeName} refusé.`);
        loadLeaveRequestsTable();
    }
}

// Gestion des employés
function deleteEmployee(employeeId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        employees = employees.filter(emp => emp.id !== employeeId);
        loadEmployeeTable();
        alert('Employé supprimé avec succès.');
    }
}

function editEmployee(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        alert(`Édition de l'employé: ${employee.prenom} ${employee.nom}\nFonctionnalité à implémenter complètement.`);
        // Ouvrir une modale avec le formulaire pré-rempli
    }
}

// ========== FONCTIONS POUR EMPLOYÉ ==========
function loadEmployeeData() {
    loadMyLeaveRequests();
}

// Onglets employé
function openEmployeeTab(tabName) {
    const tabs = document.querySelectorAll('.emp-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.sidebar-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Charger les demandes de congés de l'employé
function loadMyLeaveRequests() {
    const tbody = document.querySelector('#myLeaveRequests tbody');
    tbody.innerHTML = '';
    
    myLeaveRequests.forEach(req => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${req.type}</td>
            <td>Du ${formatDate(req.startDate)} au ${formatDate(req.endDate)}</td>
            <td>${req.days} jours</td>
            <td><span class="status-badge status-${req.status.replace(' ', '').toLowerCase()}">${req.status}</span></td>
            <td>${formatDate(req.requestDate)}</td>
            <td>
                ${req.status === 'En attente' ? 
                `<button class="btn-action btn-edit" onclick="cancelMyLeave(${req.id})"><i class="fas fa-times"></i> Annuler</button>` : 
                `<button class="btn-action" onclick="viewLeaveDetails(${req.id})"><i class="fas fa-eye"></i> Détails</button>`}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function cancelMyLeave(leaveId) {
    if (confirm('Voulez-vous vraiment annuler cette demande de congé ?')) {
        myLeaveRequests = myLeaveRequests.filter(req => req.id !== leaveId);
        loadMyLeaveRequests();
        alert('Demande de congé annulée.');
    }
}

function viewLeaveDetails(leaveId) {
    const request = myLeaveRequests.find(req => req.id === leaveId);
    if (request) {
        alert(`Détails du congé:\nType: ${request.type}\nPériode: ${formatDate(request.startDate)} au ${formatDate(request.endDate)}\nStatut: ${request.status}`);
    }
}

// ========== GESTION DES MODALES ==========
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Fermer la modale en cliquant à l'extérieur
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
};

// ========== FONCTIONS UTILITAIRES ==========
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Remplir quelques données par défaut
    loadEmployeeTable();
    loadLeaveRequestsTable();
    loadMyLeaveRequests();
    
    // Exemple de formulaire d'ajout d'employé (simplifié)
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.innerHTML = `
            <div class="input-group">
                <label for="newNom">Nom</label>
                <input type="text" id="newNom" required>
            </div>
            <div class="input-group">
                <label for="newPrenom">Prénom</label>
                <input type="text" id="newPrenom" required>
            </div>
            <div class="input-group">
                <label for="newEmail">Email</label>
                <input type="email" id="newEmail" required>
            </div>
            <div class="input-group">
                <label for="newRole">Rôle</label>
                <select id="newRole" required>
                    <option value="Enseignant">Enseignant</option>
                    <option value="Administratif">Personnel Administratif</option>
                    <option value="Technique">Personnel Technique</option>
                </select>
            </div>
            <button type="submit" class="btn-login">Ajouter l'employé</button>
        `;
        
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
            
            const newEmployee = {
                id: newId,
                nom: document.getElementById('newNom').value,
                prenom: document.getElementById('newPrenom').value,
                email: document.getElementById('newEmail').value,
                role: document.getElementById('newRole').value,
                grade: document.getElementById('newRole').value === 'Enseignant' ? 'Maître de conférences' : 'Agent',
                dateEmbauche: new Date().toISOString().split('T')[0]
            };
            
            employees.push(newEmployee);
            loadEmployeeTable();
            closeModal('addUserModal');
            alert('Employé ajouté avec succès !');
            this.reset();
        });
    }
    
    // Formulaire de demande de congé
    const requestLeaveForm = document.getElementById('requestLeaveForm');
    if (requestLeaveForm) {
        requestLeaveForm.innerHTML = `
            <div class="input-group">
                <label for="leaveType">Type de congé</label>
                <select id="leaveType" required>
                    <option value="Congés payés">Congés payés</option>
                    <option value="RTT">RTT</option>
                    <option value="Maladie">Maladie</option>
                    <option value="Formation">Formation</option>
                </select>
            </div>
            <div class="input-group">
                <label for="leaveStart">Date de début</label>
                <input type="date" id="leaveStart" required>
            </div>
            <div class="input-group">
                <label for="leaveEnd">Date de fin</label>
                <input type="date" id="leaveEnd" required>
            </div>
            <div class="input-group">
                <label for="leaveReason">Motif (optionnel)</label>
                <textarea id="leaveReason" rows="3" placeholder="Précisez la raison de votre demande..."></textarea>
            </div>
            <button type="submit" class="btn-login">Soumettre la demande</button>
        `;
        
        // Définir la date minimale (aujourd'hui)
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('leaveStart').min = today;
        document.getElementById('leaveEnd').min = today;
        
        requestLeaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const startDate = document.getElementById('leaveStart').value;
            const endDate = document.getElementById('leaveEnd').value;
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            // Calcul du nombre de jours
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            const newRequest = {
                id: myLeaveRequests.length > 0 ? Math.max(...myLeaveRequests.map(r => r.id)) + 1 : 1001,
                type: document.getElementById('leaveType').value,
                startDate: startDate,
                endDate: endDate,
                days: diffDays,
                status: "En attente",
                requestDate: new Date().toISOString().split('T')[0]
            };
            
            myLeaveRequests.push(newRequest);
            loadMyLeaveRequests();
            closeModal('requestLeaveModal');
            alert(`Demande de congé soumise pour ${diffDays} jours. En attente de validation.`);
            this.reset();
        });
    }
});

// ========== FONCTIONNALITÉS AVANCÉES (ÉBAUCHES) ==========
// Ces fonctions seraient à compléter avec un backend réel
function calculateSalaries() {
    alert("Fonction de calcul automatique des salaires à implémenter avec le backend.\nInclurait: salaire de base, primes, indemnités, retenues.");
}

function generatePaySlip(employeeId, period) {
    alert(`Génération du bulletin pour l'employé ${employeeId} - ${period}\nÀ connecter avec un générateur PDF côté serveur.`);
}

function exportData(format) {
    alert(`Export des données en ${format} à implémenter.\nCSV pour les congés, PDF pour les bulletins.`);
}