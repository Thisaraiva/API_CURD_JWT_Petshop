import Tutor from "../models/tutor_model.js"
import Pet from "../models/pet_model.js";

export const getTutores = async (req, res) => {
    try {
        //console.log("Entrou na função getTutores");
        const tutores = await Tutor.findAll();
        res.send(tutores);
    } catch (e) {
        console.log("Erro ao acessar a tabela Tutor", e);
    }
}
 

export const createTutor = async (req, res) => {
    try {
        await Tutor.create(req.body)
        res.json({
            "message":"Um novo registro de tutor foi inserido"
        })

    } catch (e) {
        console.log("Erro ao inserir um novo registro", e)

    }
}

export const updateTutor = async (req, res) => {
    try {
        await Tutor.update(req.body,{
            where: {
                codigo_tutor: req.params.codigo_tutor
            }
        })
        res.json({
            "message":"O tutor " + req.params.codigo_tutor +  " foi atualizado"
        })
    } catch (e) {
        console.log("Erro ao atualizar registro tutor!")

    }
}

export const deleteTutor = async (req, res) => {
    try {
        await Tutor.destroy({
            where: {
                codigo_tutor: req.params.codigo_tutor
            }
        })
        res.json({
            "message":"O tutor " + req.params.codigo_tutor +  " foi excluído"
        })
    } catch (e) {
        console.log("Erro ao excluir registro tutor!")

    }
}

export const getPetsByTutor = async (req, res) => {
    const tutorId = req.params.codigo_tutor;

    try {
        const tutor = await Tutor.findByPk(tutorId, {
            include: {
                model: Pet,
                as: 'pets',
            },
        });

        if (!tutor) {
            return res.status(404).json({ error: "Tutor não encontrado" });
        }

        const pets = tutor.pets || [];
        res.json(pets);
    } catch (e) {
        console.log("Erro ao buscar pets do tutor", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};