// Each visit to /invitation draws one of these at random (cached in localStorage).
// Coordinates are intentionally vague — the club never reveals a real address up front.

export const invitations = [
  {
    id: "warehouse-quiet",
    venue: "A Disused Freight Warehouse",
    district: "Dockside Block 4 — coordinates sent by SMS",
    hour: "Doors open between 8:40 PM and 9:10 PM",
    theme: "Monochrome",
    dressNote: "Wear only black, white, or grey. No exceptions, no logos.",
    guests: "4 strangers, one long steel table",
    chef: "Chef Ines Voss",
    chefLine: "\"I cook with what the season refuses to explain.\"",
    menu: [
      { course: "First", dish: "Charred fig leaf broth, smoked bone marrow", note: "served in the vessel it was cooked in" },
      { course: "Second", dish: "Sea urchin custard, burnt hay ash", note: "eaten with your hands" },
      { course: "Third", dish: "Cricket flour tuile, wild mushroom XO", note: "the crunch is the point" },
      { course: "Fourth", dish: "Slow-roast lamb neck, fermented plum lacquer", note: "carved tableside, blindfolded" },
      { course: "Fifth", dish: "Brown butter and pine ash ice cream", note: "melts before you can photograph it" },
    ],
  },
  {
    id: "rooftop-static",
    venue: "The Rooftop of an Abandoned Cinema",
    district: "Old Quarter, access via the blue service door",
    hour: "Doors open between 9:00 PM and 9:30 PM",
    theme: "Old Hollywood, unraveled",
    dressNote: "Formal wear, deliberately imperfect — a loosened tie, a torn hem.",
    guests: "4 strangers, one projector screen, no film",
    chef: "Chef Bilal Osei",
    chefLine: "\"Every dish here used to be something else.\"",
    menu: [
      { course: "First", dish: "Popcorn butter consommé, black truffle", note: "a joke that becomes serious" },
      { course: "Second", dish: "Beef tartare, coffee ground crumble", note: "no cutlery provided" },
      { course: "Third", dish: "Grilled octopus, film-reel char oil", note: "smoked in front of you" },
      { course: "Fourth", dish: "Duck breast, cherry cola reduction", note: "paired with static on the sound system" },
      { course: "Fifth", dish: "Burnt honeycomb, salt caramel ash", note: "the lights cut before dessert arrives" },
    ],
  },
  {
    id: "greenhouse-midnight",
    venue: "A Botanical Greenhouse After Hours",
    district: "North Gardens, gate code sent one hour prior",
    hour: "Doors open between 11:00 PM and 11:30 PM",
    theme: "Something you'd wear to your own funeral, in white",
    dressNote: "All white. Flowers, veils, and gloves are encouraged.",
    guests: "4 strangers, seated among the ferns",
    chef: "Chef Kaito Renner",
    chefLine: "\"A greenhouse at midnight lies to you about the season.\"",
    menu: [
      { course: "First", dish: "Nettle and green almond gazpacho", note: "picked from the beds beside you" },
      { course: "Second", dish: "Scallop, chrysanthemum, brown butter powder", note: "eaten off a leaf, not a plate" },
      { course: "Third", dish: "Charcoal flatbread, whipped bone fat", note: "torn, not sliced" },
      { course: "Fourth", dish: "Venison loin, foraged spruce tips", note: "rested under a heat lamp beside you" },
      { course: "Fifth", dish: "Elderflower granita, candied thistle", note: "served in a terracotta pot" },
    ],
  },
  {
    id: "barge-drift",
    venue: "A Floating Barge, Engine Off",
    district: "River bend past the old grain silo",
    hour: "Doors open between 8:15 PM and 8:45 PM",
    theme: "Shipwreck formal",
    dressNote: "Something that could survive falling in water. Bring a coat.",
    guests: "4 strangers, one drifting table",
    chef: "Chef Odalys Ferreira",
    chefLine: "\"Nothing on this menu is from more than a river's reach away.\"",
    menu: [
      { course: "First", dish: "River eel, smoked yolk, dill oil", note: "caught two hours before service" },
      { course: "Second", dish: "Crayfish bisque, burnt orange zest", note: "sipped straight from the shell" },
      { course: "Third", dish: "Pike quenelle, brown shrimp butter", note: "a texture study, not a dish" },
      { course: "Fourth", dish: "Wild duck, blackberry and juniper", note: "shot two counties over, cured in-house" },
      { course: "Fifth", dish: "Rye and molasses cake, river mint", note: "served as the barge drifts back to shore" },
    ],
  },
];

export function drawInvitation() {
  return invitations[Math.floor(Math.random() * invitations.length)];
}
