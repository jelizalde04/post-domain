const express = require("express");
const router = express.Router();
const { getAllPostsByPet, getAllPostsNoAuth } = require("../controllers/postController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /posts/all:
 *   get:
 *     summary: Obtener todas las publicaciones (público)
 *     description: Obtiene todas las publicaciones sin requerir autenticación.
 *     tags: [posts]
 *     responses:
 *       200:
 *         description: Publicaciones obtenidas correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/all", getAllPostsNoAuth);

/**
 * @swagger
 * /posts/pet/{petId}:
 *   get:
 *     summary: Obtener publicaciones por mascota (protegido)
 *     description: Requiere token. Solo el responsable puede ver las publicaciones de su mascota.
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Publicaciones obtenidas correctamente
 *       403:
 *         description: Token inválido o sin permiso
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/pet/:petId", authenticateToken, getAllPostsByPet);

module.exports = router;
