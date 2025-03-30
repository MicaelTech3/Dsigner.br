// Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDlgIizNtz3lCspNnwOfZrZEN2RU7AFopA",
        authDomain: "dsingebr-v2.firebaseapp.com",
        projectId: "dsingebr-v2",
        storageBucket: "dsingebr-v2.firebasestorage.app",
        messagingSenderId: "621793308986",
        appId: "1:621793308986:web:52b5a8de51261aca1da003"
};

// Inicialização do Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Feedback visual
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = "Autenticando...";
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = 'painel.html';
                })
                .catch(error => {
                    document.getElementById('login-message').textContent = getErrorMessage(error);
                    btn.disabled = false;
                    btn.textContent = originalText;
                });
        });
    }
});

function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/invalid-email': return 'Email inválido';
        case 'auth/user-disabled': return 'Conta desativada';
        case 'auth/user-not-found': return 'Usuário não encontrado';
        case 'auth/wrong-password': return 'Senha incorreta';
        default: return 'Erro ao fazer login';
    }
}