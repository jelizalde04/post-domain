const axios = require('axios');
const Post = require('../models/Post');
const Pet = require('../models/Pet');
require("dotenv").config();


const uploadPostImageToS3 = async (file, postId) => {
  if (!file || !file.buffer) {
    throw new Error("El archivo no está disponible para subir.");
  }

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


const createPost = async (postData, petId, responsibleId) => {
  const { content, image } = postData;

  if (!content || !image) {
    throw new Error("Los campos 'content' e 'image' son obligatorios.");
  }

  
  const pet = await Pet.findOne({ where: { id: petId } });
  if (!pet) {
    throw new Error("La mascota no existe.");
  }

  
  if (pet.responsibleId !== responsibleId) {
    throw new Error("El token no corresponde al responsable de esta mascota.");
  }


  const post = await Post.create({
    content,
    petId,
    responsibleId,
  });


  const imageUrl = await uploadPostImageToS3(image, post.id);


  post.image = imageUrl;
  await post.save();

  return post;
};

module.exports = { createPost };
