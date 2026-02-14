import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Product = lazy(() => import('./pages/Product').then(module => ({ default: module.Product })));
const Security = lazy(() => import('./pages/Security').then(module => ({ default: module.Security })));
const Technology = lazy(() => import('./pages/Technology').then(module => ({ default: module.Technology })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const RequestDemo = lazy(() => import('./pages/RequestDemo').then(module => ({ default: module.RequestDemo })));
const Insights = lazy(() => import('./pages/Insights').then(module => ({ default: module.Insights })));
const Article = lazy(() => import('./pages/Article').then(module => ({ default: module.Article }))); 
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Migration = lazy(() => import('./pages/Migration').then(module => ({ default: module.Migration })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const Admin = lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })));

// Resources
const Documentation = lazy(() => import('./pages/resources/Documentation').then(module => ({ default: module.Documentation })));
const APIReference = lazy(() => import('./pages/resources/APIReference').then(module => ({ default: module.APIReference })));
const SystemStatus = lazy(() => import('./pages/resources/SystemStatus').then(module => ({ default: module.SystemStatus })));
const SLA = lazy(() => import('./pages/resources/SLA').then(module => ({ default: module.SLA })));

// Legal
const Privacy = lazy(() => import('./pages/legal/Privacy').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/legal/Terms').then(module => ({ default: module.Terms })));
const Compliance = lazy(() => import('./pages/legal/Compliance').then(module => ({ default: module.Compliance })));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/security" element={<Security />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/about" element={<About />} />
              <Route path="/request-demo" element={<RequestDemo />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<Article />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/migration" element={<Migration />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Resources Routes */}
              <Route path="/resources/documentation" element={<Documentation />} />
              <Route path="/resources/api" element={<APIReference />} />
              <Route path="/resources/status" element={<SystemStatus />} />
              <Route path="/resources/sla" element={<SLA />} />

              {/* Legal Routes */}
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/compliance" element={<Compliance />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;