const { getPostsByPet } = require('../services/PostService');


const getAllPostsByPet = async (req, res) => {
  try {
    const { petId } = req.params; 
    const token = req.headers.authorization?.split(' ')[1];  

    if (!token) {
      return res.status(403).json({
        error: "Token no proporcionado o inválido.",
        code: "AUTH_TOKEN_MISSING"
      });
    }


    const posts = await getPostsByPet(petId, req.user.userId);


    res.status(200).json(posts);
  } catch (error) {

    if (error.message === "Mascota no encontrada.") {
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
      error: error.message || "Error inesperado",
      code: "SERVER_ERROR"
    });
  }
};

module.exports = { getAllPostsByPet };
