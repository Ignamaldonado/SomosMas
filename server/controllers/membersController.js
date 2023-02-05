const db = require('../models')
const { validationResult, body } = require("express-validator");

const membersController = {
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            const deleted = await db.Members.destroy({ where: { id } })

            if (deleted) {
                res.status(200).json({success: 'Miembro eliminado'})
            } else {
                res.status(404).json({ error: 'Miembro inexistente' })
            }
        } catch (error) {
            res.status(503).json(error)
        }
    },


    findAllMembers: async (req, res) => {
        try {
          const allMembers = await db.Members.findAll();
          allMembers.length > 0
            ? res.status(200).json(allMembers)
            : res.status(404).send("No se encontraron Registros");
        } catch (error) {
          res.status(503).json(error.message);
        }
    },

    createMember: async (req, res) => {
           
            const { name, image } = req.body; 
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }

            const entryObj = {
              name,
              image            
            };
        
            const newEntry = new db.Members(entryObj);
            return res.status(200).json(await newEntry.save());  
  
  },      
  

    update: async (req, res) => {
        const id = req.params.id;
        let { name, image } = req.body;

        console.log(name)

        const oldData = await db.Members.findByPk(id)

        if(oldData === null) {
            return res.status(404).json({errors: 'Not found'})
        }

        const nameValidation = /^$|^[A-Za-z\s]+$/.test(name)
        const imageValidation = /^$|\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image)

        if(!nameValidation) {
            return res.status(400).json({errors: 'Invalid name'})
        }

        if(!imageValidation) {
            return res.status(400).json({errors: 'Invalid image'})
        }
        

        if (name === '' && image === '') {
            return res.status(400).json({errors: 'Bad request'})
        }
        
        if(name === undefined || image === undefined) {
            return res.status(400).json({errors: 'Bad request'})
        }


        if(name === '') {
            name = oldData.dataValues.name
        }

        if (image === '') {
            image = oldData.dataValues.image
        }


        const member = {
            name,
            image
        }

        try {
            let updated = await db.Members.update(member,
                {
                    where: { id: req.params.id }
                }
            );
            if (updated) {
                res.status(200).json(member)
            } else {
                res.status(400).json({errors: "No se ha podido actualizar la información"})
            };
        }
        catch (error) {
            res.status(503).json(error)
        }
    },
}

    
    

module.exports = membersController
