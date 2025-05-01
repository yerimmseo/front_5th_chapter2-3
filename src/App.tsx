import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import { useEffect, useState } from "react"
import { initializeApp } from "./app/api/initApp.ts"
// import PostsManagerPage from "./pages/_PostsManagerPage.tsx"
import { PostsManagerPage } from "./pages/PostsManagerPage.tsx"

const App = () => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      const success = await initializeApp()
      setInitialized(success)
    }
    init()
  }, [])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {initialized && <PostsManagerPage />}
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
