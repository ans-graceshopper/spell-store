const path = require('path')
const db = require('../db')
const Spell = require('../db/models/spell')
const fs = require('fs')

const csvPath = path.join(__dirname, './skyrim_spells.csv')
const dataArr = fs.readFileSync(csvPath, 'utf8').split('\n')

const arrayOfDatabaseObjects = data => {
  const dbRows = data.slice(1, data.length)
  let arrayOfDBObjects = []

  for (let row = 0; row < dbRows.length; row++) {
    let obj = {}
    const properties = data[0].split(',')
    let currentRow = dbRows[row].split(',')

    for (let i = 0; i < properties.length; i++) {
      obj[properties[i]] = currentRow[i]
    }
    arrayOfDBObjects.push(obj)
  }
  return arrayOfDBObjects
}

const arrayOfSpellObjects = arrayOfDatabaseObjects(dataArr)

const seed = async () => {
  try {
    await db.sync({force: true})

    for (let i = 0; i < arrayOfSpellObjects.length; i++) {
      let spell = arrayOfSpellObjects[i]
      if (spell.title) {
        await Spell.create(spell)
      }
    }
  } catch (err) {
    console.log('Oh noes! Seeding disaster!', err)
  }
  console.log('Seeding success!')
}

// If you have problmes and want to seed fake data, uncomment this (and the import)
// const seed = async () => {
//   await db.sync({force: true})
//   await fakeData.forEach(async spell => {
//     await Spell.create(spell)
//   })
//   try {
//     console.log('Seeding success!')
//   } catch (err) {
//     console.log('Oh noes! Seeding disaster!', err)
//   }
// }
//
seed()
  .catch(err => console.log(err, err.message, err.stack))
  .then(() => db.close())
