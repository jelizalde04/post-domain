const express = require("express");
const router = express.Router();
const { updatePostProfile } = require("../controllers/PostController");
const authenticateToken = require("../middlewares/auth");
const multer = require('multer');  

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); 

/**
 * @swagger
 * /posts/update/{postId}:
 *   put:
 *     summary: Editar una publicación asociada a una mascota
 *     description: Permite a un responsable editar una publicación asociada a su mascota, incluyendo la opción de actualizar la imagen.
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la publicación a editar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - image
 *             properties:
 *               content:
 *                 type: string
 *                 description: Texto de la publicación
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de la publicación
 *     responses:
 *       200:
 *         description: Publicación editada correctamente.
 *       400:
 *         description: Error de validación, campos incorrectos o datos faltantes.
 *       401:
 *         description: Token no proporcionado o inválido.
 *       403:
 *         description: No tienes permiso para editar esta publicación.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

router.put("/:postId", authenticateToken, upload, updatePostProfile); 
module.exports = router;
