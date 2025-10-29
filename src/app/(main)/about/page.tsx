export default function AboutPage() {
  return (
    <div className='container mx-auto py-16'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-6 text-4xl font-bold'>About FastBreak</h1>
        <div className='prose prose-gray dark:prose-invert'>
          <p className='text-muted-foreground mb-4 text-lg'>
            FastBreak is a modern sports event management platform designed to help you organize,
            track, and manage sporting events with ease.
          </p>
          <h2 className='mt-8 mb-4 text-2xl font-semibold'>Our Mission</h2>
          <p className='text-muted-foreground'>
            We believe in making sports event management simple and accessible for everyone, from
            amateur leagues to professional organizations.
          </p>
          <h2 className='mt-8 mb-4 text-2xl font-semibold'>Features</h2>
          <ul className='text-muted-foreground list-inside list-disc space-y-2'>
            <li>Create and manage multiple sports events</li>
            <li>Multi-venue support for flexible event planning</li>
            <li>Real-time search and filtering</li>
            <li>Secure authentication and data management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
