const db = require('../models')
// const { validationResult } = require('express-validator')
const aws = require('../services/aws')

const { Organization } = db

const organizationController = {
	// update: async (req, res) => {
	// 	const id = req.params.id
	// 	const { name, content, categoryId } = req.body

	// 	const entrie = await db.Entries.findByPk(id)
	// 	if (!entrie) return res.status(404).send({ error: 'Not found' })

	// 	const errors = validationResult(req)

	// 	if (!errors.isEmpty()) {
	// 		let errorMessages = ''

	// 		errors.array().map((error) => {
	// 			errorMessages += error.msg + '. '
	// 		})

	// 		return res.status(400).send(errorMessages)
	// 	}

	// 	const news = {
	// 		name,
	// 		content,
	// 		categoryId
	// 	}

	// 	if (req.files?.image) {
	// 		const { image } = req.files

	// 		//upload new image to S3
	// 		const imageUrl = await aws.uploadFile(image.name, image.data)

	// 		news.image = imageUrl
	// 	}

	// 	db.Entries.update(news,
	// 		{
	// 			where: { id },
	// 		}
	// 	)
	// 		.then((confirm) => {
	// 			let answer
	// 			if (confirm) {
	// 				answer = {
	// 					meta: {
	// 						status: 200,
	// 						total: confirm.length,
	// 						url: `/news/${id}`,
	// 					},
	// 					data: confirm,
	// 				}
	// 			} else {
	// 				answer = {
	// 					meta: {
	// 						status: 204,
	// 						total: confirm.length,
	// 						url: `/news/${id}`,
	// 					},
	// 					data: confirm,
	// 				}
	// 			}
	// 			res.json(answer)
	// 		})
	// 		.catch((error) => res.send(error))
	// },
	get: async (req, res) => {
		try {
			const organization = await Organization.findOne({
				where: {
					id: 1,
				},
				attributes: ['name', 'image', 'phone', 'address', 'welcomeText', 'socialLinks'],
			})
			return res.status(200).send(organization)
		} catch (error) {
			return res.status(400).send(error.message)
		}
	},
	update: async (req, res) => {
		const { name, phone, address, welcomeText, socialLinks } = req.body

		const organization = {
			name,
			phone,
			address,
			welcomeText,
			socialLinks
		}

		if (req.files?.image) {
		const { image } = req.files
		
		//upload new image to S3
			const imageUrl = await aws.uploadFile(image.name, image.data)
			organization.image = imageUrl
		}

		try {
			const update = await Organization.update(organization, {
				where: {
				  id: 1
				}
			})

			if (update) {
				const organization = await Organization.findOne({
					where: {
						id: 1,
					},
					attributes: ['name', 'image', 'phone', 'address', 'welcomeText', 'socialLinks'],
				})
				return res.status(200).send(organization)
			}

			return res.status(401).send('Problem updating organization')
		} catch (error) {
			return res.status(400).send(error.message)
		}
	}
}

module.exports = organizationController
