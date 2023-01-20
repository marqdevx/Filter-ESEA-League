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
    flagsCount++;
  }

  function fillDropDown() {
    for (let i = 0; i < totalFlags.length; i++) {
      addDropDownFlag(totalFlags[i]);
    }
  }

  function indexFlags() {
    addDropDownFlag("Country");

    for (let i = 1; i < teamList.length; i++) {
      addFlag(i);
    }

    totalFlags = totalFlags.sort();
    fillDropDown();
  }

  function largeCutOff(teamsSize) {
    let newCuttOff = 0;
    switch (true) {
      case (teamsSize < 17):
        newCuttOff = 8;
        break;
      case (teamsSize >= 17 && teamsSize < 24):
        newCuttOff = 8;
        break;
      case (teamsSize >= 24 && teamsSize < 32):
        newCuttOff = 12;
        break;
      case (teamsSize >= 32 && teamsSize < 48):
        newCuttOff = 16;
        break;
      case (teamsSize >= 48 && teamsSize < 64):
        newCuttOff = 24;
        break;
      case (teamsSize >= 64 && teamsSize < 96):
        newCuttOff = 32;
        break;
      case (teamsSize >= 96 && teamsSize < 128):
        newCuttOff = 48;
        break;
      case (teamsSize >= 128 && teamsSize < 192):
        newCuttOff = 64;
        break;
      case (teamsSize >= 192 && teamsSize < 256):
        newCuttOff = 96;
        break;
      case (teamsSize >= 256 && teamsSize < 384):
        newCuttOff = 128;
        break;
      case (teamsSize >= 384 && teamsSize < 512):
        newCuttOff = 192;
        break;
      case (teamsSize >= 512 && teamsSize < 768):
        newCuttOff = 256;
        break;
      case (teamsSize >= 768 && teamsSize < 1024):
        newCuttOff = 384;
        break;
      default:
        newCuttOff = 4;
        break;
    }
    return newCuttOff;
  }

  function smallCutOff(teamsSize) {
    let newCuttOff = 0;
    switch (true) {
      case (teamsSize < 48):
        newCuttOff = 8;
        break;
      case (teamsSize >= 48 && teamsSize < 64):
        newCuttOff = 16;
        break;
      case (teamsSize >= 64 && teamsSize < 96):
        newCuttOff = 24;
        break;
      case (teamsSize >= 96 && teamsSize < 128):
        newCuttOff = 32;
        break;
      case (teamsSize >= 128 && teamsSize < 192):
        newCuttOff = 48;
        break;
      case (teamsSize >= 192 && teamsSize < 255):
        newCuttOff = 64;
        break;
      default:
        newCuttOff = 4;
        break;
    }
    return newCuttOff;
  }

  function getCutOff() {
    let cutOffValue = 0;
    let teamsSize = teamList.length - 1;
    switch (division) {
      case "open":
        cutOffValue = largeCutOff(teamsSize);
        break;
      case "intermediate":
        cutOffValue = largeCutOff(teamsSize);
        break;
      case "main":
        cutOffValue = smallCutOff(teamsSize);
        break;
      case "advanced":
        cutOffValue = smallCutOff(teamsSize);
        break;
    }
    console.log("Division: " + division);
    console.log("Teams: " + teamsSize);
    console.log("Cutoff: " + cutOffValue);
    return cutOffValue;
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
    seasonStage = document.getElementById("round").value;
    let cutOff = getCutOff();

    for (let i = 0; i < qeuedCount; i++) {
      targetTeam = qeuedTeams[i];
      targetTeam.style.backgroundColor = 'rgb(51, 52, 51)';
      if (i % 2) targetTeam.style.backgroundColor = 'rgb(68, 68, 68)';

      ranking = targetTeam.childNodes[0].textContent.slice(0, targetTeam.childNodes[0].textContent.length - 1);

      if (ranking <= cutOff) {
        targetTeam.childNodes[0].style.backgroundColor = "green";
      } else {
        targetTeam.childNodes[0].style.backgroundColor = "red";
      }
    }
  }

  function showSelectorButton() {
    var regionBox = document.getElementById("region").parentElement.parentElement;
    flagBox = regionBox.cloneNode(true);
    flagBox.childNodes[0].childNodes[0].setAttribute("id", "flag");
    flagBox.childNodes[0].childNodes[0].onchange = function() {
      filter();
    };
    flagBox.childNodes[0].childNodes[0].innerHTML = "";

    regionBox.parentElement.parentElement.parentElement.append(flagBox);
  }
  showSelectorButton();
  indexFlags();
  filter();
}

doWork();