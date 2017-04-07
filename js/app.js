// loads page with foundation elements
// helps page center, or look better in general
$(document).foundation();

// Various vars used in the js file.
{
  var time = 1000;
  var windowStatus = 'learning';
  var playedPlatform1 = false;
  var playedPlatform2 = false;
  var playedPlatform3 = false;
  var triedPlatform1  = false;
  var triedPlatform2  = false;
  var triedPlatform3  = false;
  var pass1 = [];
  var pass2 = [];
  var pass3 = [];
  var trying = false;
  var tryingCurrentValue = 0;
  var tryingAgainstArray = [];
  var tryingEnteredArray = [];
  var testingCurrent = 0;
  var passTry1 = [];
  var platformPass1;
  var passTry2 = [];
  var platformPass2;
  var passTry3 = [];
  var passwordTries = [];
  var platformPass3;
  var testSetupDone = false;
  var testversion = 0;
  var testing = false;
  var platforms = [,'Facebook','Email','Instagram'];
  var testingCurrent = 0;
  var triesOnPass = [,0,0,0];
  var keys = {};
  var platformTrying = '';
  var logText = '';
}

// Function is used to generate a new interaction id per app load
// the implmentation "guarantees" that each load gets a unique id for logging
// for more information about RFC4122 please refer to
// https://www.ietf.org/rfc/rfc4122.txt
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
var uniqueInteractionID = guid();

// This prototype for arrays is used to remove from a js array a certain array
// elem or a range of elems. The code used is under MIT License and was
// copied from https://gist.github.com/danro/988333
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


// Functions

// Main function responsible for playing a sound when key is 'triggered'
// Triggered implies clicked or pushed
// The script grabs the appropriate audio element in HTML and plays it.
// If a audio is already being played, it stops the audio and plays it again.
    // (clicking twice on a key simultaneously)
function playKey(thisKeyNum){
  if(thisKeyNum >= 10){
    var keyDivName = '#key'+thisKeyNum + ' img';
  }else{
    var keyDivName = '#key0' + thisKeyNum + ' img';
  }
  var audioVar = document.getElementById('sound'+thisKeyNum);
  if(!audioVar.paused){

    // make key normal
    var filterVal = 'brightness(100%)';
    $(keyDivName)
      .css('filter',filterVal)
      .css('webkitFilter',filterVal)
      .css('mozFilter',filterVal)
      .css('oFilter',filterVal)
      .css('msFilter',filterVal);

    // make key change color
    var filterVal = 'brightness(60%)';
    $(keyDivName)
      .css('filter',filterVal)
      .css('webkitFilter',filterVal)
      .css('mozFilter',filterVal)
      .css('oFilter',filterVal)
      .css('msFilter',filterVal);

    // add timeout to change color again
    setTimeout( function(){
      var filterVal = 'brightness(100%)';
      $(keyDivName)
        .css('filter',filterVal)
        .css('webkitFilter',filterVal)
        .css('mozFilter',filterVal)
        .css('oFilter',filterVal)
        .css('msFilter',filterVal);
    }, (audioVar.duration* 1000));

    audioVar.currentTime = 0;
    audioVar.play();
  }
  else{
    // make key change color
    var filterVal = 'brightness(60%)';
    $(keyDivName)
      .css('filter',filterVal)
      .css('webkitFilter',filterVal)
      .css('mozFilter',filterVal)
      .css('oFilter',filterVal)
      .css('msFilter',filterVal);

    // add timeout to change color again
    setTimeout( function(){
      var filterVal = 'brightness(100%)';
      $(keyDivName)
        .css('filter',filterVal)
        .css('webkitFilter',filterVal)
        .css('mozFilter',filterVal)
        .css('oFilter',filterVal)
        .css('msFilter',filterVal);
    }, (audioVar.duration* 1000));

    audioVar.play();
  }
}

// These functions handle all key push events
// The keydown listener on the document catches all key pushed.
    // It checks if an try is progress; if it is, it send the event to keydowntoinput
        // The keydowntoinput() function gets the appropriate key number and sends
        // it to getInput()
    // It adds the keydown to keys array defined above.
        // This array is always looped over by audioLoop(). This allows for pushing
        // multiple keys at once and still have them play. Without this implementation,
        // the key would only play once the previous audio is completed.
    // The keydown listener logs all keys pushed
