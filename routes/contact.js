//require express
const express = require ('express')
//routes
const router = express.Router()
//require model
const Contact = require('../models/Contact')

// ***routes ***

/**
 * @desc : test
 * @path : 'http://localhost:7001/api/contacts/test'
 * @method : GET
 * @data : no data
 * @access: public
 */

router.get('/test', (req,res) => {
    res.send ('hello test')
})

/**
 * @desc : add contact
 * @path : 'http://localhost:7001/api/add'
 * @method : POST
 * @data : req.body
 * @access: public
 */

 router.post('/', async (req,res) => {
     try {
        const {name, email, phone} = req.body
        const newContact = new Contact({
            name,
            email,
            phone
        })
        if(!req.body.email){
            res.status(400).send({msg:'email is required'})
            return;
        }
        const contact = await Contact.findOne({email:req.body.email})
   if(contact){
    res.status(400).send('this email is already existed')
    return
   }
        await newContact.save()
        res.status(200).send({msg:'contact added successfully',newContact})
     } catch (error) {
         res.status(400).send({msg:'failed to add contact',error})
     }
    
})

/**
 * @desc : get all contacts
 * @path : 'http://localhost:7000/api/contacts/'
 * @method : GET
 * @data : req.body
 * @access: public
 */
 router.get('/', async (req,res) => {
    try { 
        const listContact = await Contact.find()
        res.status(200).send({msg:'list of contacts...',listContact})

        }
    
     catch (error) {

            res.status(400).send({msg:`can not find list of contacts ${error}`})

    }})
   
 /**
 * @desc : get one contact
 * @path : 'http://localhost:7000/api/contacts/:id'
 * @method : GET
 * @data : req.params 
 * @access: public
 */
  router.get('/:id', async (req,res) => {
    try { 
        const contactToFind = await Contact.findOne({_id: req.params.id})
        res.status(200).send({msg:'contact find...',contactToFind})

        }
    
     catch (error) {

            res.status(400).send({msg:`can not find the contact ${error}`})

    }
   
})

/**
 * @desc : Delete one contact
 * @path : 'http://localhost:7000/api/contacts/:id'
 * @method : DELETE
 * @data : req.params
 * @access: public
 */
 router.delete('/:id', async (req,res) => {
    try { 
        const {id} = req.params
       const contactToDelete = await Contact.findOneAndDelete({_id:id })
        res.status(200).send({msg:'contact is deleted...'})
       
    }catch (error) {

            res.status(400).send({msg:`can not find the contact to delete ${error}`})

    }
   
})

/**
 * @desc : Update one contact
 * @path : 'http://localhost:7000/api/contacts/:_id'
 * @method : PUT
 * @data : req.params && req.body
 * @access: public
 */
 router.put('/:id', async (req,res) => {
    try { 
        const {id} = req.params
       const contactToEdit = await Contact.updateOne({_id:id},{$set: {...req.body}})
        res.status(200).send({msg:'contact is updated ...',contactToEdit})

        }
    
     catch (error) {

            res.status(400).send({msg:`can not edit this contact ${error}`})

    }
   
})

module.exports = router