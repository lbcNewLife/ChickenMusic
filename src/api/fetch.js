import axios from 'axios'

export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: '/api',
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                path: options.path
            }
        })
        instance(options)
            .then(response => {
                const res = response.data
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
