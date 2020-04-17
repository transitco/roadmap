const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/transitco/roadmap/issues', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(issue => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h2 = document.createElement('h2');
      h2.textContent = issue.title;

      const p = document.createElement('p');
      issue.body = issue.body.substring(0, 300);
      p.textContent = `${issue.body}...`;

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

request.send();