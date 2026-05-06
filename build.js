const fs = require('fs');
const path = require('path');

const tpl = fs.readFileSync('/home/claude/dai-invites/_template.html', 'utf8');

function makeICS({ uid, title, start, end, location }) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DAI4.0//Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:20260401T000000Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}

const ADDRESS = 'The Green House · 台北市中山北路三段53號';
const ADDRESS_SHORT = 'THE GREEN HOUSE';
const MAP_URL = 'https://maps.apple.com/?q=' + encodeURIComponent('台北市中山北路三段53號');

const invites = [
  {
    slug: 'alumni',
    chapterNum: 'I · OF · III',
    dateIso: '06.14.2026',
    lines: `<div class="medium">old friends,</div>
            <div class="italic">new home,</div>
            <div class="medium">20<span class="plus">+</span>20 and more.</div>`,
    when: '06.14 · 17:30',
    where: ADDRESS_SHORT,
    dress: 'WHITE · GREY',
    calendar: makeICS({
      uid: 'dai40-alumni-20260614@dai4.0',
      title: 'DAI 4.0 · Old Friends · New Home',
      start: '20260614T093000Z',
      end: '20260614T133000Z',
      location: ADDRESS
    }),
    mapLink: MAP_URL,
    rsvpUrl: 'https://forms.gle/REPLACE_WITH_ALUMNI_FORM_LINK'
  },
  {
    slug: 'family',
    chapterNum: 'II · OF · III',
    dateIso: '06.19.2026',
    lines: `<div class="medium">my people —</div>
            <div class="italic">into the next decade,</div>
            <div class="medium">under one new roof.</div>`,
    when: '06.19 · 15:00',
    where: ADDRESS_SHORT,
    dress: 'WHITE · GREY',
    calendar: makeICS({
      uid: 'dai40-family-20260619@dai4.0',
      title: 'DAI 4.0 · Family · Into the Next Chapter',
      start: '20260619T070000Z',
      end: '20260619T130000Z',
      location: ADDRESS
    }),
    mapLink: MAP_URL,
    rsvpUrl: 'https://forms.gle/REPLACE_WITH_FAMILY_FORM_LINK'
  },
  {
    slug: 'forever',
    chapterNum: 'III · OF · III',
    dateIso: '06.20.2026',
    lines: `<div class="medium">new home, new era</div>
            <div class="italic">forever young</div>
            <div class="medium">together.</div>`,
    when: '06.20 · 17:30',
    where: ADDRESS_SHORT,
    dress: 'WHITE · GREY',
    calendar: makeICS({
      uid: 'dai40-forever-20260620@dai4.0',
      title: 'DAI 4.0 · Forever Young · Together',
      start: '20260620T093000Z',
      end: '20260620T133000Z',
      location: ADDRESS
    }),
    mapLink: MAP_URL,
    rsvpUrl: 'https://forms.gle/REPLACE_WITH_FOREVER_FORM_LINK'
  }
];

for (const inv of invites) {
  let html = tpl
    .replace(/{{CHAPTER_NUM}}/g, inv.chapterNum)
    .replace(/{{DATE_ISO}}/g, inv.dateIso)
    .replace('{{TEXT_LINES}}', inv.lines)
    .replace('{{WHEN}}', inv.when)
    .replace('{{WHERE}}', inv.where)
    .replace('{{DRESS}}', inv.dress)
    .replace('{{CALENDAR_LINK}}', inv.calendar)
    .replace('{{MAP_LINK}}', inv.mapLink)
    .replace('{{RSVP_LINK}}', inv.rsvpUrl);

  const dir = `/home/claude/dai-invites/${inv.slug}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, html);
  console.log('Built:', dir + '/index.html');
}
