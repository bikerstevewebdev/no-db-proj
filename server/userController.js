const axios = require('axios')

let users = []

// class User {
//     constructor(name, password) {
//         this.name = name
//         this.favorites = []
//         this.id = ~~(Math.random() * 1000)
//         this.password = password
//     }
// }

let user, userAuth, newUser, newUsers

module.exports = {
    newUser: (req, resp) => {
        const { name, pass } = req.body
        if(users.filter(v => v.name === name).length < 1){
            newUser = {
                name,
                password: pass,
                id: ~~(Math.random() * 1000),
                favorites: []
            }
            // newUsers = users.slice()
            // newUsers.push(newUser)
            // users = newUsers
            users.push(newUser)
            resp.status(200).send({message: `Welcome ${name}!Your object is ${newUser.name}${newUser.id}${newUser.password}${newUser.favorites}`, auth: true, ...newUser})
        } else {
            resp.status(200).send({message: `Error code 403: Username ${name} already exists`, auth: false})
        }
    },
    
    login: (req, resp) => {
        user = users.filter(v => {
            return v.name === req.body.name
        }).filter(v => v.password === req.body.pass)[0]
        if(user){
            userAuth = user.password === req.body.pass
            if(user && userAuth){
                resp.status(200).send({valid: true, id: user.id})
            } else if(user && !userAuth){
                console.log(user, user.password, user.name, users)
            resp.status(200).send({valid: false, message: "Error code 403: Invalid Password"})
            }       
        } else {
            console.log(user)
            resp.status(200).send({valid: false, message: `Error code 403: Invalid username: ${req.body.name} User: ${user.name}`})
        }
    },

    addFav: (req, resp) => {
        let user = users.find(v => {
            v.id === req.body.id
        }),
            favs = user.favorites
        favs.push({
            name: req.body.name,
            id: req.body.id,
            isFav: true
        })
        user.favorites = favs
        let ind
        users.forEach((v, i) => {
            if(v.id === req.body.id){
                ind = i
            }
        })
        users.splice(ind, 1, user)
        let ids = favs.map(v => v.id)
        resp.status(200).send(ids)
    }

}