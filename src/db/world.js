import DB from "./index";

const World = [
  { id: 'asian', name: 'Asian', count: DB.asian.length },
  { id: 'bless', name: 'Blessed', count: DB.bless.length },
  { id: 'endless', name: 'Endless Legend', count: DB.endless.length },
  { id: 'fantasy', name: 'Fantasy', count: DB.fantasy.length },
  { id: 'israel', name: 'Israel', count: DB.israel.length },
  { id: 'king_bounty', name: 'King Bounty', count: DB.king_bounty.length },
  { id: 'others', name: 'Others', count: DB.others.length },
  { id: 'raid_shadow', name: 'Raid Shadow Legends', count: DB.raid_shadow.length },
  { id: 'smite', name: 'Smite', count: DB.smite.length },
  { id: 'space', name: 'Space', count: DB.space.length }
];

export default World;