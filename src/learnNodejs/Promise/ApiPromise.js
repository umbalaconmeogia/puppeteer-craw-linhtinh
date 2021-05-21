var User = require('../modules/User');

class Api {
    getUser(username) {
        return new Promise((resolve, reject) => {
            var err = null;
            var user = null;
            if (username.includes('error')) {
                err = 'Cannot find user ' + username;
            } else {
                user = new User(username);
            }
            if (err) return reject(err);
            resolve(user);
        });
    }

    getPostsOfUser(user) {
        return new Promise((resolve, reject) => {
            var err = null;
            var posts = user.getPosts();
            if (err) return reject(err);
            resolve(posts);
        });
    }

    getCommentsOfPosts(posts) {
        return new Promise((resolve, reject) => {
            var err = null;
            var comments = [];
            posts.forEach(function(post, index) {
                comments = comments.concat(post.getComments());
            });
            if (err) return reject(err);
            resolve(comments);
        });
    }
}

module.exports = Api;