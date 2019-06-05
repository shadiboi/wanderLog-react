const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Entries = require('../models/Entries')
const User = require('../models/User')


//CREATE ENTRY
router.post("/", async (req, res)=>{
    try{ 
        const newEntry = await Entries.create(req.body);
        const foundUser = await User.findById(req.session.username)
         foundUser.entries.push(newEntry)  
        res.json({
            status: 200,
            data: newEntry
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
})

//ALL ENTRIES
router.get('/', async (req, res, next) => {
    try  {
       const foundEntries = await Entries.find({}).populate('owner');
       res.json({
         status: 200,
         data: foundEntries
       });
     } catch (err){
       res.send(err);
     }     
});

//USER ENTRIES
router.get('/:id', async (req, res, next) => {
    try  {
      const foundUserEntries = await Entries.find({ owner: { $in: [ req.params.id]}})
       res.json({
         status: 200,
         data: foundUserEntries
       });
     } catch (err){
       res.send(err);
     }
});

//EDIT ENTRIES
router.put('/:id', async (req, res) => {
    try {
      const entry = await Entries.findByIdAndUpdate(req.params.id, req.body, {new: true});
      console.log(entry)
      res.json({
        status: 200,
        data: entry
      });
    } catch(err){
        console.log(err)
      res.send(err)
    }
  });

//Delete 
router.delete('/:id', async (req, res) => {
      try{
          const deletedEntries = await Entries.findByIdAndDelete(req.params.id)
          res.json({
              status: 200,
              data: deletedUser
          })
      } catch (err) {
          res.send(err)
      }
  })

module.exports = router;