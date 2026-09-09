export default function Testimonial() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div
          className="bg-white rounded-[24px] p-[54px] border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-center relative overflow-hidden"
        >
          <span className="codent-icon codent-gradient-text absolute top-6 end-9 text-[90px] opacity-70 leading-none">
            format_quote
          </span>

          <div>
            <blockquote className="text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.6px] leading-[1.25] text-[#0f0f0f]">
              They felt less like an agency and more like the two{" "}
              <span className="bg-[#E0E2E7] px-2 py-0 rounded-[6px] font-semibold">
                smartest
              </span>{" "}
              people on our team — who happened to also{" "}
              <span className="bg-[#E0E2E7] px-2 py-0 rounded-[6px] font-semibold">
                design
              </span>{" "}
              the whole thing.
            </blockquote>

            <div className="flex items-center gap-[14px] mt-7">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[18px] bg-[linear-gradient(135deg,#F7B2FB,#786EF1_60%,#5588FB)]">
                RM
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#0f0f0f]">
                  Rosa Madrigal
                </div>
                <div className="text-[12.5px] text-[#666]">
                  Head of Product · Halcyon
                </div>
              </div>
            </div>
          </div>

          {/* Side card */}
          <div className="bg-[#F5F5F5] rounded-[18px] p-6 flex flex-col gap-[14px]">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#666]">Project</span>
              <span className="text-[11px] font-semibold text-[#0b7536] bg-[#dff5e6] px-[10px] py-[3px] rounded-[40px]">
                Live
              </span>
            </div>
            <div className="text-[#0f0f0f] text-[36px] font-medium tracking-[-1.2px]">
              Halcyon 3.0
            </div>
            <div className="text-[12px] text-[#666]">
              Banking app · 9 months · Brand, product, engineering.
            </div>

            <div className="codent-dashed my-[6px]" />

            <div className="flex items-center justify-between mt-1">
              <span className="text-[12px] text-[#666]">NPS lift</span>
              <span className="font-semibold text-[14px]">+34 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#666]">Activation</span>
              <span className="font-semibold text-[14px]">×2.1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
