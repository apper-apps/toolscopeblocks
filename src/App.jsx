import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import BrowsePage from '@/components/pages/BrowsePage'
import ToolDetailPage from '@/components/pages/ToolDetailPage'
import SavedToolsPage from '@/components/pages/SavedToolsPage'
import CategoriesPage from '@/components/pages/CategoriesPage'
import SubmitToolPage from '@/components/pages/SubmitToolPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/tool/:id" element={<ToolDetailPage />} />
            <Route path="/saved" element={<SavedToolsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/submit" element={<SubmitToolPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  )
}

export default App