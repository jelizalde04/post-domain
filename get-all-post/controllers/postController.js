const { getPostsByPet, getAllPosts } = require("../services/PostService");

const getAllPostsByPet = async (req, res) => {
  try {
    const { petId } = req.params;

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

    res.status(500).json({
      error: error.message || "Error inesperado",
      code: "SERVER_ERROR"
    });
  }
};

const getAllPostsNoAuth = async (req, res) => {
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No hay publicaciones registradas." });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error inesperado",
      code: "SERVER_ERROR"
    });
  }
};

module.exports = { getAllPostsByPet, getAllPostsNoAuth };
