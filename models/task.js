const mongoose = require('mongoose');
​
const taskSchema = new mongoose.Schema({
	date:{
		type: Date,
  required: true
	},
	title:{
		type: String,
  minlength: 1,
  maxlength: 99
	},
	content:{
		type: String,
  required: true
	},
	userId:{
		type: Number
	});
​
// Override 'toJSON' to prevent the password from being returned with the user
taskSchema.set('toJSON', {
 transform: function(doc, user, options) {
  let returnJson = {
   id: task._id,
   date: task.date,
   title: task.title,
   content: task.content,
   userId: task.userId
  };
  return returnJson;
 }
});
​
// Exporting the user model
module.exports = mongoose.model('Task', taskSchema);