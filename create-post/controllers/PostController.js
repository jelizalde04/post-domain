const { createPost } = require('../services/PostService');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).single('image'); 


const createPostProfile = async (req, res) => {
  try {
    const { petId } = req.params; 
    const { content } = req.body;  
    const image = req.file;  

    const token = req.headers.authorization?.split(' ')[1];  

 
    if (!token) {
      return res.status(403).json({
        error: "Token no proporcionado o inválido.",
        code: "AUTH_TOKEN_MISSING"
      });
    }

    
    if (!image) {
      return res.status(400).json({
        error: "La imagen es obligatoria.",
        code: "IMAGE_REQUIRED"
      });
    }

   
    const post = await createPost({ content, image }, petId, req.user.userId);

 
    res.status(201).json(post);
  } catch (error) {
   
    if (error.message === "Los campos 'content' e 'image' son obligatorios.") {
      return res.status(400).json({
        error: "Contenido o imagen faltante.",
        code: "VALIDATION_ERROR"
      });
    }

  
    if (error.message === "La mascota no existe.") {
      return res.status(404).json({
        error: "La mascota con el ID proporcionado no fue encontrada.",
        code: "PET_NOT_FOUND"
      });
    }

    if (error.message === "El token no corresponde al responsable de esta mascota.") {
      return res.status(403).json({
        error: "El token no corresponde al responsable de esta mascota.",
        code: "AUTH_INVALID_TOKEN"
      });
    }

  
    res.status(error.status || 500).json({
      error: error.message || "Error interno del servidor.",
      code: "SERVER_ERROR"
    });
  }
};

module.exports = { createPostProfile };
