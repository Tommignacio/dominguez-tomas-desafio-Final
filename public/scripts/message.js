/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity("author", {}, { idAttribute: "id" });

// Definimos un esquema de mensaje
const schemaMessage = new normalizr.schema.Entity("post", { author: schemaAuthor }, { idAttribute: "_id" });

// Definimos un esquema de posts
const schemaMessages = new normalizr.schema.Entity("posts", { mensajes: [schemaMessage] }, { idAttribute: "id" });
/* ----------------------------------------------------------------------------- */

// const owner = document.getElementById("owner");
const inputMessage = document.getElementById("input-message");
const inputSubmit = document.getElementById("btn-message");
const formMessage = document.getElementById("form-message");
const bodyMessage = document.getElementById("render-message");
const toggleMessage = document.getElementById("toggle-message");
const windowMessage = document.querySelector(".aside__message");

const reloadScrollMessage = () => setTimeout(() => { bodyMessage.scrollTop = bodyMessage.scrollHeight; }, 50);
const normalizeMessages = messagesN => {
  const messagesD = normalizr.denormalize(
    messagesN.result,
    schemaMessages,
    messagesN.entities
  );
  const html = renderAllMessages(messagesD.mensajes);
  if(bodyMessage) bodyMessage.innerHTML = html;
  reloadScrollMessage();
}