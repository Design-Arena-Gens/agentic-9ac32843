import { NextRequest, NextResponse } from 'next/server';

interface MemeTemplate {
  name: string;
  topText: string;
  bottomText: string;
  style: 'classic' | 'modern' | 'minimalist';
}

const memeTemplates: Record<string, MemeTemplate[]> = {
  '#POV': [
    { name: 'POV', topText: 'POV: You just discovered', bottomText: 'this viral trend', style: 'modern' },
    { name: 'POV', topText: 'POV: Everyone is doing it', bottomText: 'So you do it too', style: 'modern' },
  ],
  '#ExpectationVsReality': [
    { name: 'ExpectationVsReality', topText: 'Expectation:', bottomText: 'Reality: 💀', style: 'classic' },
    { name: 'ExpectationVsReality', topText: 'What I ordered', bottomText: 'What I got', style: 'classic' },
  ],
  '#WhenYouRealize': [
    { name: 'Realization', topText: 'When you realize', bottomText: "it's already too late", style: 'modern' },
    { name: 'Realization', topText: 'That moment when', bottomText: 'everything makes sense', style: 'modern' },
  ],
  '#ThatGirlMorning': [
    { name: 'Morning', topText: 'That Girl Morning', bottomText: 'vs My Morning ☕', style: 'minimalist' },
    { name: 'Morning', topText: '5AM: Productive Queen', bottomText: '5PM: Barely Functioning', style: 'minimalist' },
  ],
  '#SelfCareRoutine': [
    { name: 'SelfCare', topText: 'Self Care Routine', bottomText: 'Netflix + Snacks = Perfect', style: 'minimalist' },
    { name: 'SelfCare', topText: 'My self care:', bottomText: 'Online shopping therapy', style: 'minimalist' },
  ],
  '#ProductivityHack': [
    { name: 'Productivity', topText: 'Productivity Hack:', bottomText: 'Procrastinate efficiently', style: 'modern' },
    { name: 'Productivity', topText: 'Work smarter not harder', bottomText: '*continues scrolling*', style: 'modern' },
  ],
  '#MainCharacterEnergy': [
    { name: 'MainCharacter', topText: 'Main Character Energy', bottomText: 'activated ✨', style: 'modern' },
    { name: 'MainCharacter', topText: 'Walking down the street', bottomText: 'like I own the place', style: 'modern' },
  ],
  '#PlotTwist': [
    { name: 'PlotTwist', topText: 'Plot twist:', bottomText: 'There was no plot', style: 'classic' },
    { name: 'PlotTwist', topText: 'Nobody expected', bottomText: 'this ending', style: 'classic' },
  ],
  '#NoContextNeeded': [
    { name: 'NoContext', topText: 'No context needed', bottomText: 'just vibes', style: 'minimalist' },
    { name: 'NoContext', topText: 'If you know', bottomText: 'you know 🤷', style: 'minimalist' },
  ],
  '#MeAfterOneSip': [
    { name: 'Coffee', topText: 'Me after one sip', bottomText: 'of coffee ⚡', style: 'modern' },
    { name: 'Coffee', topText: 'Before coffee vs', bottomText: 'After coffee', style: 'modern' },
  ],
  '#IntrovertProblems': [
    { name: 'Introvert', topText: 'Introvert Problems:', bottomText: 'People talking to me', style: 'classic' },
    { name: 'Introvert', topText: '"Wanna hang out?"', bottomText: 'My social battery: 📉', style: 'classic' },
  ],
  '#AdultingIsHard': [
    { name: 'Adulting', topText: 'Adulting is hard', bottomText: 'Can I restart?', style: 'modern' },
    { name: 'Adulting', topText: 'Being an adult:', bottomText: 'Expensive and confusing', style: 'modern' },
  ],
  '#AIGenerated': [
    { name: 'AI', topText: 'AI Generated', bottomText: 'and still better than me', style: 'minimalist' },
    { name: 'AI', topText: 'Made by AI', bottomText: 'because why not', style: 'minimalist' },
  ],
  '#GreenScreenChallenge': [
    { name: 'GreenScreen', topText: 'Green Screen Magic', bottomText: 'Reality can be anything', style: 'modern' },
    { name: 'GreenScreen', topText: 'Before green screen vs', bottomText: 'After green screen', style: 'modern' },
  ],
  '#DuetThis': [
    { name: 'Duet', topText: 'Duet This!', bottomText: 'I dare you 😏', style: 'modern' },
    { name: 'Duet', topText: 'Waiting for someone', bottomText: 'to duet this', style: 'modern' },
  ],
};

