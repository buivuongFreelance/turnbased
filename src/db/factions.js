import _ from "underscore";
require('underscore-query')(_);

import UnitListDB from "../db";

const Factions = [
  {
    id: 1,
    name: 'Dathana Empire',
    world: 'bless'
  },
  {
    id: 2,
    name: 'Elan Forest',
    world: 'bless'
  },
  {
    id: 3,
    name: 'Cana Land',
    world: 'bless'
  },
  {
    id: 4,
    name: 'Shu Dynasty',
    world: 'asian'
  },
  {
    id: 5,
    name: 'Wu Dynasty',
    world: 'asian'
  },
  {
    id: 6,
    name: 'Dong Empire',
    world: 'asian'
  },
  {
    id: 7,
    name: 'Nuwa World',
    world: 'asian'
  },
  {
    id: 8,
    name: 'Wei Empire',
    world: 'asian'
  },
  {
    id: 9,
    name: 'Tymir Realm',
    world: 'king_bounty'
  },
  {
    id: 10,
    name: 'Crimson Gang',
    world: 'king_bounty'
  },
  {
    id: 11,
    name: 'Gossum Crypt',
    world: 'king_bounty'
  },
  {
    id: 12,
    name: 'Orn Realm',
    world: 'king_bounty'
  },
  {
    id: 13,
    name: 'Aco Forest',
    world: 'king_bounty'
  },
  {
    id: 14,
    name: 'Beauboin Empire',
    world: 'king_bounty'
  },
  {
    id: 15,
    name: 'Spencer Castle',
    world: 'bless'
  },
  {
    id: 16,
    name: 'Mezari System',
    world: 'endless'
  },
  {
    id: 17,
    name: 'Dun Steppes',
    world: 'endless'
  },
  {
    id: 18,
    name: 'Softelm Treant',
    world: 'endless'
  },
  {
    id: 19,
    name: 'Pompey Legions',
    world: 'endless'
  },
  {
    id: 20,
    name: 'Hashemi Caliph',
    world: 'israel'
  },
  {
    id: 21,
    name: 'Abram Land',
    world: 'israel'
  },
  {
    id: 22,
    name: 'Taeneung Verse',
    world: 'fantasy'
  },
  {
    id: 23,
    name: 'Kiha Water',
    world: 'fantasy'
  },
  {
    id: 24,
    name: 'Neo Okami',
    world: 'fantasy'
  },
  {
    id: 25,
    name: 'Baidar Tribes',
    world: 'asian'
  },
  {
    id: 26,
    name: 'Ecaflip Green',
    world: 'fantasy'
  },
  {
    id: 27,
    name: 'Fahren Empire',
    world: 'space'
  },
  {
    id: 28,
    name: 'Qix Swamp',
    world: 'space'
  },
  {
    id: 29,
    name: 'Aurelius Army',
    world: 'space'
  },
  {
    id: 30,
    name: 'Umiolth Chosen',
    world: 'space'
  },
  {
    id: 31,
    name: 'Good Will',
    world: 'others'
  },
  {
    id: 32,
    name: 'Alien Planet',
    world: 'others'
  },
  {
    id: 33,
    name: 'Chaos Undivided',
    world: 'others'
  },
  {
    id: 34,
    name: 'Massui Kingdom',
    world: 'israel'
  },
  {
    id: 35,
    name: 'William Castle',
    world: 'raid_shadow'
  },
  {
    id: 36,
    name: 'Figino Merchant',
    world: 'raid_shadow'
  },
  {
    id: 37,
    name: 'Lancelot Guild',
    world: 'raid_shadow'
  },
  {
    id: 38,
    name: 'Whitest Empire',
    world: 'raid_shadow'
  },
  {
    id: 39,
    name: 'Ghaakhuk Fire',
    world: 'raid_shadow'
  },
  {
    id: 40,
    name: 'Hellmann Land',
    world: 'raid_shadow'
  },
  {
    id: 41,
    name: 'Xidrim Darkest',
    world: 'raid_shadow'
  },
  {
    id: 42,
    name: 'Iellariot Sky',
    world: 'endless'
  },
  {
    id: 43,
    name: 'Yordirlun Mine',
    world: 'endless'
  },
  {
    id: 44,
    name: 'Obakho Faction',
    world: 'endless'
  },
  {
    id: 45,
    name: 'Feca Nature',
    world: 'smite'
  },
  {
    id: 46,
    name: 'Ganesh Holy',
    world: 'smite'
  },
  {
    id: 47,
    name: 'Toy Kingdom',
    world: 'smite'
  },
  {
    id: 48,
    name: 'Iliope Empire',
    world: 'smite'
  },
  {
    id: 49,
    name: 'Nexus Galaxy',
    world: 'smite'
  },
  {
    id: 50,
    name: 'Zhukrak Cave',
    world: 'smite'
  },
  {
    id: 51,
    name: 'Usukan Tribes',
    world: 'smite'
  },
  {
    id: 52,
    name: 'Ember World',
    world: 'smite'
  }
];

const realFactions = _.map(Factions, (faction) => {
  const { id, world } = faction;
  return {
    ...faction,
    count: _.query(UnitListDB[world], { faction: id }).length
  }
});

export default realFactions;