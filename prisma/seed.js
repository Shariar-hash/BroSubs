const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  // Calculate discount end time (7 days from now)
  const discountEndTime = new Date()
  discountEndTime.setDate(discountEndTime.getDate() + 7)

  // Create products with new pricing
  const products = [
    {
      name: 'ChatGPT Pro',
      description: 'Advanced AI assistant with GPT-4 access, faster responses, and priority support',
      features: [
        'GPT-4 Access',
        'Faster Response Times',
        'Priority Support',
        'DALL-E Image Generation',
        'Advanced Data Analysis'
      ],
      originalPrice: 399,
      price: 299,
      duration: '1 month',
      category: ['AI Tools', 'AI - Chatbot'],
      status: 'active',
      isFeatured: true,
      discountEndTime: discountEndTime,
      image: 'Chatgpt Pro.png',
      plans: [
        { duration: '1 month', price: 299, originalPrice: 399 },
        { duration: '1 year', price: 2999, originalPrice: 4788 } // Save ~1500 TK
      ]
    },
    {
      name: 'Gemini Advanced + Google Drive 2TB',
      description: 'Google\'s most capable AI with 2TB cloud storage included',
      features: [
        'Gemini Advanced AI',
        '2TB Google Drive Storage',
        'Gmail Integration',
        'Google Workspace Features',
        '1 Year Subscription'
      ],
      originalPrice: 799,
      price: 499,
      duration: '1 year',
      category: ['AI Tools', 'AI - Chatbot', 'Cloud Storage'],
      status: 'active',
      isFeatured: true,
      discountEndTime: discountEndTime,
      image: 'Gemni.png',
      plans: [
        { duration: '1 month', price: 599, originalPrice: 799 },
        { duration: '1 year', price: 5999, originalPrice: 9588 } // Save ~3500 TK
      ]
    },
    {
      name: 'Perplexity Pro',
      description: 'AI-powered search engine with unlimited queries and advanced features',
      features: [
        'Unlimited Pro Searches',
        'Advanced AI Models',
        'Real-time Information',
        'File Upload & Analysis',
        '12 Months Access'
      ],
      originalPrice: 699,
      price: 449,
      duration: '12 months',
      category: ['AI Tools', 'AI - Research'],
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'Perplexity Pro.png',
      plans: [
        { duration: '1 year', price: 4499, originalPrice: 6999 } // Annual only
      ]
    },
    {
      name: 'ChatGPT GOTO',
      description: 'Extended ChatGPT access with premium features for a full year',
      features: [
        'GPT-4 Access',
        'Unlimited Messages',
        'Priority Access',
        'Custom Instructions',
        '1 Year Subscription'
      ],
      originalPrice: 599,
      price: 399,
      duration: '1 year',
      category: ['AI Tools', 'AI - Chatbot'],
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'Chatgpt Goto.png',
      plans: [
        { duration: '1 year', price: 3999, originalPrice: 5999 } // Annual only
      ]
    },
    {
      name: 'Claude Pro',
      description: 'Anthropic\'s advanced AI assistant with superior reasoning capabilities',
      features: [
        'Claude 3 Opus Access',
        'Extended Context Window (200K tokens)',
        'Priority Access During Peak Times',
        'Advanced Reasoning & Analysis',
        'Document Analysis & Summarization'
      ],
      originalPrice: 399,
      price: 299,
      duration: '1 month',
      category: ['AI Tools', 'AI - Chatbot'],
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'claude pro.png',
      plans: [
        { duration: '1 month', price: 299, originalPrice: 399 },
        { duration: '1 year', price: 2999, originalPrice: 4788 } // Save ~1500 TK
      ]
    },
    {
      name: 'Midjourney Pro',
      description: 'Professional AI image generation with unlimited access',
      features: [
        'Unlimited Generations',
        'Fast Mode Access',
        'Commercial License',
        'Stealth Mode',
        'Maximum Resolution Output'
      ],
      originalPrice: 899,
      price: 599,
      duration: '1 month',
      category: ['AI Tools', 'AI - Image Generation', 'Design'],
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'midjourney.png',
      plans: [
        { duration: '1 month', price: 599, originalPrice: 899 }
      ]
    }
  ]

  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    })
    console.log(`✅ Created product: ${created.name}`)
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
