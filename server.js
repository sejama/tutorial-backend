const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Usuario = db.user;
const Role = db.role;
const UserRole = db.user_roles;
const Tutorial = db.tutorials;
const Tag = db.tag;

const TagController = require("./app/controllers/tag.controller");

//db.sequelize.sync(); cuando esta en desarrollo
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Usuario.create({
        id: 1,
        username: "usuario",
        email: "user@user.com",
        password: "$2a$08$UqBo2ZEwuQvo4.uEl7eigOQpgO.SFGBmqNZlTBCFUZqh/cMJ.okQC"

    })
    Usuario.create({
        id: 2,
        username: "administrador",
        email: "admin@admin.com",
        password: "$2a$08$WNtE0Ead3IqNIqOfGqkWiuNag5gO1sZkUmF1qllkBwF7mZkIJDbYq"
    })

    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
/*
    UserRole.create({
        roleId: 1,
        userId: 1
    })

    UserRole.create({
        roleId: 3,
        userId: 2
    })
*/
    const tut1 = Tutorial.create({
        id: 1,
        title: "Titulo 1",
        description: "Descripción Titulo Uno",
        published: 0
    })

    const tag1 = TagController.create({
        name: "Tag#1",
      });
    
    TagController.addTutorial(tag1.id, tut1.id);

    Tutorial.create({
        id: 2,
        title: "Titulo 2",
        description: "Descripción Titulo 2",
        published: 0
    })
    Tutorial.create({
        id: 3,
        title: "Titulo 3",
        description: "Descripción Titulo 3",
        published: 0
    })
    Tutorial.create({
        id: 4,
        title: "Titulo 4",
        description: "Descripción Titulo 4",
        published: 0
    })
    Tutorial.create({
        id: 5,
        title: "Titulo ",
        description: "Descripción Titulo 5",
        published: 0
    })
    Tutorial.create({
        id: 6,
        title: "Titulo 6",
        description: "Descripción Titulo 6",
        published: 0
    })
    Tutorial.create({
        id: 7,
        title: "Titulo 7",
        description: "Descripción Titulo 7",
        published: 0
    })
    Tutorial.create({
        id: 8,
        title: "Titulo 8",
        description: "Descripción Titulo 8",
        published: 0
    })
    Tutorial.create({
        id: 9,
        title: "Titulo 9",
        description: "Descripción Titulo 9",
        published: 0
    })
    Tutorial.create({
        id: 10,
        title: "Titulo 10",
        description: "Descripción Titulo 10",
        published: 0
    })
    Tutorial.create({
        id: 11,
        title: "Titulo 11",
        description: "Descripción Titulo 11",
        published: 0
    })
}


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido al  backend" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/tutorial.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});