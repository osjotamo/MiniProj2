import especialistaService from "@/api/especialista.service";
import {
    // Actions
    FETCH_ESPECIALISTAS,
    ADD_ESPECIALISTA,
    EDIT_ESPECIALISTA,
    REMOVE_ESPECIALISTA,

    // Mutations
    SET_ESPECIALISTAS,
    SET_MESSAGE//,
//    UPDATE_LIKES
} from "./especialista.constants";

const state = {
    especialistas: []
};

const getters = {
    getEspecialistas: state => state.especialistas,
    getEspecialistasById: state => id => state.especialistas.find(especialista => especialista._id === id),
    getMessage: state => state.message,

};

const actions = {
    [FETCH_ESPECIALISTAS]: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            especialistaService.getEspecialistas(rootState.auth.token)
                .then(
                    res => {
                        commit(SET_ESPECIALISTAS, res.body);
                        resolve(res)
                    },
                    err => {
                        commit(SET_MESSAGE, err.message)
                        reject(err)
                    });
        })
    },
    [ADD_ESPECIALISTA]: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            especialistaService.addEspecialista(rootState.auth.token, payload)
                .then(
                    res => {
                        commit(SET_MESSAGE, `O especialista ${res.body.name} foi adicionado com sucesso!`);
                        resolve(res)
                    }, err => {
                        commit(SET_MESSAGE, err.message)
                       reject(err)
                    });
        });
    },
    [EDIT_ESPECIALISTA]: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            especialistaService.editEspecialista(rootState.auth.token, payload)
                .then(
                    res => {
                        commit(SET_MESSAGE, `O especialista ${res.body.name} foi atualizado com sucesso!`);
                        resolve(res)
                    }, err => {
                        commit(SET_MESSAGE, err)
                        reject(err)
                    });
        });
    },
    [REMOVE_ESPECIALISTA]: ({ commit, rootState }, id) => {
        return new Promise((resolve, reject) => {
            especialistaService.removeEspecialista(rootState.auth.token, id)
                .then(res => {
                    commit(SET_MESSAGE, `O especialista foi removido com sucesso!`);
                    resolve(res)
                }, err => {
                    commit(SET_MESSAGE, err.message)
                    reject(err)
                });
        });
    }
};

export const mutations = {
    [SET_ESPECIALISTAS]: (state, especialistas) => {
        state.especialistas = especialistas;
    },
    [SET_MESSAGE]: (state, message) => {
        state.message = message;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}