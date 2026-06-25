import { check, sleep } from "k6"
import http, { head } from "k6/http"

export const options = {
    stages: [
        {duration: "1m", target: 500},
        {duration: "2m", target: 1000},
        {duration: "1m", target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'],
        http_req_failed: ['rate<0.01']
    }
}

export function setup() {
    const loginRes = http.post('http://127.0.0.1:3333/login', JSON.stringify({
        email: "dansilvac256@gmail.com",
        password: "danielsilvac256"
    }), {
        headers: {'Content-Type': 'application/json'}
    })
    check(loginRes, {
        'Login realizado com sucesso': r => r.status === 200
    })

    return loginRes.json('token')
}

export default function (data) {
    const bookRes = http.get('http://127.0.0.1:3333/book?limit=10&page=1', {
        headers: {"Authorization": `Bearer ${data}`}
    })

    check(bookRes, {
        "livros listados com sucesso": r => r.status === 200
    })

    sleep(1)
}