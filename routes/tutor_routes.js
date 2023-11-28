import express from 'express';
import { getTutores, createTutor, updateTutor, deleteTutor, getPetsByTutor } from '../controllers/tutor_controller.js';

const router = express.Router();

router.get('/tutores', getTutores);
router.post('/tutor', createTutor);
router.put('/tutor/:codigo_tutor', updateTutor);
router.delete('/tutor/:codigo_tutor', deleteTutor);
router.get('/tutor/:codigo_tutor/pets', getPetsByTutor);

export default router;