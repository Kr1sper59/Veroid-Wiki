import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MarkdownPage from './components/MarkdownPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MarkdownPage />} />
          <Route path="guides/kernel" element={<MarkdownPage />} />
          <Route path="guides/version" element={<MarkdownPage />} />
          <Route path="guides/sftp" element={<MarkdownPage />} />
          <Route path="guides/domain" element={<MarkdownPage />} />
          <Route path="guides/spark" element={<MarkdownPage />} />
          <Route path="guides/server.propertis" element={<MarkdownPage />} />
          <Route path="guides/proxy" element={<MarkdownPage />} />
          <Route path="community" element={<MarkdownPage />} />
          <Route path="community/discord" element={<MarkdownPage />} />
          <Route path="community/gradient" element={<MarkdownPage />} />
          <Route path="community/plasmo-voice" element={<MarkdownPage />} />
          <Route path="community/optimization" element={<MarkdownPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
