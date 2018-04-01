// let id = 0; unnecessary, hardcoding ID's and food objects
// const replays = []

/* Sample Object:
{
  name, macro, id, message, isFav(Boolean)    
}
*/

const axios = require('axios')
const trash = []

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
const dotenv = require('dotenv').config()
let resImg = ''
let p = '',
    c = '',
    f = ''




module.exports = {
    sendFood: (req, res) => {
        res.status(200).send(foods)
    },

    filter: (req, res) => {
        console.log("query has been matched")
        let sName = req.query.name
        let rArr  = foods.filter(v => v.name.includes(sName))
        console.log(`sName: ${sName}, req.query.name: ${req.query.name}, rArr: ${rArr}`)
        res.status(200).send(rArr)
    },

    playGame: (req, res) => {
        let foodNum   = ~~(Math.random()*foods.length),
            selection = foods[foodNum]
        axios.get("https://trackapi.nutritionix.com/v2/search/instant?query=" + selection.name,
        {"headers": {
            "x-app-key": `${process.env.API_KEY1}`,
            "x-app-id": `${process.env.API_ID1}`
        }}).then(results => {
            console.log()
            res.status(200).json({ resImg: results.data.common[0].photo.thumb, ...selection })
        })
    },

    replayGame: (req, res) => {
        let fId  = req.params.id, resImg,
            food = foods.filter(v => v.id === fId)[0] 
        axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${food.name}`,
        {"headers": {
            "x-app-key": `${process.env.API_KEY1}`,
            "x-app-id": `${process.env.API_ID1}`,
            "x-remote-user-id": "0"
        }}).then(results => {
            resImg = results.data.common[0].photo.thumb
            res.status(200).send({ resImg, ...food })
        })
    },

    getMacros: (req, res) => {
        let checkId = req.params.id,
            fname   = foods[checkId].name
            console.log(fname)
        axios({
            method: "post",
            url: "https://trackapi.nutritionix.com/v2/natural/nutrients", 
            headers: {"x-app-key": `${process.env.API_KEY1}`, "x-app-id": `${process.env.API_ID1}`, "x-remote-user-id": "0"},
            data: {"query": fname} 
            }).then(results => {
            p = results.data.foods[0].nf_protein
            f = results.data.foods[0].nf_total_fat
            c = results.data.foods[0].nf_total_carbohydrate
            res.status(200).send({ p, c, f })
        })
    },

    starR: (req, res) => {
        let starId = req.params.id,
            starF  = foods.splice(starId, 1)[0]
        starF.isFav = !starF.isFav
        console.log(starF)
        if(starF.isFav){
            foods.unshift(starF)
        } else {
            foods.push(starF)
        }
        res.status(200).send(foods)
    },
    
    sendReplays: (req, res) => {
        res.status(200).send(replays)
    },

    addFood: (req, res) => {
        const { name, macro, message } = req.body
        let newFood = {
            name,
            macro,
            message,
            isFav: false,
            id: foods.length
        }
        console.log(newFood)
        foods.push(newFood)
        res.status(200).send(foods)
    },
    
    destroy: (req, res) => {
        trash.push(foods.splice(req.params.id, 1))
        let newFArr = []
        foods.forEach((cv, i) => {
            let temp = cv
            temp.id = i
            newFArr.push(temp)
        })
        foods = newFArr
        
        res.status(200).send(foods)
    }
}


/*******************************************/
//////Old logic for Replay list delete///////
/*******************************************/
// let oid = req.params.id
// foods.push(replays.splice(oid, 1))
// let replaceF = foods[foods.length - 1]
// replaceF.id = foods.length - 1
// foods[foods.length - 1] = replaceF
// let newRArr = []
// replays.forEach((cv, i) => {
    //     let temp = cv
    //     temp.id = i
    //     newRArr.push(temp)
    // })
    // replays = newRArr
    /*******************************************/
    //// Old logic for Replay list delete////////
    
    /***********************************/
    /**********Replays disbanded for now*********/
    /***********************************/
    // createR: (req, res) => {
    //     let cid     = req.params.id,
    //         newFArr = []
    //     replays.push(foods.splice(cid, 1))
    //     foods.forEach((cv, i) => {
    //         let temp = cv
    //         temp.id = i
    //         newFArr.push(temp)
    //     })
    //     foods = newFArr
    // },
    /***********************************/
    /**********Replays disbanded for now*********/
    /***********************************/
/*******************************************/