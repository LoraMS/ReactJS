const appKey = 'kid_SyCvPsEyG';
const appSecret = '6a4da7efbd2b491b848a9fdb97724ac2';
const hostUrl = 'https://baas.kinvey.com';

const requestHandler = {
    login: (data) => {
        return fetch(`${hostUrl}/user/${appKey}/login`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            });
    },
    register: (data) => {
        return fetch(`${hostUrl}/user/${appKey}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            });
            // .then(parsedData => {
            //     console.log(parsedData);
            // });
    },
    listPosts: () => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1`, {
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(response => {
                return response.json();
        });
    },
    createPost: (data) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
                return response.json();
        });
    },
    getPostById: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(data => {
            return data.json();
        });
    },
    editPost: (data, postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(d => {
            return d.json();
        });
    },
    deletePost: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(data => {
            return data.json();
        });
    },
    getMyPosts: () => {
        const username = localStorage.getItem('username');
        return fetch(`${hostUrl}/appdata/${appKey}/posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(data => {
            return data.json();
        });
    },
    getCommentsById: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(data => {
            return data.json();
        });
    },
    addComment: (data) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(parsedData => {
            return parsedData.json();
        });
    },
    deleteComment: (commentId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token')
            }
        })
        .then(data => {
            return data.json();
        });
    }
};

export default requestHandler;