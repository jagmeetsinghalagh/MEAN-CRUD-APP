const mongoose  = require('mongoose');
const Schema = require('mongoose').Schema;

const issueSchema = new Schema({
	title: {
		type: String
	},
	responsible: {
		type: String
	},
	description: {
		type: String
	},
	severity: {
		type: String
	},
	status: {
		type: String,
		default: 'open'
	}
});

module.exports = mongoose.model('Issue', issueSchema);