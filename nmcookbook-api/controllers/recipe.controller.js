import Recipe from '../models/recipe.model.js'

export const recipeController = () => {
    const create = (req, res) => {
        // if (!req.body.title) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        const recipe = {
            stateId: req.body.stateId,
            title: req.body.title,
            description: req.body.description,
            preparationSteps: req.body.preparationSteps,
            preparationTime: req.body.preparationTime,
            difficultyLevel: req.body.difficultyLevel,
            image: req.body.image,
            createdBy: req.body.createdBy,
            modifiedBy: req.body.modifiedBy
        }
    
        Recipe.create(recipe)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    };

    const createEmpty = (req, res) => {
        const recipe = {
            createdBy: "admin"
        }
    
        Recipe.create(recipe)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    };

    const save = (req ,res) => {
        const id = req.params.id

        Recipe.update(req.body, {
            where: { recipeId: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send(req.body)
                } else {
                    res.status(500).send({
                        message: "error"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "error catch"
                })
            })
    }

    const remove = (req, res) => {
        const id = req.params.id

        Recipe.destroy({
            where: { recipeId: id }
        })
            .then(num => {
                if (num == 1) {
                    res.status(204).send();
                } else {
                    res.send({
                        message: `error`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                message: "error catch"
                });
          });
    }

    return { create, createEmpty, save, remove }
}

export default recipeController