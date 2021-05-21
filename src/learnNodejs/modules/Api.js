var User = require('./User');

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

    getUserPromise(username) {
        return new Promise((resolve, reject) => {
            this.getUser(username, function(err, user) {
                if (err) return reject(err);
                resolve(user);
            });
        });
    }

    getPostsOfUser(user, callback) {
        var err = null;
        var posts = user.getPosts();
        if (callback) callback(err, posts);
        return posts;
    }

    getPostsOfUserPromise(user) {
        return new Promise((resolve, reject) => {
            this.getPostsOfUser(user, function(err, posts) {
                if (err) return reject(err);
                resolve(posts);
            });
        });
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

    getCommentsOfPostsPromise(posts) {
        return new Promise((resolve, reject) => {
            this.getCommentsOfPosts(posts, function(err, comments) {
                if (err) return reject(err);
                resolve(comments);
            });
        });
    }
}

module.exports = Api;