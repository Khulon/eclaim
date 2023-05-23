

const login = () => {
  const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
  let response = "";
  fetch('http://localhost:5000/login', {
    method: 'POST', 
    headers: header,
    body: JSON.stringify(loginDetails)})
    .then((response) => response.json())
    .then((resp) => console.log(resp));
};

export {login};