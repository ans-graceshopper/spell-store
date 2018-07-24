const db = require('../db')
const Spell = require('../db/models/spell')
const fs = require('fs')

const data = fs.readFileSync('./skyrim_spells.csv', 'utf8')

//console.log(data)

const seed = async () => {
  try {
    await db.sync({force: true})
    const parsed = data.split('\n')

    await parsed.forEach(async row2 => {
      let row = row2.split(',')
      console.log(row)
      try {
        await Spell.create({
          title: row[0],
          description: row[1],
          magicka_cost: row[2],
          price: row[3],
          magic_school: row[4],
          skill_level: row[5]
        })
      } catch (err) {
        console.log(err)
      }
    })

    console.log('Seeding success!')
  } catch (err) {
    console.log('Oh noes! Seeding disaster!', err)
  }
}

seed()
