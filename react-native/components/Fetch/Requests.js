import { fetching } from './Fetch'
import { myIp } from '../Extra/MyIp'

export const getPosts = cb => {
    fetching({}, 'GET', `${myIp}/api/v1/users/all/posts`, response => {
        if (response.status == 200) {
            arr = []
            for (var i in response.posts) {
                arr.push({
                    image: response.posts[i].post_image.url,
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
        user = []
        if (response.status == 200) {
            user.push(response.user)
            cb(user)
        } else {
            cb(false)
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