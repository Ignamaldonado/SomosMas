const db = require("../models");
const { validationResult } = require("express-validator");
const aws = require('../services/aws')

const activitiesControllers = {
  add: async (req, res) => {
    //Check if there is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    //Else save in db
    const { name, content } = req.body;
    const { image } = req.files

    //First, upload image to S3
		const imageUrl = await aws.uploadFile(image.name, image.data)

    const entryObj = {
      name,
      image: imageUrl,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newEntry = new db.Activities(entryObj);
    return res.json(await newEntry.save());
  },
//update activities
  upActivities : async (req, res) => {
    const { id } = req.params; 
    const { name, content } = req.body;

    const activities = {
      name,
      content
    }

    if (req.files?.image) {
      const { image } = req.files
      
      //upload new image to S3
		  const imageUrl = await aws.uploadFile(image.name, image.data)

      activities.image = imageUrl
    }

        await db.Activities.update(activities, {where: { id: id}})
        .then((response) => { 
          if (response[0] == 0) {          
            return res.status(404).json('La actividad no existe');
          }
          return res.status(200).json(activities);
        })
        .catch((err) =>{
          return res.status(500).json(err);
        })

  },
  getActivities: ( req, res ) => {
    db.Activities.findAll()
      .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json(error))
  },
  detail: (req,res) => {
    const id = req.params.id;
    db.Activities.findOne({where: { id }})    
    .then((data) => { 
      if (data == null ) {          
        return res.status(404).json('La actividad no existe');
      }
      return res.status(200).json(data)
   })    
      .catch(error => res.send(error))
  },
  destroy: async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await db.Activities.destroy({ where: { id } })

        if (deleted) {
            res.status(200).json({success: 'Actividad eliminada'})
        } else {
            res.status(404).json({ error: 'Actividad inexistente' })
        }
    } catch (error) {
        res.status(503).json(error)
    }
  }
};

module.exports = activitiesControllers;