import User from "../models/User";

abstract class UserMethods {

    public static async register(user: User): Promise<void | Error> {
        return await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.toJSONWithPassword())
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
            })
            .catch((error) => {
                return error
            });
    }

    public static async login(email: string, password: string): Promise<void | Error> {
        return await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data
            })
            .then((data) => this.addToken(data.token))
            .catch((error) => {
                return error
            });
    }

    public static async logout(): Promise<void | Error> {
        return await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
        })
            .then(response => {
                this.removeToken()
            })
            .catch((error) => error);
    }

    public static async update(user: User): Promise<void | Error> {
        return await fetch('http://localhost:8000/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
            body: JSON.stringify(user.toJSON())
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
            })
            .catch((error) => {
                return error
            });
    }

    public static async getDetails(login: string, token: string): Promise<User | Error> {
        return await fetch('http://localhost:8000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserMethods.getToken()
            },
            body: login
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return User.fromJSON(data.user)
            })
            .catch((error) => {
                return error
            })
    }

    public static getToken(): string | null {
        return localStorage.getItem("token")
    }

    public static addToken(token: string): void {
        localStorage.setItem("token", token)
    }

    public static removeToken(): void {
        localStorage.removeItem("token")
    }
}

export default UserMethods