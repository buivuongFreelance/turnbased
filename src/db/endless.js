const Units = [
  {
    id: 1,
    name: 'Birdman',
    faction: 17,
    image: 'endless/u1.png',
    size: 1.52
  },
  {
    id: 2,
    name: 'Centaur',
    faction: 17,
    image: 'endless/u2.png',
    size: 1.15
  },
  {
    id: 3,
    name: 'Cavalry',
    faction: 19,
    image: 'endless/u3.png',
    size: 1.62
  },
  {
    id: 4,
    name: 'Captain',
    faction: 19,
    image: 'endless/u4.png',
    size: 1.36
  },
  {
    id: 5,
    name: 'Veteran II',
    faction: 19,
    image: 'endless/u5.png',
    size: 1.25
  },
  {
    id: 6,
    name: 'Militia',
    faction: 42,
    image: 'endless/u6.png',
    size: 1
  },
  {
    id: 7,
    name: 'Mirror Militia',
    faction: 42,
    image: 'endless/u7.png',
    size: 1
  },
  {
    id: 8,
    name: 'Flying Thing',
    faction: 42,
    image: 'endless/u8.png',
    size: 1.1
  },
  {
    id: 9,
    name: 'Mirror Flying Thing',
    faction: 42,
    image: 'endless/u9.png',
    size: 1.1
  },
  {
    id: 10,
    name: 'Mirror Dragon I',
    faction: 42,
    image: 'endless/u10.png',
    size: 1.2
  },
  {
    id: 11,
    name: 'Mirror Dragon I',
    faction: 42,
    image: 'endless/u11.png',
    size: 1.2
  },
  {
    id: 12,
    name: 'Legion',
    faction: 19,
    image: 'endless/u12.png',
    size: 1.21
  },
  {
    id: 13,
    name: 'Legion',
    faction: 19,
    image: 'endless/u13.png',
    size: 1.25
  },
  {
    id: 14,
    name: 'Legion',
    faction: 19,
    image: 'endless/u14.png',
    size: 1.26
  },
  {
    id: 15,
    name: 'Legion',
    faction: 19,
    image: 'endless/u15.png',
    size: 1.07
  },
  {
    id: 16,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u16.png',
    size: 1.2
  },
  {
    id: 17,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u17.png',
    size: 1.2
  },
  {
    id: 18,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u18.png',
    size: 1.2
  },
  {
    id: 19,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u19.png',
    size: 1.2
  },
  {
    id: 20,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u20.png',
    size: 1.08
  },
  {
    id: 21,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u21.png',
    size: 1.08
  },
  {
    id: 22,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u22.png',
    size: 1.5
  },
  {
    id: 23,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u23.png',
    size: 1.55
  },
  {
    id: 24,
    name: 'Soldier',
    faction: 42,
    image: 'endless/u24.png',
    size: 1.55
  },
  {
    id: 25,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u25.png',
    size: 1.4
  },
  {
    id: 26,
    name: 'Soldier',
    faction: 23,
    image: 'endless/u26.png',
    size: 1
  },
  {
    id: 27,
    name: 'Soldier',
    faction: 24,
    image: 'endless/u27.png',
    size: 1.05
  },
  {
    id: 28,
    name: 'Soldier',
    faction: 22,
    image: 'endless/u28.png',
    size: 0.98
  },
  {
    id: 29,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u29.png',
    size: 1
  },
  {
    id: 30,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u30.png',
    size: 1.05
  },
  {
    id: 31,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u31.png',
    size: 1.17
  },
  {
    id: 32,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u32.png',
    size: 1.17
  },
  {
    id: 33,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u33.png',
    size: 1.17
  },
  {
    id: 34,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u34.png',
    size: 1.12
  },
  {
    id: 35,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u35.png',
    size: 0.99
  },
  {
    id: 36,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u36.png',
    size: 1.04
  },
  {
    id: 37,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u37.png',
    size: 0.98
  },
  {
    id: 38,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u38.png',
    size: 0.98
  },
  {
    id: 39,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u39.png',
    size: 1
  },
  {
    id: 40,
    name: 'Soldier',
    faction: 14,
    image: 'endless/u40.png',
    size: 1.2
  },
  {
    id: 41,
    name: 'Soldier',
    faction: 117,
    image: 'endless/u41.png',
    size: 1.08
  },
  {
    id: 42,
    name: 'Soldier',
    faction: 17,
    image: 'endless/u42.png',
    size: 1.08
  },
  {
    id: 43,
    name: 'Soldier',
    faction: 16,
    image: 'endless/u43.png',
    size: 0.9
  },
  {
    id: 44,
    name: 'Soldier',
    faction: 118,
    image: 'endless/u44.png',
    size: 1
  },
  {
    id: 45,
    name: 'Soldier',
    faction: 118,
    image: 'endless/u45.png',
    size: 1.6
  },
  {
    id: 121,
    name: 'Titan Of Mezari',
    faction: 16,
    image: 'endless/u121.png',
    size: 1.4
  },
  {
    id: 122,
    name: 'Veteran Swordsman',
    faction: 18,
    image: 'endless/u122.png',
    size: 1.25
  },
  {
    id: 123,
    name: 'Veteran Priest',
    faction: 18,
    image: 'endless/u123.png',
    size: 1.22
  },
  {
    id: 124,
    name: 'Veteran Knight',
    faction: 18,
    image: 'endless/u124.png',
    size: 1.2
  },
  {
    id: 125,
    name: 'Treant Militia',
    faction: 18,
    image: 'endless/u125.png',
    size: 1.03
  },
  {
    id: 126,
    name: 'Treant Centaur',
    faction: 18,
    image: 'endless/u126.png',
    size: 1.07
  },
  {
    id: 127,
    name: 'Treant Gorgon',
    faction: 18,
    image: 'endless/u127.png',
    size: 1.2
  },
  {
    id: 128,
    name: 'Dwarven Strong',
    faction: 43,
    image: 'endless/u128.png',
    size: 0.91
  },
  {
    id: 129,
    name: 'Night Elf',
    faction: 44,
    image: 'endless/u129.png',
    size: 1.2
  },
  {
    id: 130,
    name: 'High Elf',
    faction: 43,
    image: 'endless/u130.png',
    size: 1.36
  },
  {
    id: 131,
    name: 'Orc',
    faction: 44,
    image: 'endless/u131.png',
    size: 1.35
  },
  {
    id: 132,
    name: 'Orc',
    faction: 44,
    image: 'endless/u132.png',
    size: 0.85
  },
  {
    id: 133,
    name: 'Orc',
    faction: 44,
    image: 'endless/u133.png',
    size: 1.3
  },
  {
    id: 134,
    name: 'Dwarf',
    faction: 43,
    image: 'endless/u134.png',
    size: 1
  },
  {
    id: 135,
    name: 'Dark Elf',
    faction: 44,
    image: 'endless/u135.png',
    size: 1.2
  },
  {
    id: 136,
    name: 'Soldier',
    faction: 43,
    image: 'endless/u136.png',
    size: 1.05
  },
  {
    id: 137,
    name: 'Dark Elf',
    faction: 44,
    image: 'endless/u137.png',
    size: 1.2
  },
  {
    id: 138,
    name: 'Dark Elf',
    faction: 44,
    image: 'endless/u138.png',
    size: 1.5
  },
  {
    id: 139,
    name: 'Soldier',
    faction: 43,
    image: 'endless/u139.png',
    size: 1.41
  },
  {
    id: 140,
    name: 'Soldier',
    faction: 43,
    image: 'endless/u140.png',
    size: 0.95
  },
  {
    id: 141,
    name: 'Soldier',
    faction: 44,
    image: 'endless/u141.png',
    size: 1.17
  },
  {
    id: 142,
    name: 'Night Elf',
    faction: 44,
    image: 'endless/u142.png',
    size: 1.2
  },
  {
    id: 143,
    name: 'Night Elf',
    faction: 44,
    image: 'endless/u143.png',
    size: 1.11
  },
  {
    id: 144,
    name: 'Soldier',
    faction: 43,
    image: 'endless/u144.png',
    size: 1.1
  },
  {
    id: 145,
    name: 'High Elf',
    faction: 43,
    image: 'endless/u145.png',
    size: 1.35
  },
  {
    id: 146,
    name: 'High Elf',
    faction: 43,
    image: 'endless/u146.png',
    size: 1.35
  },
  {
    id: 147,
    name: 'Soldier',
    faction: 15,
    image: 'endless/u147.png',
    size: 1.03
  },
  {
    id: 148,
    name: 'Soldier',
    faction: 15,
    image: 'endless/u148.png',
    size: 1.06
  },
  {
    id: 149,
    name: 'Soldier',
    faction: 117,
    image: 'endless/u149.png',
    size: 1.13
  },
  {
    id: 150,
    name: 'Soldier',
    faction: 117,
    image: 'endless/u150.png',
    size: 1.15
  },
  {
    id: 151,
    name: 'Soldier',
    faction: 22,
    image: 'endless/u151.png',
    size: 1.2
  },
  {
    id: 152,
    name: 'Soldier',
    faction: 23,
    image: 'endless/u152.png',
    size: 1.2
  },
  {
    id: 153,
    name: 'Soldier',
    faction: 23,
    image: 'endless/u153.png',
    size: 1.15
  },
  {
    id: 154,
    name: 'Soldier',
    faction: 100,
    image: 'endless/u154.png',
    size: 1.1
  },
  {
    id: 155,
    name: 'Soldier',
    faction: 22,
    image: 'endless/u155.png',
    size: 1.06
  },
  {
    id: 156,
    name: 'Soldier',
    faction: 24,
    image: 'endless/u156.png',
    size: 1
  },
  {
    id: 157,
    name: 'Soldier',
    faction: 15,
    image: 'endless/u157.png',
    size: 1.03
  },
  {
    id: 158,
    name: 'Soldier',
    faction: 15,
    image: 'endless/u158.png',
    size: 1.01
  },
  {
    id: 159,
    name: 'Soldier',
    faction: 23,
    image: 'endless/u159.png',
    size: 1.17
  },
  {
    id: 160,
    name: 'Soldier',
    faction: 30,
    image: 'endless/u160.png',
    size: 1.1
  },
  {
    id: 161,
    name: 'Soldier',
    faction: 116,
    image: 'endless/u161.png',
    size: 1.02
  },
  {
    id: 162,
    name: 'Soldier',
    faction: 116,
    image: 'endless/u162.png',
    size: 1
  },
  {
    id: 163,
    name: 'Soldier',
    faction: 23,
    image: 'endless/u163.png',
    size: 0.98
  },
  {
    id: 164,
    name: 'Soldier',
    faction: 22,
    image: 'endless/u164.png',
    size: 0.98
  },
  {
    id: 165,
    name: 'Soldier',
    faction: 22,
    image: 'endless/u165.png',
    size: 0.98
  }
];

export default Units;