// The keyup listener removes the key value from keys array, effectively stopping
// repeated play of the audio once pushed.
$(document).keydown(function(e){
  if(trying){
    keydowntoinput(e);
  }
  keypushlog(e);keys[e.which] = true;
}).keyup(function(e){keys[e.which] = false;});
function keydowntoinput(e){
  if(e.which == 49) {
    // 1 enter pressed
    getInput(document.getElementById("keyimage01"));
  }
  if(e.which == 50) {
    // 2 enter pressed
    getInput(document.getElementById("keyimage02"));
  }
  if(e.which == 51) {
    // 3 enter pressed
    getInput(document.getElementById("keyimage03"));
  }
  if(e.which == 52) {
    // 4 enter pressed
    getInput(document.getElementById("keyimage04"));
  }
  if(e.which == 53) {
    // 5 enter pressed
    getInput(document.getElementById("keyimage05"));
  }
  if(e.which == 54) {
    // 6 enter pressed
    getInput(document.getElementById("keyimage06"));
  }
  if(e.which == 55) {
    // 7 enter pressed
    getInput(document.getElementById("keyimage07"));
  }
  if(e.which == 56) {
    // 8 enter pressed
    getInput(document.getElementById("keyimage08"));
  }
  if(e.which == 57) {
    // 9 enter pressed
    getInput(document.getElementById("keyimage09"));
  }
  if(e.which == 48) {
    // 0 enter pressed
    getInput(document.getElementById("keyimage10"));
  }
  if(e.which == 189) {
    // - enter pressed
    getInput(document.getElementById("keyimage11"));
  }
  if(e.which == 187) {
    // + enter pressed
    getInput(document.getElementById("keyimage12"));
  }
}
function keypushlog(e){
  if(e.which == 49) {
    // 1 enter pressed
    addToLog(windowStatus,'key push',{'key':'1'});
  }
  if(e.which == 50) {
    // 2 enter pressed
    addToLog(windowStatus,'key push',{'key':'2'});
  }
  if(e.which == 51) {
    // 3 enter pressed
    addToLog(windowStatus,'key push',{'key':'3'});
  }
  if(e.which == 52) {
    // 4 enter pressed
    addToLog(windowStatus,'key push',{'key':'4'});
  }
  if(e.which == 53) {
    // 5 enter pressed
    addToLog(windowStatus,'key push',{'key':'5'});
  }
  if(e.which == 54) {
    // 6 enter pressed
    addToLog(windowStatus,'key push',{'key':'6'});
  }
  if(e.which == 55) {
    // 7 enter pressed
    addToLog(windowStatus,'key push',{'key':'7'});
  }
  if(e.which == 56) {
    // 8 enter pressed
    addToLog(windowStatus,'key push',{'key':'8'});
  }
  if(e.which == 57) {
    // 9 enter pressed
    addToLog(windowStatus,'key push',{'key':'9'});
  }
  if(e.which == 48) {
    // 0 enter pressed
    addToLog(windowStatus,'key push',{'key':'10'});
  }
  if(e.which == 189) {
    // - enter pressed
    addToLog(windowStatus,'key push',{'key':'11'});
  }
  if(e.which == 187) {
    // + enter pressed
    addToLog(windowStatus,'key push',{'key':'12'});
  }
}
function audioLoop(){
  var triggerid = -1;

  if(keys[49]) {
    // 1 enter pressed
    triggerid = 1;
  }
  if(keys[50]) {
    // 2 enter pressed
    triggerid = 2;
  }
  if(keys[51]) {
    // 3 enter pressed
    triggerid = 3;
  }
  if(keys[52]) {
    // 4 enter pressed
    triggerid = 4;
  }
  if(keys[53]) {
    // 5 enter pressed
    triggerid = 5;
  }
  if(keys[54]) {
    // 6 enter pressed
    triggerid = 6;
  }
  if(keys[55]) {
    // 7 enter pressed
    triggerid = 7;
  }
  if(keys[56]) {
    // 8 enter pressed
    triggerid = 8;
  }
  if(keys[57]) {
    // 9 enter pressed
    triggerid = 9;
  }
  if(keys[48]) {
    // 0 enter pressed
    triggerid = 10;
  }
  if(keys[189]) {
    // - enter pressed
    triggerid = 11;
  }
  if(keys[187]) {
    // + enter pressed
    triggerid = 12;
  }

  if(triggerid > -1){
    playKey(triggerid);
  }
  setTimeout(audioLoop, 1);
}
audioLoop();

