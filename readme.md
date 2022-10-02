# RS Schooll async-race task
The App link: https://rolling-scopes-school.github.io/rmnvch-JSFE2022Q1/async-race/
<br>
<br>This App is a Single Page Application. This task's aim was to boost students' skills in communication with a server (fetch, REST API), async coding / Promises, JS animations. In addition to that the app also implements basics of CRUD apps. 
<h3>Overall description</h3>
The App allows user to hold races between pizza delivery guys you have in the Garage. All the race results are stored and user have access to them on "Winners" page.
You can create your own pizza guy by inputing name and choosing the color or use a shortcut to randomly generate 100 pizza guys with random names and colors by pressing "Hire pizza guys" button.The winner is being determined according to random server responce. Server sends speed for each pizza guy in addition to that it can randomly respond with 'engine broke' status for any of pizza guys. 
<br>The backend part is implemented using json server and was provided for this task by the school. I slightly modified in order to deploy on Heroku.
<h5>Key features:</h5>
<ol>
<li>
  The App is a SPA, all interaction with interface don't cause page reload.  
</li>
<li>
  There are 2 "views" - Garage and Winners.  
</li>
<li>
  User can create pizza guy with custom name and color otherwise they will be generated in a random way if input stays empty once clicking "create".   
</li>
<li>
  There's a shortcut for creating 100 randomly genrated pizza guys by pressing 'hire pizza guys'.    
</li>
<li>
  You can launch any particular pizza guy and then stop him. It doen't count as a race and that results will not get to the best ones.    
</li>
<li>
  There's a possibility to update or delete any participant.    
</li>
<li>
  Pressing 'Pizza race' enables race mode and lauches all pizza guys on the particular page.    
</li>
<li>
  Ascending and descending sorting on wins qty and best time are available in winners view.    
</li>
<li>
  The App is devided into logical modules - view, controller, model. Ipmplemented MVP pattern.    
</li>
</ol>
<h5>Additional UI features:</h5>
<ul>
<li>
  Total amount of pizza guys and current page are shown on the both "views" 
</li>
<li>
  Highlight of a participant which is being updated 
</li>
</ul>
<h5>Used technologies:</h5>
TypeScript
<br>Webpack
<br>ES Lint
<br>Prettier
