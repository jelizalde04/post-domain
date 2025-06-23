const { updatePost } = require('../services/PostService');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }).single('image');  


const updatePostProfile = async (req, res) => {
  try {
    const { postId } = req.params;  
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


    const post = await updatePost({ content, image }, postId, req.user.userId);


    res.status(200).json(post);
  } catch (error) {
   
    if (error.message === "Contenido o imagen faltante.") {
      return res.status(400).json({
        error: "Contenido o imagen faltante.",
        code: "VALIDATION_ERROR"
      });
    }

   
    if (error.message === "Publicación no encontrada.") {
      return res.status(404).json({
        error: "La publicación con el ID proporcionado no fue encontrada.",
        code: "POST_NOT_FOUND"
      });
    }

   
    if (error.message === "El token no corresponde al responsable de esta publicación.") {
      return res.status(403).json({
        error: "El token no corresponde al responsable de esta publicación.",
        code: "AUTH_INVALID_TOKEN"
      });
    }

  
    res.status(error.status || 500).json({
      error: error.message || "Error inesperado",
      code: "SERVER_ERROR"
    });
  }
};

module.exports = { updatePostProfile };
