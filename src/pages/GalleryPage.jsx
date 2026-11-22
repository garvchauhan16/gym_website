import PageHero from '../components/PageHero.jsx';
import Gallery from '../components/Gallery.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { PhotoTag } from '../components/ui.jsx';
import { site } from '../config/site.js';

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Find Us at" accent="SS Plaza">
        The real {site.name} building, alongside illustrative training photography until the gym’s own interior photos are added.
      </PageHero>
      <section className="section-y bg-white">
        <div className="container-x">
          {/* Always shown: stock photography must never pass for the gym's own premises. */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-hairline bg-cloud p-4 text-sm text-slate sm:mb-8 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
            <span className="flex items-center gap-2"><PhotoTag actual /> A real photograph of {site.name}</span>
            <span className="flex items-center gap-2"><PhotoTag className="!bg-navy-900" /> Licensed stock image — not the gym’s equipment or members</span>
          </div>
          <Gallery />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
