const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://aqueebjaved61:TN5SUZ0hDGEguhBo@cluster0.cbtiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Company Model
const CompanySchema = new mongoose.Schema({
  name: String,
  location: String,
  linkedin: String,
  email: String,
  phone: String,
  comments: String,
  communication: String,
});
const Company = mongoose.model('Company', CompanySchema);

// Communication Model
const CommunicationSchema = new mongoose.Schema({
  company: String,
  contactMethod: String,
  date: Date,
  notes: String,
  status: String,
});
const Communication = mongoose.model('Communication', CommunicationSchema);

// Communication Method Model
const CommunicationMethodSchema = new mongoose.Schema({
  name: String,
  description: String,
  sequence: Number,
  mandatory: Boolean,
});
const CommunicationMethod = mongoose.model('CommunicationMethod', CommunicationMethodSchema);

// Activity Log Model
const ActivitySchema = new mongoose.Schema({
  date: Date,
  user: String,
  company: String,
  action: String,
  details: String,
});
const Activity = mongoose.model('Activity', ActivitySchema);

// Routes for Companies
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/companies', async (req, res) => {
  const company = new Company({
    name: req.body.name,
    location: req.body.location,
    linkedin: req.body.linkedin,
    email: req.body.email,
    phone: req.body.phone,
    comments: req.body.comments,
    communication: req.body.communication,
  });
  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        location: req.body.location,
        linkedin: req.body.linkedin,
        email: req.body.email,
        phone: req.body.phone,
        comments: req.body.comments,
        communication: req.body.communication,
      },
      { new: true }
    );
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/companies/:id', async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes for Communications
app.get('/api/communications', async (req, res) => {
  try {
    const communications = await Communication.find();
    console.log('Fetched communications:', communications); // Log the fetched communications
    res.json(communications);
  } catch (error) {
    console.error('Error fetching communications:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/communications', async (req, res) => {
  const communication = new Communication({
    company: req.body.company,
    contactMethod: req.body.contactMethod,
    date: req.body.date,
    notes: req.body.notes,
    status: req.body.status,
  });
  try {
    const newCommunication = await communication.save();
    res.status(201).json(newCommunication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routes for Communication Methods
app.get('/api/communication-methods', async (req, res) => {
  try {
    const methods = await CommunicationMethod.find();
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/communication-methods', async (req, res) => {
  const method = new CommunicationMethod({
    name: req.body.name,
    description: req.body.description,
    sequence: req.body.sequence,
    mandatory: req.body.mandatory,
  });
  try {
    const newMethod = await method.save();
    res.status(201).json(newMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/communication-methods/:id', async (req, res) => {
  try {
    const updatedMethod = await CommunicationMethod.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        sequence: req.body.sequence,
        mandatory: req.body.mandatory,
      },
      { new: true }
    );
    res.json(updatedMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/communication-methods/:id', async (req, res) => {
  try {
    await CommunicationMethod.findByIdAndDelete(req.params.id);
    res.json({ message: 'Method deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes for Activities (Real-Time Activity Log)
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/activities', async (req, res) => {
  const activity = new Activity({
    date: new Date(),
    user: req.body.user,
    company: req.body.company,
    action: req.body.action,
    details: req.body.details,
  });
  try {
    const newActivity = await activity.save();
    io.emit('newActivity', newActivity);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Reporting Endpoints
app.get('/api/reports/communication-frequency', async (req, res) => {
  const { company, startDate, endDate, method } = req.query;
  const filter = {};

  if (company) filter.company = company;
  if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  if (method) filter.contactMethod = method;

  try {
    const communications = await Communication.find(filter);
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/reports/engagement-effectiveness', async (req, res) => {
  try {
    const communications = await Communication.aggregate([
      { $group: { _id: '$contactMethod', successCount: { $sum: '$success' }, totalCount: { $sum: 1 } } },
      { $project: { _id: 1, effectiveness: { $divide: ['$successCount', '$totalCount'] } } }
    ]);
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/reports/overdue-trends', async (req, res) => {
  try {
    const overdueTrends = await Communication.aggregate([
      { $match: { status: 'overdue' } },
      { $group: { _id: { company: '$company', date: { $dateToString: { format: '%Y-%m', date: '$date' } } }, count: { $sum: 1 } } },
      { $sort: { '_id.date': 1 } }
    ]);
    res.json(overdueTrends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/reports/download', async (req, res) => {
  const { format } = req.query;

  try {
    const communications = await Communication.find();
    if (format === 'csv') {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(communications);
      res.setHeader('Content-Disposition', 'attachment; filename=report.csv'); 
      res.setHeader('Content-Type', 'text/csv'); 
      res.send(csv); 
      } else if (format === 'pdf') { 
        const doc = new PDFDocument(); 
        doc.pipe(res); 
        doc.text(JSON.stringify(communications, null, 2)); 
        doc.end(); 
      } 
    } catch (error) { 
      res.status(500).json({ message: error.message }); 
    } 
  });

  
  app.listen(port, () => { 
    console.log(`Server running on port ${port}`); 
  });





