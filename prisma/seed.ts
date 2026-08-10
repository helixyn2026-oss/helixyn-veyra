import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean DB
  await prisma.standup.deleteMany()
  await prisma.message.deleteMany()
  await prisma.document.deleteMany()
  await prisma.task.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()
  await prisma.department.deleteMany()

  // 1. Departments
  const deptEng = await prisma.department.create({
    data: { name: 'Engineering', headName: 'Sarah Jenkins', budget: '$4.2M' }
  })
  const deptDesign = await prisma.department.create({
    data: { name: 'Design', headName: 'Chloe Kim', budget: '$1.2M' }
  })
  const deptHR = await prisma.department.create({
    data: { name: 'Human Resources', headName: 'Michael Chen', budget: '$800K' }
  })

  // 2. Users
  const alex = await prisma.user.create({
    data: {
      email: 'alex.r@helixyn.com',
      name: 'Alex Rivera',
      role: 'tl',
      title: 'Senior Engineer',
      departmentId: deptEng.id,
      status: 'active',
      health: 80
    }
  })

  const john = await prisma.user.create({
    data: {
      email: 'john.doe@helixyn.com',
      name: 'John Doe',
      role: 'employee',
      title: 'Frontend Developer',
      departmentId: deptEng.id,
      status: 'onboarding',
      health: 95
    }
  })

  const chloe = await prisma.user.create({
    data: {
      email: 'c.kim@helixyn.com',
      name: 'Chloe Kim',
      role: 'employee',
      title: 'Lead Designer',
      departmentId: deptDesign.id,
      status: 'active',
      health: 65
    }
  })

  const sarah = await prisma.user.create({
    data: {
      email: 's.jenkins@helixyn.com',
      name: 'Sarah Jenkins',
      role: 'admin',
      title: 'VP of Engineering',
      departmentId: deptEng.id,
      status: 'active',
      health: 90
    }
  })

  // 3. Projects
  await prisma.project.create({
    data: { name: 'Project Alpha (Q3)', budget: '$1.2M', status: 'on-track', progress: 75, teamName: 'Core Platform' }
  })
  await prisma.project.create({
    data: { name: 'Data Pipeline V2', budget: '$450K', status: 'at-risk', progress: 40, teamName: 'Internal Analytics' }
  })

  // 4. Tasks
  await prisma.task.create({
    data: { title: 'MAB-101: Setup Local Development', category: 'Engineering', status: 'in-progress', points: 3, assigneeId: john.id }
  })
  await prisma.task.create({
    data: { title: 'Read the Employee Handbook', category: 'Compliance', status: 'completed', points: 1, assigneeId: john.id }
  })
  await prisma.task.create({
    data: { title: 'MAB-89: Refactor Auth Middleware', category: 'Engineering', status: 'review', points: 8, assigneeId: alex.id }
  })

  // 5. Documents
  await prisma.document.create({
    data: { name: 'John Doe - W4 Form', type: 'Tax', status: 'verified', userId: john.id }
  })
  await prisma.document.create({
    data: { name: '2026 Employee Handbook', type: 'Policy', status: 'published' }
  })

  // 6. Standups
  await prisma.standup.create({
    data: { yesterday: 'Read handbook', today: 'Setting up local environment', blockers: 'None', userId: john.id }
  })
  await prisma.standup.create({
    data: { yesterday: 'Finished API routes', today: 'PR review', blockers: 'Design for error states', userId: alex.id }
  })

  // 7. Messages
  await prisma.message.create({
    data: { content: 'Please remember that open enrollment ends Friday.', channel: 'all-hands', senderId: sarah.id }
  })
  await prisma.message.create({
    data: { content: 'Hey John, welcome to the team!', channel: 'direct', senderId: sarah.id }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
