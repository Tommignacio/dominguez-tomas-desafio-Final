const socket = io.connect();

const createMessage = message => {
  const typeClass = message.type == "sistema" ? "flex-start" : "flex-end";
  return `
    <li style="display: flex; padding: 1rem; justify-content: ${typeClass}">
      <div class="message__container message__type-${message.type}">
        <p>${message.nickname}</b>
        <p>${message.message} ${message.route ? `<a href="${message.route.path}">${message.route.name}</a>` : ""}</p>
        <p>${new Date(message.updatedAt).toLocaleString()}</p> 
      </div>
    </li>
  `;
}
const renderAllMessages = messages => messages.map(message => createMessage(message._doc)).join(" ");
const renderOneMessage = message => {
  bodyMessage.innerHTML += createMessage(message);
  reloadScrollMessage();
}

formMessage.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("client:new-message", inputMessage.value);
  formMessage.reset();
});
toggleMessage.addEventListener("click", () => {
  windowMessage.classList.toggle("message-open");
  if(windowMessage.classList.contains("message-open")) {
    socket.emit("client:request-help");
  }
});

socket.on("server:all-messages", messages => normalizeMessages(messages));
socket.on("server:offer-help", message => renderOneMessage(message));
socket.on("server:render-message", message => renderOneMessage(message));