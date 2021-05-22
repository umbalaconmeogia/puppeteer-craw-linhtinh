/**
 * Syntax
 *   node samplePromiseAll.js
 */
const Api = require('../modules/Api');

const api = new Api();

function onSuccessUser(user) {
    console.log('User name log: ' + user.getName());
}

function onError(err) {
    console.error('Error: ' + (err.stack || err));
}

const userNames = [
    'thanh_1',
    'thanh_1_error',
    'thanh_2',
    'thanh_2_error',
    'thanh_3',
    'thanh_3_error',
];

const runOn = async (username) => {
    api.getUserPromise(username)
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
};

Promise.all(userNames.map(runOn));
