/*
  Author: Darin Acosta
  License: ISC
*/

var config = {
  'choices': {
    'name': 'Consequences',
    'fields': {
      'Reputation': {
        'type': 'number',
        'value': 0
      }
    }
  }
};

var app = angular.module("app", [])

.controller('appCtrl', ['$scope', '$http', 'config', appCtrl]);

function appCtrl($scope, $http, config) {

  $scope.escapeQuotes = 'false';

  $scope.selectedTab = '';

  $scope.importedJSON = '';

  $scope.importJSON = function(){
    $scope.dialogueJSON = JSON.parse($scope.importedJSON);
  }

  $scope.selectedTabToggle = function(elId){
    $scope.selectedTab = $scope.selectedTab === elId ? null : elId;
  };

  $scope.removeEntry = function(index) {
    if ($scope.dialogueJSON.elements[index].id !== "init"){
      $scope.dialogueJSON.elements.splice(index, 1);
    }
  };

  $scope.removeText = function(elIndex, textIndex) {
    $scope.dialogueJSON.elements[elIndex].text.splice(textIndex, 1);
  };

  $scope.removeChoice = function(elIndex, choiceIndex) {
    $scope.dialogueJSON.elements[elIndex].choices.splice(choiceIndex, 1);

  };

  $scope.dialogueJSON = {};
  $scope.dialogueJSONString = '';
  $scope.generateDialogueJSONString = function(){
    var jsonString = JSON.stringify($scope.dialogueJSON);
    var jsonReplace = jsonString.replace(/\'/g,"\\'");
    if ($scope.escapeQuotes){
      $scope.dialogueJSONString = jsonReplace;
    } else {
      $scope.dialogueJSONString = jsonString;
    }
    console.log($scope.dialogueJSONString);
  };
  $scope.dialogueJSON.name = "Dialogue Title";
  $scope.dialogueJSON.id = "dialogue-title";

  $scope.generateId = function(){
    $scope.dialogueJSON.id = $scope.dialogueJSON.name.replace(/ /g, "-").toLowerCase();
  };

  $scope.dialogueJSON.start = "init";
  $scope.dialogueJSON.elements = [
    {
      id:"init",
      name: "",
      type: "",
      portrait: '',
      items: [],
      text: [''],
      choices: [],
      followups: []
    }
  ];

  $scope.addDialogueElement = function () {
    var elementCounter = $scope.dialogueJSON['elements'].length + 1;
    $scope.dialogueJSON.elements.push({
      id: $scope.dialogueJSON.id + "_" + String(elementCounter),
      name: "",
      text: [''],
      type: '',
      portrait: '',
      items: [],
      choices: [],
      followups: []
    });
  };

  $scope.addText = function (elementId) {
    var elements = $scope.dialogueJSON.elements;
    for (var i = 0; i < elements.length; i ++){
      if (elements[i].id === elementId){
        $scope.dialogueJSON.elements[i].text.push('');
      }
    };
  };

  $scope.addFollowups = function (elementId) {
    var elements = $scope.dialogueJSON.elements;
    for (var i = 0; i < elements.length; i ++){
      if (elements[i].id === elementId){
        $scope.dialogueJSON.elements[i].followups.push('');
      }
    };
  };

  $scope.addChoice = function (elementId) {
    console.log('add choice')
    var elements = $scope.dialogueJSON.elements;
    for (var i = 0; i < elements.length; i ++){
      if (elements[i].id === elementId){
        var choice = {text: '', followup: '', custom: {}};
        for (var field in config.choices.fields){
          choice.custom[field] = config.choices.fields[field];
        }
        $scope.dialogueJSON.elements[i].choices.push(choice);
        console.log($scope.dialogueJSON.elements[i].choices);
      }
    };
  };

  $scope.addItem = function (elementId) {
    var elements = $scope.dialogueJSON.elements;
    for (var i = 0; i < elements.length; i ++){
      if (elements[i].id === elementId){
        $scope.dialogueJSON.elements[i].items.push('');
      }
    };
  };

  $scope.testDialogue = function(){
    console.log
    dm.initializeDialogue($scope.dialogueJSON);
    console.log('testing')
  }

}
