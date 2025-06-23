const express = require("express");
const router = express.Router();
const { deletePostProfile } = require("../controllers/PostController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /posts/delete/{postId}:
 *   delete:
 *     summary: Eliminar una publicación asociada a una mascota
 *     description: Permite a un responsable eliminar una publicación asociada a su mascota, eliminando también la imagen asociada de S3.
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la publicación a eliminar
 *     responses:
 *       200:
 *         description: Publicación eliminada correctamente
 *       400:
 *         description: Error de validación, publicación no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes permiso para eliminar esta publicación
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:postId", authenticateToken, deletePostProfile); 
module.exports = router;
