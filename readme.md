# weathr

## Reading the weather with ~jquery and ajax~ vanilla JS

Weathr is a simple app to, well, check the weather. While it was originally written with jQuery and Ajax, this new version is all vanilla JS. Cool! I'm using the OpenWeatherMap API to pull in weather data.

__App.js is my vanilla js file. main.js is the original jQuery file, included for reference.__

![Weathr app screenshot - Colin Rabyniuk](https://raw.githubusercontent.com/colinxr/weathr/master/weathr.png)

## What I'm Trying to Do

Weathr is a weekend project I took on to get some experience working with APIs. There's a lot of weather data out there, so this seemed like a good place to start.

## Some Difficulties
#### DOMContentLoaded typo screwed everything up
Originally I had typed out `document.addEventListener('DomContentLoaded', function()`, which, like, was just never going to work. `DOM` is all caps please.

#### Deleting a bunch of elements with the same class
 In jQuery this is just `.remove('$(el)’)`, pretty simple here. With vanilla JS, you use something like this: `el.parentNode.removeChild(el)`. This wasn’t really working for me and I wound up just using innerHTML to clean the slate. It works but definitely feels kind of clunky.

#### Appending new nodes
 I'm not really sure if what I've done around line 104 is really the best way to do this. In jQuery `.append` auto closes open html tags, so I had to create an array with my strings and variables, and then join that array. This made me think the regular JS solution was going to be more complicated that what it was. But I don't know. My `cardHtml` string isn't very readable, which is annoying.

#### I'm pretty sure I need to read more about hoisting

## Things I'm Happy With

#### How I got the five day forecast*
 OpenWeatherMap's API provides a seven day forecast starting from the current day, which users had already seen on their initial search. At first I started a For Loop, where `i` started at 1 and ended at `result.list.length`, but like, that's a really lame way to work with arrays.

 I knew I could shift and pop array items off, so I figured there must be a way to do both at the same time. Enter `Slice`!

 I then used a forEach statement to iterate over the loop and write the pertinent values to the DOM.

#### How everything resets
 There was an initial bug where if you submitted the form more than once and got a five-day forecast multiple times, the cards wouldn't be replaced, they would just keep being added to the DOM. This looked silly and not complete. So I added a function that could check if certain elements were visible and do stuff accordingly if so.
