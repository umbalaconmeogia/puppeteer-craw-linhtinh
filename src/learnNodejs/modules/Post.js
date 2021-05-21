const Comment = require('./Comment');

class Post {
    content = null;
    commentNum = 5;
    comments;

    constructor(content) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    getComments() {
        if (!this.comments) {
            this.comments = [];
            for (let i = 1; i <= this.commentNum; i++) {
                var content = `Comment ${i} of post '${this.content}'`;
                this.comments.push(new Comment(content));
            }
        }
        return this.comments;
    }
}

module.exports = Post;