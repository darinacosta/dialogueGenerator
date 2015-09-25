
/*********************** BEGIN DIALOGUE MANAGER **************************/

/*
  Module: Dialogue Manager
  Author: Darin Acosta
  License: ISC
  Description: The dialogue manager is not a require js module -- it's a 
  global object. All dialogue is managed in the DOM using jQuery.
*/

dm = {};

//Store callback if one is required after dialogue ends
dm.callback = null;

dm.currentDialogueJSON = {};

//Track how many times a dialogue has been initiliazed 
dm.tracker = {
  "dialogues": {}
};
 
//Build the dialogue window in the DOM and set it to its initial state.  
dm.initializeDialogue = function(textJson, cb){
  
  if (dm.dialogueInitialized){
    return false;
  };

  var dialogueInit = function(){
    for (var i = 0; i < dm.currentDialogueJSON.elements.length; i ++){
      if (dm.currentDialogueJSON.elements[i].id === "init"){
        return dm.currentDialogueJSON.elements[i];
      }
    }
  }

  var dialogueBox = "<div id='dialogue-wrapper'><div id='dialogue'></div></div>";

  //Pause player control when dialogue is initialized
  dm.dialogueInitialized = true;

  //Add conversation count to player session
  if (dm.tracker.dialogues[textJson.id] !== undefined){
    dm.tracker.dialogues[textJson.id]['count'] += 1;
  } else {
    dm.tracker.dialogues[textJson.id] = {
      "count": 0,
      "elements": {}
    }
  };

  //Store current dialogue for access by handler
  dm.currentDialogueJSON = textJson;

  //Add dialogue window
  if (textJson['fadein']){
    $(dialogueBox).hide().appendTo('body').fadeIn("slow");
  } else {
    $("body").append(dialogueBox);
  };

  //Store callback for access by handler
  if (cb){
    dm.callback = cb;
  };

  //Pass dialogue to handler
  dm.advanceDialogueState("init");
};

dm.advanceDialogueState = function(dialogueKey, cb){

  dm.currentDialogueKey = dialogueKey;
  
  var dialogueInput = function(){
    for (var i = 0; i < dm.currentDialogueJSON.elements.length; i ++){
      if (dm.currentDialogueJSON.elements[i].id === dialogueKey){
        return dm.currentDialogueJSON.elements[i]
      }
    }
  };

  var dialogueInitType = function(){
    for (var i = 0; i < dm.currentDialogueJSON.elements.length; i ++){
      if (dm.currentDialogueJSON.elements[i].id === "init"){
        return dm.currentDialogueJSON.elements[i]['type'];
      }
    }
  };

  var dialogueJSONID = dm.currentDialogueJSON.id;
  var dialogueElementCount = dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey];

  //Add dialogue element count to player session
  if (dialogueElementCount !== undefined){
    dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey] += 1;
  } else {
    dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey] = 0;
  };

  //End dialogue if input is null
  if (!dialogueInput()){
    //Remove dialogue from DOM
    $("#dialogue-wrapper").remove();
    //Resume player update
    dm.dialogueInitialized = false;
    
    //If a callback was provided for the end of the dialogue, call it now
    if (dm.callback){
      dm.callback();
      dm.callback = null
    }

    return false;
  };

  var textEntry = dialogueInput()['text'];
  var descrip = dialogueInput()['descrip'];
  var charType = dialogueInput()['type'];
  var choices = dialogueInput()['choices'];
  var items = dialogueInput()['items'];
  var fadeIn = dialogueInput()['fadein'];
  var portrait = dialogueInput()['portrait'];

  var followupKey = dialogueInput()['followups'];
  var followup;
  var dialogue = '';
  var text = '';
  var textArray = [];

  /*
    If you received items within the dialogue element, push them to the state manager
    inventory now.
  */

  if (items){
    for (var i = 0; i < items.length; i++){
      //Deal with items 
      console.log(items[i] + ' added to player inventory.');
    }
  };

  //Add character portrait if it exists or add default portrait for player type - always add first!
  if (portrait){
    dialogue += '<div class="character-portrait-wrapper"><img class="character-portrait" src="./assets/i/portraits/' + portrait + '.png"></div>'
  } else if (!portrait && charType === 'player'){
    dialogue += '<div class="character-portrait-wrapper"><img class="character-portrait" src="./assets/i/portraits/peppermountainwoman.png"></div>'
  };  

  /*
    If the followupKey exists and is an array, choose the key corresponding to the 
    number of times the dialogue has been initiated. If the number of times initiated 
    exceeds the length of the key array, then choose the last key.
  */

  if (followupKey){

    var n;
    var key;

    if (followupKey.length > dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey]){
      n = dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey];
    } else {
      n = followupKey.length - 1;
    }
    followupKey = followupKey[n];
    followup = dm.currentDialogueJSON.elements[followupKey];
  };

  /*
    If text exists and is an array, choose the text corresponding to the 
    number of times the dialogue has been initiated. If the number of times 
    initiated exceeds the length of the array the text belongs to the initial 
    prompt and belongs to the player, choose the last text string in the array.
    Otherwise, choose at random, so long as it's not the first text and another 
    text exists.
  */
  
  if (textEntry){
    dialogue += "<div id='dialogue-text'>"
    if (textEntry.constructor === Array){
      var n;
      if (textEntry.length > dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey]){
        n = dm.tracker.dialogues[dialogueJSONID]['elements'][dialogueKey];
      } else if (dialogueJSONID === "init" && dialogueInitType() === "player"){
        n = textEntry.length;
      } else {
        n = Math.floor(Math.random() * textEntry.length);
        n = n === 0 && textEntry[1] ? n + 1 : n;
      };
      text = textEntry[n];
    } else {
      text = textEntry;
    };

    /* 
      Add text to dialogue. Add quotes if there's no profile image. Add a line break if it's not a character choice w/o text.
    */
    
    if (!portrait && charType !== 'player' && charType !== 'omniscient'){dialogue += '"'}; 
    dialogue += text;
    if (!portrait && charType !== 'player' && charType !== 'omniscient'){dialogue += '"'};
    if (text !== ''){dialogue += '<br><br>'};
  };
  
  //Add choices
  
  if (choices[0]){
    for (var i = 0; i < choices.length; i ++) {
      if (choices[i]){
        dialogue += "> <a onclick='dm.advanceDialogueState(\"" + choices[i].followup + "\")'>" + choices[i].text + "</a><br>";
      }
    }
  //Or add continuation
  } else if (followupKey){
    dialogue += "<span>> </span><a onclick='dm.advanceDialogueState(\"" + followupKey + "\")'>Continue</a><br>";
  //Or add termination
  } else {
    dialogue += "<span>> </span><a onclick='dm.advanceDialogueState(\"" + followupKey + "\")'>End</a><br>";
  };

  dialogue += "</div>"; //End dialogue-text div
  
  if (fadeIn){
    $(dialogue).hide().appendTo('#dialogue').fadeIn("slow");
  } else {
    $('#dialogue').html(dialogue);
  }
  
};

/*********************** END DIALOGUE MANAGER **************************/