// The learn start function triggers random password generation.
function learnStart(){
  addToLog('learning','start',{});
  pass1 = [];
  pass2 = [];
  pass3 = [];
  // generate 3 passwords
  for(var i = 0; i < 8; i++){
    pass1.push(Math.floor((Math.random() * 12) + 1));
    pass2.push(Math.floor((Math.random() * 12) + 1));
    pass3.push(Math.floor((Math.random() * 12) + 1));
  }
  // console.log("pass1: " + pass1);
  addToLog('learning','fb password generated', {"password":''+ pass1});
  // console.log("pass2: " + pass2);
  addToLog('learning','email password generated', {"password":''+ pass2});
  // console.log("pass3: " + pass3);
  addToLog('learning','ig password generated',{"password":''+ pass3});
  // hide section-1 and show section-2 and section-3
  $(".section-1").removeAttr('style').css('display','none');
  $(".section-2").removeAttr('style').css('display','block');
  $(".section-3").removeAttr('style').css('display','block');
  $(".section-4").removeAttr('style').css('display','none');
  $(".header-1").removeAttr('style').css('display','block');
  $(".header-2").removeAttr('style').css('display','none');
}

// This function allows for playing (using playkey function implemented above)
// an array of keys in succession
function playOnKeyboard(thisarray){
  var currtime = time;
  jQuery.each( thisarray, function( i, val ) {
    setTimeout( function(){ playKey(val); }, currtime);
    currtime += time;
  });
}

// This function gets the appropriate password generated by learnStart() using the
// value attribute its provided. It uses playOnKeyboard(...) function above to
// achieve this.
function playPassword(valuenameofelem){
  $('.buttonNotMain').attr("disabled", true);
  if(valuenameofelem == "fb-learn"){
    playOnKeyboard(pass1);
  }else if(valuenameofelem == "em-learn"){
    playOnKeyboard(pass2);
  }else if(valuenameofelem == "ig-learn"){
    playOnKeyboard(pass3);
  }
  setTimeout( function(){ $('.buttonNotMain').attr("disabled", false); }, time*9);
}

// The function is called everytime a trigger IN TRYING / TESTING mode is intiated.
// A trigger is defined as a key click or push.
// The input is added to a inputarray declared above each time the function is called.
// Once 8 triggers are entered, the function tests it against tryingAgainstArray which
// stored the password array being tested or tried.
// A reset or cancel button is available to user
    // reset button calls resettrying function. It deletes all entries stored by the getInput
        // function in the array storing triggers.
    // cancel button is ONLY AVAILBLE DURING TRYING and cancels a try. Returns user to
        // try page and resets all stored values.
// Two modes exist. Trying or testing
// If only trying
    // shows correct answer or incorrect answer message (through modal) to user.
    // It resets after try to let user try again
// If testing
    // After receiving all 8 triggers, the function calls setupNextTest with a flag
    // appropriate to the result of compring entered vs trying against array.
    // The function is furthur called by setupNextTest if requried.
function getInput(thisKeyPushed){
  if(tryingCurrentValue == 7){
    tryingEnteredArray[tryingCurrentValue] = $(thisKeyPushed).attr('keyNum');
    $("#selectedKey"+(tryingCurrentValue+1)).html('<p>' + $(thisKeyPushed).attr('keyNum') + '</p>')

    if(!testing){
      if(tryingEnteredArray.toString() == tryingAgainstArray.toString()){
        $('#correctAnswer').foundation('open');
        addToLog('trying','try correct',{"enteredkeys":'' + tryingEnteredArray.toString(), "correctkeys":'' + tryingAgainstArray.toString()});
      }else{
        $('#incorrectAnswer').foundation('open');
        addToLog('trying','try incorrect',{"enteredkeys":'' + tryingEnteredArray.toString(), "correctkeys":'' + tryingAgainstArray.toString()});
      }
      resettrying();
    }else{
      if(tryingEnteredArray.toString() == tryingAgainstArray.toString()){
        setupNextTest(1);
      }else{
        setupNextTest(0);
      }
      resettrying();
    }
  }
  else{
    tryingEnteredArray[tryingCurrentValue] = $(thisKeyPushed).attr('keyNum');
    $("#selectedKey"+(tryingCurrentValue+1)).html('<p>' + $(thisKeyPushed).attr('keyNum') + '</p>');
    tryingCurrentValue += 1;
  }
}
function cleanuptrying(){
  trying = false;
  tryingCurrentValue = 0;
  tryingAgainstArray = [];
  tryingEnteredArray = [];
  for(var i = 1; i <= 8; i++){
    $("#selectedKey"+i).html('<p>x</p>');
  }
  $('.buttonNotMain').attr("disabled", false);
}
function resettrying(){
  tryingEnteredArray = [];
  tryingCurrentValue = 0;
  for(var i = 1; i <= 8; i++){
    $("#selectedKey"+i).html('<p>x</p>');
  }
}

