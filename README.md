# Dredge Bofa

Run the script with a string of modifiers as the arg (ie `dredge-bofa item="star" path="Fall of the Dinosaurs"` or `dredge-bofa effect="Fishy" monster="sea cow"`) and let us dredge through the bofa seeds to find a class/path/monster combo where you can find the thing!

You can add this script to your own mafia with:

`git checkout kol-Kalebb/dredge-bofa release`

Arguments:

- item:

  - help: The item you want to find on a monster. Mutually exclusive with effect.

- effect:

  - help: the Effect you want to find on a monster. Mutually exclusive with item.

- monster:

  - help: The monster you want to look for with the desired fact (item or effect).

- path:

  - help: The path you want to limit your search by. e.g. None for Unsrestricted/Aftercore, The Shrunken Adventurer That I Am, Avatar of Boris, etc.,.

- class:

  - help: The class you want to limit your search by. e.g. Seal Clubber, Meat Golem, Zootomist, etc.,.

Only one fact can be dredged for at a time, and you must provide at least one Monster, Path, or Class to limit dredging. If you want a comprehensive list of all options for a given fact, consider using [bofa.loathers.net](https://bofa.loathers.net/)
