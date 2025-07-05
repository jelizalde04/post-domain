const express = require("express");
const router = express.Router();
const { getAllPostsByPet } = require("../controllers/postController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /posts/pet/{petId}:
 *   get:
 *     summary: Obtener todas las publicaciones asociadas a una mascota
 *     description: Permite a un responsable obtener todas las publicaciones asociadas a su mascota, verificando que el usuario es el responsable de la mascota.
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota cuyas publicaciones se desean obtener
 *     responses:
 *       200:
 *         description: Detalles de las publicaciones obtenidos correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes permiso para ver las publicaciones de esta mascota
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:petId", authenticateToken, getAllPostsByPet);  // Usamos GET para obtener todas las publicaciones de una mascota
module.exports = router;
