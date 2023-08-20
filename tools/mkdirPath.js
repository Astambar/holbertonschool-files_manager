import fs from 'fs';

/**
 * Enregistre les données fournies dans un fichier spécifié par le nom et le type.
 * @param {string} name - Le nom du fichier à enregistrer.
 * @param {string} data - Les données à enregistrer, encodées en base64 ou UTF-8 selon le type.
 * @param {string} type - Le type de données ('image' ou autre).
 * @returns {Promise<string>} Le chemin complet du fichier enregistré.
 */
export default async (name, data, type) => {
  // Déterminer le chemin de stockage, en utilisant le chemin par défaut ou un chemin spécifié par l'environnement
  const storagePath = process.env.FOLDER_PATH || '/tmp/files_manager';

  // Créer le dossier de stockage si nécessaire
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  // Construire le chemin complet du fichier
  const filePath = `${storagePath}/${name}`;

  // Convertir les données de base64 en buffer
  let bufferData = Buffer.from(data, 'base64');

  // Si le type n'est pas 'image', convertir le buffer en chaîne de caractères UTF-8
  if (type !== 'image') {
    bufferData = bufferData.toString('utf-8');
  }

  // Écrire les données dans le fichier
  fs.writeFile(filePath, bufferData, (err) => {
    if (err) {
      throw err;
    }
  });

  return filePath;
};
