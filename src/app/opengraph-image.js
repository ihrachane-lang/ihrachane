import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IHRACHANE global sourcing, supplier verification and logistics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "76px", color: "white", background: "linear-gradient(135deg, #111827 0%, #431407 100%)" }}>
      <div style={{ color: "#fb923c", fontSize: 30, fontWeight: 700, letterSpacing: 5 }}>IHRACHANE</div>
      <div style={{ fontSize: 70, lineHeight: 1.1, fontWeight: 800, marginTop: 28 }}>Global Sourcing,<br />Quality Control & Logistics</div>
      <div style={{ fontSize: 28, color: "#fed7aa", marginTop: 30 }}>From verified suppliers to international delivery.</div>
    </div>,
    size,
  );
}
