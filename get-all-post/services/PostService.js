const Post = require('../models/Post');
const Pet = require('../models/Pet');

/**
 * Obtiene todas las publicaciones asociadas a una mascota
 */
const getPostsByPet = async (petId, responsibleId) => {
  // Buscar la mascota en la base de datos usando el petId
  const pet = await Pet.findOne({ where: { id: petId } });
  if (!pet) {
    throw new Error("Mascota no encontrada.");
  }

  // Verificar que el responsable de la mascota coincida con el responsable del token
  if (pet.responsibleId !== responsibleId) {
    throw new Error("El token no corresponde al responsable de esta mascota.");
  }

  // Obtener todas las publicaciones asociadas a la mascota
  const posts = await Post.findAll({ where: { petId } });

  // Si no hay publicaciones, devolver un arreglo vacío
  return posts;
};

module.exports = { getPostsByPet };
