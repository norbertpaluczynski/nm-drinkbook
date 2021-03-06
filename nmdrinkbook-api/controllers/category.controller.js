import e from 'cors';
import Category from '../models/category.model.js'

export const categoryController = () => {
    const create = (req, res) => {
        // if (!req.body.quantity) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
        var authHeader = req.headers.authorization
        
        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')
        
            if (!is_admin) {
                res.status(401).send()
            } else {
                const category = {
                    name: req.body.name,
                    createdBy: req.createdBy,
                    modifiedBy: req.modifiedBy
                }
            
                Category.create(category)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Unknown error."
                        })
                    });
            }     
        } else {
            res.status(401).send()
        }
    };

    const save = (req ,res) => {
        const id = req.params.id
        req.body.modifiedBy = req.modifiedBy
        var authHeader = req.headers.authorization

        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')
    
            if (!is_admin) {
                res.status(401).send()
            } else {
                Category.update(req.body, {
                    where: { categoryId: id }
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
        } else {
            res.status(401).send()
        }
    }

    const remove = (req, res) => {
        const id = req.params.id
        var authHeader = req.headers.authorization
        
        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')

            if (!is_admin) {
                res.status(401).send()
            } else {
                Category.destroy({
                    where: { categoryId: id }
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
        }
    }

    const findById = (req, res) => {
        const id = req.params.id

        Category.findByPk(id)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    const findAll = (req, res) => {
        Category.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    return { create, save, remove, findById, findAll }
}

export default categoryController