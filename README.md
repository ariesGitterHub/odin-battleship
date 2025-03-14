# odin-battleship

## Assignment

### Begin your app by creating the Ship class/factory (your choice).

1. Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
2. REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.

3. Ships should have a hit() function that increases the number of ‘hits’ in your ship.

4. isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

### Create a Gameboard class/factory.

1. Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.

2. Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

3. Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

4. Gameboards should keep track of missed attacks so they can display them properly.

5. Gameboards should be able to report whether or not all of their ships have been sunk.

### Create a Player class/factory.

1. There will be two types of players in the game, ‘real’ players and ‘computer’ players.
~ Did it.

2. Each player object should contain its own gameboard.
~ Did it.

### Import your classes/factories into another file, and drive the game using event listeners to interact with your objects. Create a module that helps you manage actions that should happen in the DOM.

1. At this point it is appropriate to begin crafting your User Interface.
~ Did it.

2. Set up a new game by creating Players. For now just populate each player’s Gameboard with predetermined coordinates. You are going to implement a system for allowing players to place their ships later.
~ Did it.

3. We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.
~ Did it.

- You’ll need methods to render each player’s Gameboard, so put them in an appropriate module.
~ I think I did it. 

4. Your event listeners should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function, step back and figure out which class or module that function should belong to.
~ Did it. Most stuff is modular. 

5. For attacks, let the user click on a coordinate in the enemy Gameboard. Send the user input to methods on your objects, and re-render the boards to display the new information.
~ Did it.

- Players should take turns playing the game by attacking the enemy Gameboard. If you feel the need to keep track of the current player’s turn, it’s appropriate to manage that in this module, instead of another mentioned object.
~ Did it.

- The game is played against the computer, so make the ‘computer’ players capable of making random plays. The computer does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).
~ Did it.

6. Create conditions so that the game ends once one player’s ships have all been sunk. This function is also appropriate for this module.
~ Did it.

### Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements.

## Extra credit

Make your battleship project more impressive by introducing any of these modifications.

1. Implement drag and drop to allow players to place their ships. 
~ I did something close that works better on mobile screens, so as not to mess with gestures that x-out a screen or go back a screen.

2. Create a 2-player option that lets users take turns by passing the laptop back and forth, or by spinning the monitor around on a desktop. Implement a ‘pass device’ screen so that players don’t see each other’s boards!
~ Did it.

3. Polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
~ Did it. Player 1 should just barely win over Player 2 (Computer), more or less, by about 5 hits or less.

## Different Variants of Battleship
https://www.ultraboardgames.com/battleship/variations.php

## A great implementation that breaks well in mobile
https://bgtti.github.io/battleship/

Emulate how this breaks down in small viewports.

## Reading about this project for hints and ideas (may not be correct)

### Hint 1
"Player object creates a Gameboard object which creates Ship objects.

So a player will have a board and multiple ships. Each ship will have a length (each piece occupying a coordinate on the board). So you'll need to know that ships coordinates (where the player positioned it). You also will need to know if ship was hit and sunk. Ok, so you got the key/value pairs. Now you need the methods that will receive information from outside of the object, and possibly change the values of these keys. Like, what information do you need as a function's argument to check whether the ship got a hit? Then what method to check whether all ships coordinates were hit?

These methods might get information from the outside (like a coordinate), checks its position, then decide whether it was a hit, for instance. This has to be tested. Like: creating a ship, set dummy values, then test the method on it, see if you got the expected result.

E.g., if your ship has coordinates [22, 23], then the opponent shot on coordinate 23, then you should store the hit. If the opponent then shoots on 22, your object should store the information that the ship sank. Now, if the opponent shot on coordinate 24 instead, your ship object should not count that as a hit."

# Images and Gifs
All game ship markers were created for this app and are copyrighted by the Mad Muffin Man. 

gifBroadside1 = https://imgur.com/gallery/shockwave-from-battleship-broadside-h9SE7Fj#/t/broadside
gifBroadside2 = https://imgur.com/gallery/battleship-broadsides-d3U51G7#/t/broadside
gifSailing = https://lex-for-lexington.tumblr.com/post/115112729557/imperial-japanese-navy-battle-line

Anchor svg from https://www.svgrepo.com/svg/395772/anchor
