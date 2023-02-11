import patrocinadorService from "@/api/patrocinador.service";
import {
    // Actions
    FETCH_PATROCINADORES,
    ADD_PATROCINADOR,
    EDIT_PATROCINADOR,
    REMOVE_PATROCINADOR,
    // Mutations
    SET_PATROCINADORES,
    SET_MESSAGE,
    UPDATE_LIKES
} from "./patrocinador.constants";

const state = {
    patrocinadores: []
};

const getters = {
    getPatrocinadores: state => state.patrocinadores,
    getPatrocinadoresById: state => id => state.patrocinadores.find(patrocinador => patrocinador._id === id),
    getMessage: state => state.message,

};

const actions = {
    [FETCH_PATROCINADORES]: ({ commit, rootState }) => {
        return new Promise((resolve, reject) => {
            patrocinadorService.getPatrocinadores(rootState.auth.token)
                .then(
                    res => {
                        commit(SET_PATROCINADORES, res.body);
                        resolve(res)
                    },
                    err => {
                        commit(SET_MESSAGE, err.message)
                        reject(err)
                    });
        })
    },
    [ADD_PATROCINADOR]: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            patrocinadorService.addPatrocinador(rootState.auth.token, payload)
                .then(
                    res => {
                        commit(SET_MESSAGE, `O patrocinador ${res.body.name} foi adicionado com sucesso!`);
                        resolve(res)
                    }, err => {
                        commit(SET_MESSAGE, err.message)
                        reject(err)
                    });
        });
    },
    [EDIT_PATROCINADOR]: ({ commit, rootState }, payload) => {
        return new Promise((resolve, reject) => {
            patrocinadorService.editPatrocinador(rootState.auth.token, payload)
                .then(
                    res => {
                        commit(SET_MESSAGE, `O patrocinador ${res.body.name} foi atualizado com sucesso!`);
                        resolve(res)
                    }, err => {
                        commit(SET_MESSAGE, err)
                        reject(err)
                    });
        });
    },
    [REMOVE_PATROCINADOR]: ({ commit, rootState }, id) => {
        return new Promise((resolve, reject) => {
            patrocinadorService.removePatrocinador(rootState.auth.token, id)
                .then(res => {
                    commit(SET_MESSAGE, `O patrocinador foi removido com sucesso!`);
                    resolve(res)
                }, err => {
                    commit(SET_MESSAGE, err.message)
                    reject(err)
                });
        });
    }
};

export const mutations = {
    [SET_PATROCINADORES]: (state, patrocinadores) => {
        state.patrocinadores = patrocinadores;
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