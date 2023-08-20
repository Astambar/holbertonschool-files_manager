const { promisify } = require('util');
const redis = require('redis');

/**
 * Classe représentant un client Redis.
 */
class RedisClient {
  /**
   * Crée une instance du client Redis.
   * Initialise la connexion au client et configure les gestionnaires d'événements.
   */
  constructor() {
    // Création d'une instance du client Redis
    this.client = redis.createClient();

    // Promisification de la méthode 'get' pour permettre l'utilisation de 'async/await'
    this.getAsync = promisify(this.client.get).bind(this.client);

    // Gestionnaire d'erreur en cas de problème de connexion
    this.client.on('error', (error) => {
      console.log(`Le client Redis n'est pas connecté au serveur : ${error}`);
    });
  }

  /**
   * Vérifie si le client Redis est connecté au serveur.
   * @returns {boolean} True si le client est connecté, sinon False.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Récupère la valeur associée à une clé donnée.
   * @param {string} key - La clé à rechercher.
   * @returns {Promise<string|null>} La valeur associée à la clé, ou null si la clé n'existe pas.
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Définit une valeur pour une clé donnée avec une durée d'expiration.
   * @param {string} key - La clé à définir.
   * @param {string} value - La valeur à associer à la clé.
   * @param {number} duration - La durée en secondes avant expiration.
   */
  async set(key, value, duration) {
    // Définition de la valeur pour la clé donnée
    this.client.set(key, value);

    // Configuration de l'expiration de la clé
    this.client.expire(key, duration);
  }

  /**
   * Supprime une clé et sa valeur associée.
   * @param {string} key - La clé à supprimer.
   */
  async del(key) {
    this.client.del(key);
  }
}

// Création d'une instance du client Redis et exportation
const redisClient = new RedisClient();
export default redisClient;
