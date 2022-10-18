const { normalize, schema } = require("normalizr");

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

// Definimos un esquema de mensaje
const schemaMenssage = new schema.Entity("post", { author: schemaAuthor }, { idAttribute: "id" });

// Definimos un esquema de posts
const schemaMenssages = new schema.Entity("posts", { mensajes: [schemaMenssage] }, { idAttribute: "id" });

const normalizedMessages = messageWithId => normalize({ id: "mensajes", mensajes: messageWithId }, schemaMenssages);

module.exports = { normalizedMessages };