import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/**
 * Récupère les détails d'un utilisateur à partir d'un token d'authentification.
 * @param {string} token - Le token d'authentification pour identifier l'utilisateur.
 * @returns {Promise<object|null>} Les détails de l'utilisateur trouvé, ou null si l'utilisateur n'est pas trouvé ou le token est invalide.
 */
const getUser = async (token) => {
  // Récupérer l'ID d'utilisateur à partir du cache Redis
  const userId = await redisClient.get(`auth_${token}`);
  
  // Si l'ID d'utilisateur n'est pas trouvé dans le cache, retourner null
  if (!userId) {
    return null;
  }

  // Chercher et retourner les détails de l'utilisateur à partir de la base de données
  const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });

  // Si l'utilisateur n'est pas trouvé dans la base de données, retourner null
  if (!user) {
    return null;
  }

  return user;
};

export default getUser;
