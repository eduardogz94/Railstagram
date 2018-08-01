export const fetching = (data, method, url, cb) => {
    switch (method) {
        case 'GET':
            {
                fetch(url, {
                    method: 'GET',
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        cb(res);
                    })
                    .catch(err => {
                        console.log(`FETCH COMPONENT > Error while making the request: ${err.message}`);
                    })
                break;
            }

        case 'POST':
            {
                let datajson = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json'
                    }
                };

                fetch(url, datajson)
                    .then(res => res.json())
                    .then(res => {
                        cb(res);
                    })
                    .catch(err => {
                        console.log(`FETCH COMPONENT > Error while making the request: ${err}`);
                        cb('no')
                    })
                break;
            }
        case 'PATCH':
            {
                let datajson = {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json'
                    }
                };

                fetch(url, datajson)
                    .then(res => res.json())
                    .then(res => {
                        cb(res);
                    })
                    .catch(err => {
                        console.log(`FETCH COMPONENT > Error while making the request: ${err.message}`);
                    })
                break;
            }

        case 'DELETE':
            {
                fetch(url, {
                    method: 'DELETE',
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(res => {
                    cb(res);
                })
                .catch(err => {
                    console.log(`FETCH COMPONENT > Error while making the request: ${err.message}`);
                })
                break;
            }
    }
};
