require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const hbs = require('hbs');

let { mongoose } = require('./db/mongoose');
let { Course } = require('./models/course');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

app.get('/', async (req, res) => {
    try {
        res.render('home.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/adultcourses', async (req, res) => {
    try {
        const courses = await Course.find().sort({ sort: 1 });

        res.render('adultcourses.hbs', {
            courses
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tutoring', async (req, res) => {
    try {
        res.render('tutoring.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/schools', async (req, res) => {
    try {
        res.render('schools.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/schools-french', async (req, res) => {
    try {
        res.render('schools-french.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/schools-spanish', async (req, res) => {
    try {
        res.render('schools-spanish.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/events', async (req, res) => {
    try {
        res.render('events.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/about', async (req, res) => {
    try {
        res.render('about.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/testimonials', async (req, res) => {
    try {
        res.render('testimonials.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/giftvouchers', async (req, res) => {
    try {
        res.render('giftvouchers.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/privacy', async (req, res) => {
    try {
        res.render('privacy.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/gallery', async (req, res) => {
    try {
        res.render('gallery.hbs', {

        });
    } catch (e) {
        res.status(400).send(e);
    }
});

//////////////////////////////////////////////////////////////////////////////////////////

app.post('/courses', async (req, res) => {
    try {
        let course = new Course({
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
            details: req.body.details,
            sort: req.body.sort
        });

        const doc = await course.save();
        res.send(doc);
    } catch (e) {
        res.status(400).send(e);
    }
});

//////////////////////////////////////////////////////////////////////////////////////////



app.post('/todos', async (req, res) => {
    try {
        let todo = new Todo({
            text: req.body.text
        });

        const doc = await todo.save();
        res.send(doc);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send({ todos });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        let id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        let id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        const todo = await Todo.findOneAndDelete({ _id: id });

        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/todos/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        const todo = await Todo.findByIdAndUpdate(id, { $set: body }, { new: true });

        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    } catch (e) {
        res.status(400).send(e);
    }
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

module.exports = {
    app
};
