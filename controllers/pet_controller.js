import Pet from "../models/pet_model.js"

export const getPets = async (req, res) => {
    try {
        //console.log("Entrou na função getPets");
        const pets = await Pet.findAll();
        res.send(pets);
    } catch (e) {
        console.log("Erro ao acessar a tabela Pet", e);
    }
}

export const createPet = async (req, res) => {
    try {
        const { altura_pet } = req.body;
        let altura_categoria;

        if (altura_pet <= 15) {
            altura_categoria = 'PEQUENO';
        } else if (altura_pet > 15 && altura_pet < 45) {
            altura_categoria = 'MEDIO';
        } else {
            altura_categoria = 'ALTO';
        }

        // Adiciona a altura_categoria ao corpo da requisição
        req.body.altura_categoria = altura_categoria;

        await Pet.create(req.body);

        res.json({
            "message": "Um novo registro de pet foi inserido"
        });
    } catch (e) {
        console.log("Erro ao inserir um novo registro", e);
        res.status(500).json({
            "error": "Erro interno do servidor"
        });
    }
}



export const updatePet = async (req, res) => {
    try {
        await Pet.update(req.body,{
            where: {
                codigo_pet: req.params.codigo_pet
            }
        })
        res.json({
            "message":"O pet " + req.params.codigo_pet +  " foi atualizado"
        })
    } catch (e) {
        console.log("Erro ao atualizar registro pet!")

    }
}

export const deletePet = async (req, res) => {
    try {
        await Pet.destroy({
            where: {
                codigo_pet: req.params.codigo_pet
            }
        })
        res.json({
            "message":"O pet " + req.params.codigo_pet +  " foi excluído"
        })
    } catch (e) {
        console.log("Erro ao excluir registro pet!")

    }
}

export const getPetsByAlturaCategoria = async (req, res) => {
    try {
        const { altura_categoria } = req.params;

        // Método findAll do controller Pet para buscar pets pela altura_categoria
        const pets = await Pet.findAll({
            where: {
                altura_categoria: altura_categoria.toLowerCase()
            }
        });

        res.send(pets);
    } catch (e) {
        console.log("Erro ao buscar pets por altura_categoria", e);
        res.status(500).json({
            "error": "Erro interno do servidor"
        });
    }
}