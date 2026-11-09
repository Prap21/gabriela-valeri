import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => (
  <section className="page-not-found">
    <p className="page-not-found__eyebrow">404 · Page not found</p>
    <h1>We can’t find that page</h1>
    <p>The page may have moved, or the link may be incorrect.</p>
    <Link to="/">Back to the shop</Link>
  </section>
);

export default NotFoundPage;
