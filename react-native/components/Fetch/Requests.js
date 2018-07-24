import { fetching } from './Fetch'
import { myIp } from '../Extra/MyIp'

export const getPosts = cb => {
    fetching({}, 'GET', `${myIp}/api/v1/users/all/posts`, response => {
        if (response.status == 200) {
            arr = []
            for (var i in response.posts) {
                arr.push({
                    image: response.posts[i].post_image.url,
                    description: response.posts[i].description,
                    like: response.posts[i].like,
                    comment: response.posts[i].comment,
                    user: response.users[i]
                })
            }
            cb(arr)
        } else {
            cb(false)
        }
    })
}

export const sign = (options, cb) => {
    fetching(options, 'POST', `${myIp}/api/v1/signup`, response => {
        response.status == 200 
            ? cb(true) 
            : cb(false)
    })
}

export const login = (options, cb) => {
    fetching(options, 'POST', `${myIp}/api/v1/login`, response => {
        response.status == 200 
            ? cb(response.user.id) 
            : cb(false)
    })
}

export const getAllUsers = (cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users`, response => {
        if (response.status == 200) {
            cb({user: response.user})
        } else {
            cb(false)
        }
    })
}

export const findUser = (username, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users/find/${username}`, response => {
        if (response.status == 200 ) {
            cb({ users: response.user })
        } else {
            alert('cannot connect with server')
        }
    })
}

export const userDetails = (id, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
        if (response.status == 200) {
            cb({user:response.user, posts:response.posts})
        } else {
            cb(false)
        }
    })
}

export const editProfile = (id, options, cb) => {
    fetching(options, 'PATCH', `${myIp}/api/v1/edit/${id}`, response => {
         if (response.status == 200) {
            cb({user:response.user, posts:response.posts})
        } else {
            cb(false)
        }
  })
}

export const newPost = (body, id, cb) => {
    fetch(`${myIp}/api/v1/users/${id}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify( body )
    })
    .then(response => response.json())
    .then(result => {
        if (result.status == 200) {
            cb(true)
        } else {
            cb(false)
        }
    })
}