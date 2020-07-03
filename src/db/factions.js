import _ from "underscore";
require('underscore-query')(_);

import UnitListDB from "../db";

const Factions = [
  {
    id: 3000,
    name: '0_Sword',
    world: '_weapon'
  },
  {
    id: 3001,
    name: '0_Axe',
    world: '_weapon'
  },
  {
    id: 3002,
    name: '0_Mace',
    world: '_weapon'
  },
  {
    id: 3003,
    name: '0_Others',
    world: '_weapon'
  },
  {
    id: 3004,
    name: '0_Bow',
    world: '_weapon'
  },
  {
    id: 3005,
    name: '0_Crossbow',
    world: '_weapon'
  },
  {
    id: 3006,
    name: '0_Dagger',
    world: '_weapon'
  },
  {
    id: 3007,
    name: '0_Hammer',
    world: '_weapon'
  },
  {
    id: 3008,
    name: '0_Shield',
    world: '_weapon'
  },
  {
    id: 3009,
    name: '0_Spear',
    world: '_weapon'
  },
  {
    id: 3010,
    name: '0_Staff',
    world: '_weapon'
  },
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
    world: 'king_bounty',
    done: true,
    race: 'nippon'
  },
  {
    id: 11,
    name: 'Jung Clans',
    world: 'king_bounty',
    done: true,
    race: 'cathay'
  },
  {
    id: 12,
    name: 'Yamato Clans',
    world: 'king_bounty',
    done: true,
    race: 'nippon'
  },
  {
    id: 13,
    name: 'Bogard Family',
    world: 'king_bounty',
    done: true,
    race: 'britain'
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
    world: 'israel',
    done: true,
    race: 'eurasia'
  },
  {
    id: 21,
    name: 'Abram Land',
    world: 'israel',
    done: true,
    race: 'israel'
  },
  {
    id: 22,
    name: 'Amazon Empire',
    world: 'endless',
    done: true,
    race: 'nephalim'
  },
  {
    id: 23,
    name: 'Bat Cave',
    world: 'endless'
  },
  {
    id: 24,
    name: 'Aladdin Caliphate',
    world: 'heroes',
    done: true,
    race: 'eurasia'
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
    world: 'vikings',
    done: true,
    race: 'britain'
  },
  {
    id: 29,
    name: 'Isabella Army',
    world: 'vikings',
    done: true,
    race: 'espana'
  },
  {
    id: 30,
    name: 'Justice League',
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
    world: 'israel',
    done: true,
    race: 'africa'
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
    world: 'endless',
    done: true,
    race: 'dwarf'
  },
  {
    id: 44,
    name: 'Obark Faction',
    world: 'endless',
    done: true,
    race: 'nightelf'
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
    world: 'lyn',
    done: true,
    race: 'nephalim'
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
    world: 'warhammer',
    done: true,
    race: 'celtic'
  },
  {
    id: 52,
    name: 'Yarema Lands',
    world: 'israel',
    done: true,
    race: 'israel'
  },
  {
    id: 53,
    name: 'Fu Empire',
    world: 'israel',
    done: true,
    race: 'cathay'
  },
  {
    id: 54,
    name: 'Chaos Undivided',
    world: 'warhammer'
  },
  {
    id: 55,
    name: 'Jun Guild',
    world: 'israel',
    done: true,
    race: 'cathay'
  },
  {
    id: 56,
    name: 'Cryx Crypt',
    world: 'lyn',
    done: true,
    race: 'lich'
  },
  {
    id: 57,
    name: 'Mercer Guild',
    world: 'lyn',
    done: true,
    race: 'german'
  },
  {
    id: 58,
    name: 'Retribution Planet',
    world: 'lyn',
    done: true,
    race: 'highelf'
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
    done: true,
    race: 'forest_elf'
  },
  {
    id: 63,
    name: 'Beastman Empire',
    world: 'warhammer',
    done: true,
    race: 'beastman'
  },
  {
    id: 64,
    name: 'Vampire Coast',
    world: 'warhammer',
    done: true,
    race: 'vampire'
  },
  {
    id: 65,
    name: 'Rahaman Guild',
    world: 'israel',
    done: true,
    race: 'eurasia'
  },
  {
    id: 66,
    name: 'Bozia Kingdom',
    world: 'age_magic',
    done: true,
    race: 'celtic'
  },
  {
    id: 67,
    name: 'Native Alliance',
    world: 'vikings',
    done: true,
    race: 'native'
  },
  {
    id: 68,
    name: 'Kidd Hell',
    world: 'vikings',
    done: true,
    race: 'lich'
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
    world: 'israel',
    done: true,
    race: 'slavic'
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
    world: 'fantasy',
    done: true,
    race: 'cathay'
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
    done: true,
    race: 'chaos'
  },
  {
    id: 77,
    name: 'Shadowling Magic',
    world: 'age_magic',
    done: true,
    race: 'nightelf'
  },
  {
    id: 78,
    name: 'Malil Emirate',
    world: 'age_magic',
    done: true,
    race: 'dwarf'
  },
  {
    id: 79,
    name: 'Tezcacoaltl Shadow',
    world: 'age_magic',
    done: true,
    race: 'lich'
  },
  {
    id: 80,
    name: 'Celius Holy',
    world: 'age_magic',
    done: true,
    race: 'nephalim'
  },
  {
    id: 81,
    name: 'Yokai Alliance',
    world: 'age_magic',
    done: true,
    race: 'nippon'
  },
  {
    id: 82,
    name: 'Shang Dynasty',
    world: 'asian',
    done: true,
    race: 'cathay'
  },
  {
    id: 83,
    name: 'Sylvan Realm',
    world: 'heroes'
  },
  {
    id: 84,
    name: 'Magic Empire',
    world: 'heroes',
    done: true,
    race: 'eurasia'
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
    world: 'heroes',
    done: true,
    race: 'lich'
  },
  {
    id: 88,
    name: 'Kyo Arena',
    world: 'king_bounty',
    done: true,
    race: 'nippon'
  },
  {
    id: 89,
    name: 'Canton Guild',
    world: 'asian',
    done: true,
    race: 'cathay'
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
    world: 'israel',
    done: true,
    race: 'eurasia'
  },
  {
    id: 95,
    name: 'British Raj',
    world: 'israel',
    done: true,
    race: 'britain'
  },
  {
    id: 96,
    name: 'Yakuza Clans',
    world: 'king_bounty',
    done: true,
    race: 'nippon'
  },
  {
    id: 97,
    name: 'Rugard World',
    world: 'king_bounty',
    done: true,
    race: 'german'
  },
  {
    id: 98,
    name: 'Bushido Dojo',
    world: 'king_bounty',
    done: true,
    race: 'nippon'
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
    world: 'israel',
    done: true,
    race: 'slavic'
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
    world: 'lyn',
    done: true,
    race: 'britain'
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
    name: 'Orpheus Chaos',
    world: 'heroes',
    done: true,
    race: 'vampire'
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
    world: 'warhammer',
    done: true,
    race: 'viking'
  },
  {
    id: 116,
    name: 'Flash Faction',
    world: 'endless'
  },
  {
    id: 117,
    name: 'Dark Olympic',
    world: 'endless',
    done: true,
    race: 'nephalim'
  },
  {
    id: 118,
    name: 'Drakenling Sky',
    world: 'endless'
  },
  {
    id: 119,
    name: 'Timurids Empire',
    world: 'fantasy',
    done: true,
    race: 'mongol'
  },
  {
    id: 120,
    name: 'Europe Alliance',
    world: 'fantasy',
    done: true,
    race: 'celtic'
  },
  {
    id: 121,
    name: 'Uxaumien World',
    world: 'fantasy',
    done: true,
    race: 'lich'
  },
  {
    id: 122,
    name: 'Knights Lands',
    world: 'fantasy'
  },
  {
    id: 123,
    name: 'Eshraz Chaos',
    world: 'fantasy',
    done: true,
    race: 'chaos'
  },
  {
    id: 124,
    name: 'Nobunaga Clans',
    world: 'space',
    done: true,
    race: 'nippon'
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
    done: true,
    race: 'lizard'
  },
  {
    id: 128,
    name: 'Vok Hell',
    world: 'age_magic'
  },
  {
    id: 129,
    name: 'Zhang Dynasty',
    world: 'asian'
  },
  {
    id: 130,
    name: 'Tithona Crystal',
    world: 'age_magic'
  },
  {
    id: 131,
    name: 'Mecha Units',
    world: 'age_magic',
    done: true,
    race: 'israel'
  },
  {
    id: 132,
    name: 'Ancient Northumbria',
    world: 'fantasy',
    done: true,
    race: 'viking'
  },
  {
    id: 133,
    name: 'Mycenae Kingdom',
    world: 'israel',
    done: true,
    race: 'greek'
  },
  {
    id: 134,
    name: 'Athena State',
    world: 'israel',
    done: true,
    race: 'greek'
  },
  {
    id: 135,
    name: 'Colchis State',
    world: 'israel',
    done: true,
    race: 'persia'
  },
  {
    id: 136,
    name: 'Lazites Hordes',
    world: 'israel',
    done: true,
    race: 'beastman'
  },
  {
    id: 137,
    name: 'Kaastellck Hordes',
    world: 'tera'
  },
  {
    id: 138,
    name: 'Ignit Nature',
    world: 'tera'
  },
  {
    id: 139,
    name: 'Guaiwu Realm',
    world: 'asian'
  },
  {
    id: 140,
    name: 'Jack Islands',
    world: 'vikings',
    done: true,
    race: 'britain'
  },
  {
    id: 141,
    name: 'Pirate Alliance',
    world: 'vikings',
    done: true,
    race: 'britain'
  },
  {
    id: 142,
    name: 'Wood Realm',
    world: 'warhammer'
  },
  {
    id: 143,
    name: 'Lady Faction',
    world: 'warhammer',
    done: true,
    race: 'britain'
  },
  {
    id: 144,
    name: 'Djinn Realm',
    world: 'bless'
  },
  {
    id: 145,
    name: 'Zanthus Kingdom',
    world: 'space'
  },
  {
    id: 146,
    name: 'Culzoks Kingdom',
    world: 'space',
    done: true,
    race: 'demon'
  },
  {
    id: 147,
    name: 'Elizabeth Kingdom',
    world: 'age_magic',
    done: true,
    race: 'britain'
  },
  {
    id: 148,
    name: 'Vredan Crypt',
    world: 'lyn',
    done: true,
    race: 'lich'
  },
  {
    id: 149,
    name: 'Khador Empire',
    world: 'lyn',
    done: true,
    race: 'slavic'
  },
  {
    id: 150,
    name: 'Bourbon Planet',
    world: 'lyn',
    done: true,
    race: 'celtic'
  },
  {
    id: 151,
    name: 'Gimrak Clan',
    world: 'raid_shadow'
  },
  {
    id: 152,
    name: 'Amva Sea',
    world: 'bless'
  },
  {
    id: 153,
    name: 'Shabaan Caliphate',
    world: 'israel',
    done: true,
    race: 'eurasia'
  },
  {
    id: 154,
    name: 'Buchman Kingdom',
    world: 'fantasy'
  },
  {
    id: 155,
    name: 'Klempner Kingdom',
    world: 'fantasy'
  },
  {
    id: 156,
    name: 'Hulk Empire',
    world: 'king_bounty'
  },
  {
    id: 157,
    name: 'Agios League',
    world: 'king_bounty'
  },
  {
    id: 158,
    name: 'Inmarvel League',
    world: 'king_bounty'
  },
  {
    id: 159,
    name: 'Thanos League',
    world: 'king_bounty'
  },
  {
    id: 160,
    name: 'X League',
    world: 'king_bounty'
  },
  {
    id: 161,
    name: 'Pan Planet',
    world: 'lyn',
    done: true,
    race: 'beastman'
  },
  {
    id: 162,
    name: 'Stacular World',
    world: 'endless'
  },
  {
    id: 163,
    name: 'Xokuhr Guild',
    world: 'lyn',
    done: true,
    race: 'lich'
  },
  {
    id: 164,
    name: 'Vampire Empire',
    world: 'warhammer'
  },
  {
    id: 165,
    name: 'Marvel League',
    world: 'king_bounty'
  },
  {
    id: 166,
    name: 'Saberleaf League',
    world: 'age_magic'
  },
  {
    id: 167,
    name: 'Littim League',
    world: 'age_magic'
  },
  {
    id: 168,
    name: 'Drogzaduun League',
    world: 'age_magic'
  },
  {
    id: 169,
    name: 'Vahalla Haven',
    world: 'zsmite'
  },
  {
    id: 170,
    name: 'Lumen World',
    world: 'heroes'
  },
  {
    id: 171,
    name: 'Vribrix Dark',
    world: 'heroes'
  },
  {
    id: 172,
    name: 'Griffin Empire',
    world: 'heroes'
  },
  {
    id: 173,
    name: 'Jaffah Caliphate',
    world: 'heroes',
    done: true,
    race: 'eurasia'
  },
  {
    id: 174,
    name: 'Wakanda League',
    world: 'king_bounty'
  },
  {
    id: 175,
    name: 'Root Planet',
    world: 'lyn',
    done: true,
    race: 'forest_elf'
  },
  {
    id: 176,
    name: 'Taunkor Tribes',
    world: 'lyn',
    done: true,
    race: 'beastman'
  },
  {
    id: 177,
    name: 'Dulcuz Tribes',
    world: 'tera'
  },
  {
    id: 178,
    name: 'Rishana Kingdom',
    world: 'vikings'
  },
  {
    id: 179,
    name: 'Amelie Kingdom',
    world: 'vikings'
  },
  {
    id: 180,
    name: 'Dracula Castle',
    world: 'vikings'
  },
  {
    id: 181,
    name: 'Zaraugug Tribes',
    world: 'vikings'
  },
  {
    id: 182,
    name: 'Ilmog Tribes',
    world: 'vikings'
  },
  {
    id: 183,
    name: 'Bob Pirates',
    world: 'vikings'
  },
  {
    id: 184,
    name: 'Blusnorn Wildlands',
    world: 'vikings'
  },
  {
    id: 185,
    name: 'Sinbad Islands',
    world: 'vikings',
    done: true,
    race: 'persia'
  },
  {
    id: 186,
    name: 'Aman Empire',
    world: 'israel'
  },
  {
    id: 187,
    name: 'Leon Kingdom',
    world: 'tera'
  },
  {
    id: 188,
    name: 'Balin Kingdom',
    world: 'tera'
  },
  {
    id: 189,
    name: 'Helena Kingdom',
    world: 'tera'
  },
  {
    id: 190,
    name: 'Redahe Kingdom',
    world: 'tera'
  },
  {
    id: 191,
    name: 'Darius Empire',
    world: 'israel',
    done: true,
    race: 'persia'
  },
  {
    id: 192,
    name: 'Nightlake Forest',
    world: 'vikings'
  },
  {
    id: 193,
    name: 'Khordaldrum Mountain',
    world: 'vikings'
  },
  {
    id: 194,
    name: 'Sura Tribes',
    world: 'fantasy'
  },
  {
    id: 195,
    name: 'Mustafa Caliphate',
    world: 'fantasy'
  },
  {
    id: 196,
    name: 'Taymuria Kingdom',
    world: 'fantasy'
  },
  {
    id: 197,
    name: 'Jirguth Hell',
    world: 'fantasy'
  },
  {
    id: 198,
    name: 'Miyamoto Clan',
    world: 'fantasy'
  },
  {
    id: 199,
    name: 'Pestilens Clan',
    world: 'bless'
  },
  {
    id: 200,
    name: 'Kiladak Kingdom',
    world: 'tera'
  },
  {
    id: 201,
    name: 'Lyria Forest',
    world: 'fantasy'
  },
  {
    id: 202,
    name: 'Bugthak Empire',
    world: 'lyn',
    done: true,
    race: 'beastman'
  },
  {
    id: 203,
    name: 'Ivailo Forest',
    world: 'age_magic',
    done: true,
    race: 'beastman'
  },
  {
    id: 204,
    name: 'Obama Faction',
    world: 'endless'
  },
  {
    id: 205,
    name: 'Qonta Kingdom',
    world: 'fantasy'
  },
  {
    id: 206,
    name: 'Yendac Darkness',
    world: 'heroes'
  },
  {
    id: 207,
    name: 'Nakajima Water',
    world: 'heroes'
  },
  {
    id: 208,
    name: 'Nargi Tribes',
    world: 'heroes'
  },
  {
    id: 209,
    name: 'Felix Heaven',
    world: 'age_magic',
    done: true,
    race: 'nephalim'
  },
  {
    id: 210,
    name: 'Plainfang Kingdom',
    world: 'israel'
  },
  {
    id: 211,
    name: 'Argos Sea',
    world: 'israel',
    done: true,
    race: 'greek'
  },
  {
    id: 212,
    name: 'Olaf Kingdom',
    world: 'vikings'
  },
  {
    id: 213,
    name: 'Gondor Empire',
    world: 'space'
  },
  {
    id: 214,
    name: 'Delruruth Cave',
    world: 'space',
    done: true,
    race: 'demon'
  },
  {
    id: 215,
    name: 'Rot Cave',
    world: 'fantasy',
    done: true,
    race: 'chaos'
  },
  /*{
    id: 216,
    name: 'Abbasid Caliphate',
    world: 'history'
  },*/
  {
    id: 217,
    name: 'Rhun Caliphate',
    world: 'space',
    done: true,
    race: 'persia'
  },
  /*{
    id: 218,
    name: 'Khamul Empire',
    world: 'history'
  },*/
  {
    id: 219,
    name: 'Khalib Caliphate',
    world: 'age_magic'
  },
  {
    id: 220,
    name: 'Cedrem Darkness',
    world: 'endless'
  },
  {
    id: 221,
    name: 'Fafnir Realm',
    world: 'zsmite'
  },
  {
    id: 222,
    name: 'Miguel Country',
    world: 'king_bounty',
    done: true,
    race: 'espana'
  },
  /*{
    id: 223,
    name: 'Sparta State',
    world: 'history',
    done: true,
    race: 'greek'
  },*/
  {
    id: 224,
    name: 'Swamp Lands',
    world: 'lyn'
  },
  {
    id: 225,
    name: 'Deepwood Lands',
    world: 'lyn',
    done: true,
    race: 'forest_elf'
  },
  {
    id: 226,
    name: 'Khorne Chaos',
    world: 'warhammer'
  },
  {
    id: 227,
    name: 'Albion Lands',
    world: 'warhammer',
    done: true,
    race: 'britain'
  },
  {
    id: 228,
    name: 'Harkon Islands',
    world: 'warhammer',
    done: true,
    race: 'lich'
  },
  {
    id: 228,
    name: 'Nakai Empire',
    world: 'raid_shadow'
  },
  {
    id: 229,
    name: 'Ryu Clan',
    world: 'zsmite'
  },
  {
    id: 230,
    name: 'Podsal Kingdom',
    world: 'bless'
  },
  {
    id: 231,
    name: 'Dark Empire',
    world: 'warhammer'
  },
  {
    id: 232,
    name: 'Wasteland Faction',
    world: 'lyn'
  },
  {
    id: 233,
    name: 'Plague Hell',
    world: 'lyn',
    done: true,
    race: 'chaos'
  },
  {
    id: 234,
    name: 'Uabruc House',
    world: 'space'
  },
  {
    id: 235,
    name: 'Naxxremix Wildlands',
    world: 'endless'
  },
  {
    id: 236,
    name: 'Darcey Royal',
    world: 'endless'
  },
  {
    id: 237,
    name: 'Oakhand Empire',
    world: 'endless'
  },
  {
    id: 238,
    name: 'Rupah House',
    world: 'space'
  },
  {
    id: 239,
    name: 'Borraz Kingdom',
    world: 'space',
    done: true,
    race: 'demon'
  },
  {
    id: 240,
    name: 'Glyesin Void',
    world: 'space'
  },
  {
    id: 241,
    name: 'Baraka Tribes',
    world: 'israel'
  },
  {
    id: 242,
    name: 'Hazm Caliphate',
    world: 'israel'
  },
  {
    id: 243,
    name: 'Nurgle Chaos',
    world: 'warhammer'
  },
];

const realFactions = _.map(Factions, (faction) => {
  const { id, world } = faction;
  return {
    ...faction,
    count: _.query(UnitListDB[world], { faction: id }).length
  }
});

export default realFactions;