// function sets up password entry to compared to
function checkForPassword(list){
  $('.buttonNotMain').attr("disabled", true);
  if(list == "fb-try"){
    tryingAgainstArray = pass1;
  }else if(list == "em-try"){
    tryingAgainstArray = pass2;
  }else if(list == "ig-try"){
    tryingAgainstArray = pass3;
  }
  // setTimeout( function(){ $('.buttonNotMain').attr("disabled", false); }, time*9);
}

// It sets up in a random order all the tests to be performed during testing phase
function setupPassTryValue(){
  testversion++;
  var arraystart = [pass1,pass2,pass3];
  var namestart = ["Facebook","Email","Instagram"];

  var position1 = Math.floor(Math.random()*(2-0+1)+0);
  passTry1 = arraystart[position1];
  platformPass1 = namestart[position1];
  arraystart.remove(position1);
  namestart.remove(position1);

  var position2 = Math.floor(Math.random()*(1-0+1)+0);
  passTry2 = arraystart[position2];
  platformPass2 = namestart[position2];
  arraystart.remove(position2);
  namestart.remove(position2);

  passTry3 = arraystart[0];
  platformPass3 = namestart[0];

  // update platforms
  platforms[1] = platformPass1;
  platforms[2] = platformPass2;
  platforms[3] = platformPass3;

  // update array of passwordTries
  passwordTries[1]  = passTry1;
  passwordTries[2]  = passTry2;
  passwordTries[3]  = passTry3;

  testSetupDone = true;
}

// This function serves two purposes
    // The function sets testing environment using setupPassTryValue func above
    // The function calls getinput on appropriate password
    // The function keeps track of correct and incorrect entries made during testing
        // It keeps track of number of tries made for a password.
        // If the number reaches 3 OR user enters corect password, it moves forward
          // to testing next password.
        // It after testing phase shows appropriate message.
