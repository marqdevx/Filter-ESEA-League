# Filter-ESEA-League
Filter teams on the ESEA's ranking webpage, javascript to filter the teams of an specific country and set colors if they are qualified for playoffs

>The name ESEA is a trademark of ESL Gaming Online, Inc. 
>Tis a third-party browser extension and is not affiliated with ESEA or ESL Gaming Online, Inc.
>Use it under your responsability

## Features
* Only needs to be run once, everytime it detects a division change, refreshes itself.
* Color feedback for teams qualified/unqualified for playoffs, depending on the ladder ranking.
* Working for every past season (Ony for Challenger, Advanced, Main, Intermdiate and Open divisions).

## How it works
* It will filter all the teams, and show colors depending on the state of the team.

  * Green = qualified for playoffs
  * Red = not qualified for playoffs
* Choose a country to show **only** the teams from that specific country.

## How to run it
### Extension
Install the extension and forget to run the script, it will auto load once you are on the https://play.esea.net/league/standings page.

You can find the extension on [Firefox Add-ons platform](https://addons.mozilla.org/firefox/addon/esea-filter/)

### Console
1. Copy the content of the `esea-league-filter.js`.
2. Open your browser.
3. Open the console (Inspect element and console tab).
4. Paste it on your console input.

![image](https://user-images.githubusercontent.com/11246294/213602665-964eeee2-c799-4844-851e-0f23b59d1aad.png)

5. Run it.

### Bookmark
1. Copy the content of `esea-league-filter-bookmark.js`

![image](https://user-images.githubusercontent.com/11246294/213602085-f5baddac-8b9d-43e3-9957-7b5e7b858286.png)

2. Add a new bookmark on your browser.

![image](https://user-images.githubusercontent.com/11246294/213602168-8d0799b7-8d2f-4fb4-bf79-a28e83aee245.png)

3. Save the bookmark.
4. Once you are on the division's page, click once the bookmark.

## Screenshots
![image](https://user-images.githubusercontent.com/11246294/213807434-18a6cc9c-cda5-40a8-b3dc-394c40e36e9e.png)
![image](https://user-images.githubusercontent.com/11246294/213807480-18cd391a-09b6-4cff-a68f-f3715bbbd4c9.png)
![image](https://user-images.githubusercontent.com/11246294/213807509-505c72e8-bc11-41e4-8827-de4c447fa6c5.png)

## References
* Saw at: https://twitter.com/_Pitu_/status/1613854963364663296?s=20&t=JHM6d5cRPiwn8Ott1C376A
* Based on steps and code of [@JVDM](https://twitter.com/JVDM__) and [@lopownz](https://twitter.com/lopownz) from this [pastebin](https://pastebin.com/KZjS167p)
