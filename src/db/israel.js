const Units = [
  {
    id: 1,
    name: 'Veretan Light Soldier',
    faction: 21,
    image: 'israel/u1.png',
    size: 1,
    level: 3
  },
  {
    id: 2,
    name: 'Heavy Guard',
    faction: 21,
    image: 'israel/u2.png',
    size: 1.12,
    level: 10
  },
  {
    id: 3,
    name: 'Merchant Warrior',
    faction: 52,
    image: 'israel/u3.png',
    size: 1.01,
    level: 4
  },
  {
    id: 4,
    name: 'Spy',
    faction: 21,
    image: 'israel/u4.png',
    size: 0.97,
    level: 1
  },
  {
    id: 5,
    name: 'Young Lion',
    faction: 21,
    image: 'israel/u5.png',
    size: 1,
    level: 4
  },
  {
    id: 6,
    name: 'Veteran Lion',
    faction: 21,
    image: 'israel/u6.png',
    size: 1.01,
    level: 7
  },
  {
    id: 7,
    name: 'Great Lion',
    faction: 52,
    image: 'israel/u7.png',
    size: 1.1,
    level: 12
  },
  {
    id: 8,
    name: 'Desert Soldier',
    faction: 52,
    image: 'israel/u8.png',
    size: 1.01,
    level: 7
  },
  {
    id: 9,
    name: 'Militia',
    faction: 34,
    image: 'israel/u9.png',
    size: 1,
    level: 1
  },
  {
    id: 10,
    name: 'Barbarian',
    faction: 34,
    image: 'israel/u10.png',
    size: 1,
    level: 2
  },
  {
    id: 11,
    name: 'Assassin',
    faction: 34,
    image: 'israel/u11.png',
    size: 1.01,
    level: 4
  },
  {
    id: 12,
    name: 'Swift Egyptian Swordsman',
    faction: 34,
    image: 'israel/u12.png',
    size: 1.02,
    level: 5
  },
  {
    id: 13,
    name: 'Swift Egyptian Masked Swordsman',
    faction: 34,
    image: 'israel/u13.png',
    size: 1.02,
    level: 6
  },
  {
    id: 14,
    name: 'Soldier',
    faction: 52,
    image: 'israel/u14.png',
    size: 1.01,
    level: 9
  },
  {
    id: 15,
    name: 'Arabian Soldier',
    faction: 20,
    image: 'israel/u15.png',
    size: 1.01,
    level: 2
  },
  {
    id: 16,
    name: 'Philistine Soldier',
    faction: 20,
    image: 'israel/u16.png',
    size: 1.01,
    level: 1
  },
  {
    id: 17,
    name: 'Red Guard',
    faction: 34,
    image: 'israel/u17.png',
    size: 1.02,
    level: 7
  },
  {
    id: 18,
    name: 'Grey Swordsman',
    faction: 52,
    image: 'israel/u18.png',
    size: 1.01,
    level: 6
  },
  {
    id: 19,
    name: 'Philistine Royal',
    faction: 20,
    image: 'israel/u19.png',
    size: 1.02,
    level: 5
  },
  {
    id: 20,
    name: 'Militia Captain',
    faction: 21,
    image: 'israel/u20.png',
    size: 1,
    level: 2
  },
  {
    id: 21,
    name: 'Red Guard',
    faction: 21,
    image: 'israel/u21.png',
    size: 1.1,
    level: 9
  },
  {
    id: 22,
    name: 'Giant',
    faction: 20,
    image: 'israel/u22.png',
    size: 1.18,
    level: 10
  },
  {
    id: 23,
    name: 'Captain',
    faction: 20,
    image: 'israel/u23.png',
    size: 1.01,
    level: 3
  },
  {
    id: 24,
    name: 'Light Infantry',
    faction: 52,
    image: 'israel/u24.png',
    size: 1.01,
    level: 1
  },
  {
    id: 25,
    name: 'Assassin',
    faction: 52,
    image: 'israel/u25.png',
    size: 1.02,
    level: 10
  },
  {
    id: 26,
    name: 'Light Militia',
    faction: 52,
    image: 'israel/u26.png',
    size: 1,
    level: 3
  },
  {
    id: 27,
    name: 'Light Militia',
    faction: 52,
    image: 'israel/u27.png',
    size: 1.05,
    level: 5
  },
  {
    id: 28,
    name: 'Captain',
    faction: 20,
    image: 'israel/u28.png',
    size: 1.07,
    level: 4
  },
  {
    id: 29,
    name: 'Veteran Captain',
    faction: 20,
    image: 'israel/u29.png',
    size: 1.2,
    level: 9
  },
  {
    id: 30,
    name: 'Great Captain',
    faction: 20,
    image: 'israel/u30.png',
    size: 1.16,
    level: 8
  },
  {
    id: 31,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u31.png',
    size: 1.14,
    level: 2
  },
  {
    id: 32,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u32.png',
    size: 1.22,
    level: 8
  },
  {
    id: 33,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u33.png',
    size: 1.07,
    level: 6
  },
  {
    id: 34,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u34.png',
    size: 1.04,
    level: 3
  },
  {
    id: 35,
    name: 'Soldier',
    faction: 20,
    image: 'israel/u35.png',
    size: 1.1,
    level: 6
  },
  {
    id: 36,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u36.png',
    size: 1.12,
    level: 7
  },
  {
    id: 37,
    name: 'Soldier',
    faction: 52,
    image: 'israel/u37.png',
    size: 1.1,
    level: 8
  },
  {
    id: 38,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u38.png',
    size: 1.07,
    level: 9
  },
  {
    id: 39,
    name: 'Soldier',
    faction: 21,
    image: 'israel/u39.png',
    size: 1.07,
    level: 5
  },
  {
    id: 40,
    name: 'Soldier',
    faction: 21,
    image: 'israel/u40.png',
    size: 1.07,
    level: 6
  },
  {
    id: 41,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u41.png',
    size: 1.06,
    level: 1
  },
  {
    id: 42,
    name: 'Soldier',
    faction: 21,
    image: 'israel/u42.png',
    size: 1.1,
    level: 8
  },
  {
    id: 43,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u43.png',
    size: 1.03,
    level: 4
  },
  {
    id: 44,
    name: 'Soldier',
    faction: 65,
    image: 'israel/u44.png',
    size: 1.12,
    level: 5
  },
  {
    id: 45,
    name: 'Soldier',
    faction: 20,
    image: 'israel/u45.png',
    size: 1.06,
    level: 7
  },
  {
    id: 46,
    name: 'Soldier',
    faction: 52,
    image: 'israel/u46.png',
    size: 1.01,
    level: 2
  },
  {
    id: 47,
    name: 'Soldier',
    faction: 52,
    image: 'israel/u47.png',
    size: 1.05,
    level: 11
  },
  {
    id: 48,
    name: 'Soldier',
    faction: 34,
    image: 'israel/u48.png',
    size: 1.1,
    level: 8
  },
  {
    id: 49,
    name: 'Soldier',
    faction: 34,
    image: 'israel/u49.png',
    size: 1.1,
    level: 9
  },
  {
    id: 50,
    name: 'Soldier',
    faction: 34,
    image: 'israel/u50.png',
    size: 1,
    level: 3
  },
  {
    id: 51,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u51.png',
    size: 0.98,
    level: 5
  },
  {
    id: 52,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u52.png',
    size: 1.14,
    level: 11
  },
  {
    id: 53,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u53.png',
    size: 1.03,
    level: 5
  },
  {
    id: 54,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u54.png',
    size: 1.04,
    level: 7
  },
  {
    id: 55,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u55.png',
    size: 1.13,
    level: 10
  },
  {
    id: 56,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u56.png',
    size: 1.04,
    level: 9
  },
  {
    id: 57,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u57.png',
    size: 1.11,
    level: 8
  },
  {
    id: 58,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u58.png',
    size: 1.03,
    level: 2
  },
  {
    id: 59,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u59.png',
    size: 1.11,
    level: 6
  },
  {
    id: 60,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u60.png',
    size: 1.01,
    level: 7
  },
  {
    id: 61,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u61.png',
    size: 1.05,
    level: 9
  },
  {
    id: 62,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u62.png',
    size: 1.01,
    level: 3
  },
  {
    id: 63,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u63.png',
    size: 1.04,
    level: 4
  },
  {
    id: 64,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u64.png',
    size: 0.99,
    level: 1
  },
  {
    id: 65,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u65.png',
    size: 1.01,
    level: 3
  },
  {
    id: 66,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u66.png',
    size: 1.07,
    level: 1
  },
  {
    id: 67,
    name: 'Soldier',
    faction: 53,
    image: 'israel/u67.png',
    size: 1.09,
    level: 12
  },
  {
    id: 68,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u68.png',
    size: 1,
    level: 2
  },
  {
    id: 69,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u69.png',
    size: 1.1,
    level: 8
  },
  {
    id: 70,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u70.png',
    size: 1.05,
    level: 6
  },
  {
    id: 71,
    name: 'Soldier',
    faction: 55,
    image: 'israel/u71.png',
    size: 1,
    level: 4
  },
  {
    id: 72,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u72.png',
    size: 1.01,
    level: 5
  },
  {
    id: 73,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u73.png',
    size: 0.97,
    level: 9
  },
  {
    id: 74,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u74.png',
    size: 0.95,
    level: 1
  },
  {
    id: 75,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u75.png',
    size: 1.04,
    level: 6
  },
  {
    id: 76,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u76.png',
    size: 1.05,
    level: 10
  },
  {
    id: 77,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u77.png',
    size: 1.05,
    level: 7
  },
  {
    id: 78,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u78.png',
    size: 1.2,
    level: 12
  },
  {
    id: 79,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u79.png',
    size: 1.05,
    level: 7
  },
  {
    id: 80,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u80.png',
    size: 1.05,
    level: 8
  },
  {
    id: 81,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u81.png',
    size: 1.11,
    level: 10
  },
  {
    id: 82,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u82.png',
    size: 1.04,
    level: 9
  },
  {
    id: 83,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u83.png',
    size: 1.05,
    level: 6
  },
  {
    id: 84,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u84.png',
    size: 1.03,
    level: 4
  },
  {
    id: 85,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u85.png',
    size: 1.11,
    level: 11
  },
  {
    id: 86,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u86.png',
    size: 1,
    level: 2
  },
  {
    id: 87,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u87.png',
    size: 1,
    level: 5
  },
  {
    id: 88,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u88.png',
    size: 1.04,
    level: 2
  },
  {
    id: 89,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u89.png',
    size: 1.04,
    level: 4
  },
  {
    id: 90,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u90.png',
    size: 1.01,
    level: 8
  },
  {
    id: 91,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u91.png',
    size: 1.02,
    level: 3
  },
  {
    id: 92,
    name: 'Soldier',
    faction: 94,
    image: 'israel/u92.png',
    size: 1.02,
    level: 3
  },
  {
    id: 93,
    name: 'Soldier',
    faction: 95,
    image: 'israel/u93.png',
    size: 1.01,
    level: 1
  },
  {
    id: 94,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u94.png',
    size: 1.03,
    level: 4
  },
  {
    id: 95,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u95.png',
    size: 1.04,
    level: 5
  },
  {
    id: 96,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u96.png',
    size: 1.02,
    level: 1
  },
  {
    id: 97,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u97.png',
    size: 1.02,
    level: 2
  },
  {
    id: 98,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u98.png',
    size: 1.02,
    level: 3
  },
  {
    id: 99,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u99.png',
    size: 1.01,
    level: 6
  },
  {
    id: 100,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u100.png',
    size: 1.01,
    level: 7
  },
  {
    id: 101,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u101.png',
    size: 1.01,
    level: 9
  },
  {
    id: 102,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u102.png',
    size: 0.97,
    level: 1
  },
  {
    id: 103,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u103.png',
    size: 1.01,
    level: 12
  },
  {
    id: 104,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u104.png',
    size: 1,
    level: 11
  },
  {
    id: 105,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u105.png',
    size: 1.02,
    level: 8
  },
  {
    id: 106,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u106.png',
    size: 1.01,
    level: 10
  },
  {
    id: 107,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u107.png',
    size: 1.01,
    level: 2
  },
  {
    id: 108,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u108.png',
    size: 1.01,
    level: 3
  },
  {
    id: 109,
    name: 'Soldier',
    faction: 71,
    image: 'israel/u109.png',
    size: 1,
    level: 9
  },
  {
    id: 110,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u110.png',
    size: 1.01,
    level: 4
  },
  {
    id: 111,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u111.png',
    size: 1.02,
    level: 5
  },
  {
    id: 112,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u112.png',
    size: 1.02,
    level: 6
  },
  {
    id: 113,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u113.png',
    size: 1.02,
    level: 7
  },
  {
    id: 114,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u114.png',
    size: 1.02,
    level: 8
  },
  {
    id: 115,
    name: 'Soldier',
    faction: 101,
    image: 'israel/u115.png',
    size: 1.02,
    level: 10
  },
  {
    id: 116,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u116.png',
    size: 1.01,
    level: 11
  },
  {
    id: 117,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u117.png',
    size: 1,
    level: 1
  },
  {
    id: 118,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u118.png',
    size: 1.21,
    level: 12
  },
  {
    id: 119,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u119.png',
    size: 1,
    level: 7
  },
  {
    id: 120,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u120.png',
    size: 1,
    level: 1
  },
  {
    id: 121,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u121.png',
    size: 0.98,
    level: 5
  },
  {
    id: 122,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u122.png',
    size: 1,
    level: 4
  },
  {
    id: 123,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u123.png',
    size: 1.09,
    level: 12
  },
  {
    id: 124,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u124.png',
    size: 1.15,
    level: 5
  },
  {
    id: 125,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u125.png',
    size: 1,
    level: 3
  },
  {
    id: 126,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u126.png',
    size: 1,
    level: 4
  },
  {
    id: 127,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u127.png',
    size: 0.98,
    level: 3
  },
  {
    id: 128,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u128.png',
    size: 1,
    level: 12
  },
  {
    id: 129,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u129.png',
    size: 1,
    level: 5
  },
  {
    id: 130,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u130.png',
    size: 0.98,
    level: 2
  },
  {
    id: 131,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u131.png',
    size: 1,
    level: 9
  },
  {
    id: 132,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u132.png',
    size: 1,
    level: 5
  },
  {
    id: 133,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u133.png',
    size: 1.22,
    level: 10
  },
  {
    id: 134,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u134.png',
    size: 1.03,
    level: 11
  },
  {
    id: 135,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u135.png',
    size: 1.04,
    level: 8
  },
  {
    id: 136,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u136.png',
    size: 1.02,
    level: 13
  },
  {
    id: 137,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u137.png',
    size: 1,
    level: 8
  },
  {
    id: 138,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u138.png',
    size: 1,
    level: 5
  },
  {
    id: 139,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u139.png',
    size: 1,
    level: 2
  },
  {
    id: 140,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u140.png',
    size: 1,
    level: 3
  },
  {
    id: 141,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u141.png',
    size: 1.04,
    level: 6
  },
  {
    id: 142,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u142.png',
    size: 1.04,
    level: 10
  },
  {
    id: 143,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u143.png',
    size: 1.03,
    level: 7
  },
  {
    id: 144,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u144.png',
    size: 1.22,
    level: 13
  },
  {
    id: 145,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u145.png',
    size: 1.02,
    level: 10
  },
  {
    id: 146,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u146.png',
    size: 1,
    level: 1
  },
  {
    id: 147,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u147.png',
    size: 1.18,
    level: 1
  },
  {
    id: 148,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u148.png',
    size: 1,
    level: 1
  },
  {
    id: 149,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u149.png',
    size: 1.02,
    level: 13
  },
  {
    id: 150,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u150.png',
    size: 1.01,
    level: 5
  },
  {
    id: 151,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u151.png',
    size: 1.1,
    level: 10
  },
  {
    id: 152,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u152.png',
    size: 1,
    level: 6
  },
  {
    id: 153,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u153.png',
    size: 1,
    level: 7
  },
  {
    id: 154,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u154.png',
    size: 1.7,
    level: 14
  },
  {
    id: 155,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u155.png',
    size: 1,
    level: 9
  },
  {
    id: 156,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u156.png',
    size: 0.98,
    level: 1
  },
  {
    id: 157,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u157.png',
    size: 1.01,
    level: 2
  },
  {
    id: 158,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u158.png',
    size: 1,
    level: 4
  },
  {
    id: 159,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u159.png',
    size: 1.05,
    level: 7
  },
  {
    id: 160,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u160.png',
    size: 1,
    level: 8
  },
  {
    id: 161,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u161.png',
    size: 1.05,
    level: 12
  },
  {
    id: 162,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u162.png',
    size: 1,
    level: 4
  },
  {
    id: 163,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u163.png',
    size: 1.11,
    level: 11
  },
  {
    id: 164,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u164.png',
    size: 0.98,
    level: 10
  },
  {
    id: 165,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u165.png',
    size: 1.01,
    level: 3
  },
  {
    id: 166,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u166.png',
    size: 1.22,
    level: 7
  },
  {
    id: 167,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u167.png',
    size: 1.22,
    level: 9
  },
  {
    id: 168,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u168.png',
    size: 1.17,
    level: 14
  },
  {
    id: 169,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u169.png',
    size: 1,
    level: 6
  },
  {
    id: 170,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u170.png',
    size: 1.36,
    level: 11
  },
  {
    id: 171,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u171.png',
    size: 1.05,
    level: 9
  },
  {
    id: 172,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u172.png',
    size: 1.05,
    level: 6
  },
  {
    id: 173,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u173.png',
    size: 1.08,
    level: 2
  },
  {
    id: 174,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u174.png',
    size: 1.08,
    level: 8
  },
  {
    id: 175,
    name: 'Soldier',
    faction: 135,
    image: 'israel/u175.png',
    size: 1.05,
    level: 3
  },
  {
    id: 176,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u176.png',
    size: 1.36,
    level: 14
  },
  {
    id: 177,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u177.png',
    size: 0.99,
    level: 9
  },
  {
    id: 178,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u178.png',
    size: 1,
    level: 3
  },
  {
    id: 179,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u179.png',
    size: 1.2,
    level: 8
  },
  {
    id: 180,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u180.png',
    size: 1.03,
    level: 13
  },
  {
    id: 181,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u181.png',
    size: 1.01,
    level: 11
  },
  {
    id: 182,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u182.png',
    size: 1.01,
    level: 6
  },
  {
    id: 183,
    name: 'Soldier',
    faction: 133,
    image: 'israel/u183.png',
    size: 1.01,
    level: 4
  },
  {
    id: 184,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u184.png',
    size: 1.12,
    level: 6
  },
  {
    id: 185,
    name: 'Soldier',
    faction: 191,
    image: 'israel/u185.png',
    size: 1,
    level: 2
  },
  {
    id: 186,
    name: 'Soldier',
    faction: 134,
    image: 'israel/u186.png',
    size: 1.01,
    level: 14
  },
  {
    id: 187,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u187.png',
    size: 0.99,
    level: 4
  },
  {
    id: 188,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u188.png',
    size: 1.01,
    level: 7
  },
  {
    id: 189,
    name: 'Soldier',
    faction: 136,
    image: 'israel/u189.png',
    size: 1.04,
    level: 2
  },
  {
    id: 190,
    name: 'Soldier',
    faction: 211,
    image: 'israel/u190.png',
    size: 1.05,
    level: 8
  },
  {
    id: 191,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u191.png',
    size: 1
  },
  {
    id: 192,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u192.png',
    size: 0.97
  },
  {
    id: 193,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u193.png',
    size: 1.05
  },
  {
    id: 194,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u194.png',
    size: 1.01,
    level: 6
  },
  {
    id: 195,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u195.png',
    size: 0.97
  },
  {
    id: 196,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u196.png',
    size: 1.06,
    level: 14
  },
  {
    id: 197,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u197.png',
    size: 0.98,
    level: 13
  },
  {
    id: 198,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u198.png',
    size: 1.01,
    level: 12
  },
  {
    id: 199,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u199.png',
    size: 1.01,
    level: 7
  },
  {
    id: 200,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u200.png',
    size: 0.99
  },
  {
    id: 201,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u201.png',
    size: 1
  },
  {
    id: 202,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u202.png',
    size: 1.01,
    level: 11
  },
  {
    id: 203,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u203.png',
    size: 1,
    level: 5
  },
  {
    id: 204,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u204.png',
    size: 1.02,
    level: 9
  },
  {
    id: 205,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u205.png',
    size: 0.98
  },
  {
    id: 206,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u206.png',
    size: 1.02
  },
  {
    id: 207,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u207.png',
    size: 0.98
  },
  {
    id: 208,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u208.png',
    size: 1.16
  },
  {
    id: 209,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u209.png',
    size: 1.13
  },
  {
    id: 210,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u210.png',
    size: 0.98
  },
  {
    id: 211,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u211.png',
    size: 1.08
  },
  {
    id: 212,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u212.png',
    size: 1.29
  },
  {
    id: 213,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u213.png',
    size: 1.01
  },
  {
    id: 214,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u214.png',
    size: 1.17
  },
  {
    id: 215,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u215.png',
    size: 0.97
  },
  {
    id: 216,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u216.png',
    size: 1.01,
    level: 8
  },
  {
    id: 217,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u217.png',
    size: 1.04
  },
  {
    id: 218,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u218.png',
    size: 1.01
  },
  {
    id: 219,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u219.png',
    size: 0.99
  },
  {
    id: 220,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u220.png',
    size: 1.15
  },
  {
    id: 221,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u221.png',
    size: 1.2,
    level: 10
  },
  {
    id: 222,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u222.png',
    size: 1.02
  },
  {
    id: 223,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u223.png',
    size: 1.04
  },
  {
    id: 224,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u224.png',
    size: 1.03
  },
  {
    id: 225,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u225.png',
    size: 1.07
  },
  {
    id: 226,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u226.png',
    size: 0.98,
    level: 3
  },
  {
    id: 227,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u227.png',
    size: 0.98
  },
  {
    id: 228,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u228.png',
    size: 1,
    level: 2
  },
  {
    id: 229,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u229.png',
    size: 0.98
  },
  {
    id: 230,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u230.png',
    size: 1.09
  },
  {
    id: 231,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u231.png',
    size: 1.25
  },
  {
    id: 232,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u232.png',
    size: 1.27
  },
  {
    id: 233,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u233.png',
    size: 1
  },
  {
    id: 234,
    name: 'Soldier',
    faction: 242,
    image: 'israel/u234.png',
    size: 1
  },
  {
    id: 235,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u235.png',
    size: 1.01,
    level: 4
  },
  {
    id: 236,
    name: 'Soldier',
    faction: 153,
    image: 'israel/u236.png',
    size: 0.98,
    level: 1
  },
  {
    id: 237,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u237.png',
    size: 1.03
  },
  {
    id: 238,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u238.png',
    size: 1.07
  },
  {
    id: 239,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u239.png',
    size: 1.02
  },
  {
    id: 240,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u240.png',
    size: 1.05
  },
  {
    id: 241,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u241.png',
    size: 1.05
  },
  {
    id: 242,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u242.png',
    size: 1.03
  },
  {
    id: 243,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u243.png',
    size: 1.11
  },
  {
    id: 244,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u244.png',
    size: 1.02
  },
  {
    id: 245,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u245.png',
    size: 1.02
  },
  {
    id: 246,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u246.png',
    size: 1.05
  },
  {
    id: 247,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u247.png',
    size: 1.05
  },
  {
    id: 248,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u248.png',
    size: 1.13
  },
  {
    id: 249,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u249.png',
    size: 1.1
  },
  {
    id: 250,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u250.png',
    size: 1.04
  },
  {
    id: 251,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u251.png',
    size: 1.03
  },
  {
    id: 252,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u252.png',
    size: 1.04
  },
  {
    id: 253,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u253.png',
    size: 1.08
  },
  {
    id: 254,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u254.png',
    size: 1.05
  },
  {
    id: 255,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u255.png',
    size: 1.01
  },
  {
    id: 256,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u256.png',
    size: 1.05
  },
  {
    id: 257,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u257.png',
    size: 1.1
  },
  {
    id: 258,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u258.png',
    size: 1.11
  },
  {
    id: 259,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u259.png',
    size: 1.05
  },
  {
    id: 260,
    name: 'Soldier',
    faction: 186,
    image: 'israel/u260.png',
    size: 1.11
  },
  {
    id: 261,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u261.png',
    size: 1.1
  },
  {
    id: 262,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u262.png',
    size: 1.13
  },
  {
    id: 263,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u263.png',
    size: 1.1
  },
  {
    id: 264,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u264.png',
    size: 1.16
  },
  {
    id: 265,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u265.png',
    size: 1.06
  },
  {
    id: 266,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u266.png',
    size: 1.16
  },
  {
    id: 267,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u267.png',
    size: 1.12
  },
  {
    id: 268,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u268.png',
    size: 1.18
  },
  {
    id: 269,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u269.png',
    size: 1.15
  },
  {
    id: 270,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u270.png',
    size: 1.15
  },
  {
    id: 271,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u271.png',
    size: 1.09
  },
  {
    id: 272,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u272.png',
    size: 1.11
  },
  {
    id: 273,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u273.png',
    size: 1.13
  },
  {
    id: 274,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u274.png',
    size: 1.13
  },
  {
    id: 275,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u275.png',
    size: 1.1
  },
  {
    id: 276,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u276.png',
    size: 1.19
  },
  {
    id: 277,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u277.png',
    size: 1.17
  },
  {
    id: 278,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u278.png',
    size: 1.18
  },
  {
    id: 279,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u279.png',
    size: 1.17
  },
  {
    id: 280,
    name: 'Soldier',
    faction: 210,
    image: 'israel/u280.png',
    size: 1.17
  },
  {
    id: 281,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u281.png',
    size: 1.12
  },
  {
    id: 282,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u282.png',
    size: 1.15
  },
  {
    id: 283,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u283.png',
    size: 1.23
  },
  {
    id: 284,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u284.png',
    size: 1.1
  },
  {
    id: 285,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u285.png',
    size: 1.27
  },
  {
    id: 286,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u286.png',
    size: 1.1
  },
  {
    id: 287,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u287.png',
    size: 1.1
  },
  {
    id: 288,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u288.png',
    size: 1.11
  },
  {
    id: 289,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u289.png',
    size: 1.12
  },
  {
    id: 290,
    name: 'Soldier',
    faction: 241,
    image: 'israel/u290.png',
    size: 1.1
  },
];

export default Units;