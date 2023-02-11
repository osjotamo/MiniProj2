import API_URL from './config.js'

export const especialistaService = {
    async getEspecialistas(token) {
        let response = await fetch(`${API_URL}/especialistas`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async addEspecialista(token, payload) {
        const response = await fetch(`${API_URL}/especialistas`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async editEspecialista(token, payload) {
        const response = await fetch(`${API_URL}/especialistas/${payload._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    async removeEspecialista(token, id) {
        const response = await fetch(`${API_URL}/especialistas/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    }

};

function handleResponses(code) {
    let message = ""
    switch (code) {
        case 401:
            message = "Não está autorizado a executar esta ação!"
            break;
        default:
            message = "Mensagem desconhecida"
            break;
    }
    return message
}

export default especialistaService;