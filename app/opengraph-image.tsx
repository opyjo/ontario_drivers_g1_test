import { ImageResponse } from "next/og";

export const alt = "DriveTest Pro — Ontario G1 test preparation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 58%, #38bdf8 100%)",
          padding: "72px 84px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 78,
              height: 78,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 22,
              background: "rgba(255,255,255,0.16)",
              fontSize: 42,
            }}
          >
            🚗
          </div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 800 }}>
            DriveTest Pro
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 850,
              letterSpacing: -2,
            }}
          >
            Prepare for Ontario's G1 Knowledge Test
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#dbeafe" }}>
            MTO-based study guides · realistic practice · instant explanations
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          <div style={{ display: "flex", padding: "12px 18px", borderRadius: 999, background: "rgba(255,255,255,0.15)" }}>
            Road signs
          </div>
          <div style={{ display: "flex", padding: "12px 18px", borderRadius: 999, background: "rgba(255,255,255,0.15)" }}>
            Rules of the road
          </div>
          <div style={{ display: "flex", padding: "12px 18px", borderRadius: 999, background: "rgba(255,255,255,0.15)" }}>
            40-question simulation
          </div>
        </div>
      </div>
    ),
    size
  );
}
