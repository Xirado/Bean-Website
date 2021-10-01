import axios from 'axios'
import EventBus from '@/events/event-bus.js'
var json_bigint = require('json-bigint')

export const backend_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8887' : 'https://bean.bz:8887'

export async function get(route, body) {
    const tokens = await getToken()
    const config = {
    headers: {
        access_token : tokens.access_token,
        refresh_token : tokens.refresh_token,
        expires_on : tokens.expires
        },
        transformResponse: (res) => {
            return json_bigint.parse(res);
        },
    }
    return await axios.get(`${backend_url}/${route}`, body, config)
}

export async function post(route, body) {
    const tokens = await getToken()
    const config = {
    headers: {
        access_token : tokens.access_token,
        refresh_token : tokens.refresh_token,
        expires_on : tokens.expires
        },
        transformResponse: (res) => {
            return json_bigint.parse(res);
        },
    }
    return await axios.post(`${backend_url}/${route}`, body, config)
}


export async function getToken() {
    const localStorage = window.localStorage
    if (!localStorage.getItem('code')) {
        return null
    }
    if (!localStorage.getItem('access_token') || !localStorage.getItem('refresh_token') || !localStorage.getItem('expires'))
    {
        const response = await fetchToken(localStorage.getItem('code'))
        if (!response.access_token)
        {
            return Promise.reject('Could not get data from API!')
        }
        const object = {
            'access_token' : response.access_token,
            'expires' : Math.round(Date.now() / 1000)+response.expires_in,
            'refresh_token' : response.refresh_token
        }
        localStorage.setItem('access_token', object.access_token)
        localStorage.setItem('refresh_token', object.refresh_token)
        localStorage.setItem('expires', object.expires)
        EventBus.$emit('LoginEvent', true)
        EventBus.$emit('userUpdated', object)
        return object
    }
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    const expires = localStorage.getItem('expires')
    if (expires > Math.round(Date.now() / 1000))
    {
        return {
            'access_token' : access_token,
            'refresh_token' : refresh_token,
            'expires' : expires
        }
    }
    const response = await fetchToken(localStorage.getItem('code'))
    if (!response.access_token)
    {
        return Promise.reject('Could not get data from API!')
    }
    const object = {
        'access_token' : response.access_token,
        'expires' : Math.round(Date.now() / 1000)+response.expires_in,
        'refresh_token' : response.refresh_token
    }
    localStorage.setItem('access_token', object.access_token)
    localStorage.setItem('refresh_token', object.refresh_token)
    localStorage.setItem('expires', object.expires)
    EventBus.$emit('userUpdated', object)
    return object
}


async function fetchToken(code) {
    const config = {
        headers: {
            code: code
        }
    }
    const response = await axios.get(`${backend_url}/token`, config)
    return response.data
}

export async function fetchLoginURL() {
    try {
        const response = await axios.get(`${backend_url}/login`)
        return response.data.url
    } catch(error) {
        console.log(error)
        return null
    }
}

export async function fetchInviteURL() {
    try {
        const response = await axios.get(`${backend_url}/invite`)
        return response.data.url
    } catch(error) {
        console.log(error)
        return null
    }
}

export async function fetchUser() {
    try {
        const token = await getToken()
        const config = {
            headers: {
                expires_on : token.expires,
                access_token : token.access_token,
                refresh_token : token.refresh_token
            }
        }
        const response = await axios.get(`${backend_url}/user`, config)
        return response.data
    } catch(error) {
        console.log(error)
        return null
    }
}

export function logout() {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('expires')
    window.localStorage.removeItem('code')
    EventBus.$emit('LoginEvent', false)
}

