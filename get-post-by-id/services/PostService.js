const Post = require('../models/Post');
const Pet = require('../models/Pet');


const getPost = async (postId, responsibleId) => {
  
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw new Error("Publicación no encontrada.");
  }

 
  const pet = await Pet.findOne({ where: { id: post.petId } });
  if (pet.responsibleId !== responsibleId) {
    throw new Error("El token no corresponde al responsable de esta publicación.");
  }

 
  return {
    post,
    petDetails: pet
  };
};

module.exports = { getPost };
