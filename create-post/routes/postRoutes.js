const express = require("express");
const router = express.Router();
const { createPostProfile } = require("../controllers/PostController");
const authenticateToken = require("../middlewares/auth");
const multer = require('multer');  

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); 

/**
 * @swagger
 * /posts/{petId}:
 *   post:
 *     summary: Crea una publicación para una mascota
 *     description: Crea una nueva publicación asociada a una mascota. El responsable debe ser el mismo que creó la mascota.
 *     tags: [posts]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota para la que se crea la publicación
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
 *       201:
 *         description: Publicación creada exitosamente.
 *       400:
 *         description: Datos de entrada no válidos (imagen o contenido faltante).
 *       403:
 *         description: Acción no autorizada (token no válido o no corresponde al responsable).
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/:petId", authenticateToken, upload, createPostProfile);
module.exports = router;
