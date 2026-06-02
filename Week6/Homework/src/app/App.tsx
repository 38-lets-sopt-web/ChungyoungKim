import { Navigate, Route, Routes } from 'react-router-dom'

import { MovieDetailPage } from '@/features/movies/pages/MovieDetailPage'
import { MovieListPage } from '@/features/movies/pages/MovieListPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieListPage />} />
      <Route path="/movies/:movieId" element={<MovieDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
