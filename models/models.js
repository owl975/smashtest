var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var AuthorSchema = new Schema({
	name: String
});

var Author = mongoose.model('Author', AuthorSchema);


var CommentSchema = new Schema ({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Author'
	},
	text: String,
	youtubeID: String
});

var Comment = mongoose.model('Comment', CommentSchema);


var PostSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Author'
	},
	text: String,
	youtubeID: String,
	comments:[Comment.schema]

});


var Post = mongoose.model('Post', PostSchema);




module.exports.Post = Post;
module.exports.Author = Author;
module.exports.Comment = Comment;

