const baseUrl = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(`${baseUrl}auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }); 
    return await res.json();

}

async function login(email, password) {
    const res = await fetch(`${baseUrl}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    return await res.json();
}

async function create(hotel) {
    const res = await fetch(`${baseUrl}hotels/create`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotel)
    });
    return await res.json();
}

async function list() {
    const res = await fetch(`${baseUrl}hotels/all`, {
        method: 'GET',
    });
    return await res.json();
}

async function getPage(page) {
    const res = await fetch(baseUrl + 'hotels/all?page=' + page);
    return await res.json();
}

async function viewDetails(id) {
    const res = await fetch(`${baseUrl}hotels/details/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

async function postReview(id, comment, rating) {
    const res = await fetch(`${baseUrl}hotels/details/${id}/reviews/create`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment, rating})
    });
    return await res.json();
}

async function listReviews(id) {
    const res = await fetch(`${baseUrl}hotels/details/${id}/reviews`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });
    return await res.json();
}

export { register, login, create, list, getPage, viewDetails, postReview, listReviews };