import _ from "underscore";
require('underscore-query')(_);

import UnitListDB from "../db";

const Factions = [
  {
    id: 1,
    name: 'Dura Empire',
    world: 'raid_shadow'
  },
  {
    id: 2,
    name: 'Amyna Void',
    world: 'raid_shadow'
  },
  {
    id: 3,
    name: 'Thomas Lands',
    world: 'raid_shadow'
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
    name: 'Thomas Academy',
    world: 'king_bounty'
  },
  {
    id: 10,
    name: 'Asahi Ninjutsu',
    world: 'king_bounty'
  },
  {
    id: 11,
    name: 'Jung Clans',
    world: 'king_bounty'
  },
  {
    id: 12,
    name: 'Yamato Clans',
    world: 'king_bounty'
  },
  {
    id: 13,
    name: 'Bogard Family',
    world: 'king_bounty'
  },
  {
    id: 14,
    name: 'Ehose Empire',
    world: 'endless'
  },
  {
    id: 15,
    name: 'Atlantis Alliance',
    world: 'endless'
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
    name: 'Amazon Empire',
    world: 'endless'
  },
  {
    id: 23,
    name: 'Bat Cave',
    world: 'endless'
  },
  {
    id: 24,
    name: 'US Council',
    world: 'endless'
  },
  {
    id: 25,
    name: 'Baidar Tribes',
    world: 'asian'
  },
  {
    id: 26,
    name: 'Fallen Legions',
    world: 'space'
  },
  {
    id: 27,
    name: 'Aros Heaven',
    world: 'space'
  },
  {
    id: 28,
    name: 'Queen Empire',
    world: 'vikings'
  },
  {
    id: 29,
    name: 'Isabella Army',
    world: 'vikings'
  },
  {
    id: 30,
    name: 'Krypton Galaxy',
    world: 'endless'
  },
  {
    id: 31,
    name: 'Lyari Realm',
    world: 'zsmite'
  },
  {
    id: 32,
    name: 'Urrothad Realm',
    world: 'zsmite'
  },
  {
    id: 33,
    name: 'Mizuki Realm',
    world: 'zsmite'
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
    name: 'Obark Faction',
    world: 'endless'
  },
  {
    id: 45,
    name: 'Futuris University',
    world: 'zsmite'
  },
  {
    id: 46,
    name: 'Emphil Heaven',
    world: 'zsmite'
  },
  {
    id: 47,
    name: 'Protectorate Heaven',
    world: 'lyn'
  },
  {
    id: 48,
    name: 'Nidruk Crypt',
    world: 'tera'
  },
  {
    id: 49,
    name: 'Jecht Moon',
    world: 'tera'
  },
  {
    id: 50,
    name: 'Whitecape Guild',
    world: 'tera'
  },
  {
    id: 51,
    name: 'Bretonnia Kingdom',
    world: 'warhammer'
  },
  {
    id: 52,
    name: 'Yarema Lands',
    world: 'israel'
  },
  {
    id: 53,
    name: 'Fu Empire',
    world: 'israel'
  },
  {
    id: 54,
    name: 'Chaos Undivided',
    world: 'warhammer'
  },
  {
    id: 55,
    name: 'Jun Guild',
    world: 'israel'
  },
  {
    id: 56,
    name: 'Cryx Crypt',
    world: 'lyn'
  },
  {
    id: 57,
    name: 'Mercer Guild',
    world: 'lyn'
  },
  {
    id: 58,
    name: 'Retribution Planet',
    world: 'lyn'
  },
  {
    id: 59,
    name: 'Fortress Castle',
    world: 'heroes'
  },
  {
    id: 60,
    name: 'Olympic Mountain',
    world: 'zsmite'
  },
  {
    id: 61,
    name: 'Wa Heaven',
    world: 'zsmite'
  },
  {
    id: 62,
    name: 'Iako Realm',
    world: 'age_magic',
    done: true
  },
  {
    id: 63,
    name: 'Beastman Empire',
    world: 'warhammer'
  },
  {
    id: 64,
    name: 'Vampire Coast',
    world: 'warhammer'
  },
  {
    id: 65,
    name: 'Rahaman Guild',
    world: 'israel'
  },
  {
    id: 66,
    name: 'Bozia Kingdom',
    world: 'age_magic',
    done: true
  },
  {
    id: 67,
    name: 'Native Alliance',
    world: 'vikings'
  },
  {
    id: 68,
    name: 'Kidd Hell',
    world: 'vikings'
  },
  {
    id: 69,
    name: 'Nurlin Mountain',
    world: 'bless'
  },
  {
    id: 70,
    name: 'Ursa Mountain',
    world: 'bless'
  },
  {
    id: 71,
    name: 'Soviet Faction',
    world: 'israel'
  },
  {
    id: 72,
    name: 'Thrall Hordes',
    world: 'tera'
  },
  {
    id: 73,
    name: 'Clause Fortress',
    world: 'tera'
  },
  {
    id: 74,
    name: 'Eastern Allies',
    world: 'fantasy'
  },
  {
    id: 75,
    name: 'Celtic Realm',
    world: 'zsmite'
  },
  {
    id: 76,
    name: 'Greggund Chaos',
    world: 'age_magic',
    done: true
  },
  {
    id: 77,
    name: 'Shadowling Magic',
    world: 'age_magic',
    done: true
  },
  {
    id: 78,
    name: 'Malil Emirate',
    world: 'age_magic',
    done: true
  },
  {
    id: 79,
    name: 'Tezcacoaltl Shadow',
    world: 'age_magic',
    done: true
  },
  {
    id: 80,
    name: 'Celius Holy',
    world: 'age_magic',
    done: true
  },
  {
    id: 81,
    name: 'Yokai Alliance',
    world: 'age_magic',
    done: true
  },
  {
    id: 82,
    name: 'Shang Dynasty',
    world: 'asian'
  },
  {
    id: 83,
    name: 'Sylvan Realm',
    world: 'heroes'
  },
  {
    id: 84,
    name: 'Magic Empire',
    world: 'heroes'
  },
  {
    id: 85,
    name: 'Wolfgang Empire',
    world: 'heroes'
  },
  {
    id: 86,
    name: 'Stronghold Desert',
    world: 'heroes'
  },
  {
    id: 87,
    name: 'Necropolis Crypt',
    world: 'heroes'
  },
  {
    id: 88,
    name: 'Kyo Arena',
    world: 'king_bounty'
  },
  {
    id: 89,
    name: 'Canton Guild',
    world: 'asian'
  },
  {
    id: 90,
    name: 'Outworld Alliance',
    world: 'zsmite'
  },
  {
    id: 91,
    name: 'Pharaoh Kingdom',
    world: 'zsmite'
  },
  {
    id: 92,
    name: 'Ellena Empire',
    world: 'heroes'
  },
  {
    id: 93,
    name: 'Hades Hell',
    world: 'zsmite'
  },
  {
    id: 94,
    name: 'Ras Guru',
    world: 'israel'
  },
  {
    id: 95,
    name: 'British Raj',
    world: 'israel'
  },
  {
    id: 96,
    name: 'Yakuza Clans',
    world: 'king_bounty'
  },
  {
    id: 97,
    name: 'Rugard World',
    world: 'king_bounty'
  },
  {
    id: 98,
    name: 'Bushido Dojo',
    world: 'king_bounty'
  },
  {
    id: 99,
    name: 'Cotes Armada',
    world: 'raid_shadow'
  },
  {
    id: 100,
    name: 'Injustice League',
    world: 'endless'
  },
  {
    id: 101,
    name: 'Tsar Empire',
    world: 'israel'
  },
  {
    id: 102,
    name: 'Rama Empire',
    world: 'zsmite'
  },
  {
    id: 103,
    name: 'Mayan Empire',
    world: 'zsmite'
  },
  {
    id: 104,
    name: 'Cygnar Empire',
    world: 'lyn'
  },
  {
    id: 105,
    name: 'Gusk Tribes',
    world: 'bless'
  },
  {
    id: 106,
    name: 'Zulabar Tribes',
    world: 'bless'
  },
  {
    id: 107,
    name: 'Jerusalem Faction',
    world: 'raid_shadow'
  },
  {
    id: 108,
    name: 'Krakow Alliance',
    world: 'raid_shadow'
  },
  {
    id: 109,
    name: 'Skudr Wildlands',
    world: 'bless'
  },
  {
    id: 110,
    name: 'Wrakai Darkness',
    world: 'bless'
  },
  {
    id: 111,
    name: 'Vugronel Valley',
    world: 'raid_shadow'
  },
  {
    id: 112,
    name: 'Yimuc Tribes',
    world: 'tera'
  },
  {
    id: 113,
    name: 'Laurent Castle',
    world: 'raid_shadow'
  },
  {
    id: 114,
    name: 'Long Faction',
    world: 'zsmite'
  },
  {
    id: 115,
    name: 'Vizesh Chaos',
    world: 'warhammer'
  },
  {
    id: 116,
    name: 'Flash Faction',
    world: 'endless'
  },
  {
    id: 117,
    name: 'Dark Olympic',
    world: 'endless'
  },
  {
    id: 118,
    name: 'Drakenling Sky',
    world: 'endless'
  },
  {
    id: 119,
    name: 'Islam Empire',
    world: 'fantasy'
  },
  {
    id: 120,
    name: 'Europe Alliance',
    world: 'fantasy'
  },
  {
    id: 121,
    name: 'Uxaumien World',
    world: 'fantasy'
  },
  {
    id: 122,
    name: 'Knights Lands',
    world: 'fantasy'
  },
  {
    id: 123,
    name: 'Eshraz Chaos',
    world: 'fantasy'
  },
  {
    id: 124,
    name: 'Nobunaga Clans',
    world: 'space'
  },
  {
    id: 125,
    name: 'Nippon Shogunate',
    world: 'warhammer'
  },
  {
    id: 126,
    name: 'Drakonian Empire',
    world: 'warhammer'
  },
  {
    id: 127,
    name: 'Muvna Empire',
    world: 'age_magic',
    done: true
  },
  {
    id: 128,
    name: 'Vok Kingdom',
    world: 'age_magic'
  },
  {
    id: 129,
    name: 'Zhang Dynasty',
    world: 'asian'
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