import PageIllustration from '@/components/page-illustration'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <main className="grow bg-black z-30">

      <PageIllustration />

      {children}

    </main>
  )
}
