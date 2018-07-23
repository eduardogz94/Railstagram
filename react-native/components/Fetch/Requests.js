export const home = cb => {
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
            cb('error')
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
            ? cb(true) 
            : cb(false)
    })
}

export const findUser = (options, cb) => {
    fetching({}, 'GET', `${myIp}/api/v1/users`, response => {
        user = []
        if (response.status == 200) {
            user.push(response.user)
            cb(user)
        } else {
            cb('cannot connect with server')
        }
    })
}