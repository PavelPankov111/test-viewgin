export class Api {
    constructor(urlLogin) {
        this.urlLogin = urlLogin;
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    }

    _handleResponseError(err) {
        return Promise.reject(err.message)
    }

    login(login, password) {
        return fetch(this.urlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
}