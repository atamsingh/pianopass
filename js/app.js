$(document).foundation();

var time = 1000;
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
function playKey(thisKeyNum){
  // add temporary css
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
  }else{
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
var keys = {};
$(document).keydown(function(e){keypushlog(e);keys[e.which] = true;}).keyup(function(e){keys[e.which] = false;});
$(".keyImage").click(function(){
  if(!trying){
    playKey($(this).attr('keyNum'));
  }else{
    playKey($(this).attr('keyNum'));
    getInput(this);
  }
});

function keypushlog(e){
  if(e.which == 49) {
    // 1 enter pressed
    addToLog('User pushed key on keyboard to play key 1.');
  }
  if(e.which == 50) {
    // 2 enter pressed
    addToLog('User pushed key on keyboard to play key 2.');
  }
  if(e.which == 51) {
    // 3 enter pressed
    addToLog('User pushed key on keyboard to play key 3.');
  }
  if(e.which == 52) {
    // 4 enter pressed
    addToLog('User pushed key on keyboard to play key 4.');
  }
  if(e.which == 53) {
    // 5 enter pressed
    addToLog('User pushed key on keyboard to play key 5.');
  }
  if(e.which == 54) {
    // 6 enter pressed
    addToLog('User pushed key on keyboard to play key 6.');
  }
  if(e.which == 55) {
    // 7 enter pressed
    addToLog('User pushed key on keyboard to play key 7.');
  }
  if(e.which == 56) {
    // 8 enter pressed
    addToLog('User pushed key on keyboard to play key 8.');
  }
  if(e.which == 57) {
    // 9 enter pressed
    addToLog('User pushed key on keyboard to play key 9.');
  }
  if(e.which == 48) {
    // 0 enter pressed
    addToLog('User pushed key on keyboard to play key 10.');
  }
  if(e.which == 189) {
    // - enter pressed
    addToLog('User pushed key on keyboard to play key 11.');
  }
  if(e.which == 187) {
    // + enter pressed
    addToLog('User pushed key on keyboard to play key 12.');
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

var pass1 = [];
var pass2 = [];
var pass3 = [];

function learnStart(){
  addToLog('User clicked on intital learn button.');
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
  addToLog('password for fb generated: ' + pass1);
  // console.log("pass2: " + pass2);
  addToLog('password for email generated: ' + pass2);
  // console.log("pass3: " + pass3);
  addToLog('password for ig generated: ' + pass3);
  // hide section-1 and show section-2 and section-3
  $(".section-1").removeAttr('style').css('display','none');
  $(".section-2").removeAttr('style').css('display','block');
  $(".section-3").removeAttr('style').css('display','block');
  $(".section-4").removeAttr('style').css('display','none');
  $(".header-1").removeAttr('style').css('display','block');
  $(".header-2").removeAttr('style').css('display','none');
}
function playOnKeyboard(thisarray){
  var currtime = time;
  jQuery.each( thisarray, function( i, val ) {
    setTimeout( function(){ playKey(val); }, currtime);
    currtime += time;
  });
}
$(".learn").click(function(){
  var disabledBool = $(this).attr("disabled");
  // console.log(disabledBool)
  if(disabledBool == true || disabledBool == "disabled"){
    // ignore click 9
  }else{
    // run playPassword
    addToLog('User Clicked play on ' + $(this).attr('platform') + ' password.');
    playPassword($(this).attr('value'));
  }
});
function playPassword(list){
  $('.buttonNotMain').attr("disabled", true);
  if(list == "fb-learn"){
    playOnKeyboard(pass1);
  }else if(list == "em-learn"){
    playOnKeyboard(pass2);
  }else if(list == "ig-learn"){
    playOnKeyboard(pass3);
  }
  setTimeout( function(){ $('.buttonNotMain').attr("disabled", false); }, time*9);

}

var trying = false;
var tryingCurrentValue = 0;
var tryingAgainstArray = [];
var tryingEnteredArray = [];
var testingCurrent = 0;

function getInput(thisKeyPushed){
  if(tryingCurrentValue == 7){
    // this push is the last key push
    tryingEnteredArray[tryingCurrentValue] = $(thisKeyPushed).attr('keyNum');
    $("#selectedKey"+(tryingCurrentValue+1)).html('<p>' + $(thisKeyPushed).attr('keyNum') + '</p>')

    // console.log("All keys Entered");
    // console.log(tryingEnteredArray.toString());
    // console.log(tryingAgainstArray.toString());
    if(!testing){
      if(tryingEnteredArray.toString() == tryingAgainstArray.toString()){
        // console.log('Passwords Match!');
        $('#correctAnswer').foundation('open');
        addToLog('User entered correct answer while in try mode. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
      }else{
        // console.log('Passwords do not match. Please try again!');
        $('#incorrectAnswer').foundation('open');
        addToLog('User entered incorrect answer while in try mode. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
      }
      resettrying();
    }else{
      if(tryingEnteredArray.toString() == tryingAgainstArray.toString()){
        // console.log('Passwords Match!');
        $('#correctAnswer').foundation('open');
        // move to next testingCurrent
        addToLog('User entered correct answer while in testing mode. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
        testingCurrent++;
      }else{
        // console.log('Passwords do not match. Please try again!');
        if(testingCurrent == 1 && triesOnPass1 == 3){
          $('#testingPasswordEnteredWrongNoTriesLeft').foundation('open');
          addToLog('User entered incorrect answer while testing. Ran out of tries while entering password for fb. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
        }else if(testingCurrent == 2 && triesOnPass2 == 3){
          $('#testingPasswordEnteredWrongNoTriesLeft').foundation('open');
          addToLog('User entered incorrect answer while testing. Ran out of tries while entering password for email. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
        }else if(testingCurrent == 3 && triesOnPass3 == 3){
          $('#testingPasswordEnteredWrongNoTriesLeft').foundation('open');
          addToLog('User entered incorrect answer while testing. Ran out of tries while entering password for ig. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
        }else{
          $('#testingPasswordEnteredWrong').foundation('open');
          addToLog('User entered incorrect answer while testing. Tries remainging. Currently trying ' + platforms[testingCurrent] + '. Entered Array was ' + tryingEnteredArray.toString() + ' compared to correct answer of ' + tryingAgainstArray.toString());
        }
      }
      resettrying();
      setupNextTest();
    }
    // checkPassword();
  }else{
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
    addToLog('User Clicked try on ' + $(this).attr('platform') + ' password.');
    checkForPassword($(this).attr('value'));
  }
});
$(".try-reset").click(function(){
  resettrying();
  addToLog('User Clicked retry while trying.');
});
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
    addToLog('User cancelled while trying to enter password.');
  }

});

$(document).ready(function(){
  // hide all sections except section-0 and section-1
  // $(".section-1").css('display','initial');
  $(".section-2").css('display','none');
  $(".section-3").css('display','none');
  $(".section-4").css('display','none');
  $(".section-5").css('display','none');
  $(".header-1").css('display','none');
  $(".header-2").css('display','none');

  addToLog('User document ready.');
});

function setupNextTest(){
  trying = true;
  testing = true;

  $('.try-cancel').attr('disabled','true');
  if(testingCurrent == 1){
    tryingAgainstArray = pass1;
    if(triesOnPass1 == 3){
      testingCurrent += 1;
    }else{
      triesOnPass1++;
    }
  }else if(testingCurrent == 2){
    tryingAgainstArray = pass2;
    if(triesOnPass2 == 3){
      testingCurrent += 1;
    }else{
      triesOnPass2++;
    }
  }else if(testingCurrent == 3){
    tryingAgainstArray = pass3;
    if(triesOnPass3 == 3){
      trying = false;
      testing = false;
      $(".section-1").removeAttr('style').css('display','none');
      $(".section-2").removeAttr('style').css('display','block');
      $(".section-3").removeAttr('style').css('display','none');
      $(".section-4").removeAttr('style').css('display','none');
      $(".section-5").removeAttr('style').css('display','block');
      $(".header-1").removeAttr('style').css('display','none');
      $(".header-2").removeAttr('style').css('display','none');
      addToLog('User finished testing');
    }else{
      triesOnPass3++;
    }
  }else{
    trying = false;
    testing = false;
    $(".section-1").removeAttr('style').css('display','none');
    $(".section-2").removeAttr('style').css('display','block');
    $(".section-3").removeAttr('style').css('display','none');
    $(".section-4").removeAttr('style').css('display','none');
    $(".section-5").removeAttr('style').css('display','block');
    $(".header-1").removeAttr('style').css('display','none');
    $(".header-2").removeAttr('style').css('display','none');
    addToLog('User finished testing');
  }

  $('#platformName').html(platforms[testingCurrent]);
}
var testing = false;
var platforms = [,'Facebook','Email','Instagram'];
var testingCurrent = 1;
var triesOnPass1 = 0;
var triesOnPass2 = 1;
var triesOnPass3 = 1;

$("#readytestgo").click(function(){
  // addToLog('User began test');
  $(".section-1").removeAttr('style').css('display','none');
  $(".section-2").removeAttr('style').css('display','block');
  $(".section-3").removeAttr('style').css('display','none');
  $(".section-4").removeAttr('style').css('display','block');
  $(".header-1").removeAttr('style').css('display','none');
  $(".header-2").removeAttr('style').css('display','block');
  addToLog('User clicked to move to testing phase.');
  setupNextTest();
});

var logText = '';
function addToLog(thisText){
  var obj = {};
  obj.datetime = {"$date": new Date().toISOString()};
  obj.interationId = uniqueInteractionID;
  obj.message = thisText;

  // console.log(JSON.stringify(obj));
  $.ajax( { url: "https://api.mlab.com/api/1/databases/pianopasslogging/collections/dblog?apiKey=0I94b1RsYrpJKmvYnt2blriERq7IKsKf",
		  data: JSON.stringify(obj),
		  type: "POST",
		  contentType: "application/json"} );
}





//
