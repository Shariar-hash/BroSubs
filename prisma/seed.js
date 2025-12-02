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
      category: 'AI Assistant',
      status: 'active',
      isFeatured: true,
      discountEndTime: discountEndTime,
      image: 'chatgpt'
    },
    {
      name: 'Gemini Pro + Google Drive 2TB',
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
      category: 'AI Assistant',
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'gemini'
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
      originalPrice: 799,
      price: 499,
      duration: '12 months',
      category: 'AI Search',
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'perplexity'
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
      originalPrice: 499,
      price: 349,
      duration: '1 year',
      category: 'AI Assistant',
      status: 'active',
      isFeatured: false,
      discountEndTime: discountEndTime,
      image: 'chatgpt-goto'
    },
    {
      name: 'Claude Pro',
      description: 'Anthropic\'s advanced AI assistant - Coming Soon',
      features: [
        'Claude 3 Opus Access',
        'Extended Context Window',
        'Priority Access',
        'Advanced Reasoning',
        'Document Analysis'
      ],
      price: 0,
      category: 'AI Assistant',
      status: 'coming_soon',
      isFeatured: false,
      image: 'claude'
    },
    {
      name: 'Midjourney Pro',
      description: 'Professional AI image generation - Coming Soon',
      features: [
        'Unlimited Generations',
        'Fast Mode Access',
        'Commercial License',
        'Stealth Mode',
        'Maximum Resolution'
      ],
      price: 0,
      category: 'AI Image',
      status: 'coming_soon',
      isFeatured: false,
      image: 'midjourney'
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
