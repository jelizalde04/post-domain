const axios = require('axios');
const Post = require('../models/Post');
const Pet = require('../models/Pet');
require("dotenv").config();


const deletePostImageFromS3 = async (imageUrl) => {
  const fileName = imageUrl.split('/').pop();  
  const deleteUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/post/${fileName}`;

  try {
    const response = await axios.delete(deleteUrl);

    
    if (response.status === 204) {
      console.log('Imagen eliminada correctamente de S3');
    } else {
      throw new Error('Error al eliminar la imagen de S3');
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de S3:', error);
    throw new Error('Error al eliminar la imagen de S3');
  }
};

const deletePost = async (postId, responsibleId) => {
  
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw new Error("Publicación no encontrada.");
  }


  const pet = await Pet.findOne({ where: { id: post.petId } });
  if (pet.responsibleId !== responsibleId) {
    throw new Error("El token no corresponde al responsable de esta publicación.");
  }

  
  if (post.image) {
    await deletePostImageFromS3(post.image);
  }

  
  await post.destroy();

  return post;
};

module.exports = { deletePost, deletePostImageFromS3 };
