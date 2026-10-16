import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import { migrateLegacyUrl } from './routing';
import { loadBlogPages } from './components/LazyBlogPage';

// Preserve old shared hash links while making /menu a real, crawlable URL.
const legacyUrl = migrateLegacyUrl(window.location, import.meta.env.BASE_URL);
if (legacyUrl) window.history.replaceState(window.history.state, '', legacyUrl);

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const render = () => createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter basename={basename || '/'}>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);

// Blog pages arrive pre-rendered: fetch their code first so React replaces that HTML with the same
// content instead of a blank placeholder. If the chunk fails, render anyway; the page retries the load.
if (/^(?:\/vi)?\/blog(?:\/|$)/.test(window.location.pathname.slice(basename.length))) {
  loadBlogPages().catch(() => undefined).finally(render);
} else {
  render();
}
