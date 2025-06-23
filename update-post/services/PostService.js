const axios = require('axios');
const Post = require('../models/Post');
const Pet = require('../models/Pet');
require("dotenv").config();

/**
 * Sube la imagen de la publicación a S3 y devuelve la URL pública
 * Utiliza el ID de la publicación para generar un nombre único de archivo
 */
const uploadPostImageToS3 = async (file, postId) => {
  if (!file || !file.buffer) {
    throw new Error("El archivo no está disponible para subir.");
  }

  // Usamos el postId para garantizar un nombre único
  const fileName = `${postId}_post_image.jpg`; 
  const uploadUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

  try {
    const response = await axios.put(uploadUrl, file.buffer, {
      headers: {
        'Content-Type': file.mimetype,
      },
    });

    if (response.status === 200) {
      return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`; // URL pública
    }
    throw new Error('Error al subir la imagen a S3');
  } catch (error) {
    console.error('Error al subir la imagen a S3:', error);
    throw new Error('Error al subir la imagen a S3: ' + error.message);
  }
};

/**
 * Elimina una imagen de S3
 * Recibe la URL de la imagen y elimina la imagen correspondiente desde el bucket de S3
 */
const deletePostImageFromS3 = async (imageUrl) => {
  const fileName = imageUrl.split('/').pop();  // Extraemos el nombre del archivo desde la URL
  const deleteUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

  try {
    const response = await axios.delete(deleteUrl);

    // Si la respuesta es exitosa, la imagen se ha eliminado correctamente
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

/**
 * Actualiza una publicación asociada a la mascota.
 * Recibe el contenido de la publicación, el ID de la publicación y el ID del responsable
 */
const updatePost = async (postData, postId, responsibleId) => {
  const { content, image } = postData;

  if (!content || !image) {
    throw new Error("Contenido o imagen faltante.");
  }

  // Buscar la publicación en la base de datos usando el postId
  const post = await Post.findOne({ where: { id: postId } });
  if (!post) {
    throw new Error("Publicación no encontrada.");
  }

  // Verificar que el responsable de la publicación coincida con el responsable del token
  const pet = await Pet.findOne({ where: { id: post.petId } });
  if (pet.responsibleId !== responsibleId) {
    throw new Error("El token no corresponde al responsable de esta publicación.");
  }

  // Si la publicación tiene una imagen, la eliminamos de S3 antes de subir la nueva
  if (post.image) {
    await deletePostImageFromS3(post.image);
  }

  // Subimos la nueva imagen a S3
  const imageUrl = await uploadPostImageToS3(image, post.id);

  // Actualizamos el contenido y la URL de la imagen en la base de datos
  post.content = content;
  post.image = imageUrl;
  await post.save();

  return post;
};

module.exports = { updatePost, uploadPostImageToS3, deletePostImageFromS3 };