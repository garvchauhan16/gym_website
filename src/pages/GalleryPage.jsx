import PageHero from '../components/PageHero.jsx';
import Gallery from '../components/Gallery.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { SampleTag } from '../components/ui.jsx';

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Facilities & Gallery" title="Step Inside" accent="Powerhouse Gym">
        Explore the training zones, equipment and atmosphere.
      </PageHero>
      <section className="section-y">
        <div className="container-x">
          <p className="mb-8 flex flex-wrap items-center gap-2 text-sm text-mist">
            <SampleTag>Placeholder images</SampleTag>
            {/* SampleTag hides itself at launch; the explanatory note goes with it */}
            <span className="text-xs">Stock photos are shown until real gym photographs are added.</span>
          </p>
          <Gallery />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