// The function is called by and called open by getinput while in testing phase
function setupNextTest(flag){
  trying = true;
  testing = true;
  $('.try-cancel').attr('disabled','true');

  // initial setup of vars
  if(!testSetupDone){
    setupPassTryValue();
  }

  // if testing just started
  if(testingCurrent == 0){
    testingCurrent++;
    addToLog('learning','testing proceeds', {"platform":''+ platformPass1});
  }

  // check flag received
  if(flag == 0){
    // failure
    triesOnPass[testingCurrent]++;
    if(triesOnPass[testingCurrent] == 3){
      $('#testingPasswordEnteredWrongNoTriesLeft').foundation('open');
      addToLog('testing','last try incorrect',{"platform":platforms[testingCurrent],"enteredkeys":'' + tryingEnteredArray.toString(), "correctkeys":'' + tryingAgainstArray.toString()});
      testingCurrent += 1;
      addToLog('learning','testing proceeds', {"platform":''+ platforms[testingCurrent]});
    }else{
      addToLog('testing','try incorrect',{"platform":platforms[testingCurrent],"enteredkeys":'' + tryingEnteredArray.toString(), "correctkeys":'' + tryingAgainstArray.toString()});
      $('#testingPasswordEnteredWrong').foundation('open');
    }
  }else if(flag == 1){
    // success
    $('#correctAnswer').foundation('open');
    addToLog('testing','test correct',{"platform":platforms[testingCurrent],"enteredkeys":'' + tryingEnteredArray.toString(), "correctkeys":'' + tryingAgainstArray.toString()});
    testingCurrent++;
    addToLog('learning','testing proceeds', {"platform":''+ platforms[testingCurrent]});
  }

  // update stats
  tryingAgainstArray = passwordTries[testingCurrent];
  if(testingCurrent > 3 || triesOnPass[3] >= 3){
    trying = false;
    testing = false;
    if(testversion == 1){
      $(".section-1").removeAttr('style').css('display','none');
      $(".section-2").removeAttr('style').css('display','block');
      $(".section-3").removeAttr('style').css('display','none');
      $(".section-4").removeAttr('style').css('display','none');
      $(".section-5").removeAttr('style').css('display','none');
      $(".section-6").removeAttr('style').css('display','block');
      $(".header-1").removeAttr('style').css('display','none');
      $(".header-2").removeAttr('style').css('display','none');
      testing = false;
      platforms = [,'Facebook','Email','Instagram'];
      testingCurrent = 0;
      triesOnPass = [,0,0,0];
      passTry1 = [];
      platformPass1;
      passTry2 = [];
      platformPass2;
      passTry3 = [];
      passwordTries = [];
      platformPass3;
      testSetupDone = false;
      addToLog('status','User finished testing phase 1',{});
    }else{
      $(".section-1").removeAttr('style').css('display','none');
      $(".section-2").removeAttr('style').css('display','block');
      $(".section-3").removeAttr('style').css('display','none');
      $(".section-4").removeAttr('style').css('display','none');
      $(".section-5").removeAttr('style').css('display','block');
      $(".section-6").removeAttr('style').css('display','none');
      $(".header-1").removeAttr('style').css('display','none');
      $(".header-2").removeAttr('style').css('display','none');
      addToLog('status','User finished testing phase 2',{});
    }
  }
  $('#platformName').html(platforms[testingCurrent]);

}

// Functions are used for logging purposes.
// The addToLog function makes an ajax call to a mongodb server hosted on mLabs.
// This allows for maintaining logs even with incomplete / interrupted entries.
function addToLog(modeText, thisText, thisObj){
  var obj = {};
  obj.datetime = {"$date": new Date().toISOString()};
  obj.interationId = uniqueInteractionID;
  obj.message = thisText;
  obj.mode = modeText;
  obj.data = thisObj;

  // console.log(JSON.stringify(obj));
  $.ajax( { url: "https://api.mlab.com/api/1/databases/pianopasslogging/collections/dblog?apiKey=0I94b1RsYrpJKmvYnt2blriERq7IKsKf",
		  data: JSON.stringify(obj),
		  type: "POST",
		  contentType: "application/json"} );
}
function addToLogHelper(thisText, keynum){
  if(!testing){
    addToLog(windowStatus,thisText,{'key':keynum, 'platform':platformTrying});
  }else{
    addToLog(windowStatus,thisText,{'key':keynum, 'platform':platforms[testingCurrent]});
  }

}

// Listensers

// Shows and hides appropriate things when page loads
$(document).ready(function(){
  // hide all sections except section-0 and section-1
  // $(".section-1").css('display','initial');
  $(".section-2").css('display','none');
  $(".section-3").css('display','none');
  $(".section-4").css('display','none');
  $(".section-5").css('display','none');
  $(".section-6").css('display','none');
  $(".header-1").css('display','none');
  $(".header-2").css('display','none');



  addToLog('status','User document ready.', {});
  addToLog('systeminfo','Browser name: ' + navigator.appName, {});
  addToLog('systeminfo','Browser codename: ' + navigator.appCodeName, {});
  addToLog('systeminfo','Browser enginename: ' + navigator.product, {});
  addToLog('systeminfo','Browser language: ' + navigator.language, {});
  addToLog('systeminfo','OS platform: ' + navigator.platform, {});
  addToLog('systeminfo','Version info: ' + navigator.appVersion, {});

});

// Each key image when clicked on either
    // plays key using playKey(...) function above, or
    // if in trying / testing mode, when clicked the key val is sent to getInput
        // and key is played using playKey(...)
$(".keyImage").click(function(){
  if(!trying){
    playKey($(this).attr('keyNum'));
  }else{
    playKey($(this).attr('keyNum'));
    getInput(this);
  }
});

