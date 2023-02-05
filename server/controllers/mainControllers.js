const mockDataJson = require('./MOCK_DATA.json')
const mockData = JSON.parse(JSON.stringify(mockDataJson))

const mainControllers = {
    index: (req, res) => {
        res.render('index', { title: 'Express' })
    }
}

module.exports = mainControllers