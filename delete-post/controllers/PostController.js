const { deletePost } = require('../services/PostService');


const deletePostProfile = async (req, res) => {
  try {
    const { postId } = req.params;  
    const token = req.headers.authorization?.split(' ')[1];  


    if (!token) {
      return res.status(403).json({
        error: "Token no proporcionado o inválido.",
        code: "AUTH_TOKEN_MISSING"
      });
    }

 
    const post = await deletePost(postId, req.user.userId);


    res.status(200).json({
      message: "Publicación eliminada correctamente",
      post
    });
  } catch (error) {
   
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

module.exports = { deletePostProfile };
