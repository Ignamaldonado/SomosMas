const db = require('../models')
const { validationResult } = require('express-validator')
const aws = require('../services/aws')

const newsController = {
	update: async (req, res) => {
		const id = req.params.id
		const { name, content, categoryId } = req.body

		const entrie = await db.Entries.findByPk(id)
		if (!entrie) return res.status(404).send({ error: 'Not found' })

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			let errorMessages = ''

			errors.array().map((error) => {
				errorMessages += error.msg + '. '
			})

			return res.status(400).send(errorMessages)
		}

		const news = {
			name,
			content,
			categoryId
		}

		if (req.files?.image) {
			const { image } = req.files

			//upload new image to S3
			const imageUrl = await aws.uploadFile(image.name, image.data)

			news.image = imageUrl
		}

		db.Entries.update(news,
			{
				where: { id },
			}
		)
			.then((confirm) => {
				let answer
				if (confirm) {
					answer = {
						meta: {
							status: 200,
							total: confirm.length,
							url: `/news/${id}`,
						},
						data: confirm,
					}
				} else {
					answer = {
						meta: {
							status: 204,
							total: confirm.length,
							url: `/news/${id}`,
						},
						data: confirm,
					}
				}
				res.json(answer)
			})
			.catch((error) => res.send(error))
	},
	destroy: async (req, res) => {
		const { id } = req.params
		try {
			const entrie = await db.Entries.findByPk(id)
			if (!entrie) return res.status(404).send({ error: 'Not found' })
			const deleteEntry = await db.Entries.destroy({
				where: {
					id: id,
				},
			})
			res.status(200).send({
				status: 'succes',
				message: `Entry with id ${id} deleted`,
			})
		} catch (error) {
			res.send(error)
		}
	},

	// find news by id.
	findNewsId: async (req, res) => {
		const { id } = req.params
		const entriesId = await db.Entries.findOne({ where: { id: id } })

		if (entriesId == null) {
			return res.status(404).json('El id no existe')
		}
		return res.status(200).json(entriesId)
	},
	add: async (req, res) => {
		//Check if there is any error
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			let errorMessages = ''

			//List of errors
			errors.array().map((error) => {
				errorMessages += error.msg + '. '
			})

			return res.status(401).send(errorMessages)
		}

		//Else Save in db
		const { name, content, categoryId } = req.body
		const { image } = req.files

		//First, upload image to S3
		const imageUrl = await aws.uploadFile(image.name, image.data)

		const entryObj = {
			name,
			content,
			image: imageUrl,
			categoryId,
			type: 'news',
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		const newEntry = new db.Entries(entryObj)
		return res.json(await newEntry.save())
	},
	getNews: async (req, res) => {
		try {
			const news = await db.Entries.findAll({
				where: {
					type: 'news',
				},
				attributes: ['id', 'name', 'image', 'content', 'categoryId', 'createdAt'],
			})
			res.status(200).send(news)
		} catch (error) {
			res.status(400).send(error.message)
		}
	},
}

module.exports = newsController
