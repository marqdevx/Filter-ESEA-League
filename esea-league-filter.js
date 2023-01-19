function filter() {
  var teamList = document.getElementsByClassName('Tr');
  var qeuedTeams = [];
  var qeuedCount = 0;
  var removedTeams = 0;

  var country = prompt("Type the country to filter");
  for (let i = 1; i < teamList.length; i++) {
    if (teamList[i].childNodes[1].textContent.indexOf(country) == -1) {
      teamList[i].style.display = "none";
    } else {
      teamList[i].style.display = "";
      qeuedTeams[qeuedCount] = teamList[i];
      qeuedCount++;
    }
  }

  division = document.getElementById("level").value;

  for (let i = 0; i < qeuedCount; i++) {
    targetTeam = qeuedTeams[i];
    targetTeam.style.backgroundColor = 'rgb(51, 52, 51)';
    if (i % 2) targetTeam.style.backgroundColor = 'rgb(68, 68, 68)';

    ranking = targetTeam.childNodes[0].textContent.slice(0, targetTeam.childNodes[0].textContent.length - 1);

    switch (division) {
      case "open":
        cutOff = 192;
        break;
      case "intermediate":
        cutOff = 64;
        break;
      case "main":
        cutOff = 48;
        break;
      case "advanced":
        cutOff = 32;
        break;

    }
    if (ranking <= cutOff) {
      targetTeam.childNodes[0].style.backgroundColor = "green";
    } else {
      targetTeam.childNodes[0].style.backgroundColor = "red";
    }
  }
}

filter();
