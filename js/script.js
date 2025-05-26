// Fonction de validation du formulaire de contact
function validerFormulaireContact() {
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    let valid = true;

    // Réinitialiser les messages d'erreur
    document.querySelectorAll('.error-message').forEach(message => message.remove());

    // Vérification du nom
    if (!nom) {
        valid = false;
        afficherErreur('nom', 'Le nom est requis.');
    }

    // Vérification de l'email
    if (!email || !emailRegex.test(email)) {
        valid = false;
        afficherErreur('email', 'Veuillez entrer un email valide.');
    }

    // Vérification du message
    if (!message) {
        valid = false;
        afficherErreur('message', 'Le message est requis.');
    }

    return valid;
}

// Fonction pour afficher l'erreur
function afficherErreur(champ, message) {
    const input = document.getElementById(champ);
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    input.insertAdjacentElement('afterend', errorMessage);
}

// Attacher l'événement de validation au formulaire
document.addEventListener('DOMContentLoaded', () => {
    const formulaireContact = document.querySelector('.contact-form');
    formulaireContact.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher l'envoi du formulaire par défaut

        if (validerFormulaireContact()) {
            // Simuler l'envoi du formulaire (par exemple, avec EmailJS ou une autre solution)
            alert('Votre message a été envoyé !');
            formulaireContact.reset();
        }
    });
});

// Fonction pour afficher les articles dans le panier
function afficherPanier() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    const panierContainer = document.querySelector('.panier-container');
    panierContainer.innerHTML = ''; // Clear the existing items

    if (panier.length === 0) {
        panierContainer.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        panier.forEach((item, index) => {
            const panierItem = document.createElement('div');
            panierItem.classList.add('panier-item');
            panierItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Quantité : ${item.quantity}</p>
                    <span class="price">${item.price} FCFA</span>
                </div>
                <button class="btn btn-suppr" data-index="${index}">Supprimer</button>
            `;
            panierContainer.appendChild(panierItem);
        });

        // Total du panier
        const total = panier.reduce((acc, item) => acc + item.price * item.quantity, 0);
        document.querySelector('.total-section p').innerHTML = `Total : <strong>${total} FCFA</strong>`;
    }
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(item) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    const index = panier.findIndex(p => p.name === item.name);
    if (index === -1) {
        panier.push(item);
    } else {
        panier[index].quantity += item.quantity;
    }
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
}

// Initialisation des événements de suppression dans le panier
document.addEventListener('DOMContentLoaded', () => {
    afficherPanier();

    document.querySelector('.panier-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-suppr')) {
            const index = event.target.getAttribute('data-index');
            supprimerDuPanier(index);
        }
    });
});

// Animation des boutons (ex : au survol)
document.addEventListener('DOMContentLoaded', () => {
    const boutons = document.querySelectorAll('.btn');
    boutons.forEach(bouton => {
        bouton.addEventListener('mouseenter', () => {
            bouton.style.transform = 'scale(1.1)';
            bouton.style.transition = 'transform 0.3s ease';
        });

        bouton.addEventListener('mouseleave', () => {
            bouton.style.transform = 'scale(1)';
        });
    });
});
// Fonction pour afficher les détails de la commande
function afficherCommande() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    const commandeContainer = document.querySelector('.commande-container');
    commandeContainer.innerHTML = ''; // Clear the existing items

    if (panier.length === 0) {
        commandeContainer.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        panier.forEach(item => {
            const panierItem = document.createElement('div');
            panierItem.classList.add('panier-item');
            panierItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Quantité : ${item.quantity}</p>
                    <span class="price">${item.price} FCFA</span>
                </div>
            `;
            commandeContainer.appendChild(panierItem);
        });

        // Total de la commande
        const total = panier.reduce((acc, item) => acc + item.price * item.quantity, 0);
        document.querySelector('.total-commande p').innerHTML = `Total à payer : <strong>${total} FCFA</strong>`;
    }
}

// Fonction pour finaliser la commande
function finaliserCommande() {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    if (panier.length === 0) {
        alert('Votre panier est vide.');
        return;
    }

    // Simuler l'envoi de la commande
    localStorage.removeItem('panier');  // Vider le panier après commande
    alert('Votre commande a été passée avec succès !');
    afficherCommande(); // Actualiser l'interface
}

// Initialisation des événements pour finaliser la commande
document.addEventListener('DOMContentLoaded', () => {
    afficherCommande();

    const btnFinaliser = document.querySelector('.btn-finaliser');
    if (btnFinaliser) {
        btnFinaliser.addEventListener('click', finaliserCommande);
    }
});
// Fonction pour enregistrer l'utilisateur
function enregistrerUtilisateur(email, password) {
    let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExist = utilisateurs.find(user => user.email === email);

    if (utilisateurExist) {
        alert('Cet email est déjà utilisé.');
        return false;
    }

    utilisateurs.push({ email, password });
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    alert('Compte créé avec succès!');
    return true;
}

// Fonction pour se connecter
function seConnecter(email, password) {
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
    const utilisateur = utilisateurs.find(user => user.email === email && user.password === password);

    if (utilisateur) {
        localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
        alert('Connexion réussie!');
        return true;
    } else {
        alert('Email ou mot de passe incorrect.');
        return false;
    }
}

// Fonction pour déconnecter l'utilisateur
function seDeconnecter() {
    localStorage.removeItem('utilisateurConnecte');
    alert('Vous êtes déconnecté.');
}

// Vérification de la connexion de l'utilisateur
function verifierConnexion() {
    const utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    if (utilisateurConnecte) {
        document.querySelector('.user-info').textContent = `Bonjour, ${utilisateurConnecte.email}`;
        document.querySelector('.btn-connexion').style.display = 'none'; // Cacher le bouton de connexion
        document.querySelector('.btn-deconnexion').style.display = 'inline-block'; // Afficher le bouton de déconnexion
    }
}

// Initialisation de la connexion/déconnexion
document.addEventListener('DOMContentLoaded', () => {
    verifierConnexion();

    // Gestion de l'enregistrement et de la connexion
    const formLogin = document.querySelector('.login-form');
    const formSignup = document.querySelector('.signup-form');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            seConnecter(email, password);
        });
    }

    if (formSignup) {
        formSignup.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('new-email').value;
            const password = document.getElementById('new-password').value;
            enregistrerUtilisateur(email, password);
        });
    }

    // Déconnexion de l'utilisateur
    const btnDeconnexion = document.querySelector('.btn-deconnexion');
    if (btnDeconnexion) {
        btnDeconnexion.addEventListener('click', seDeconnecter);
    }
});
 
function showNotification(message) {
  const notif = document.getElementById('notification');
  notif.textContent = message;
  notif.classList.add('show');
  setTimeout(() => {
    notif.classList.remove('show');
  }, 3000);
}
document.getElementById('searchInput').addEventListener('keyup', function () {
  const filter = this.value.toUpperCase();
  const items = document.querySelectorAll('#menuList li');
  items.forEach(item => {
    item.style.display = item.textContent.toUpperCase().includes(filter) ? '' : 'none';
  });
});
