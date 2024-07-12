const express = require('express');
const TicketDetail = require('./model/ticket');
const Counter = require('./model/counter');
require('./db/conn')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())
const port = process.env.PORT||3002;


app.get('',(req,res)=>{
    res.send('Working');
})

//next sequence

const getNewSequence = async(name) =>{
    const counter= await Counter.findOneAndUpdate(
        {id: name},
        {$inc: {seq: 1}},
        {new: true, upsert: true});
        return counter.seq
}

app.post('/newTicket', async (req,res)=>{

    const newTicketNumber = await getNewSequence('ticketId');
    const ticketNumber = `TIC${String(newTicketNumber).padStart(3, '0')}`;
    const ticDetails = new TicketDetail({
        tnumber: ticketNumber,
        catalog: req.body.catalog,
        manager: req.body.manager,
        createdAt: new Date(),
        status: 'Open'
    })

    await ticDetails.save();
    res.send(ticDetails).status(201);
})

//all Request Raised
app.get('/allReq', async(req,res)=>{
    const allReq = await TicketDetail.find();
    res.send(allReq);
})

//specific ticket
app.get('/ticket/:id', async(req,res)=>{
    try{
        const ticket = await TicketDetail.findById(req.params.id);
    if(!ticket){
        res.status(404).send("Ticket Not Found");
    }
    res.status(200).send(ticket);
    }
    catch(e){
        res.status(500).send(e)
    }
})

//update ticket

app.put('/ticket/:id', async (req, res) => {
    const { status } = req.body;
  
    try {
      const ticket = await TicketDetail.findByIdAndUpdate(
        req.params.id,
        { status,updatedAt: new Date() },
        { new: true }
      );
  
      if (!ticket) {
        return res.status(404).send({ error: 'Ticket not found' });
      }
  
      res.status(200).send(ticket);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the ticket status' });
    }
  });

app.listen(port);
