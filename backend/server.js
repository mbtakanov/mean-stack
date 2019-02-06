import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
   console.log('MongoDB database connection established successfully!');
});

router.route('/issues').get((req, res) => {
   Issue.find((err, issues) => {
      if (err) {
         res.status(400).json({'status': 'An error occurred.', error: err});
      } else if (!issues) {
         res.status(404).json({'status': 'Failed to find issues.', error: err});
      } else {
         res.status(200).json(issues);
      }
   });
});

router.route('/issues/:id').get((req, res) => {
   Issue.findById(req.params.id, (err, issue) => {
      if (err) {
         res.status(400).json({'status': 'An error occurred.', error: err});
      } else if (!issue) {
         res.status(404).json({'status': `Failed to find issue with id: ${req.params.id}.`});
      } else {
         res.status(200).json(issue);
      }
   });
});

router.route('/issues/add').post((req, res) => {
   let issue = new Issue(req.body);
   issue.save()
       .then(issue => {
         res.status(200).json({'status': 'Added successfully.', '_id': issue._id});
      })
       .catch(err => {
         res.status(400).json({'status': 'Failed to create new record.'});
      });
});

router.route('/issues/update/:id').put((req, res) => {
   Issue.findById(req.params.id, (err, issue) => {
      if (err) {
         res.status(400).json({'status': 'An error occurred.', error: err});
      } else if (!issue) {
         res.status(404).json({'status': `Could't find issue with id: ${req.params.id}`});
      } else {
         issue.title = req.body.title;
         issue.responsible = req.body.responsible;
         issue.description = req.body.description;
         issue.severity= req.body.severity;
         issue.status= req.body.status;

         issue.save().then(issue => {
            res.status(200).json({'status': 'Update complete successfully.'});
         }).catch(err => {
            res.status(400).json({'status': 'An error occurred.', error: err});
         });
      }
   });
});

router.route('/issues/delete/:id').delete((req, res) => {
   Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
      if (err) {
         res.status(400).json({'status': 'An error occurred.', error: err});
      } else if (!issue) {
         res.status(404).json({'status': `Could't find issue with id: ${req.params.id}`});
      } else {
         res.status(200).json({'status': 'Issue deleted successfully.'});
      }
   });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));
