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

let foods = [{
    name: "eggs",
    macro: "protein",
    message: "While eggs contain cholesterol and rather high fat, they are a great source of protein. When looking to for a good source of protein for your meal without excessive fat, try a couple eggs with some egg whites.",
    id: 0,
    isFav: false
},
{
    name: "peanut butter",
    macro: "fat",
    message: "Peanut butter is a decent source of protein, but the fats greatly outnumber the protein, no matter that they are healthier fats (when no hydrogenated oils are used). A more complete source of proetin would be fish, eggs, or yogurt as examples.",
    id: 1,
    isFav: false
},
{
    name: "black beans",
    macro: "carbs",
    message: "Black beans are not a bad source of protein, but carbs take the win here! To make that protein a complete range of amino acids, mix up your beans with some rice.",
    id: 2,
    isFav: false
},
{
    name: "cheese",
    macro: "fat",
    message: "Cheese is a tricky area because some cheeses have more protein than fat, but the higher caloric content of fat makes this food predominately a fat source.",
    id: 3,
    isFav: false
},
{
    name: "pizza",
    macro: "carbsfat",
    message: "Carbs AND fat seize the trophy! There is a lot of both in here, and even when you opt for a 'meat lovers' you are still hardly getting enough protein from those slices to even come close to making up for the overwhelming presence of carbs and fat in there!",
    id: 4,
    isFav: false
},
{
    name: "chocolate",
    macro: "carbsfat",
    message: "A little bit of both! Carbs and fat claim dominance here, with hardly any protein in sight. The amount of fat depends highly on how the chocolate was made. If the manufacturer/ chocolatier made it creamy, you can bet there is more fat in there to catch up to the sugary carbs.",
    id: 5,
    isFav: false
},
{
    name: "doughnut",
    macro: "carbsfat",
    message: "Nothing good! Except for that warm smile in your heart and belly while it lasts... Just carbs and fat in those little round bundles of joy. A little protein, but nothing to write home about.",
    id: 6,
    isFav: false
},
{
    name: "yogurt",
    macro: "proteincarbsfat",
    message: "DEPENDS! Don't you just hate that answer? But this is one of those brand dependent ones, so read that label! My favorite is the Danon Light and Fit 2x Protein because there is more protein than carbs and zero fat! Enjoy:)",
    id: 7,
    isFav: false
},
{
    name: "protein bar",
    macro: "proteincarbsfat",
    message: "If you guessed carbs or fat, good on you! This was a trick question. Keep an eye on those 'Protein' bars you see at the store, as more times than not you are getting more carbs and fat than you are protein, and sometimes even the amount of protein is just a smidge! Don't believe everything you see, so read the label and find out for yourself!",
    id: 8,
    isFav: false
},
{
    name: "chicken noodle soup",
    macro: "carbs",
    message: "Don't be fooled! Those little nibs of chicken are not enough to turn this carb swamp into a high protein meal. Try instead slow cooking it yourself and throwing some extra chicken in there to shred and up the protein!",
    id: 9,
    isFav: false
},
{
    name: "chili",
    macro: "fatprotein",
    message: "Fat, protein, but not usually carbs as much. Since it is a recipe customized far more than one can explain, it can be made into any. It is easy to add sugary mixes or jellies and turn a high protein chili into a carb-centered meal, so be wise and keep that chili lean and spicy like it should be!",
    id: 10,
    isFav: false
},
{
    name: "bacon",
    macro: "fat",
    message: "There may be a bit of protein in there, but unless you are eating turkey bacon (and even sometimes it's no better), that juicy slice of heaven is more fat than any protein on it can justify.",
    id: 11,
    isFav: false
}]

let user, userAuth, newUser, newUsers, favs, foodsArr

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
        if(users.length > 0){
        user = users.filter(v => {
            return v.name === req.body.name
        })[0]
            if(user){
                userAuth = user.password === req.body.pass
                if(user && userAuth){
                    resp.status(200).send({valid: true, id: user.id})
                } else if(user && !userAuth){
                    console.log(user, user.password, user.name, users)
                resp.status(200).send({valid: false, message: "Error code 403: Invalid Password"})
                }
            }      
        } else {
            console.log(user)
            resp.status(200).send({valid: false, message: `Error code 403: Invalid username: ${req.body.name}`})
        }
    },
    
    addFav: (req, resp) => {
        console.log(`User ID: ${req.body.userId}`)
        user = users.find(v => {
           return v.id === req.body.userId
        })
        favs = user.favorites
        favs.push({
            name: req.body.userName,
            id: req.body.id,
            isFav: true
        })
        user.favorites = favs
        let ind
        users.forEach((v, i) => {
            if(v.id === req.body.userId){
                ind = i
            }
        })
        users.splice(ind, 1, user)
        let ids = favs.map(v => v.id)
        console.log(`ids: ${ids}`)
            foodsArr = foods
        console.log(foodsArr)
            let starId = req.body.id,
            starF  = foodsArr.splice(starId, 1)[0]
        starF.isFav = !starF.isFav
        if(starF.isFav){
            foodsArr.unshift(starF)
        } else {
            foodsArr.push(starF)
        }
        console.log(`foodsArr: ${foodsArr}`)
            resp.status(200).send(foodsArr)
    }

}