import dbClient from '../utils/db';

/**
 * Recherche un fichier dans la collection 'files' de la base de données.
 * @param {object} data - Les critères de recherche pour le fichier.
 * @returns {Promise<object|null>} Les détails du fichier trouvé, ou null s'il n'est pas trouvé.
 */
const findFiles = async (data) => {
  const files = await dbClient.db.collection('files').findOne(data);
  return files;
};

/**
 * Téléverse un fichier dans la collection 'files' de la base de données.
 * @param {object} data - Les détails du fichier à téléverser.
 * @returns {Promise<object>} Les détails du fichier téléversé.
 */
const uploadFiles = async (data) => {
  // Insérer les détails du fichier dans la collection 'files'
  await dbClient.db.collection('files').insertOne(data);

  // Récupérer et retourner les détails du fichier téléversé
  return dbClient.db.collection('files').findOne(data);
};

// Exporter les fonctions de manipulation de fichiers
export { findFiles, uploadFiles };
