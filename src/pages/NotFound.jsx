import PageHero from '../components/PageHero.jsx';
import { Button } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Error 404" title="Page Not" accent="Found">
        The page you're looking for doesn't exist or has moved.
      </PageHero>
      <section className="section-y">
        <div className="container-x flex flex-col gap-3 sm:flex-row">
          <Button to="/">Back to Home</Button>
          <Button to="/about#contact" variant="dark">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
