import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/base/card'

export default function Home() {
  return (
    <div className='from-background to-muted/20 min-h-screen bg-gradient-to-b'>
      <div className='container mx-auto max-w-screen-2xl px-4 py-16'>
        <div className='flex flex-col items-center justify-center space-y-8'>
          {/* Hero Section */}
          <div className='max-w-3xl space-y-4 text-center'>
            <h1 className='text-4xl font-bold tracking-tight md:text-6xl'>Welcome to Fastbreak</h1>
            <p className='text-muted-foreground text-xl'>
              Your sports management platform is under construction
            </p>
          </div>

          {/* Cards Grid */}
          <div className='mt-12 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Card className='transition-shadow hover:shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Dashboard</CardTitle>
                <CardDescription>Manage your events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href='/dashboard'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors'
                >
                  Go to Dashboard
                </Link>
              </CardContent>
            </Card>

            <Card className='transition-shadow hover:shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Events</CardTitle>
                <CardDescription>Browse and manage upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-muted-foreground text-sm'>Coming soon...</div>
              </CardContent>
            </Card>

            <Card className='transition-shadow hover:shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Teams</CardTitle>
                <CardDescription>Organize and coordinate your teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-muted-foreground text-sm'>Coming soon...</div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className='mt-16 text-center'>
            <p className='text-muted-foreground text-sm'>
              This is a temporary placeholder page. More features coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
