// require all the modules we need
const express = require('express');
const bodyParser = require('body-parser');

const Issue = require('../models/issue');

const router = express.Router();

router.use(bodyParser.json());

// routes
// get request to get all the issues
router.get('/', (req,res) => {
	Issue.find()
		.then( (issues) => {
			res.statusCode = 200;
			res.setHeader('content-type', 'application/json');
			res.json({issues: issues});
		})
		.catch( (err) => {
			console.log(err);
		});
});

// get request to get a single issue
router.get('/:id', (req,res) => {
	Issue.findById(req.params.id)
		.then( (issue) => {
			if (issue) {
				res.statusCode = 200;
				res.setHeader('content-type', 'application/json');
				res.json({issue: issue});
			}
			if (issue === null) {
				res.json({status: "No Issue Found!!"});
			}
		})
		.catch( (err) => {
			console.log(err);
		});
});

// post request to create an issue
router.post('/create', (req,res) => {
	var newIssue = new Issue();
	newIssue.title = req.body.title;
	newIssue.description = req.body.description;
	newIssue.responsible = req.body.responsible;
	newIssue.severity = req.body.severity;
	newIssue.status = req.body.status;

	newIssue.save()
		.then((issue) => {
			res.statusCode = 200;
			res.setHeader('content-type','application/json');
			res.json({status: "New Issue Created Successfully",issue: issue});
		})
		.catch( (err) => {
			console.log(err);
		});
});

// Delete request to delete single issue
router.delete('/delete/:id', (req,res) => {
	Issue.findByIdAndRemove(req.params.id)
		.then( (resp) => {
			res.statusCode = 200;
			res.setHeader('content-type','application/json');
			res.json({resp: resp, status: "Issue Removed Successfully"});
		})
		.catch( (err) => {
			var err = new Error("Issue Doesn't Exsits");
			res.json({err: err});
		});
});

// update an issue
router.post('/update/:id', (req,res) => {
	Issue.findByIdAndUpdate(req.params.id,{
		$set: req.body
	},{ new: true})
		.then( (updIssue) => {
			res.statusCode = 200;
			res.setHeader('content-type','application/json');
			res.json({issue: updIssue, status: "Issue Updated Successfully"});
		})
		.catch( (err) => {
					var err = new Error("Issue Doesn't Exsits!!!");
					res.json({err: err});
		});
});

module.exports = router;