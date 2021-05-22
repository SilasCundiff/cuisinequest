# CuisineQuest - Every Meal is a Journey

CuisineQuest is a recipe browser made using React, [Tailwind](https://tailwindcss.com/), and the [Spoonacular](https://spoonacular.com/food-api) API

## How to run

I **have not** included the **index.scss** file because it is to large as it includes all of Tailwinds styles.

use:

`touch src/styles/index.scss`

to create an index.scss file that the `npm build:css` script can compile to.

If you make any changes to the tailwind.scss file, you may need to rerun the script for the changes to update.

You will need an api key stored in a .env file from the spoonacular api to run it.
example: REACT_APP_RECIPES_API_KEY={YOUR_API_KEY}

## Future Plans
- Add a user login system using firebase to provide additional functionality - With google oAuth!
- Improve the search functionality by including more complex search options such as flagging/tagging ingredients to blacklist/include
- Ability to favorite meals
- polish it, add attention to detail like micro animations, image optimization, etc
- Add offline mode and turn it into a PWA

### extra credit
- meal planner
- shopping list
- cooking instructions
- in-built timers
- calories/carbs tracker
