const mongoose = require('mongoose')

const bcrypt = require("bcrypt")
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

const User = require('../models/user.model')
const Psych = require('../models/psychologist.model');
const Problem = require('../models/problems.model')

const dbName = 'helping-hand';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

Psych.collection.drop();
Problem.collection.drop();
User.collection.drop();

const psychologists = [
    {
        name: 'Antonio Ruiz',
        email: 'antonio.ruiz@gmail.com',
        telephone: 629462849,
        password: bcrypt.hashSync("antonio", salt),
        practice: {
            name: 'Psicologos Unidos',
            location: {
                type: 'Point',
                coordinates: [40.9302840384, -3.9274650]
            },
        },
        timetable: ['10:30', '12:00', '15:00'],
        profileImg: 'https://res.cloudinary.com/djqsmqs26/image/upload/v1607290203/helping-hand/linkedin_profile_picture_tips-1_tiqtud.jpg',
        agesTreated: ['Adultos', 'Adolescentes(14 a 19)', 'Preadolescentes(11 a 13)'],
        role: 'DOC'
    },
    {
        name: 'Ana Sanchez',
        email: 'ana.sanchez@gmail.com',
        telephone: 660460374,
        password: bcrypt.hashSync("ana", salt),
        practice: {
            name: 'Practica Privada',
            location: {
                type: 'Point',
                coordinates: [40.364728375, -3.4563729]
            },
        },
        timetable: ['11:15', '13:00', '17:00', '19:00'],
        profileImg: 'https://res.cloudinary.com/djqsmqs26/image/upload/v1607289872/helping-hand/main-qimg-7fb93146f5e4e470f5a590d2fc38be3b_e1bz5s.jpg',
        agesTreated: ['Niños(6 a 10)', 'Niños pequeños/preescolares(0 a 6)'],
        role: 'DOC'
    },
    {
        name: 'Carla Jimenez',
        email: 'carla.jimenez@gmail.com',
        telephone: 679734620,
        password: bcrypt.hashSync("carla", salt),
        practice: {
            name: 'Practica Privada',
            location: {
                type: 'Point',
                coordinates: [40.863956, -3.06228567]
            },
        },
        timetable: ['11:00', '11:45', '13:00', '20:00'],
        profileImg: 'https://res.cloudinary.com/djqsmqs26/image/upload/v1607352533/helping-hand/2018-11-17-Martin-Novak-shutterstock_492835963_o8h8ko.jpg',
        agesTreated: ['Adultos mayores (65+)', 'Adultos', 'Adolescentes(14 a 19)', 'Preadolescentes(11 a 13)', 'Niños(6 a 10)', 'Niños pequeños/preescolares(0 a 6)'],
        role: 'DOC'
    }
]

const users = [
    {
    name: 'Carmen Chicharro',
    email: 'carmencita@gmail.com',
    password: bcrypt.hashSync("carmen", salt),
    profileImg: 'https://res.cloudinary.com/djqsmqs26/image/upload/v1607352894/helping-hand/staff186_2_zzisne.jpg',
    role: 'USER'
    }
]

const problems = [
    {
        name: 'Trastornos del estado de ánimo',
        subgroup: ['Trastorno bipolar', 'Trastorno depresivo mayor', 'Distimia', 'Trastorno disfórico premenstrual', 'Trastorno afectivo estacional'] 
    },
    {
        name: 'Trastornos de la personalidad',
        subgroup: ['Trastorno limite de la personalidad', 'Trastorno paranoide de la personalidad', 'Trastorno narcisista de la personalidad']
    }, 
    {
        name: 'Trastornos de ansiedad',
        subgroup: ['TA generalizada', 'Fobias específicas', 'TA social', 'TA por separación', 'Trastorno por estrés postraumático', 'Trastorno obsesivo-compulsivo', 'Trastorno de pánico (con o sin Agorafobia)', 'Mutismo selectivo']
    },
    {
        name: 'Trastornos por externalización',
        subgroup: ['Trastorno por déficit de atención e hiperactividad', 'Trastorno oposicionista desafiante', 'Trastorno de conducta', 'Trastorno explosivo intermitente']
    },
    {
        name: 'Trastornos de la alimentación',
        subgroup: ['Anorexia nerviosa', 'Bulimia nerviosa', 'Trastorno por atracón', 'Trastorno por evitación o restricción de la ingesta']
    },
    {
        name: 'Adicciones',
        subgroup: ['Alcoholismo', 'Adiccion al sexo', 'Drogodependencia', 'Adicciones afectivas y emocionales', 'Ludopatía']
    },
    {
        name: 'Insomnio y trastornos del sueño'
    },
    {
        name: 'Problemas de pareja',
        subgroup: ['Infedilidad', 'Codependencia', 'Celos', 'Abuso o maltrato', 'Problemas sexuales']
    },
    {
        name: 'Problemas en la esfera sexual',
        subgroup: ['Anorgasmia', 'Vaginismo', 'Dispareunia', 'Falta de deseo sexual', 'Disfunción eréctil', 'Eyaculación precoz', 'Orientación Sexual', 'Identidad de género/sexual']
    }
]

thePsych = []
theProblems = []
Promise
    .all([Psych.create(psychologists), User.create(users), Problem.create(problems)])
    .then((results) => {
        results[0].forEach((user) => thePsych.push(user._id))
        results[2].forEach((problem) => theProblems.push(problem._id))
    })
    .then(() => Psych.findByIdAndUpdate(thePsych[0], { problems: [theProblems[0], theProblems[3], theProblems[7]] }, { new: true }))
    .then(() => Psych.findByIdAndUpdate(thePsych[1], { problems: [theProblems[3], theProblems[5], theProblems[6]] }, { new: true }))
    .then(() => Psych.findByIdAndUpdate(thePsych[2], { problems: [theProblems[1], theProblems[2], theProblems[7], theProblems[8]] }, { new: true }))
    .then(() => console.log(`You created a DDBB with ${psychologists.length} psychologists in it, ${users.length} users in it and ${problems.length} problems in it`))
    .then(() => mongoose.connection.close())
    .catch((err) => new Error(err))
    
