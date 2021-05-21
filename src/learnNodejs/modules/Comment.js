class Comment {
    content = null;

    constructor(content) {
        this.content = content;
    }

    getContent()
    {
        return this.content;
    }
}

module.exports = Comment;