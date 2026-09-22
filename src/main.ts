import { abort, Class, effectFact, itemFact, Monster, Path, print } from "kolmafia";
import { Args } from "grimoire-kolmafia";
import { sinceKolmafiaRevision } from "libram";

export const args = Args.create(
  "Dredge Bofa Seeds",
  "A script for finding seeds for a particular fact. Provide one item or effect and at least one of the following: monster, class, or path.",
  {
    monster: Args.monster({
      setting: "",
      help: "Monster that you want to find the fact on",
    }),
    item: Args.item({
      setting: "",
      help: "The fact you are digging for, if an item.",
    }),
    effect: Args.effect({
      setting: "",
      help: "The fact you are digging for, if an effect",
    }),
    path: Args.path({
      setting: "",
      help: "Narrow your search to a specific path.",
    }),
    class: Args.class({
      setting: "",
      help: "Narrow your search to a specific class.",
    }),
  },
);

// AWOL (26) and ASOL (47) are psuedo avatar paths because you can choose to keep them in aftercore.
const psuedoAvatarPaths = [26, 47];

// 1-6 : standard classes
// 18-20: West of Loathing avatars
// 28-30: Shadows over Loathing avatars
const aftercoreClasses = [1, 2, 3, 4, 5, 6, 18, 19, 20, 28, 29, 30];

function isValidClassPath(cls: Class, path: Path): boolean {
  //if path is an avatar path or class is tied to a path, then only allow if classes/paths are valid.
  //e.g. you can't be a zootomist class in the Zombie slayer path.
  if (cls.path.id === path.id) {
    return true;
  }

  //if the class is one of the standard 6, and we are not in an avatar path.
  if (cls.path.id === 0 && !path.avatar && !psuedoAvatarPaths.includes(path.id)) {
    return true;
  }

  //if you are in aftercore; allow for only certain classes.
  if (path === Path.none && aftercoreClasses.includes(cls.id)) {
    return true;
  }
  return false;
}

export function main(command?: string): void {
  sinceKolmafiaRevision(29287);
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  if (args.effect && args.item) {
    abort("I'm useful, but not that clever. Please provide only one item or effect to dredge for.");
  }
  const fact = args.effect ?? args.item;
  if (!fact) {
    abort(
      "You need to give me something to work with here. Please provide an item or effect to dredge for.",
    );
  }

  const noPathsMobsClassWarning = !args.path && !args.class && !args.monster;
  if (noPathsMobsClassWarning) {
    abort(
      "You are looking for all the needles Frank. Try limiting your search by something before you break something.",
    );
  }
  const mobNote = args.monster ? `, on ${args.monster}` : "";
  const pathNote = args.path ? `, in ${args.path}` : "";
  const classNote = args.class ? `, as a ${args.class}` : "";
  print(`Looking for ${fact}${mobNote}${pathNote}${classNote}.`);
  print();

  const factFunc = args.effect ? effectFact : itemFact;

  const testPaths = args.path ? [args.path] : Path.all();
  const testClasses = args.class ? [args.class] : Class.all();
  const testMonster = args.monster ? [args.monster] : Monster.all();

  for (const pth of testPaths) {
    for (const cls of testClasses) {
      if (!isValidClassPath(cls, pth)) {
        continue;
      }
      for (const mob of testMonster) {
        if (factFunc(cls, pth, mob) === fact) {
          print(`Found ${fact} on ${mob} in ${pth}, as a ${cls}.`);
        }
      }
    }
  }
  print();
  print("Done dredging bofa seeds.");
  print();
}
