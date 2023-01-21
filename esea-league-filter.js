var myInterval = setInterval(autoChecker, 500);

function autoChecker() {
  console.log("Checking");
  teamList = document.getElementsByClassName('Tr');
  exists = document.getElementById('flag');
  if (teamList.length > 1 && !exists) {
    doWork();
    clearInterval(myInterval);
    document.getElementById("level").onchange = function () {
      console.log("Switched division");
      myInterval = setInterval(autoChecker, 500);
    };
  }
}

function doWork() {
  class dropDownFilter {
    teamList = document.getElementsByClassName('Tr');
    totalFlags = [];
    flagImages = [];
    flagsCount = 0;
    flagBox = "";

    constructor() { };
    create() {
      var regionBox = document.getElementById("region").parentElement.parentElement;
      this.flagBox = regionBox.cloneNode(true);
      this.flagBox.childNodes[0].childNodes[0].setAttribute("id", "flag");
      this.flagBox.childNodes[0].style.top = "10px";
      this.flagBox.childNodes[0].childNodes[0].innerHTML = "";

      regionBox.parentElement.parentElement.parentElement.append(this.flagBox);

      this.flagBox = document.getElementById("flag");
    }
    addDropDownFlag(flagName) {
      let newOption = document.createElement("option");
      newOption.text = flagName;
      this.flagBox.add(newOption);
    }
    addFlag(indexTeam) {
      this.flagOptions = this.flagBox.childNodes[0].childNodes[0];

      let flagName = this.teamList[indexTeam].childNodes[1].childNodes[0].childNodes[0].title ?? this.teamList[indexTeam].childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent;
      for (let i = 0; i <= this.flagsCount; i++) {
        if (flagName == this.totalFlags[i]) return;
      }

      this.totalFlags[this.flagsCount] = flagName;
      this.flagsCount++;
    }

    fillDropDown() {
      for (let i = 0; i < this.totalFlags.length; i++) {
        this.addDropDownFlag(this.totalFlags[i]);
      }
    }

    indexFlags() {
      this.addDropDownFlag("Country");

      for (let i = 1; i < this.teamList.length; i++) {
        this.addFlag(i);
      }

      this.totalFlags = this.totalFlags.sort();
      this.fillDropDown();
    }

    selectedCountry() {
      return document.getElementById("flag").value;
    }
  } countryBox = new dropDownFilter;

  class eseaHelper {
    teamList = document.getElementsByClassName('Tr');
    qeuedTeams = [];
    removedTeams = 0;

    largeCutOff(teamsSize) {
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

    smallCutOff(teamsSize) {
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

    getDivision() {
      return document.getElementById("level").value;
    }

    getSeasonStage() {
      return seasonStage = document.getElementById("round").value;
    }

    getCutOff() {
      let cutOffValue = 0;
      let teamsSize = this.teamList.length - 1;
      switch (esea.getDivision()) {
        case "open":
          cutOffValue = esea.largeCutOff(teamsSize);
          break;
        case "intermediate":
          cutOffValue = esea.largeCutOff(teamsSize);
          break;
        case "main":
          cutOffValue = esea.smallCutOff(teamsSize);
          break;
        case "advanced":
          cutOffValue = esea.smallCutOff(teamsSize);
          break;
      }
      return cutOffValue;
    }

    printInfo() {
      console.log("Division: " + this.getDivision());
      let size = this.teamList.length - 1;
      console.log("Teams: " + size);
      console.log("Cutoff: " + this.getCutOff());
    }

    filter() {
      let qeuedCount = 0;
      for (let i = 1; i < this.teamList.length; i++) {

        let currentFlag = this.teamList[i].childNodes[1].childNodes[0].childNodes[0].title ?? this.teamList[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent;
        if (countryBox.selectedCountry() == "Country") {
          currentFlag = countryBox.selectedCountry();
        }
        if (currentFlag != countryBox.selectedCountry()) {
          this.teamList[i].style.display = "none";
        } else {
          this.teamList[i].style.display = "";
          this.qeuedTeams[qeuedCount] = this.teamList[i];
          qeuedCount++;
        }
      }
      for (let i = 0; i < qeuedCount; i++) {
        let targetTeam = this.qeuedTeams[i];
        targetTeam.style.backgroundColor = 'rgb(51, 52, 51)';
        if (i % 2) targetTeam.style.backgroundColor = 'rgb(68, 68, 68)';

        let teamRank = targetTeam.childNodes[0].textContent.slice(0, targetTeam.childNodes[0].textContent.length - 1);

        if (teamRank <= esea.getCutOff()) {
          targetTeam.childNodes[0].style.color = "green";
        } else {
          targetTeam.childNodes[0].style.color = "red";
        }
      }
    }
  } esea = new eseaHelper();

  countryBox.create();
  countryBox.indexFlags();

  document.getElementById("flag").onchange = function () {
    esea.filter();
  };

  esea.printInfo();
  esea.filter();
}