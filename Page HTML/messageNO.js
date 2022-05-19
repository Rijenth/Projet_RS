function getMessages(){

    // Requête AJAX pour se connecter au serveur
    const requeteAjax = new XMLHttpRequest();
    requeteAjax.open("GET", "messageNO.php");

    // Afficher les données au format HTML
    requeteAjax.onload = function(){
        const resultat = JSON.parse(requeteAjax.responseText);

        // .reverse pour avoir les nouveaux messages en bas
        const html = resultat.reverse().map(function(message){
            return `<div class="message"><span class="date">${message.created_at.substring(11, 16)}</span> <span class="who_send">${message.who_send}</span></br><span class="send">${message.send}</span></div>`
        }).join("");

        const messages = document.querySelector(".messages");

        messages.innerHTML = html;
        messages.scrollTop = messages.scrollHeight; // Scrollbar reste en bas pour voir les nouveaux messages
    }
    requeteAjax.send()
}

function postMessage(event){
    
    // Stopper l'envoie du formulaire
    event.preventDefault();

    // Récupérer les données du formulaires
    const who_send = document.querySelector("#who_send");
    const send = document.querySelector("#send");
    const who_receive = document.querySelector("#who_receive");

    // Conditionner les données
    const data = new FormData();
    data.append("who_send", who_send.value);
    data.append("send", send.value);
    data.append("who_receive", who_receive.value);

    // Confirmer la requête AJAX POST puis envoyer les données
    const requeteAjax = new XMLHttpRequest();
    requeteAjax.open("POST", "messageNO.php?task=write");

    requeteAjax.onload = function(){
        send.value = ""; //contenue du message vidé
        send.focus(); //pouvoir écrire directement dans message
        getMessages();
    }
    requeteAjax.send(data);
}

document.querySelector("form").addEventListener("submit", postMessage());

// Intervale de rafraichissement

const interval = window.setInterval(getMessages, 3000);

getMessages();