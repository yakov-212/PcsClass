// console.log('js works');

const socketIo = io();

const messages = document.querySelector('#messages');
socketIo.on('msg', msg => {
  messages.innerHTML += `<div>${msg}</div>`;
});

const messageInput = document.querySelector('#messageInput');

document.querySelector('#messageForm').addEventListener('submit', e => {
  e.preventDefault();
  socketIo.emit('msg', messageInput.value);
});
