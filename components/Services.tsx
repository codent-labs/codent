import ScrollTrack from "@/components/ScrollTrack";

export default function Services() {
  return (
    <section className="codent-section overflow-hidden" id="solutions">
      {/* Header */}
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">solutions</span>
            <h2 className="mt-[18px]">
              The bits we{" "}
              <em className="italic font-light">obsess</em>{" "}
              over,
              <br />
              so you don&apos;t have to.
            </h2>
          </div>
          <p className="codent-section-lede">
            Four practices, one lab. Scroll to explore what we bring —
            pick the ones that fit.
          </p>
        </div>
      </div>

      <ScrollTrack />
    </section>
  );
}