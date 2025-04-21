const fs = require('fs');

function parseWeekData(text) {
  const weekMatch = text.match(/(\d+)\s+Weeks?\s+Pregnant/i);
  if (!weekMatch) return null;

  const weekNumber = parseInt(weekMatch[1]);
  const sections = text.split('*').filter(Boolean);

  let baby = '', body = '', tips = [];

  sections.forEach(section => {
    const trimmedSection = section.trim();
    if (trimmedSection.startsWith('Your baby')) {
      baby = trimmedSection.replace('Your baby', '').trim();
    } else if (trimmedSection.startsWith('Your body')) {
      body = trimmedSection.replace('Your body', '').trim();
    } else if (trimmedSection.includes('Tips for this week')) {
      const tipsSection = trimmedSection.split('Tips for this week')[1];
      tips = tipsSection
        .split('—')
        .filter(tip => tip.trim())
        .map(tip => tip.trim());
    }
  });

  return {
    week: weekNumber,
    baby_development: baby,
    body_changes: body,
    tips: tips,
    images: {
      baby: `https://pregnancy-api.example.com/images/week${weekNumber}/baby.jpg`,
      body: `https://pregnancy-api.example.com/images/week${weekNumber}/body.jpg`
    }
  };
}

function parseTrimesters() {
  const trimesters = ['First', 'Second', 'Third'];
  const pregnancyData = [];

  trimesters.forEach(trimester => {
    const content = fs.readFileSync(`${trimester} Trimester.txt`, 'utf8');
    const weeks = content.split(/[-]{3,}/).filter(Boolean);

    weeks.forEach(weekText => {
      const weekData = parseWeekData(weekText);
      if (weekData) {
        pregnancyData.push(weekData);
      }
    });
  });

  return pregnancyData;
}

try {
  const data = parseTrimesters();
  fs.writeFileSync('pregnancyData.json', JSON.stringify(data, null, 2));
  console.log('Data parsed successfully!');
} catch (error) {
  console.error('Error parsing data:', error);
}