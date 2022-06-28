const socket = io();

// APUNTAR A FORM, INPUTS Y DIV CONTENEDOR:
const form = document.querySelector('#form');
const usernameInput = document.querySelector('#usernameInput');
const messageInput = document.querySelector('#messageInput');
const messagesPool = document.querySelector('#messagesPool');



// FUNCIONES:

const sendMessage = () => {
    try {
        const username = usernameInput.value;
        const message = messageInput.value;

        socket.emit('client:message', {username, message});             // ENVIA LOS DATOS DEL MENSAJE AL SERVER
        console.log({username, message});
    } catch(err) {
        console.log(err);
    }
}   

const renderMessages = messagesArray => {
    try {
        const html = messagesArray.map(messageData => {
            return(
                `
                    <div>
                        <strong>${messageData.username}</strong>
                        <em>${messageData.message}</em>
                    </div>
                `
            )
        }).join(" ");
        document.getElementById('messagesPool').innerHTML = html;
    } catch(err) {
        console.log(err);
    }
}

// EVENTOS:
form.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage();
})

socket.on('server:message', renderMessages);