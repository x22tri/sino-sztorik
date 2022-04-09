# Sino-sztorik (frontend)

Sino-sztorik is a **language course for Hungarian learners of Chinese**. It teaches the 3000 most common Chinese characters through visual associations and stories.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), uses the [MUI](https://mui.com) component library, and is connected to a MySQL database through a [Node.js/Express backend](https://github.com/x22tri/sino-sztorik-backend).

A live demo (with the fist 5 lessons) is available at https://sino-sztorik.web.app/.

## Structural Overview

The course content is available after signing up. The 3000 most common Chinese characters are divided into *lessons* with around 20 characters each. New lessons introduce new *character elements* that make up characters.

Furthermore, commonly used characters are prioritized while rarer ones are introduced later. For this reason, the course is also divided into 4 *tiers*. Finishing all lessons in one tier grant access to the next tier, where already known character elements are revisited to introduce less commonly used characters.

## Features

- **Tracks user progress**, unlocking new lessons in a linear fashion
- Doubles as a "learner's Chinese dictionary": phrases, additional meanings and easily confusable characters are listed for each Chinese character
- **Admin screen** to create, edit and delete characters (some features unavailable at the moment)
- A playful **light** and an elegant **dark theme**, with conscious color choices to distinguish between a character's actual meaning and its meaning as a character component
- A **search** function where any Chinese character can be looked up

## Planned Features

- Add story illustrations
- Add missing features to the admin screen and redesign the Admin dashboard and the Similar Characters screen
- Security fixes
- Improve "learn" screen, with a "preview pane" instead of a popper for character references
- Optimize SQL queries

...and much more.