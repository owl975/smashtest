// CLIENT-SIDE JAVASCRIPT

$(function() {

  
  var postsController = {
    
    // compile post template
    template: _.template($('#post-template').html()),


    all: function() {
      $.get('/api/posts', function(data) {
        var allPosts = data;
        
        // iterate through allPosts
        _.each(allPosts, function(post) {
          // pass each post object through template and append to view
          var $postHtml = $(postsController.template(post));
          $('#post-list').append($postHtml);
          _.each(post.comments, function(comment){
          commentsController.render(comment, posts._id);
        });
        
        });

        // add event-handlers to posts for updating/deleting
        postsController.addEventHandlers();
      });
    },


    create: function(newAuthor, newText, youtubeID) {
      var postData = {author: newAuthor, text: newText, youtubeID: youtubeID};

      // send POST request to server to create new post
      $.post('/api/posts', postData, function(data) {
        // pass post object through template and append to view
        var $postHtml = $(postsController.template(data));
        $('#post-list').append($postHtml);

        console.log();
      });
    },

    update: function(postId, updatedAuthor, updatedText) {
      // send PUT request to server to update post
      $.ajax({
        type: 'PUT',
        url: '/api/posts/' + postId,
        data: {
          author: updatedAuthor,
          text: updatedText,
          youtubeID: updatedURL
        },
        success: function(data) {
          // pass post object through template and append to view
          var $postHtml = $(postsController.template(data));
          $('#post-' + postId).replaceWith($postHtml);
        }
      });
    },
    


    delete: function(postId) {
      // send DELETE request to server to delete post
      $.ajax({
        type: 'DELETE',
        url: '/api/posts/' + postId,
        success: function(data) {
          // remove deleted post li from the view
          $('#post-' + postId).remove();
        }
      });
    },

    // add event-handlers to posts for updating/deleting
    addEventHandlers: function() {
      $('#post-list')
        // for update: submit event on `.update-post` form
        .on('submit', '.update-post', function(event) {
          event.preventDefault();
          var postId = $(this).closest('.post').attr('data-id');
          var updatedAuthor = $(this).find('.updated-author').val();
          var updatedText = $(this).find('.updated-text').val();
          var updatedURL = $(this).find('.updated-url').val().split('=')[1];
          postsController.update(postId, updatedAuthor, updatedText, updatedURL);
        })
        // for delete: click event on `.delete-post` button
        .on('click', '.delete-post', function(event) {
          event.preventDefault();
          var postId = $(this).closest('.post').attr('data-id');
          postsController.delete(postId);
        })

        //captcher values for new comment onclick
        .on('submit', '#new-comment', function(event){
          event.preventDefault();

          // find the post's id (stored in HTML as `data-id`)
          var postId = $(this).closest('.post').attr('data-id');

          // create new comment with form data
          var commentText = $(this).find('#comment-text').val();
          var commentAuthor = $(this).find('#comment-author').val();
          var commentURL = $(this).find('#comment-youtube').val().split('=')[1];
          commentsController.create(postId, commentText, commentAuthor, commentURL);

          // reset the form
          $(this)[0].reset();
          console.log(commentAuthor, commentText, commentURL);

        });
    },

    setupView: function() {
      // append existing posts to view
      postsController.all();
      
      // add event-handler to new-post form
      $('#new-post').on('submit', function(event) {
        event.preventDefault();
        var newAuthor = $('#new-author').val();
        var newText = $('#new-text').val();
        var youtubeID = $('#youtube-id').val().split('=')[1];
        console.log(youtubeID);
        postsController.create(newAuthor, newText, youtubeID);
         
        // reset the form
        $(this)[0].reset();
        $('#new-text').focus();
      });

    }

  };

  var commentsController = {  
     // compile comment template
    template: _.template($('#comment-template').html()),

    // pass each comment object through template and append to view
    render: function(commentObj, postId) {
      var $commentHtml = $(commentsController.template(commentObj));
      $('.comment-list[data-post-id=' + postId + ']').append($commentHtml);
    },

    create: function(postId, newCommentText, newCommentAuthor, newCommentURL) {
      var commentData = {
        text: newCommentText,
        author: newCommentAuthor,
        youtubeID: newCommentURL};

      // send POST request to server to create new comment
      $.post('/api/posts/' + postId + '/comments', commentData, function(data) {
        var newComment = data;
        console.log(newComment);
        commentsController.render(newComment, postId);
      });      
    }
  };



  

  postsController.setupView();

});