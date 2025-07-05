const express = require("express");
const router = express.Router();
const { getPostById } = require("../controllers/PostController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /posts/getId/{postId}:
 *   get:
 *     summary: Obtener una publicación específica
 *     description: Permite a un responsable obtener los detalles de una publicación asociada a su mascota, verificando que el usuario es el responsable de la mascota.
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la publicación a obtener
 *     responses:
 *       200:
 *         description: Detalles de la publicación obtenidos correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes permiso para ver esta publicación
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:postId", authenticateToken, getPostById);  
module.exports = router;
