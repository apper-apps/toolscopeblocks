import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

const Layout = ({ children, showSearch = true, onSearch }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showSearch={showSearch} onSearch={onSearch} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout