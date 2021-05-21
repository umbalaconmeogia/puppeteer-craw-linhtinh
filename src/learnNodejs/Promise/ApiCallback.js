var User = require('../modules/User');

class Api {
    getUser(username, callback) {
        var err = null;
        var user = null;
        if (username.includes('error')) {
            err = 'Cannot find user ' + username;
        } else {
            user = new User(username);
        }
        if (callback) callback(err, user);
        return user;
    }

    getPostsOfUser(user, callback) {
        var err = null;
        var posts = user.getPosts();
        if (callback) callback(err, posts);
        return posts;
    }

    getCommentsOfPosts(posts, callback) {
        var err = null;
        var comments = [];
        posts.forEach(function(post, index) {
            comments = comments.concat(post.getComments());
        });
        if (callback) callback(err, comments);
        return comments;
    }
}

module.exports = Api;