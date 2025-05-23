const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing menu items
  await prisma.menuItem.deleteMany();

  // Add new menu items
  const menuItems = [
    {
      title: 'Ema Datshi',
      description: 'Traditional Bhutanese chili and cheese stew served with red rice',
      price: 120.00,
      image: 'https://bhutan-kitchen.com/wp-content/uploads/2024/08/Green-Chilli-Ema-Datshi-menu-item.png',
      category: 'MAIN_MEALS',
    },
    {
      title: 'Shakam Datshi',
      description: 'Dried beef cooked with cheese and chili',
      price: 150.00,
      image: 'https://media.sublimetrails.com/uploads/media/blog/bhutan-cuisine/shakam-shukam-datsi.png',
      category: 'MAIN_MEALS',
    },
    {
      title: 'Kewa Datshi',
      description: 'Potato cooked with cheese and chili',
      price: 100.00,
      image: 'https://bhutan-kitchen.com/wp-content/uploads/2024/08/Kewa-Datshi-menu-item-Bhutan-Kitchen-400x.png',
      category: 'MAIN_MEALS',
    },
    {
      title: 'Vegetable Fried Rice',
      description: 'Stir-fried rice with mixed vegetables and egg',
      price: 110.00,
      image: 'https://img.taste.com.au/uMAyK77R/taste/2024/08/quick-mongolian-beef-fried-rice-in-bowl-201667-1.jpg',
      category: 'MAIN_MEALS',
    },
    {
      title: 'Cheese Sandwich',
      description: 'Toasted bread with cheese and vegetables',
      price: 80.00,
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/04/HamSandwich-0d4e4ff.jpg',
      category: 'QUICK_BITES',
    },
    {
      title: 'Suja (Butter Tea)',
      description: 'Traditional Bhutanese salted butter tea',
      price: 40.00,
      image: 'https://blessmyfoodbypayal.com/wp-content/uploads/2024/12/IMG_6800.png',
      category: 'BEVERAGES',
    },
    {
      title: 'Milk Tea',
      description: 'Traditional Bhutanese milk tea',
      price: 40.00,
      image: 'https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65223a8acc063-Milk%20Tea%20Cup%20Top%20View.png',
      category: 'BEVERAGES',
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }

  console.log('Menu items seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 