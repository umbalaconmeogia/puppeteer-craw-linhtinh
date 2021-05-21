/**
 * Syntax
 *   node samplePromise.js
 */
 const { resolve } = require('path/posix');
const Api = require('./ApiPromise');

const api = new Api();

function onSuccessUser(user) {
    console.log('User name log: ' + user.getName());
}

function onError(err) {
    console.error('Error: ' + (err.stack || err));
}

api.getUser('thanh').then(onSuccessUser, onError);

api.getUser('thanherror').then(onSuccessUser, onError);

api.getUser('thanh_2')
    .then(user => {
        onSuccessUser(user);
        return api.getPostsOfUser(user);
    })
    .then(posts => {
        posts.forEach(function(post, index) {
            console.log('Post log: ' + post.getContent());
        });
        return api.getCommentsOfPosts(posts);
    })
    .then(comments => {
        comments.forEach(function(comment, index) {
            console.log('Comment log: ' + comment.getContent());
        });
    })
    .catch(err => onError(err));

api.getUser('thanh_2error')
    .then(user => onSuccessUser(user))
    .catch(err => onError(err));