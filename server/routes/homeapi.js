const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TaskData = require('../models/TaskData');
const db = "mongodb://localhost:27017/MyHomeData";
// mongoose.Promise = global.Promise;

// Sheduler
var TaskNoti = require('../models/TaskData'),
mailgun_api = process.env.MAILGUN_API_KEY,
mailgun_domain = process.env.MAILGUN_DOMAIN,
Mailgun = require('mailgun-js'),
schedule = require('node-schedule'),
Q = require('q'),
moment = require('moment'),
//use nunjucks to render html templates w/ variables
nunjucks = require('nunjucks');


// find Tasks that match criteria
var mailTasks = function (mailDay) {
  console.log('Tasks fired');
  // setup promises
  var deffered = Q.defer();
  // find tasks that match todays date
  let start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0,0);

  let end = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,59,59);

  let query = {due: {$gte: start, $lt: end} };

  TaskNoti.find(query).exec(    
    function(err, task){
    var tasks = [];
    // handle error
    if (err) {
      deffered.reject(console.log('failed: ' + err));
    } else {
      // add all qualifying tasks to the tasks array
      for (var i = task.length - 1; i >= 0; i--) {        
        tasks.push(task[i]);
      }  
      deffered.resolve(tasks);
    }    
  });
  return deffered.promise;
};

// function to generate custom email
// for given tasks and return a mailing array
var mailCreator = function(tasks) {
  var mailing = [];

  for (var i = tasks.length - 1; i >= 0; i--) {
    // get an email template and pass in some variables
    // var email = nunjucks.render('app/views/templates/email.inlined.template.html', {
    //   taskdetails: tasks[i].title + tasks[i].desc + tasks[i].due
    // });
    var email = tasks[i].title +' ' + tasks[i].desc + '' + tasks[i].due 
    // add qualified tasks and their customized 
    // email to the mailing
    mailing.push({
      user: 'jayasriotp@gmail.com',
      email: email 
    });
  }
  return mailing;
}

// function to send task email given template and subject     
var mailSender = function (taskEmail, subject, html) {
  // setup promises
  var deffered = Q.defer();
  // create new mailgun instance with credentials
  var mailgun = new Mailgun({
    apiKey: mailgun_api, 
    domain: mailgun_domain
  });
  // setup the basic mail data
  var mailData = {
    from: 'jayasriotp@gmail.com',
    to: taskEmail,
    subject:  subject,
    html: html,
    // two other useful parameters
    // testmode lets you make API calls
    // without actually firing off any emails
    'o:testmode': true,
    // you can specify a delivery time
    // up to three days in advance for
    // your emails to send.
    'o:deliverytime': 'Thu, 13 Oct 2011 18:02:00 GMT'
  };
  // send your mailgun instance the mailData
  mailgun.messages().send(mailData, function (err, body) {
    // If err console.log so we can debug
    if (err) {
      deffered.reject(console.log('failed: ' + err));
    } else {        
      deffered.resolve(body)
    }      
  });

  return deffered.promise; 
};

var mailScheduler = function (job) {
  // set rules for scheduler
  var rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = [new schedule.Range(0, 6)];
      rule.hour = 16;
      rule.minute = 38;
  // scheduleJob take a rule and a function
  // you will need to pass a function object
  // into the mailScheduler function
  schedule.scheduleJob(rule, job);
};


// set mailDay to now
// Note! you will need to format
// the date to match the date
// in your task record
var mailDay = new Date();

// call the scheduler, which takes a function
// and pass in our mailing sequence
mailScheduler(function () {
  // find tasks with preferences set for now
  mailTasks(mailDay)
  .then(function (tasks) {
    // create a mailing
    var mailing = mailCreator(tasks);
    // for each mailing item, send an email
    for (var i = mailing.length - 1; i >= 0; i--) {
      // email each task with their custom template
      mailSender(mailing[i].task,'Home- Notification to Task# Due', mailing[i].email)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log("error: " + err)
      })
    }
  })
});
//< Scheduler
mongoose.connect('mongodb+srv://homeone:homeone@homenotification.extu6.mongodb.net/homedb?retryWrites=true&w=majority',{useNewUrlParser:true},function(err){
//mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});



router.get('/tasks', (req,res) => {
    TaskData.find()
                .then(function(tasks){
                    res.send(tasks);
                });
})

router.get('/:id',  (req, res) => {
  console.log('inside server')
  const id = req.params.id;
  console.log(id)
    TaskData.findOne({"_id":id})
    .then((task)=>{
        res.send(task);
    });
})

router.post('/insert', (req, res) => {
  let taskData = req.body
  let task= new TaskData(taskData)
  task.save((err, newTask) => {
    if (err) {
      console.log(err)      
    } else {
      
      res.status(200).send(newTask)
    }
  })
})

 router.put('/update',(req,res)=>{
   console.log(req.body)
  const id = req.body._id;
  const title = req.body.title;
  const desc = req.body.desc;
  const from = req.body.from;
  const to = req.body.to;
  //const imageUrl=req.body.imageUrl;
  TaskData.findByIdAndUpdate({"_id":id},{$set:{"title":title,"desc":desc,"from":from,"to":to}})
  .then(function(){
      res.send();
  })
})

router.delete('/remove/:id',(req,res)=>{
  console.log('deletion')
  id = req.params.id;
  console.log(id)
  TaskData.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})





module.exports = router;