// This is a click listener on the first button that starts the trying phase
// "gurantees" user reads instructions
$(".learn").click(function(){
  var disabledBool = $(this).attr("disabled");
  // console.log(disabledBool)
  if(disabledBool == true || disabledBool == "disabled"){
    // ignore click 9
  }else{
    // run playPassword
    addToLog('learning','played password',{"platform": $(this).attr('platform')});
    if($(this).attr('value') == 'fb-learn'){
      playedPlatform1 = true;
    }else if($(this).attr('value') == 'em-learn'){
      playedPlatform2 = true;
    }else if($(this).attr('value') == 'ig-learn'){
      playedPlatform3 = true;
    }
    playPassword($(this).attr('value'));
  }
});

// These listeners trigger try functionality
// They show and hide appropriate sections and make sure appropriate functions
// detailed above are called.
$(".try").click(function(){
  var disabledBool = $(this).attr("disabled");
  trying = true;
  if(disabledBool == true || disabledBool == "disabled"){
    // ignore click
  }else{
    // hide section-1, section-3 and show section-2 and section-4
    $(".section-1").removeAttr('style').css('display','none');
    $(".section-2").removeAttr('style').css('display','block');
    $(".section-3").removeAttr('style').css('display','none');
    $(".section-4").removeAttr('style').css('display','block');

    $("#platformName").html($(this).attr('platform'));
    addToLog('learning', 'user begins try activity',{"platform": $(this).attr('platform')});
    windowStatus = 'trying',
    platformTrying = $(this).attr('platform');
    if($(this).attr('value') == 'fb-try'){
      triedPlatform1 = true;
    }else if($(this).attr('value') == 'em-try'){
      triedPlatform2 = true;
    }else if($(this).attr('value') == 'ig-try'){
      triedPlatform3 = true;
    }
    checkForPassword($(this).attr('value'));
  }
});
// calls resettrying()
$(".try-reset").click(function(){
  resettrying();
  addToLog('trying','user reset try',{});
});
// calls cleanuptrying()
$(".try-cancel").click(function(){
  if($(this).attr("disabled") == 'true' || $(this).attr("disabled") == 'disabled'){
    // do nothing
  }else{
    cleanuptrying();
    // hide section-1, section-4 and show section-2 and section-3
    $(".section-1").removeAttr('style').css('display','none');
    $(".section-2").removeAttr('style').css('display','block');
    $(".section-3").removeAttr('style').css('display','block');
    $(".section-4").removeAttr('style').css('display','none');

    addToLog('trying', 'user cancelled try',{});
    windowStatus = 'learning';
  }

});

// Listen to begin testing button shown while trying.
// The button ONLY triggers after users have played AND tried atleast all platform
// passwords ATLEAST once. If this is not the case, a modal detailing the issue is
// shown to the user. Else the testing phase begins
// The function uses setupNextTest to begin testing
$("#readytestgo").click(function(){
  if(playedPlatform1 && playedPlatform2 && playedPlatform3 && triedPlatform1 && triedPlatform2 && triedPlatform3){
    // addToLog('User began test');
    $(".section-1").removeAttr('style').css('display','none');
    $(".section-2").removeAttr('style').css('display','block');
    $(".section-3").removeAttr('style').css('display','none');
    $(".section-4").removeAttr('style').css('display','block');
    $(".header-1").removeAttr('style').css('display','none');
    $(".header-2").removeAttr('style').css('display','block');
    addToLog(windowStatus,'user moved to testing phase',{});
    windowStatus = 'testing';
    setupNextTest(-1);
  }else{
    $('#notlearnedeverything').foundation('open');
  }

});
// The listener resets to not testing phase and then begins testing again
// for the second round. 
// The button is shown after the user has completed first testing phase.
$("#readytestgosecond").click(function(){
  $(".section-1").removeAttr('style').css('display','none');
  $(".section-2").removeAttr('style').css('display','block');
  $(".section-3").removeAttr('style').css('display','none');
  $(".section-4").removeAttr('style').css('display','block');
  $(".section-6").removeAttr('style').css('display','none');
  $(".header-1").removeAttr('style').css('display','none');
  $(".header-2").removeAttr('style').css('display','block');
  addToLog(windowStatus,'user moved to testing phase',{});
  windowStatus = 'testing';
  setupNextTest(-1);
});
















//
