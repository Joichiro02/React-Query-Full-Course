import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from './components/Home.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import AlterEgo from './components/AlterEgo';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import { DynamicParallelPage } from './components/DynamicParallel.page';
import DependentQueriesPage from './components/DependentQueries.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfiniteQueriesPage from './components/InfiniteQueries.page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/alter-ego">Alter Ego</Link>
              </li>
              <li>
                <Link to="/rq-parallel">Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dependent">Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated">Pagination</Link>
              </li>
              <li>
                <Link to="/rq-infinite">Infinite Query</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            <Route path='/rq-dependent' element={<DependentQueriesPage email="vishwas@example.com" />} />
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]} />} />
            <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
            <Route path='/alter-ego' element={<AlterEgo />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
