/**
 * Syntax
 *   node sampleCallback.js
 */
const Api = require('./ApiCallback');

const api = new Api();

function getUserCallback(err, user) {
    if (err) return console.error("Error: " + err);
    console.log('User name log: ' + user.getName());
}

api.getUser('thanh', getUserCallback);

api.getUser('thanherror', getUserCallback);

api.getUser('thanh_2', function(err, user) {
    getUserCallback(err, user);

    api.getPostsOfUser(user, function(err, posts) {
        if (err) throw err;
        posts.forEach(function(post, index) {
            console.log('Post log: ' + post.getContent());
        });
        api.getCommentsOfPosts(posts, function(err, comments) {
            if (err) throw err;
            comments.forEach(function(comment, index) {
                console.log('Comment log: ' + comment.getContent());
            });
        });
    });
});
