const Units = [
  {
    id: 1,
    name: 'Long Spear Guard',
    faction: 4,
    image: 'asian/u1.png',
    size: 1.13
  },
  {
    id: 2,
    name: 'Golden Guard',
    faction: 6,
    image: 'asian/u2.png',
    size: 1.1
  },
  {
    id: 3,
    name: 'Green Soldier',
    faction: 6,
    image: 'asian/u3.png',
    size: 1.15
  },
  {
    id: 4,
    name: 'Royal Guard',
    faction: 6,
    image: 'asian/u4.png',
    size: 1.12
  },
  {
    id: 5,
    name: 'Dark Hero',
    faction: 8,
    image: 'asian/u5.png',
    size: 1.18
  },
  {
    id: 6,
    name: 'Royal Tactician',
    faction: 4,
    image: 'asian/u6.png',
    size: 1.16
  },
  {
    id: 7,
    name: 'Royal Tactician',
    faction: 5,
    image: 'asian/u7.png',
    size: 1.09
  },
  {
    id: 8,
    name: 'Young Tactician',
    faction: 5,
    image: 'asian/u8.png',
    size: 1
  },
  {
    id: 9,
    name: 'Empreror',
    faction: 4,
    image: 'asian/u9.png',
    size: 1.17
  },
  {
    id: 10,
    name: 'Dark Tactician',
    faction: 4,
    image: 'asian/u10.png',
    size: 1.02
  },
  {
    id: 11,
    name: 'Young',
    faction: 4,
    image: 'asian/u11.png',
    size: 1.05
  },
  {
    id: 12,
    name: 'III',
    faction: 7,
    image: 'asian/u12.png',
    size: 1.15
  },
  {
    id: 13,
    name: 'III',
    faction: 7,
    image: 'asian/u13.png',
    size: 1.28
  },
  {
    id: 14,
    name: 'Maid',
    faction: 7,
    image: 'asian/u14.png',
    size: 1
  },
  {
    id: 15,
    name: 'Soldier',
    faction: 8,
    image: 'asian/u15.png',
    size: 1.06
  },
  {
    id: 16,
    name: 'Sol',
    faction: 6,
    image: 'asian/u16.png',
    size: 1.01
  },
  {
    id: 17,
    name: 'Sol',
    faction: 6,
    image: 'asian/u17.png',
    size: 1.41
  },
  {
    id: 18,
    name: 'Sol',
    faction: 5,
    image: 'asian/u18.png',
    size: 1.04
  },
  {
    id: 19,
    name: 'Sol',
    faction: 5,
    image: 'asian/u19.png',
    size: 1.2
  },
  {
    id: 20,
    name: 'Sol',
    faction: 5,
    image: 'asian/u20.png',
    size: 1.1
  },
  {
    id: 21,
    name: 'Sol',
    faction: 7,
    image: 'asian/u21.png',
    size: 1.13
  },
  {
    id: 22,
    name: 'Sol',
    faction: 25,
    image: 'asian/u22.png',
    size: 1
  },
  {
    id: 23,
    name: 'Sol',
    faction: 7,
    image: 'asian/u23.png',
    size: 1
  },
  {
    id: 24,
    name: 'Sol',
    faction: 7,
    image: 'asian/u24.png',
    size: 1.1
  },
  {
    id: 25,
    name: 'Sol',
    faction: 6,
    image: 'asian/u25.png',
    size: 1.05
  },
  {
    id: 26,
    name: 'Sol',
    faction: 5,
    image: 'asian/u26.png',
    size: 1
  },
  {
    id: 27,
    name: 'Sol',
    faction: 8,
    image: 'asian/u27.png',
    size: 1.1
  },
  {
    id: 28,
    name: 'Sol',
    faction: 8,
    image: 'asian/u28.png',
    size: 1.2
  },
  {
    id: 29,
    name: 'Sol',
    faction: 4,
    image: 'asian/u29.png',
    size: 1.04
  },
  {
    id: 30,
    name: 'Sol',
    faction: 6,
    image: 'asian/u30.png',
    size: 1
  },
  {
    id: 31,
    name: 'Sol',
    faction: 89,
    image: 'asian/u31.png',
    size: 0.98,
    level: 4
  },
  {
    id: 32,
    name: 'Sol',
    faction: 82,
    image: 'asian/u32.png',
    size: 1.06,
    level: 12
  },
  {
    id: 33,
    name: 'Sol',
    faction: 25,
    image: 'asian/u33.png',
    size: 1.02
  },
  {
    id: 34,
    name: 'Sol',
    faction: 25,
    image: 'asian/u34.png',
    size: 1.14
  },
  {
    id: 35,
    name: 'Sol',
    faction: 4,
    image: 'asian/u35.png',
    size: 1.2
  },
  {
    id: 36,
    name: 'Sol',
    faction: 7,
    image: 'asian/u36.png',
    size: 1.02
  },
  {
    id: 37,
    name: 'Sol',
    faction: 25,
    image: 'asian/u37.png',
    size: 1.03
  },
  {
    id: 38,
    name: 'Sol',
    faction: 5,
    image: 'asian/u38.png',
    size: 1.19
  },
  {
    id: 39,
    name: 'Sol',
    faction: 7,
    image: 'asian/u39.png',
    size: 1.08
  },
  {
    id: 40,
    name: 'Sol',
    faction: 7,
    image: 'asian/u40.png',
    size: 1.06
  },
  {
    id: 41,
    name: 'Sol',
    faction: 25,
    image: 'asian/u41.png',
    size: 1.18
  },
  {
    id: 42,
    name: 'Sol',
    faction: 7,
    image: 'asian/u42.png',
    size: 1.04
  },
  {
    id: 43,
    name: 'Sol',
    faction: 4,
    image: 'asian/u43.png',
    size: 1.24
  },
  {
    id: 44,
    name: 'Sol',
    faction: 4,
    image: 'asian/u44.png',
    size: 1.22
  },
  {
    id: 45,
    name: 'Sol',
    faction: 4,
    image: 'asian/u45.png',
    size: 1.09
  },
  {
    id: 46,
    name: 'Sol',
    faction: 8,
    image: 'asian/u46.png',
    size: 1.22
  },
  {
    id: 47,
    name: 'Sol',
    faction: 8,
    image: 'asian/u47.png',
    size: 1.24
  },
  {
    id: 48,
    name: 'Sol',
    faction: 8,
    image: 'asian/u48.png',
    size: 1.24
  },
  {
    id: 49,
    name: 'Sol',
    faction: 5,
    image: 'asian/u49.png',
    size: 1.06
  },
  {
    id: 50,
    name: 'Sol',
    faction: 7,
    image: 'asian/u50.png',
    size: 1.03
  },
  {
    id: 51,
    name: 'Sol',
    faction: 4,
    image: 'asian/u51.png',
    size: 1.1
  },
  {
    id: 52,
    name: 'Sol',
    faction: 7,
    image: 'asian/u52.png',
    size: 1.05
  },
  {
    id: 53,
    name: 'Sol',
    faction: 7,
    image: 'asian/u53.png',
    size: 1.16
  },
  {
    id: 54,
    name: 'Sol',
    faction: 5,
    image: 'asian/u54.png',
    size: 1.18
  },
  {
    id: 55,
    name: 'Sol',
    faction: 8,
    image: 'asian/u55.png',
    size: 1.18
  },
  {
    id: 56,
    name: 'Sol',
    faction: 5,
    image: 'asian/u56.png',
    size: 1.17
  },
  {
    id: 57,
    name: 'Sol',
    faction: 5,
    image: 'asian/u57.png',
    size: 1.17
  },
  {
    id: 58,
    name: 'Sol',
    faction: 7,
    image: 'asian/u58.png',
    size: 1.14
  },
  {
    id: 59,
    name: 'Sol',
    faction: 7,
    image: 'asian/u59.png',
    size: 1.03
  },
  {
    id: 60,
    name: 'Sol',
    faction: 7,
    image: 'asian/u60.png',
    size: 1.04
  },
  {
    id: 61,
    name: 'Sol',
    faction: 7,
    image: 'asian/u61.png',
    size: 1.04
  },
  {
    id: 62,
    name: 'Sol',
    faction: 8,
    image: 'asian/u62.png',
    size: 1.03
  },
  {
    id: 63,
    name: 'Sol',
    faction: 8,
    image: 'asian/u63.png',
    size: 1.13
  },
  {
    id: 64,
    name: 'Sol',
    faction: 4,
    image: 'asian/u64.png',
    size: 1.13
  },
  {
    id: 65,
    name: 'Sol',
    faction: 5,
    image: 'asian/u65.png',
    size: 1.09
  },
  {
    id: 66,
    name: 'Sol',
    faction: 7,
    image: 'asian/u66.png',
    size: 0.99
  },
  {
    id: 67,
    name: 'Sol',
    faction: 8,
    image: 'asian/u67.png',
    size: 1.02
  },
  {
    id: 68,
    name: 'Sol',
    faction: 8,
    image: 'asian/u68.png',
    size: 1.14
  },
  {
    id: 69,
    name: 'Sol',
    faction: 7,
    image: 'asian/u69.png',
    size: 1
  },
  {
    id: 70,
    name: 'Sol',
    faction: 6,
    image: 'asian/u70.png',
    size: 1.08
  },
  {
    id: 71,
    name: 'Sol',
    faction: 25,
    image: 'asian/u71.png',
    size: 0.99
  },
  {
    id: 72,
    name: 'Sol',
    faction: 7,
    image: 'asian/u72.png',
    size: 1.04
  },
  {
    id: 73,
    name: 'Sol',
    faction: 8,
    image: 'asian/u73.png',
    size: 1.11
  },
  {
    id: 74,
    name: 'Sol',
    faction: 8,
    image: 'asian/u74.png',
    size: 1.19
  },
  {
    id: 75,
    name: 'Sol',
    faction: 6,
    image: 'asian/u75.png',
    size: 1
  },
  {
    id: 76,
    name: 'Sol',
    faction: 7,
    image: 'asian/u76.png',
    size: 1.13
  },
  {
    id: 77,
    name: 'Sol',
    faction: 5,
    image: 'asian/u77.png',
    size: 1.08
  },
  {
    id: 78,
    name: 'Sol',
    faction: 7,
    image: 'asian/u78.png',
    size: 1
  },
  {
    id: 79,
    name: 'Sol',
    faction: 8,
    image: 'asian/u79.png',
    size: 1.2
  },
  {
    id: 80,
    name: 'Sol',
    faction: 8,
    image: 'asian/u80.png',
    size: 1.11
  },
  {
    id: 81,
    name: 'Sol',
    faction: 6,
    image: 'asian/u81.png',
    size: 1.06
  },
  {
    id: 82,
    name: 'Sol',
    faction: 4,
    image: 'asian/u82.png',
    size: 1.07
  },
  {
    id: 83,
    name: 'Sol',
    faction: 4,
    image: 'asian/u83.png',
    size: 1.05
  },
  {
    id: 84,
    name: 'Sol',
    faction: 7,
    image: 'asian/u84.png',
    size: 1
  },
  {
    id: 85,
    name: 'Sol',
    faction: 4,
    image: 'asian/u85.png',
    size: 1.05
  },
  {
    id: 86,
    name: 'Sol',
    faction: 25,
    image: 'asian/u86.png',
    size: 1.08
  },
  {
    id: 87,
    name: 'Sol',
    faction: 7,
    image: 'asian/u87.png',
    size: 1.11
  },
  {
    id: 88,
    name: 'Sol',
    faction: 4,
    image: 'asian/u88.png',
    size: 1.16
  },
  {
    id: 89,
    name: 'Sol',
    faction: 4,
    image: 'asian/u89.png',
    size: 1.08
  },
  {
    id: 90,
    name: 'Sol',
    faction: 8,
    image: 'asian/u90.png',
    size: 1.07
  },
  {
    id: 111,
    name: 'Big Soldier',
    faction: 5,
    image: 'asian/u111.png',
    size: 1.03
  },
  {
    id: 112,
    name: 'Green Dragon',
    faction: 4,
    image: 'asian/u112.png',
    size: 1.4
  },
  {
    id: 113,
    name: 'Night Warrior',
    faction: 25,
    image: 'asian/u113.png',
    size: 1
  },
  {
    id: 114,
    name: 'Ranger Of Sea',
    faction: 5,
    image: 'asian/u114.png',
    size: 1.09
  },
  {
    id: 115,
    name: 'Soldier',
    faction: 6,
    image: 'asian/u115.png',
    size: 1.07
  },
  {
    id: 116,
    name: 'Heavy Elephant',
    faction: 25,
    image: 'asian/u116.png',
    size: 1.4
  },
  {
    id: 117,
    name: 'Elephant Guard',
    faction: 25,
    image: 'asian/u117.png',
    size: 1.11
  },
  {
    id: 118,
    name: 'Mongol Warrior',
    faction: 25,
    image: 'asian/u118.png',
    size: 1.15
  },
  {
    id: 119,
    name: 'Yellow Warrior',
    faction: 6,
    image: 'asian/u119.png',
    size: 1
  },
  {
    id: 120,
    name: 'Yellow Brute',
    faction: 6,
    image: 'asian/u120.png',
    size: 1.05
  },
  {
    id: 121,
    name: 'Soldier',
    faction: 8,
    image: 'asian/u121.png',
    size: 1.01
  },
  {
    id: 122,
    name: 'Swimmer',
    faction: 5,
    image: 'asian/u122.png',
    size: 1
  },
  {
    id: 123,
    name: 'Student',
    faction: 4,
    image: 'asian/u123.png',
    size: 1.23
  },
  {
    id: 124,
    name: 'Sol',
    faction: 8,
    image: 'asian/u124.png',
    size: 1.11
  },
  {
    id: 125,
    name: 'Sol',
    faction: 6,
    image: 'asian/u125.png',
    size: 1.01
  },
  {
    id: 126,
    name: 'Sol',
    faction: 4,
    image: 'asian/u126.png',
    size: 1.13
  },
  {
    id: 127,
    name: 'Sol',
    faction: 82,
    image: 'asian/u127.png',
    size: 1.08,
    level: 6
  },
  {
    id: 128,
    name: 'Sol',
    faction: 82,
    image: 'asian/u128.png',
    size: 1.2,
    level: 13
  },
  {
    id: 129,
    name: 'Sol',
    faction: 89,
    image: 'asian/u129.png',
    size: 1.01,
    level: 5
  },
  {
    id: 130,
    name: 'Sol',
    faction: 82,
    image: 'asian/u130.png',
    size: 1.06,
    level: 5
  },
  {
    id: 131,
    name: 'Sol',
    faction: 82,
    image: 'asian/u131.png',
    size: 1.05,
    level: 7
  },
  {
    id: 132,
    name: 'Sol',
    faction: 82,
    image: 'asian/u132.png',
    size: 1.05,
    level: 3
  },
  {
    id: 133,
    name: 'Sol',
    faction: 82,
    image: 'asian/u133.png',
    size: 1.17,
    level: 10
  },
  {
    id: 134,
    name: 'Sol',
    faction: 89,
    image: 'asian/u134.png',
    size: 1.01,
    level: 2
  },
  {
    id: 135,
    name: 'Sol',
    faction: 89,
    image: 'asian/u135.png',
    size: 1.01,
    level: 8
  },
  {
    id: 136,
    name: 'Sol',
    faction: 89,
    image: 'asian/u136.png',
    size: 1.08,
    level: 11
  },
  {
    id: 137,
    name: 'Sol',
    faction: 89,
    image: 'asian/u137.png',
    size: 1.05,
    level: 10
  },
  {
    id: 138,
    name: 'Sol',
    faction: 89,
    image: 'asian/u138.png',
    size: 1,
    level: 6
  },
  {
    id: 139,
    name: 'Sol',
    faction: 82,
    image: 'asian/u139.png',
    size: 1.02,
    level: 1
  },
  {
    id: 140,
    name: 'Sol',
    faction: 82,
    image: 'asian/u140.png',
    size: 1.03,
    level: 8
  },
  {
    id: 141,
    name: 'Sol',
    faction: 89,
    image: 'asian/u141.png',
    size: 1.01,
    level: 3
  },
  {
    id: 142,
    name: 'Sol',
    faction: 89,
    image: 'asian/u142.png',
    size: 1,
    level: 1
  },
  {
    id: 143,
    name: 'Sol',
    faction: 82,
    image: 'asian/u143.png',
    size: 1,
    level: 2
  },
  {
    id: 144,
    name: 'Sol',
    faction: 89,
    image: 'asian/u144.png',
    size: 1.03,
    level: 12
  },
  {
    id: 145,
    name: 'Sol',
    faction: 89,
    image: 'asian/u145.png',
    size: 1,
    level: 7
  },
  {
    id: 146,
    name: 'Sol',
    faction: 89,
    image: 'asian/u146.png',
    size: 1.02,
    level: 9
  },
  {
    id: 147,
    name: 'Sol',
    faction: 82,
    image: 'asian/u147.png',
    size: 1.06,
    level: 4
  },
  {
    id: 148,
    name: 'Sol',
    faction: 82,
    image: 'asian/u148.png',
    size: 1.08,
    level: 11
  },
  {
    id: 149,
    name: 'Sol',
    faction: 82,
    image: 'asian/u149.png',
    size: 1.04,
    level: 9
  },
  {
    id: 150,
    name: 'Sol',
    faction: 129,
    image: 'asian/u150.png',
    size: 1.03
  },
  {
    id: 151,
    name: 'Sol',
    faction: 129,
    image: 'asian/u151.png',
    size: 1.03
  },
  {
    id: 152,
    name: 'Sol',
    faction: 129,
    image: 'asian/u152.png',
    size: 1.03
  },
  {
    id: 153,
    name: 'Sol',
    faction: 129,
    image: 'asian/u153.png',
    size: 1
  },
  {
    id: 154,
    name: 'Sol',
    faction: 139,
    image: 'asian/u154.png',
    size: 1.01
  },
  {
    id: 155,
    name: 'Sol',
    faction: 139,
    image: 'asian/u155.png',
    size: 1.01
  },
  {
    id: 156,
    name: 'Sol',
    faction: 139,
    image: 'asian/u156.png',
    size: 1.4
  },
  {
    id: 157,
    name: 'Sol',
    faction: 139,
    image: 'asian/u157.png',
    size: 1.7
  },
  {
    id: 158,
    name: 'Sol',
    faction: 139,
    image: 'asian/u158.png',
    size: 1.05
  },
  {
    id: 159,
    name: 'Sol',
    faction: 139,
    image: 'asian/u159.png',
    size: 1.05
  },
  {
    id: 160,
    name: 'Sol',
    faction: 139,
    image: 'asian/u160.png',
    size: 1.1
  },
  {
    id: 161,
    name: 'Sol',
    faction: 139,
    image: 'asian/u161.png',
    size: 0.75
  },
  {
    id: 162,
    name: 'Sol',
    faction: 139,
    image: 'asian/u162.png',
    size: 0.75
  },
  {
    id: 163,
    name: 'Sol',
    faction: 139,
    image: 'asian/u163.png',
    size: 0.75
  },
  {
    id: 164,
    name: 'Sol',
    faction: 129,
    image: 'asian/u164.png',
    size: 1.04
  },
  {
    id: 165,
    name: 'Sol',
    faction: 129,
    image: 'asian/u165.png',
    size: 1.03
  },
  {
    id: 166,
    name: 'Sol',
    faction: 139,
    image: 'asian/u166.png',
    size: 1.03
  },
  {
    id: 167,
    name: 'Sol',
    faction: 129,
    image: 'asian/u167.png',
    size: 1.04
  },
  {
    id: 168,
    name: 'Sol',
    faction: 129,
    image: 'asian/u168.png',
    size: 1.04
  },
  {
    id: 169,
    name: 'Sol',
    faction: 129,
    image: 'asian/u169.png',
    size: 1.08
  },
  {
    id: 170,
    name: 'Sol',
    faction: 139,
    image: 'asian/u170.png',
    size: 1.15
  },
  {
    id: 171,
    name: 'Sol',
    faction: 129,
    image: 'asian/u171.png',
    size: 1.01
  },
  {
    id: 172,
    name: 'Sol',
    faction: 129,
    image: 'asian/u172.png',
    size: 0.99
  },
  {
    id: 173,
    name: 'Sol',
    faction: 139,
    image: 'asian/u173.png',
    size: 1.1
  },
  {
    id: 174,
    name: 'Sol',
    faction: 129,
    image: 'asian/u174.png',
    size: 1.01
  },
  {
    id: 175,
    name: 'Sol',
    faction: 129,
    image: 'asian/u175.png',
    size: 1
  },
  {
    id: 176,
    name: 'Sol',
    faction: 129,
    image: 'asian/u176.png',
    size: 1
  },
  {
    id: 177,
    name: 'Sol',
    faction: 129,
    image: 'asian/u177.png',
    size: 1.06
  },
  {
    id: 178,
    name: 'Sol',
    faction: 129,
    image: 'asian/u178.png',
    size: 1
  },
  {
    id: 179,
    name: 'Sol',
    faction: 129,
    image: 'asian/u179.png',
    size: 1.03
  },
  {
    id: 180,
    name: 'Sol',
    faction: 129,
    image: 'asian/u180.png',
    size: 1.03
  },
  {
    id: 181,
    name: 'Sol',
    faction: 129,
    image: 'asian/u181.png',
    size: 1.02
  },
  {
    id: 182,
    name: 'Sol',
    faction: 129,
    image: 'asian/u182.png',
    size: 1.02
  },
  {
    id: 183,
    name: 'Sol',
    faction: 129,
    image: 'asian/u183.png',
    size: 1.02
  },
  {
    id: 184,
    name: 'Sol',
    faction: 129,
    image: 'asian/u184.png',
    size: 1.03
  },
  {
    id: 185,
    name: 'Sol',
    faction: 129,
    image: 'asian/u185.png',
    size: 1.02
  },
  {
    id: 186,
    name: 'Sol',
    faction: 139,
    image: 'asian/u186.png',
    size: 1.05
  },
  {
    id: 187,
    name: 'Sol',
    faction: 129,
    image: 'asian/u187.png',
    size: 1
  },
  {
    id: 188,
    name: 'Sol',
    faction: 129,
    image: 'asian/u188.png',
    size: 1.02
  },
  {
    id: 189,
    name: 'Sol',
    faction: 129,
    image: 'asian/u189.png',
    size: 1.02
  },
  {
    id: 190,
    name: 'Sol',
    faction: 129,
    image: 'asian/u190.png',
    size: 1.02
  },
  {
    id: 191,
    name: 'Sol',
    faction: 129,
    image: 'asian/u191.png',
    size: 0.98
  },
  {
    id: 192,
    name: 'Sol',
    faction: 129,
    image: 'asian/u192.png',
    size: 0.98
  },
  {
    id: 193,
    name: 'Sol',
    faction: 129,
    image: 'asian/u193.png',
    size: 0.98
  },
  {
    id: 194,
    name: 'Sol',
    faction: 129,
    image: 'asian/u194.png',
    size: 1.02
  },
  {
    id: 195,
    name: 'Sol',
    faction: 129,
    image: 'asian/u195.png',
    size: 1.02
  },
  {
    id: 196,
    name: 'Sol',
    faction: 129,
    image: 'asian/u196.png',
    size: 1
  },
  {
    id: 197,
    name: 'Sol',
    faction: 139,
    image: 'asian/u197.png',
    size: 1.01
  },
  {
    id: 198,
    name: 'Sol',
    faction: 139,
    image: 'asian/u198.png',
    size: 1.01
  },
  {
    id: 199,
    name: 'Sol',
    faction: 129,
    image: 'asian/u199.png',
    size: 1.02
  },
  {
    id: 200,
    name: 'Sol',
    faction: 129,
    image: 'asian/u200.png',
    size: 1.02
  }
];

export default Units;