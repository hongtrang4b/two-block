<h1 align="center">Technical Specifications Renault RLINK</h1>

Here are the main technical guidelines for the front end developpement of the Renault-RLINK website.

Please feel free to discuss or propose alternatives if needed.


<br>

00. <a href="#repo">Repository</a>
00. <a href="#context">WebSite & Context</a>
00. <a href="#scopes">Scope</a>
00. <a href="#hash">HashTag environement switching</a>
00. <a href="#jslibs">JsLIbs</a>
00. <a href="#fonts">Fonts</a>
00. <a href="#jsDev">Javascript Developpement</a>
00. <a href="#videos">Videos</a>
00. <a href="#audios">Audio</a>
00. <a href="#speccase">Special Cases</a>


<h2 id="repo">Repository</h2>

Repository Github Frontend available [here](https://github.digitas.fr/renault/renault-rlink/)

The repository is based on the usual mightymade workflow of digitaslbi
(jade, bootstrap, less, modernisr, query) and grunt for server tasks - tasks documentation provided on [readme](https://github.digitas.fr/renault/renault-rlink/blob/master/README.md)

please submit pull requests on “develop” branch

please use bower and update bower.json for any additional js libs added to the project
please specify version of Js libraries used in package.json and bower.json files

<h2 id="context">WebSite & Context</h2>

Fixed Size - non responsive block   965x683

The templates of the pages will be produced for use for PHP pre push dynamisation.

Some 25 templates/pages are to pe produced. (ref: Functional specs)

Some final pages will not be produced if they are a part from the same template and can be reproduced dynamically (to confirm with PHP PM). However graphics for these pages need to be produced (backgrounds, button backgrounds/icons…)

Please provide a recap page containing a link for every page/template you have produced.


<h2 id="scopes">Scope</h2>

 For developping purposes the same site/code, should be used for all use cases:

        Desktop - site is included in an iframe

        Tablet - Standalone site ("please turn to landscape mode" popup enabled)

        Web view - (offline mode, direct linking to video/audio, no usage of Youtube api) 
        
 The "enviroment" could be switched by hashtag (#) handled by main Js.
 
 In coordination with the Back-end team the environement variable could be dynamic - OR - three different index files could be produced 
  
<h2 id="hash">HashTag Environement Switching</h2>

Usage (exclusively in developement) example : URL.com?backend=variable#env=tablet

This way, the Js code will capture only the hash (#) vars, not interfering with back end query (?) vars

example function :
```
function getQueryVariable(variable)
{
var query = window.location.hash.substring(1);
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
var pair = vars[i].split("=");
if(pair[0] == variable){return pair[1];}
}
return(false);
}
```

So one could implement it like this

```
//default value for env
var env=desktop;
if (getQueryVariable("env")) { env= getQueryVariable("env") ;}
```

<h2 id="jslibs">JsLibs</h2>

All Js code and libs should be compatible with desktop/tablets/ipad
 - use youtube (iframe) chromeless APi for online desktop/tablet
 - use direct acces video/audio for offline app
 - todo : a choice of animation libraries or CSS transitions + IE8 shiv ..to be decided

<h2 id="fonts">Fonts</h2>

List of fonts (Frutiger)
- Condensed
- Medium condensed
- Bold condensed

Use font_face inclusion in all needed formats (desktop +tablet) for crossbrowser/devices compatibility - attention IE8 supported!)
Please contact us if any problems in font format transformations  

<h2 id="jsDev">Javascript Developpement</h2>

<h3> Animations/ Transitions </h3>
- Fade In/out animations (Or CSS3 + IE8 shiv)
- Fade/In out or drop-out animations for a few modals or popins
- Page Menus - animated appearance/dissappearence of icons - on/after page load

<h3>Tabulated menu and page swap </h3>
- To be confirmed - there may be 2-3 templates that have tabulated menus (2-3 buttons). One button will be chosen by default. On button click, the interior page should change (no ajax, or JSONP calls, the block will already be present on the page, hidden or display none…)

<h3>Anticipate JS rules for dynamic number of objects</h3>
Use try/catch or other techniques for non-breakable js code depending of the number of elements present.
example: template menu consists of Six-buttons or divs that are going to be aniimated. Anticipate the possibility there are only 3 icons (dynamically inserted by PHP) the javascript code should not break or warn because the #div4 is non-existant...

<h2 id="videos">Videos</h2>


<h3> Online mode </h3>
- use youtube (iframe) chromeless api
plsease consult youtube api docs pages as needed:
youtube api reference :
https://developers.google.com/youtube/iframe_api_reference?csw

Configurator for youtube api:
https://developers.google.com/youtube/youtube_player_demo

<h3> Offline Mode Ipad app</h3>
Use an API or custom code for direct video access


<h3> Events on Videos </h3>
- for some pages, events, like go to another page should be launched on end of video 
- actions on event - load another page on video end
 
<h3> HTML/JS video inclusion principle </h3>

To be discussed: This is a proposition for easier back-end inclusion of videos in templates

In html - always use the same code in all video templates.
```
<div id="video" data-video="video source">Don't forget to include background img for ofline mode </div>
```

The video tag is remplaced by Javascript, to remplace the appropriate video source AND appropriate APi (youyube or custom code)


<h2 id="audios"> Audio </h2>

TO DO : We're still waiting for confirmation
Audio will be (probably) accesed directly - server  or local file
If any need for API this is an interesting lib for (crossbrowser) audio inclusion
http://www.schillmania.com/projects/soundmanager2/



<h2 id="speccase"> Special case - Devices Detection Tablettes </h2>
Only for Ipad
 - add user agent detection and conditionally show a modal screen/ at master top level on any page following these rules:
			- modal visible if device is ipad AND in portrait orientation
			- modal invisible if user is in landscape orientation 




