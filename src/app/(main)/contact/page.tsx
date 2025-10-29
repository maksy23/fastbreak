export default function ContactPage() {
  return (
    <div className='container mx-auto py-16'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-6 text-4xl font-bold'>Contact Us</h1>
        <div className='prose prose-gray dark:prose-invert'>
          <p className='text-muted-foreground mb-8 text-lg'>
            Have questions or feedback? We&apos;d love to hear from you!
          </p>

          <div className='space-y-6'>
            <div>
              <h2 className='mb-2 text-2xl font-semibold'>Email</h2>
              <p className='text-muted-foreground'>
                <a
                  href='mailto:support@fastbreak.com'
                  className='text-primary hover:underline'
                >
                  support@fastbreak.com
                </a>
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-2xl font-semibold'>Support</h2>
              <p className='text-muted-foreground'>
                For technical support or bug reports, please email us with detailed information
                about your issue, and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <div>
              <h2 className='mb-2 text-2xl font-semibold'>Business Inquiries</h2>
              <p className='text-muted-foreground'>
                For partnership opportunities or business inquiries, please reach out to{' '}
                <a
                  href='mailto:business@fastbreak.com'
                  className='text-primary hover:underline'
                >
                  business@fastbreak.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
