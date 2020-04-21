const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var data_query = "{\"query\":\"query {\\n repository(owner:\\\"transitco\\\", name:\\\"roadmap\\\") {\\n issues(last:20, states:OPEN) {\\n edges {\\n node {\\n title\\n url\\n body\\n }\\n }\\n }\\n }\\n}\"}";

var request = new XMLHttpRequest();

request.open("POST", "https://api.github.com/graphql");
request.setRequestHeader("content-type", "application/json");
request.responseType = 'json';
request.onload = function () {

// Begin accessing JSON data here
var data = this.response;
if (request.status >= 200 && request.status < 400) {
data.data.repository.issues.edges.forEach(issue => {
const card = document.createElement('div');
card.setAttribute('class', 'card');

const h2 = document.createElement('h2');
h2.textContent = issue.node.title;

const p = document.createElement('p');
issue.node.body = issue.node.body.substring(0, 300);
p.textContent = `${issue.node.body}...`;

container.appendChild(card);
card.appendChild(h2);
card.appendChild(p);
});
} else {
const errorMessage = document.createElement('marquee');
errorMessage.textContent = `Gah, it's not working!`;
app.appendChild(errorMessage);
}
}

request.send(data_query);
