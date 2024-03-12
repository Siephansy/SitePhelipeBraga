const projectId = "seu-project-id";
const keyFilename = "caminho/para/arquivo-de-credenciais.json";

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket("seu-bucket-name");

const file = bucket.file("nome-do-arquivo.ext");

const formData = new FormData();
formData.append("file", file);

fetch("/upload", {
  method: "POST",
  body: formData,
})
.then((response) => {
  // Exibe feedback ao usuário sobre o status do upload
})
.catch((error) => {
  // Trata erros durante o upload
});