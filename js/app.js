$(document).foundation();

var time = 1000;
function playKey(thisKeyNum){
  // add temporary css
  if(thisKeyNum >= 10){
    var keyDivName = '#key'+thisKeyNum + ' img';
  }else{
    var keyDivName = '#key0' + thisKeyNum + ' img';
  }

  var filterVal = 'brightness(60%)';
  $(keyDivName)
    .css('filter',filterVal)
    .css('webkitFilter',filterVal)
    .css('mozFilter',filterVal)
    .css('oFilter',filterVal)
    .css('msFilter',filterVal);

  var audioVar = document.getElementById('sound'+thisKeyNum);
  if(!audioVar.paused){
    audioVar.currentTime = 0;
    audioVar.play();
  }else{
    audioVar.play();
  }

  setTimeout( function(){
    var filterVal = 'brightness(100%)';
    $(keyDivName)
      .css('filter',filterVal)
      .css('webkitFilter',filterVal)
      .css('mozFilter',filterVal)
      .css('oFilter',filterVal)
      .css('msFilter',filterVal);
  }, time);

}
var keys = {};
$(document).keydown(function(e){keys[e.which] = true;}).keyup(function(e){keys[e.which] = false;});
$(".keyImage").click(function(){
  if(!testing){
    playKey($(this).attr('keyNum'));
  }else{
    playKey($(this).attr('keyNum'));
    getInput(this);
  }
});
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
  pass1 = [];
  pass2 = [];
  pass3 = [];
  // generate 3 passwords
  for(var i = 0; i < 8; i++){
    pass1.push(Math.floor((Math.random() * 12) + 1));
    pass2.push(Math.floor((Math.random() * 12) + 1));
    pass3.push(Math.floor((Math.random() * 12) + 1));
  }
  console.log("pass1: " + pass1);
  console.log("pass2: " + pass2);
  console.log("pass3: " + pass3);
  // hide section-1 and show section-2 and section-3
  $(".section-1").removeAttr('style').css('display','none');
  $(".section-2").removeAttr('style').css('display','block');
  $(".section-3").removeAttr('style').css('display','block');
  $(".section-4").removeAttr('style').css('display','none');
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
  console.log(disabledBool)
  if(disabledBool == true || disabledBool == "disabled"){
    // ignore click 9
  }else{
    // run playPassword
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

var testing = false;
var testingCurrentValue = 0;
var testingAgainstArray = [];
var testingEnteredArray = [];

function getInput(thisKeyPushed){
  if(testingCurrentValue == 7){
    // this push is the last key push
    testingEnteredArray[testingCurrentValue] = $(thisKeyPushed).attr('keyNum');
    $("#selectedKey"+(testingCurrentValue+1)).html('<p>' + $(thisKeyPushed).attr('keyNum') + '</p>')

    console.log("All keys Entered");
    console.log(testingEnteredArray.toString());
    console.log(testingAgainstArray.toString());
    if(testingEnteredArray.toString() == testingAgainstArray.toString()){
      console.log('Passwords Match!');
      $('#correctAnswer').foundation('open');
    }else{
      console.log('Passwords do not match. Please try again!');
      $('#incorrectAnswer').foundation('open');
    }
    resetTesting();
    // checkPassword();
  }else{
    testingEnteredArray[testingCurrentValue] = $(thisKeyPushed).attr('keyNum');
    $("#selectedKey"+(testingCurrentValue+1)).html('<p>' + $(thisKeyPushed).attr('keyNum') + '</p>');
    testingCurrentValue += 1;
  }
}
function cleanupTesting(){
  testing = false;
  testingCurrentValue = 0;
  testingAgainstArray = [];
  testingEnteredArray = [];
  for(var i = 1; i <= 8; i++){
    $("#selectedKey"+i).html('<p>x</p>');
  }
  $('.buttonNotMain').attr("disabled", false);
}

function resetTesting(){
  testingEnteredArray = [];
  testingCurrentValue = 0;
  for(var i = 1; i <= 8; i++){
    $("#selectedKey"+i).html('<p>x</p>');
  }
}
function checkForPassword(list){
  $('.buttonNotMain').attr("disabled", true);
  if(list == "fb-try"){
    testingAgainstArray = pass1;
  }else if(list == "em-try"){
    testingAgainstArray = pass2;
  }else if(list == "ig-try"){
    testingAgainstArray = pass3;
  }
  // setTimeout( function(){ $('.buttonNotMain').attr("disabled", false); }, time*9);
}

$(".try").click(function(){

  var disabledBool = $(this).attr("disabled");
  testing = true;
  if(disabledBool == true || disabledBool == "disabled"){
    // ignore click
  }else{
    // hide section-1, section-3 and show section-2 and section-4
    $(".section-1").removeAttr('style').css('display','none');
    $(".section-2").removeAttr('style').css('display','block');
    $(".section-3").removeAttr('style').css('display','none');
    $(".section-4").removeAttr('style').css('display','block');

    $("#platformName").html($(this).attr('platform'));
    checkForPassword($(this).attr('value'));
  }
});
$(".try-reset").click(function(){
  resetTesting();
});
$(".try-cancel").click(function(){
  cleanupTesting();
  // hide section-1, section-4 and show section-2 and section-3
  $(".section-1").removeAttr('style').css('display','none');
  $(".section-2").removeAttr('style').css('display','block');
  $(".section-3").removeAttr('style').css('display','block');
  $(".section-4").removeAttr('style').css('display','none');
});

$(document).ready(function(){
  // hide all sections except section-0 and section-1
  // $(".section-1").css('display','initial');
  $(".section-2").css('display','none');
  $(".section-3").css('display','none');
  $(".section-4").css('display','none');
});












//
