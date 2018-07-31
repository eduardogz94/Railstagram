import { fetching } from './Fetch'
import { myIp } from '../Extra/MyIp'

export const getPosts = cb => {
    fetching({}, 'GET', `${myIp}/api/v1/users/all/posts`, response => {
        if (response.status == 200) {
            arr = []
            for (var i in response.posts) {
                arr.push({
                    post_id:response.posts[i].id,
                    image: response.posts[i].post_image.url,
                    description: response.posts[i].description,
                    likes: response.posts[i].likes,
                    comments: response.posts[i].comments,
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
            ? cb(response.id) 
            : cb(false)
    })
}

export const newSession = (auth, cb) => {
    fetching({auth}, 'POST', `${myIp}/api/v1/user_token`, response => {
        response.status != 400 ? 
        cb(response.jwt) 
        : cb(false)
    })
}

export const getAllUsers = (cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users`, response => {
        response.status == 200 
            ? cb({user: response.user})
            : cb(false)
    })
}

export const findUser = (username, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users/find/${username}`, response => {
        response.status == 200
            ? cb({ users: response.user })
            : console.log('cannot connect with server')
    })
}

export const userDetails = (id, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
        response.status == 200
            ? cb({user:response.user, posts:response.posts})
            : cb(false)
    })
}

export const editProfile = (id, options, cb) => {
    fetching(options, 'PATCH', `${myIp}/api/v1/edit/${id}`, response => {
        response.status == 200
            ? cb({user:response.user, posts:response.posts})
            : cb(false)
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
        result.status == 200
            ? cb(true)
            : cb(false)
    })
}

export const like = (id, postId, cb) => {
    fetching({}, 'POST', `${myIp}/api/v1/users/${id}/posts/${postId}/likes`, response => {
        response.status == 200 
            ? cb(response.like_id) 
            : cb(false)
    })
}

export const unlike = (user_id, postId, id, cb) => {
    fetching({}, 'DELETE', `${myIp}/api/v1/users/${user_id}/posts/${postId}/likes/${id}`, response => {
        response.status == 200 ?
            cb(true) :
            cb(false)
    })
}

export const getLike = (id, postId, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/user/${id}/post/${postId}/check_like`, response => {
        response.liked.status == true 
            ? cb(response.liked.like_id) 
            : cb(false)
    })
}

export const comment = (options,id, postId, cb) => {
    fetching(options, 'POST', `${myIp}/api/v1/users/${id}/posts/${postId}/comments`, response => {
        response.status == 200 
            ? cb(true) 
            : cb(false)
    })
}

export const getComments = (postId, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/posts/${postId}/comments`, response => {
        response.status == 200 
            ? cb(response.comments) 
            : cb(false)
    })
}

export const getFollowing = (id, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users/${id}/following`, response => {
        response.status == 200
            ? cb(response.following)
            : cb(false)
    })
}

export const getFollowers = (id, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users/${id}/followers`, response => {
        response.status == 200 
            ? cb(response.followers) 
            : cb(false)
    })
}

export const follow = (options, cb) => {
    fetching(options, 'POST', `${myIp}/api/v1/relationships`, response => {
        response.status == 200
            ? cb(true)
            : cb(false) 
    })
}