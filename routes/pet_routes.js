import express from 'express';
import { getPets, createPet, updatePet, deletePet, getPetsByAlturaCategoria } from '../controllers/pet_controller.js';

const router = express.Router();

router.get('/pets', getPets);
router.post('/pet', createPet);
router.put('/pet/:codigo_pet', updatePet);
router.delete('/pet/:codigo_pet', deletePet);
router.get('/pet/altura/:altura_categoria', getPetsByAlturaCategoria);


export default router;