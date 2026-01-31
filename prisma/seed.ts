import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

async function main() {
     console.log("🌱 Seeding database...");
  const hashedPassword = await bcrypt.hash('Password123!', 10)

  // Create students
  const student1 = await prisma.user.upsert({
    where: { email: 'student1@nitjsr.ac.in' },
    update: {},
    create: {
      email: 'student1@nitjsr.ac.in',
      name: 'Rahul Kumar',
      password: hashedPassword,
      role: 'STUDENT',
      department: 'Computer Science',
      hostel: 'Ambedkar Hall',
    },
  })

  // Create admin
  const admin1 = await prisma.user.upsert({
    where: { email: 'admin@nitjsr.ac.in' },
    update: {},
    create: {
      email: 'admin@nitjsr.ac.in',
      name: 'Dr. Singh',
      password: hashedPassword,
      role: 'ADMIN',
      expertise: 'HOSTEL',
    },
  })

  // Create super admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@nitjsr.ac.in' },
    update: {},
    create: {
      email: 'superadmin@nitjsr.ac.in',
      name: 'Director Office',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })

  // Create sample complaint
  const complaint1 = await prisma.complaint.create({
    data: {
      title: 'Broken AC in Room 201',
      description: 'The air conditioner in my room has been non-functional for the past 3 days. Need urgent repair.',
      category: 'HOSTEL',
      studentId: student1.id,
    },
  })

  await prisma.activity.create({
    data: {
      complaintId: complaint1.id,
      userId: student1.id,
      action: 'CREATED',
      newStatus: 'PENDING',
      remarks: 'Initial complaint submission',
    },
  })

  console.log('Seed data created successfully!')
  console.log('Demo credentials:')
  console.log('Student: student1@nitjsr.ac.in / Password123!')
  console.log('Admin: admin@nitjsr.ac.in / Password123!')
  console.log('Super Admin: superadmin@nitjsr.ac.in / Password123!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })