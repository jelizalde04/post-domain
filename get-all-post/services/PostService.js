const Post = require('../models/Post');
const Pet = require('../models/Pet');

/**
 * Obtener publicaciones de una mascota específica (con token)
 */
const getPostsByPet = async (petId, responsibleId) => {
  const pet = await Pet.findOne({ where: { id: petId } });
  if (!pet) throw new Error("Mascota no encontrada.");

  if (pet.responsibleId !== responsibleId) {
    throw new Error("El token no corresponde al responsable de esta mascota.");
  }

  return await Post.findAll({ where: { petId } });
};

/**
 * Obtener todas las publicaciones (sin token)
 */
const getAllPosts = async () => {
  return await Post.findAll();
};

module.exports = { getPostsByPet, getAllPosts };
