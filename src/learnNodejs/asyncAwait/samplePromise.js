/**
 * Syntax
 *   node samplePromise.js
 */
const Api = require('../modules/Api');

const api = new Api();

function onSuccessUser(user) {
    console.log('User name log: ' + user.getName());
}

function onError(err) {
    console.error('Error: ' + (err.stack || err));
}

api.getUserPromise('thanh').then(onSuccessUser, onError);

api.getUserPromise('thanherror').then(onSuccessUser, onError);

api.getUserPromise('thanh_2')
    .then(user => {
        onSuccessUser(user);
        return api.getPostsOfUserPromise(user);
    })
    .then(posts => {
        posts.forEach(function(post, index) {
            console.log('Post log: ' + post.getContent());
        });
        return api.getCommentsOfPostsPromise(posts);
    })
    .then(comments => {
        comments.forEach(function(comment, index) {
            console.log('Comment log: ' + comment.getContent());
        });
    })
    .catch(err => onError(err));

api.getUserPromise('thanh_2error')
    .then(user => onSuccessUser(user))
    .catch(err => onError(err));