import { ImageResponse } from "next/og";
import { sipFutureValue } from "@/lib/finance";
import { formatGrouped, formatINR } from "@/lib/finance/format";

export const alt = "Fermor — every money decision, worked out in the open";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const r = sipFutureValue({ monthly: 25_000, annualRate: 12, years: 15 });
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#EEF1F4",
        color: "#152238",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: 720 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#152238",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="26" viewBox="-1.04 -0.79 2.08 1.58" fill="#75FB90">
              <path d="M0.9526 -0.7447 L0.7342 -0.4684 L0.1684 -0.4684 L-0.2895 0.1132 L-1 0.1132 L-0.7868 -0.1579 L-0.4342 -0.1579 L0.0289 -0.7447 Z" />
              <path d="M-0.9526 0.7447 L-0.7342 0.4684 L-0.1684 0.4684 L0.2895 -0.1132 L1 -0.1132 L0.7868 0.1579 L0.4342 0.1579 L-0.0289 0.7447 Z" />
            </svg>
          </div>
          Fermor
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          Every money decision, worked out in the open.
        </div>
        <div style={{ fontSize: 26, color: "#5E6775" }}>Free calculators · No sign-up · Every formula shown</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          flex: 1,
          background: "#F8FAFC",
          borderLeft: "2px solid #8A94A3",
          padding: "0 44px",
          fontSize: 24,
        }}
      >
        <div style={{ color: "#5E6775", fontStyle: "italic" }}>rough work</div>
        <div>FV = P × [((1+i)ⁿ − 1) ÷ i] × (1+i)</div>
        <div>{`P = ${formatGrouped(r.monthly)}, i = 0.01, n = ${r.months}`}</div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{`= ${formatINR(r.futureValue)}`}</div>
        <div style={{ color: "#5E6775", fontStyle: "italic", fontSize: 20 }}>illustrative · 12% p.a. assumed</div>
      </div>
    </div>,
    size,
  );
}
