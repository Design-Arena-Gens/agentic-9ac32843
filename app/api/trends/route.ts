import { NextResponse } from 'next/server';

// Simulated Instagram viral trends (in production, you'd use Instagram Graph API or web scraping)
const trendCategories = [
  {
    category: 'Humor',
    trends: [
      { hashtag: '#POV', description: 'Point of view trending videos showing relatable situations', category: 'Humor' },
      { hashtag: '#ExpectationVsReality', description: 'Funny comparisons between expectations and actual results', category: 'Humor' },
      { hashtag: '#WhenYouRealize', description: 'That moment when you suddenly understand something', category: 'Humor' },
    ]
  },
  {
    category: 'Lifestyle',
    trends: [
      { hashtag: '#ThatGirlMorning', description: 'Perfect morning routines and aesthetic lifestyle content', category: 'Lifestyle' },
      { hashtag: '#SelfCareRoutine', description: 'Self-care tips and wellness routines trending', category: 'Lifestyle' },
      { hashtag: '#ProductivityHack', description: 'Life hacks for being more productive', category: 'Lifestyle' },
    ]
  },
  {
    category: 'Pop Culture',
    trends: [
      { hashtag: '#MainCharacterEnergy', description: 'Living life like you are the main character', category: 'Pop Culture' },
      { hashtag: '#PlotTwist', description: 'Unexpected turns in everyday situations', category: 'Pop Culture' },
      { hashtag: '#NoContextNeeded', description: 'Random hilarious moments that need no explanation', category: 'Pop Culture' },
    ]
  },
  {
    category: 'Relatable',
    trends: [
      { hashtag: '#MeAfterOneSip', description: 'Exaggerated reactions to coffee or energy drinks', category: 'Relatable' },
      { hashtag: '#IntrovertProblems', description: 'Struggles only introverts understand', category: 'Relatable' },
      { hashtag: '#AdultingIsHard', description: 'Funny takes on adult responsibilities', category: 'Relatable' },
    ]
  },
  {
    category: 'Trending',
    trends: [
      { hashtag: '#AIGenerated', description: 'AI-generated content and creative experiments', category: 'Trending' },
      { hashtag: '#GreenScreenChallenge', description: 'Creative uses of green screen effects', category: 'Trending' },
      { hashtag: '#DuetThis', description: 'Collaborative content inviting duets and responses', category: 'Trending' },
    ]
  }
];

export async function GET() {
  try {
    // In a real implementation, you would:
    // 1. Call Instagram Graph API
    // 2. Scrape trending hashtags from Instagram Explore
    // 3. Use a third-party trending API

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get random trends from different categories
    const selectedTrends = trendCategories.map(cat => {
      const randomIndex = Math.floor(Math.random() * cat.trends.length);
      return cat.trends[randomIndex];
    });

    // Shuffle and take top 6
    const shuffled = selectedTrends.sort(() => 0.5 - Math.random());
    const trends = shuffled.slice(0, 6);

    return NextResponse.json({
      success: true,
      trends,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    );
  }
}
