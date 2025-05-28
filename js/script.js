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

  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  });


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
