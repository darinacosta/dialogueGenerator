#Dialogue Generator

This tool provides a user interface for building interactive text-based dialogue, and provides a framework for testing the dialogue. You can import and export a JSON-formatted dialogue string. How you decide to parse the dialogue is up to you. `globals.js` provides an example of how this can be accomplished using jQuery. The tool was inspired by [this](http://thebotanistgame.com/blog/2015/02/28/dialogue-in-phaserjs.html) Botanist Game Blog post.

Use it here: [darinacosta.com/dialoguegenerator](http://darinacosta.com/dialoguegenerator/)

Or to install locally: run `npm install` after forking to install the dependencies (Angular, Bootstrap, and jQuery).

##Importing dialogue
To import dialogue, simply drop a well-formatted JSON string into the "Import JSON" form and click "import".

Here is a sample JSON string that you can drop in to see how it works:

    {"name":"Man in Blue","id":"man-in-blue","start":"init","elements":[{"id":"init","name":"","type":"player","portrait":"million-portrait","items":[],"text":["There's a man in a Shield jumpsuit having a smoke, staring out towards the Spillway with a hollow expression.","The man continues to stare out at the bleeding industrial lights of the Spillway."],"choices":[{"text":"Ask him about his day.","followup":"man-in-blue_1"},{"text":"Ignore him and move along.","followup":""}],"followups":[]},{"id":"man-in-blue_1","name":"","text":["My day was shitty, thanks for askin.","I'll tell you again, robot: my day sucked.","How many times you gonna ask me that? Like I said, I got laid off, and I'm waiting on my daughter to give me a ride home so I can finally be done with this place."],"type":"npc","portrait":"","items":[],"choices":[],"followups":["man-in-blue_2","man-in-blue_3",null]},{"id":"man-in-blue_2","name":"","text":["His mouth twists slightly as if he'd like to speak further, but just as quickly, his face becomes placid, and he looks away."],"type":"player","portrait":"million-portrait","items":[],"choices":[],"followups":[]},{"id":"man-in-blue_3","name":"","text":[""],"type":"player","portrait":"million-portrait","items":[],"choices":[{"text":"Why?","followup":"man-in-blue_4"}],"followups":[]},{"id":"man-in-blue_4","name":"","text":["Well, since you're so curious to know, I got laid off today. God damn foreman has been after me from the start cus I can do his job better than he can."],"type":"npc","portrait":"","items":["talked-with-dad",""],"choices":[],"followups":["man-in-blue_5"]},{"id":"man-in-blue_5","name":"","text":["There's no job security at this place no more. My daddy used to go on and on about it. Used to be you'd get in at the refinery, you were good for life."],"type":"npc","portrait":"","items":[],"choices":[],"followups":["man-in-blue_6"]},{"id":"man-in-blue_6","name":"","text":["Well that aint the way it is no more. And now my daughter's back there welding, and she's got the keys to my truck, but I aint showin my face around that foreman again."],"type":"npc","portrait":"","items":[],"choices":[],"followups":["man-in-blue_7"]},{"id":"man-in-blue_7","name":"","text":["Not after what I told him. So yeah, I guess you could say it's been a fairly shitty day, robot."],"type":"npc","portrait":"","items":[],"choices":[],"followups":["man-in-blue_8"]},{"id":"man-in-blue_8","name":"","text":["Oh, and by the way. Careful around those security drones. They're friendly enough to people, but they don't seem to like their own kind."],"type":"npc","portrait":"","items":[],"choices":[],"followups":[]}]}

##Creating dialogue

1. Name your conversation in the "Name" field
2. Click inside of the "ID" field and the app will automatically generate an ID, which will be used to generate unique IDs for all dialogue elements.
3. The first dialogue element is "init". Click the init row to open the element display.
4. If the character initiating the dialogue has a portrait , you can include a file path to the image in the "portrait" field. Choosing "player" as the element type will add a portrait by default.
5. There are three options for dialogue element type: player, non-playable character, or omniscient. The sample parser formats these types differently.
6. Add as many text elements as you like. The sample parser iterates through these text elements based on the number of times the dialogue is initialized.
7. You can add multiple followups, which are handled in a similar way as the text. The followups should be the IDs associated with other dialogue elements.
8. You can add multiple choices. These are prompts created for the player to advance the dialogue.
9. You can add items. The sample parser adds these items to the player's inventory.
10. You can add new dialogue elements by clicking the "Add Element" button.
11. Click "Generate JSON" to compile the dialogue to a JSON string.
12. If you would like to test the dialogue, click the "Test Dialogue" button and scroll down.
