const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check if users exist
    const users = await prisma.user.findMany();
    console.log(`👥 Found ${users.length} users in database`);
    
    // Check specific user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@supplyit.io' }
    });
    
    if (adminUser) {
      console.log('✅ Admin user found:', adminUser.email);
      console.log('📝 User details:', {
        id: adminUser.id,
        name: adminUser.name,
        role: adminUser.role,
        hasPassword: !!adminUser.password
      });
      
      // Test password
      const testPassword = 'admin123';
      const isValid = await bcrypt.compare(testPassword, adminUser.password);
      console.log('🔑 Password test for "admin123":', isValid);
    } else {
      console.log('❌ Admin user not found');
    }
    
  } catch (error) {
    console.error('🚨 Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase(); 