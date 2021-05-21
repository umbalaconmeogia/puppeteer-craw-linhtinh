var Post = require('./Post');

class User {
    username;
    postNum = 5;
    posts;

    constructor(username) {
        this.username = username;
    }

    getName() {
        return this.username;
    }

    getPosts() {
        if (!this.posts) {
            this.posts = [];
            for (let i = 1; i <= this.postNum; i++) {
                var content = `Post ${i} of user ${this.username}`;
                this.posts.push(new Post(content));
            }
        }
        return this.posts;
    }
}

module.exports = User;