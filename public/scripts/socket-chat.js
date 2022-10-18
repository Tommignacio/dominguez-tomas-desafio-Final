// const formMessage = document.getElementById("form-message");

const socket = io.connect();

const createMessage = message => {
  const typeClass = message.author._id == localStorage.getItem("idUser") ? "flex-end" : "flex-start";
  return `
    <li style="display: flex; padding: 1rem; justify-content: ${typeClass}">
      <div class="message__container message__type-${message.type}" style="width: calc(100% - 10rem);">
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

console.log("1");
if(formMessage) {
  console.log("2");
  formMessage.addEventListener("submit", e => {
    e.preventDefault();
    socket.emit("user:new-message", inputMessage.value);
    formMessage.reset();
  });
}

socket.on("server:idUser", idUser => localStorage.setItem("idUser", idUser))
socket.on("chat:render-all-messages", messages =>  normalizeMessages(messages));
socket.on("chat:render-new-message", message => renderOneMessage(message));