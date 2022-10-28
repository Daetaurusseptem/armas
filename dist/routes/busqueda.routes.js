"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const { busquedaCtrller, busquedaDocumentoColeccion } = require('../controllers/busqueda');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();
// router.get('/:busqueda', 
//             [
//                 validarJWT
//             ],
//              busquedaDocumentoColeccion
//             )
router.get('/coleccion/:coleccion/:busqueda', [], busquedaDocumentoColeccion);
exports.default = router;
