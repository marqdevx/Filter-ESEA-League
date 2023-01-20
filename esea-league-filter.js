function doWork() {
  var teamList = document.getElementsByClassName('Tr');
  var qeuedTeams = [];
  var qeuedCount = 0;
  var removedTeams = 0;
  var totalFlags = [];
  var flagImages = [];
  var flagsCount = 0;

  var flagBox;

  function addDropDownFlag(flagName) {
    flagOptions = flagBox.childNodes[0].childNodes[0];
    let newOption = document.createElement("option");
    newOption.text = flagName;
    flagOptions.add(newOption);
  }


  function addFlag(indexTeam) {
    flagOptions = flagBox.childNodes[0].childNodes[0];

    let flagName = teamList[indexTeam].childNodes[1].childNodes[0].childNodes[0].title ?? teamList[indexTeam].childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent;
    for (let i = 0; i <= flagsCount; i++) {
      if (flagName == totalFlags[i]) return;
    }

    totalFlags[flagsCount] = flagName;

    addDropDownFlag(flagName);

    flagsCount++;
  }

  function indexFlags() {
    addDropDownFlag("Country");

    for (let i = 1; i < teamList.length; i++) {
      addFlag(i);
    }
  }

  function filter() {
    let flagBoxFilter = document.getElementById("flag");
    let country = flagBoxFilter.value;

    for (let i = 1; i < teamList.length; i++) {
      currentFlag = teamList[i].childNodes[1].childNodes[0].childNodes[0].title ?? teamList[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent;
      if (country == "Country") {
        currentFlag = country;
      }
      if (currentFlag != country) {
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

      let cutOff = 0;
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

  function showSelectorButton() {
    var regionBox = document.getElementById("region").parentElement.parentElement;
    flagBox = regionBox.cloneNode(true)
    flagBox.childNodes[0].childNodes[0].setAttribute("id", "flag");
    flagBox.childNodes[0].childNodes[0].onchange = function() {
      filter()
    };
    flagBox.childNodes[0].childNodes[0].innerHTML = "";

    regionBox.parentElement.parentElement.parentElement.append(flagBox)
  }
  showSelectorButton();
  indexFlags();
  filter();
}

doWork();
