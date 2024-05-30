import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, // número de usuários virtuais
  duration: '50s', // duração do teste
};

export default function () {
  const fakeData = { typeTask: "ordering", idCustomer: "1", items: ["hotdog"], price: 200, description: "completed", isVip: true }
  let res = http.post('http://127.0.0.1:30000/api/task/create', JSON.stringify(fakeData), { headers: { 'Content-Type': 'Application/json' } });
  check(res, {
    'status was 200': (r) => r.status == 200,
  });
  sleep(1);
}