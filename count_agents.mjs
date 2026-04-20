import { readFileSync } from 'fs';
const d = JSON.parse(readFileSync("D:\\CSV's\\nexus-agents-2026-04-19.json", 'utf8'));
console.log('Total agents:', d.length);
const cats = {};
d.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
console.log('\nCategories:');
Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

// Squad mapping
const squads = {};
d.forEach(a => {
  if (!squads[a.squadId]) squads[a.squadId] = { agents: [], categories: new Set() };
  squads[a.squadId].agents.push(a.id);
  squads[a.squadId].categories.add(a.category);
});
console.log('\nSquads:');
Object.entries(squads).sort().forEach(([k, v]) => {
  console.log(`  ${k}: ${v.agents.length} agents, categories: [${[...v.categories].join(', ')}]`);
});

// Print COMMAND squad agents
console.log('\nCOMMAND squad agents:');
d.filter(a => a.squadId === 'COMMAND').forEach(a => console.log(`  ${a.id}: ${a.name} (${a.role})`));