function generateMemeCaption(trend: string, template: MemeTemplate): string {
  const captions = [
    `When ${trend} hits different 🔥`,
    `${trend} be like:`,
    `Everyone doing ${trend} and I'm here making memes`,
    `${trend} but make it meme-worthy`,
    `POV: You just discovered ${trend}`,
    `Me participating in ${trend}`,
    `${trend} trend got me like:`,
  ];
  return captions[Math.floor(Math.random() * captions.length)];
}

function generateMemeImage(template: MemeTemplate): string {
  // Generate SVG meme
  const colors = {
    classic: { bg: '#000000', text: '#FFFFFF', accent: '#FFD700' },
    modern: { bg: '#8B5CF6', text: '#FFFFFF', accent: '#EC4899' },
    minimalist: { bg: '#FFFFFF', text: '#000000', accent: '#6366F1' },
  };

  const color = colors[template.style];

  const svg = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.accent};stop-opacity:0.8" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="800" height="600" fill="url(#grad1)"/>

      <!-- Decorative elements -->
      <circle cx="100" cy="100" r="50" fill="${color.accent}" opacity="0.3"/>
      <circle cx="700" cy="500" r="70" fill="${color.accent}" opacity="0.3"/>
      <rect x="350" y="250" width="100" height="100" fill="${color.accent}" opacity="0.2" transform="rotate(45 400 300)"/>

      <!-- Top Text -->
      <text x="400" y="150" font-family="Impact, Arial Black, sans-serif" font-size="48" font-weight="bold"
            fill="${color.text}" text-anchor="middle" stroke="#000000" stroke-width="2">
        ${escapeXml(template.topText.toUpperCase())}
      </text>

      <!-- Center emoji/icon -->
      <text x="400" y="320" font-size="120" text-anchor="middle">
        ${getRandomEmoji(template.name)}
      </text>

      <!-- Bottom Text -->
      <text x="400" y="520" font-family="Impact, Arial Black, sans-serif" font-size="48" font-weight="bold"
            fill="${color.text}" text-anchor="middle" stroke="#000000" stroke-width="2">
        ${escapeXml(template.bottomText.toUpperCase())}
      </text>

      <!-- Watermark -->
      <text x="700" y="580" font-family="Arial" font-size="16" fill="${color.text}" opacity="0.6">
        Made with 🔥
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getRandomEmoji(templateName: string): string {
  const emojiMap: Record<string, string[]> = {
    POV: ['👀', '🎬', '📸', '🎥'],
    ExpectationVsReality: ['😅', '💀', '🤦', '😬'],
    Realization: ['🤯', '💡', '😱', '🧠'],
    Morning: ['☕', '😴', '🌅', '⏰'],
    SelfCare: ['💆', '🧖', '💅', '✨'],
    Productivity: ['📈', '💪', '🚀', '⚡'],
    MainCharacter: ['✨', '👑', '🌟', '💫'],
    PlotTwist: ['😱', '🔄', '🎭', '🤯'],
    NoContext: ['🤷', '🎨', '🎪', '🎭'],
    Coffee: ['☕', '⚡', '🔋', '💥'],
    Introvert: ['🏠', '😌', '📚', '🎮'],
    Adulting: ['💸', '📊', '🏢', '😅'],
    AI: ['🤖', '💻', '🧠', '⚙️'],
    GreenScreen: ['🟢', '🎬', '✨', '🎥'],
    Duet: ['🎤', '🎵', '👯', '🎶'],
  };

  const emojis = emojiMap[templateName] || ['😂', '🔥', '💯', '✨'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export async function POST(request: NextRequest) {
  try {
    const { trend } = await request.json();

    if (!trend || !trend.hashtag) {
      return NextResponse.json(
        { error: 'Trend hashtag is required' },
        { status: 400 }
      );
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get templates for this trend
    const templates = memeTemplates[trend.hashtag] || memeTemplates['#NoContextNeeded'];
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    // Generate meme
    const imageUrl = generateMemeImage(selectedTemplate);
    const caption = generateMemeCaption(trend.hashtag, selectedTemplate);

    return NextResponse.json({
      success: true,
      imageUrl,
      trend: trend.hashtag,
      caption,
      template: selectedTemplate.name,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating meme:', error);
    return NextResponse.json(
      { error: 'Failed to generate meme' },
      { status: 500 }
    );
  }
}
