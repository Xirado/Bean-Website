import axios from 'axios'
import EventBus from '@/events/event-bus.js'
var json_bigint = require('json-bigint')

export const backend_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8887' : 'https://api.bean.bz'

export async function generateToken(code) {
    const body = {
        "code": code
    }

    const response = await axios.post(`${backend_url}/callback/discord`, body)
    const token = response.data.token
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('user', json_bigint.stringify(response.data.user))
    window.localStorage.setItem('last_login', Date.now()/1000)
    return token
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

export async function fetchLeaderboard(guild_id) {
    let config = {};

    const token = localStorage.getItem("token")

    if (token) {
        config.headers = {
            authorization: `Bearer ${token}`,
        };
    }
    
    const response = await axios.get(`${backend_url}/leaderboard/${guild_id}`, config)
    return response.data
}

export async function deleteRankedMember(user, guild) {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("Not logged in")
    }

    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        }
    }

    const guildId = guild.id
    const userId = user.id

    await axios.delete(`${backend_url}/leaderboard/${guildId}/members/${userId}`, config)
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

export async function fetchCommands() {
    try {
        const response = await axios.get(`${backend_url}/commands`)
        return response.data
    } catch(error) {
        console.log(error)
        return null
    }
}

export function logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('last_login')
    EventBus.$emit('LoginEvent', false)
}

