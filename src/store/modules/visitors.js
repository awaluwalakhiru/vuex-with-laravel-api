import axios from "axios"

const state = {
    visitors: [],
    links: [],
    meta: [],
    visitor: {},
    visitorId: '',
}
const getters = {
    allVisitors: state => state.visitors,
    meta: state => state.meta,
    links: state => state.links,
    getId: state => state.visitorId,
    visitor: state => state.visitor,
}
const actions = {
    async fetchVisitors({ commit }, url) {
        const feed = (url == null) ? "http://127.0.0.1:8000/api/visitors" : url
        const response = await axios.get(feed)
        commit("setVisitors", response.data)
    },
    async getVisitor({ commit }, id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/visitors/${id}`)
        commit("setVisitor", response.data)
    },
    async postVisitor({ commit }, { name, email, address }) {
        const response = await axios.post("http://127.0.0.1:8000/api/visitors", {
            name, email, address
        }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        commit('setVisitors', response.data)
    },
    async updateVisitor({ commit }, { id, name, email, address }) {
        const response = await axios.put("http://127.0.0.1:8000/api/visitors", {
            id, name, email, address
        }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        commit('setVisitors', response.data)
    },
    async deleteVisitor({ commit }, id) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/visitors/${id}`)
        commit("setVisitor", response.data)
    }
}
const mutations = {
    setVisitors: (state, visitor) => {
        state.visitors = visitor.data
        state.links = visitor.links
        state.meta = visitor.meta
    },
    setVisitorId: (state, id) => {
        state.visitorId = id
    },
    setVisitor: (state, visitor) => {
        state.visitor = visitor.data
    },
    setDetail: (state, detail) => { state.detail = detail }
}

export default {
    state,
    getters,
    actions,
    mutations
}
