##Dialogue Generator 

This tool provides a user interface for building interactive text-based dialogue, and provides a framework for testing the dialogue. You can import and export JSON-formatted dialogue objects. How you decide to parse the dialogue is up to you. "globals.js" provides and example of how this can be accomplished using jQuery. 

#Creating dialogue

1. Name your conversation in the "Name" field
2. Click inside of the "ID" field and the app will automatically generate an ID, which will be used to generate unique IDs for all dialogue elements.
3. The first dialogue element is "init". Click the init row to open the element display. 
4. If the character initiating the dialogue has a portrait associated, you can include a file path to the image in the "portrait" field. 
5. There are three options for dialogue element type: player, non-playable character, or omniscient. The sample parser formats these types differently. 
6. Add as many text elements as you like. The sample parser iterates through these text elements based on the number of times the dialogue is initialized. 
7. You can add multiple followups, which are handled in a similar way as the text. The followups should be the IDs associated with other dialogue elements.
8. You can add multiple choices. These are prompts created for the player to advance the dialogue.
9. You can add items. The sample parser adds these items to the player's inventory. 
10. You can add new dialogue elements by clicking the "Add Element" button.
11. Click "Generate JSON" to compile the dialogue to a JSON object. 
12. If you would like to test the dialogue, click the "Test Dialogue" button. 
