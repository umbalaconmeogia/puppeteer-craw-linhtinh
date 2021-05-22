/**
 * Syntax
 *   node sampleAwait.js
 */
const Api = require('../modules/Api');

const api = new Api();

function onSuccessUser(user) {
    console.log('User name log: ' + user.getName());
}

function onError(err) {
    console.error('Error: ' + (err.stack || err));
}

const displayUser = async function(username) {
    try {
        const user = await api.getUserPromise(username);
        onSuccessUser(user);
        const posts = await api.getPostsOfUserPromise(user);
        posts.forEach(function(post, index) {
            console.log('Post log: ' + post.getContent());
        });
        const comments = await api.getCommentsOfPosts(posts);
        comments.forEach(function(comment, index) {
            console.log('Comment log: ' + comment.getContent());
        });
    } catch (err) {
        onError(err);
    }
}

displayUser('thanh_2');
displayUser('thanh_2_error');