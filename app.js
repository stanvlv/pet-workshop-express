import express from 'express'
import pets from './helper.js'
import bodyParser from 'body-parser'


const PORT = 3000
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    //    res.send('Main page')
    res.render('index', {title: 'Adopt a pet!',
     firstP: 'Browse through the links below to find your new furry friend:.'})
})

app.get('/animals', (req, res) => {
    res.render('animals', { title: `List of pets`, animals: null})
})

app.get('/animals/:pet_type', (req, res) => {
    const petType = req.params['pet_type']
    res.render('animals', { title: `List of ${petType}`, animals: pets[petType], petType: petType})
})

app.get('/animals/:pet_type/:pet_id', (req, res) => {
    const petType = req.params['pet_type']
    const petId = req.params['pet_id']

    const pet = pets[petType][petId]

    res.render('animal', { animal: pet})
})

app.get('/new_animal', (req, res) => {
    res.render('add_animal');
})

app.post('/create_animal', (req, res) => {
    pets[req.body.category].push({
        name: req.body.name,
        age: parseInt(req.body.age),
        description: req.body.desc,
        breed: req.body.breed,
        url: 'https://source.unsplash.com/random',
    })  
    res.redirect('/').send()
})

app.listen(PORT, () => {
    console.log('Server start')
})