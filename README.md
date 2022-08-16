# Calculator Project

<img src="./img/calculator-base.jpg" />
<img src="./img/calc.png" height="300px" />

Live website https://dyancic.github.io/calculator-project/

## Task breakdown

1.  Create a replica calculator with SCSS/HTML

    -   It should have number keys from 0 to 9
    -   It should have operator keys (+, -, /, \*, =)
    -   It should have a display rendering the current calculation in a box at the top.
    -   It should also have a “.” key.

2.  Make the calculator work with JavaScript
    -   Should render the current calculation in a box at the top (calculator display).
    -   Should handle decimals.
    -   It should not use eval() or Function() constructor.
    -   Follows order of operations.

## Design goals

-   Played with box-shadows and linear gradients to create a 3D look casting shadows to one side.
-   Kept the input to an 8 character limit to match the reference calculator.
-   Switched memory buttons to on/off buttons and gave each operator its own button.
-   Digital font to match the reference.

## Features

-   Allows for multiple operators to be used in a single equation.
-   Follows order of operations.
-   Has keyboard functionality.
-   Can be turned on and off, and has a timed out welcome and goobye message.
-   Can do a full clear or input clear.
-   Decimal functionality.
-   Converts large numbers to scientific notation.

## Approach

For the JS side of the project my main approach was to trigger functions on button clicks. When an operator was pressed it would push the number in the input and the operator, stored in the value of the button in the HTML, to a storage array which would render above the input. On an equals press, I iterated through the array and solved all multiplication and division, and then iterated through a second time to solve for the addition and subtraction.

In order to avoid bugs when equals or operators were pressed twice I made use of a lot of booleans that would return functions at the beginning if they were active, this worked well but made it hard to tidy up my code in the end.

## Known issues

-   Issues with on and off functionality when spammed due to the timeouts.
-   Really big numbers can cause issues mainly with fitting them on the screen due to the 8 char limit, even in scientific notation.

## What I'd change

-   Would create pure functions to make my code more concise, instead of just functions that are triggered on click and handle the bulk of the work. Then import those functions in from a module.
-
