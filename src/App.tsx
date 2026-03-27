import { Box, Flex, Text, Button, Stack, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const TreeBackground = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    viewBox="0 0 1400 900"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="vignet" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#060608" stopOpacity="0" />
        <stop offset="100%" stopColor="#060608" stopOpacity="0.92" />
      </radialGradient>
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.16" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ═══ BOTTOM-LEFT MAIN TREE ═══ */}
    {/* Thick trunk */}
    <path d="M-10 900 Q30 820 70 750 Q100 690 130 620 Q155 565 175 500" stroke="#2e0756" strokeWidth="18" fill="none" strokeLinecap="round"/>
    <path d="M-10 900 Q30 820 70 750 Q100 690 130 620 Q155 565 175 500" stroke="#4c0984" strokeWidth="10" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>
    {/* Main branches */}
    <path d="M175 500 Q210 440 240 375 Q260 330 275 280" stroke="#5b21b6" strokeWidth="11" fill="none" strokeLinecap="round"/>
    <path d="M175 500 Q145 435 120 375 Q100 330 85 280" stroke="#5b21b6" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <path d="M130 620 Q80 570 40 530 Q10 500 -15 470" stroke="#4c0984" strokeWidth="8" fill="none" strokeLinecap="round"/>
    {/* Secondary branches */}
    <path d="M275 280 Q295 230 305 185 Q312 155 316 125" stroke="#6d28d9" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <path d="M275 280 Q250 230 240 185 Q232 155 228 125" stroke="#6d28d9" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
    <path d="M85 280 Q65 230 52 185 Q42 150 36 118" stroke="#6d28d9" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M85 280 Q108 228 118 182 Q126 148 130 115" stroke="#6d28d9" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
    {/* Tertiary twigs */}
    <path d="M316 125 Q325 95 330 68" stroke="#7c3aed" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M316 125 Q302 92 296 65" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M228 125 Q218 92 212 65" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M228 125 Q242 90 248 62" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M36 118 Q22 85 16 58" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M130 115 Q140 82 144 55" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* ─── LARGE LEAVES — bottom-left ─── */}
    {/* Each leaf: a pointed oval path for realism */}
    <ellipse cx="330" cy="52" rx="38" ry="22" fill="#7c3aed" opacity="0.35" transform="rotate(-25 330 52)"/>
    <ellipse cx="296" cy="48" rx="34" ry="20" fill="#9333ea" opacity="0.28" transform="rotate(15 296 48)"/>
    <ellipse cx="212" cy="50" rx="36" ry="21" fill="#6d28d9" opacity="0.32" transform="rotate(-40 212 50)"/>
    <ellipse cx="248" cy="44" rx="32" ry="19" fill="#a855f7" opacity="0.25" transform="rotate(30 248 44)"/>
    <ellipse cx="16"  cy="44" rx="38" ry="22" fill="#7c3aed" opacity="0.30" transform="rotate(20 16 44)"/>
    <ellipse cx="144" cy="40" rx="36" ry="21" fill="#8b5cf6" opacity="0.28" transform="rotate(-15 144 40)"/>
    {/* Mid-branch leaves */}
    <ellipse cx="310" cy="100" rx="42" ry="25" fill="#6d28d9" opacity="0.28" transform="rotate(-35 310 100)"/>
    <ellipse cx="336" cy="88" rx="36" ry="22" fill="#9333ea" opacity="0.22" transform="rotate(18 336 88)"/>
    <ellipse cx="224" cy="96" rx="40" ry="24" fill="#7c3aed" opacity="0.26" transform="rotate(42 224 96)"/>
    <ellipse cx="198" cy="84" rx="34" ry="20" fill="#a855f7" opacity="0.20" transform="rotate(-28 198 84)"/>
    <ellipse cx="40"  cy="94" rx="40" ry="24" fill="#8b5cf6" opacity="0.25" transform="rotate(25 40 94)"/>
    <ellipse cx="128" cy="90" rx="38" ry="23" fill="#6d28d9" opacity="0.23" transform="rotate(-20 128 90)"/>
    {/* Lower secondary leaves */}
    <ellipse cx="268" cy="165" rx="44" ry="26" fill="#7c3aed" opacity="0.22" transform="rotate(-50 268 165)"/>
    <ellipse cx="292" cy="148" rx="38" ry="23" fill="#9333ea" opacity="0.18" transform="rotate(22 292 148)"/>
    <ellipse cx="240" cy="160" rx="40" ry="24" fill="#6d28d9" opacity="0.20" transform="rotate(38 240 160)"/>
    <ellipse cx="58"  cy="162" rx="44" ry="26" fill="#8b5cf6" opacity="0.22" transform="rotate(-18 58 162)"/>
    <ellipse cx="112" cy="152" rx="40" ry="24" fill="#7c3aed" opacity="0.19" transform="rotate(30 112 152)"/>
    <ellipse cx="136" cy="168" rx="36" ry="22" fill="#a855f7" opacity="0.17" transform="rotate(-42 136 168)"/>
    {/* Large accent leaves near branches */}
    <ellipse cx="255" cy="248" rx="50" ry="30" fill="#7c3aed" opacity="0.18" transform="rotate(-30 255 248)"/>
    <ellipse cx="102" cy="240" rx="48" ry="28" fill="#6d28d9" opacity="0.16" transform="rotate(25 102 240)"/>
    <ellipse cx="-12" cy="462" rx="52" ry="30" fill="#9333ea" opacity="0.15" transform="rotate(15 -12 462)"/>
    <ellipse cx="180" cy="365" rx="46" ry="28" fill="#8b5cf6" opacity="0.14" transform="rotate(-22 180 365)"/>

    {/* ═══ TOP-RIGHT MAIN TREE (hanging down) ═══ */}
    <path d="M1410 -10 Q1375 70 1340 145 Q1310 210 1285 280 Q1262 340 1245 400" stroke="#2e0756" strokeWidth="18" fill="none" strokeLinecap="round"/>
    <path d="M1410 -10 Q1375 70 1340 145 Q1310 210 1285 280 Q1262 340 1245 400" stroke="#4c0984" strokeWidth="10" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>
    {/* Main branches */}
    <path d="M1245 400 Q1215 460 1190 525 Q1172 570 1162 620" stroke="#5b21b6" strokeWidth="11" fill="none" strokeLinecap="round"/>
    <path d="M1245 400 Q1278 462 1302 528 Q1320 575 1330 625" stroke="#5b21b6" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <path d="M1340 145 Q1380 192 1408 232" stroke="#4c0984" strokeWidth="8" fill="none" strokeLinecap="round"/>
    {/* Secondary */}
    <path d="M1162 620 Q1148 672 1140 718 Q1134 752 1130 785" stroke="#6d28d9" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <path d="M1162 620 Q1178 674 1184 720 Q1188 755 1190 788" stroke="#6d28d9" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
    <path d="M1330 625 Q1348 678 1356 724 Q1362 758 1364 790" stroke="#6d28d9" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M1330 625 Q1316 680 1312 726 Q1308 760 1307 792" stroke="#6d28d9" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
    {/* Twigs */}
    <path d="M1130 785 Q1122 820 1118 848" stroke="#7c3aed" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M1190 788 Q1196 823 1198 850" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M1364 790 Q1372 825 1374 852" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M1307 792 Q1302 828 1300 855" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M1408 232 Q1425 260 1432 282" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* ─── LARGE LEAVES — top-right ─── */}
    <ellipse cx="1118" cy="856" rx="38" ry="22" fill="#a855f7" opacity="0.35" transform="rotate(20 1118 856)"/>
    <ellipse cx="1198" cy="858" rx="36" ry="21" fill="#7c3aed" opacity="0.30" transform="rotate(-30 1198 858)"/>
    <ellipse cx="1374" cy="860" rx="38" ry="22" fill="#9333ea" opacity="0.32" transform="rotate(15 1374 860)"/>
    <ellipse cx="1300" cy="863" rx="36" ry="21" fill="#6d28d9" opacity="0.28" transform="rotate(-20 1300 863)"/>
    <ellipse cx="1432" cy="288" rx="38" ry="22" fill="#8b5cf6" opacity="0.28" transform="rotate(35 1432 288)"/>
    {/* Mid leaves */}
    <ellipse cx="1108" cy="820" rx="44" ry="26" fill="#7c3aed" opacity="0.26" transform="rotate(-25 1108 820)"/>
    <ellipse cx="1200" cy="825" rx="42" ry="25" fill="#9333ea" opacity="0.22" transform="rotate(38 1200 825)"/>
    <ellipse cx="1366" cy="822" rx="44" ry="26" fill="#6d28d9" opacity="0.25" transform="rotate(-18 1366 822)"/>
    <ellipse cx="1308" cy="828" rx="40" ry="24" fill="#a855f7" opacity="0.20" transform="rotate(28 1308 828)"/>
    {/* Upper secondary leaves */}
    <ellipse cx="1136" cy="748" rx="46" ry="27" fill="#8b5cf6" opacity="0.22" transform="rotate(20 1136 748)"/>
    <ellipse cx="1190" cy="755" rx="42" ry="25" fill="#7c3aed" opacity="0.19" transform="rotate(-35 1190 755)"/>
    <ellipse cx="1358" cy="750" rx="46" ry="27" fill="#9333ea" opacity="0.21" transform="rotate(-22 1358 750)"/>
    <ellipse cx="1316" cy="758" rx="42" ry="25" fill="#6d28d9" opacity="0.18" transform="rotate(32 1316 758)"/>
    {/* Large accent leaves */}
    <ellipse cx="1170" cy="560" rx="50" ry="30" fill="#7c3aed" opacity="0.18" transform="rotate(28 1170 560)"/>
    <ellipse cx="1320" cy="565" rx="48" ry="29" fill="#6d28d9" opacity="0.16" transform="rotate(-24 1320 565)"/>
    <ellipse cx="1250" cy="440" rx="52" ry="31" fill="#8b5cf6" opacity="0.15" transform="rotate(16 1250 440)"/>
    <ellipse cx="1245" cy="318" rx="50" ry="30" fill="#9333ea" opacity="0.14" transform="rotate(-30 1245 318)"/>

    {/* ═══ TOP-LEFT REACHING BRANCH ═══ */}
    <path d="M-20 80 Q50 110 115 148 Q165 178 200 215 Q228 245 248 278" stroke="#4c0984" strokeWidth="9" fill="none" strokeLinecap="round"/>
    <path d="M248 278 Q268 315 278 352 Q285 378 286 405" stroke="#6d28d9" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
    <path d="M248 278 Q225 318 218 358 Q213 385 212 412" stroke="#6d28d9" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M286 405 Q292 435 294 460" stroke="#7c3aed" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M212 412 Q208 442 206 468" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Leaves */}
    <ellipse cx="294" cy="466" rx="40" ry="24" fill="#9333ea" opacity="0.30" transform="rotate(22 294 466)"/>
    <ellipse cx="206" cy="474" rx="38" ry="23" fill="#7c3aed" opacity="0.28" transform="rotate(-28 206 474)"/>
    <ellipse cx="288" cy="438" rx="44" ry="26" fill="#6d28d9" opacity="0.24" transform="rotate(-18 288 438)"/>
    <ellipse cx="214" cy="444" rx="42" ry="25" fill="#a855f7" opacity="0.22" transform="rotate(35 214 444)"/>
    <ellipse cx="252" cy="352" rx="46" ry="27" fill="#8b5cf6" opacity="0.20" transform="rotate(-12 252 352)"/>
    <ellipse cx="222" cy="340" rx="42" ry="25" fill="#7c3aed" opacity="0.18" transform="rotate(28 222 340)"/>
    <ellipse cx="268" cy="268" rx="44" ry="26" fill="#9333ea" opacity="0.18" transform="rotate(18 268 268)"/>

    {/* ═══ BOTTOM-RIGHT REACHING BRANCH ═══ */}
    <path d="M1420 830 Q1355 802 1295 768 Q1248 740 1215 708 Q1188 680 1168 648" stroke="#4c0984" strokeWidth="9" fill="none" strokeLinecap="round"/>
    <path d="M1168 648 Q1148 615 1138 578 Q1130 550 1128 522" stroke="#6d28d9" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
    <path d="M1168 648 Q1190 612 1198 574 Q1204 546 1205 518" stroke="#6d28d9" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M1128 522 Q1122 492 1120 466" stroke="#7c3aed" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M1205 518 Q1210 488 1212 462" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Leaves */}
    <ellipse cx="1120" cy="460" rx="40" ry="24" fill="#7c3aed" opacity="0.30" transform="rotate(-22 1120 460)"/>
    <ellipse cx="1212" cy="456" rx="38" ry="23" fill="#9333ea" opacity="0.28" transform="rotate(30 1212 456)"/>
    <ellipse cx="1126" cy="488" rx="44" ry="26" fill="#6d28d9" opacity="0.24" transform="rotate(15 1126 488)"/>
    <ellipse cx="1208" cy="484" rx="42" ry="25" fill="#a855f7" opacity="0.22" transform="rotate(-35 1208 484)"/>
    <ellipse cx="1142" cy="560" rx="46" ry="27" fill="#8b5cf6" opacity="0.20" transform="rotate(20 1142 560)"/>
    <ellipse cx="1195" cy="566" rx="42" ry="25" fill="#7c3aed" opacity="0.18" transform="rotate(-18 1195 566)"/>
    <ellipse cx="1172" cy="642" rx="44" ry="26" fill="#9333ea" opacity="0.17" transform="rotate(-24 1172 642)"/>

    {/* ═══ AMBIENT GLOW SPOTS behind leaf clusters ═══ */}
    <ellipse cx="280" cy="200" rx="160" ry="120" fill="url(#glow1)"/>
    <ellipse cx="1240" cy="700" rx="160" ry="120" fill="url(#glow2)"/>
    <ellipse cx="240" cy="420" rx="100" ry="80"  fill="url(#glow1)" opacity="0.6"/>
    <ellipse cx="1165" cy="510" rx="100" ry="80" fill="url(#glow2)" opacity="0.6"/>

    {/* Vignette */}
    <rect x="0" y="0" width="1400" height="900" fill="url(#vignet)"/>
  </svg>
);

const App = () => {
  const navigate = useNavigate();

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      style={{
        background: "radial-gradient(ellipse at 30% 70%, #130820 0%, #060608 55%, #0a0510 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TreeBackground />

      {/* Fine dot grid */}
      <Box style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}/>

      {/* Central deep glow */}
      <Box style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 65%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 1,
      }}/>

      {/* Floating sparkle dots */}
      {[
        { top: "18%", left: "22%", size: 3, op: 0.5 },
        { top: "72%", left: "15%", size: 2, op: 0.4 },
        { top: "35%", left: "78%", size: 3, op: 0.45 },
        { top: "80%", left: "82%", size: 2, op: 0.35 },
        { top: "12%", left: "60%", size: 2, op: 0.4 },
        { top: "60%", left: "88%", size: 3, op: 0.3 },
      ].map((d, i) => (
        <Box key={i} style={{
          position: "absolute", top: d.top, left: d.left,
          width: d.size, height: d.size, borderRadius: "50%",
          background: "#a855f7", opacity: d.op,
          boxShadow: `0 0 ${d.size * 3}px #a855f7`,
          zIndex: 1, pointerEvents: "none",
          animation: `pulse ${2.5 + i * 0.4}s ease-in-out infinite alternate`,
        }}/>
      ))}

      {/* ── GLASS CARD ── */}
      <Stack
        align="center" gap="lg" maw={460} ta="center"
        style={{
          position: "relative", zIndex: 2,
          background: "linear-gradient(145deg, rgba(20,8,36,0.82) 0%, rgba(10,4,20,0.88) 100%)",
          border: "1px solid rgba(167,139,250,0.18)",
          borderRadius: 28,
          padding: "52px 44px",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow: [
            "0 0 0 1px rgba(124,58,237,0.12)",
            "0 2px 0 rgba(167,139,250,0.08) inset",
            "0 -1px 0 rgba(0,0,0,0.5) inset",
            "0 40px 120px rgba(0,0,0,0.75)",
            "0 0 80px rgba(109,40,217,0.08)",
          ].join(", "),
        }}
      >
        {/* Top shimmer line */}
        <Box style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(196,167,255,0.5), transparent)",
          borderRadius: "0 0 4px 4px",
        }}/>

        {/* Spinning ring + icon */}
        <Box style={{ position: "relative", width: 92, height: 92 }}>
          <Box style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            background: "conic-gradient(from 180deg, #7c3aed 0%, #c084fc 30%, #6d28d9 55%, #1a0530 75%, #7c3aed 100%)",
            animation: "spin 5s linear infinite",
          }}/>
          {/* Second counter-ring (subtle) */}
          <Box style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent 60%, rgba(168,85,247,0.25) 80%, transparent 100%)",
            animation: "spin 8s linear infinite reverse",
          }}/>
          <Box style={{
            position: "relative", zIndex: 1, width: 92, height: 92,
            borderRadius: "50%", background: "#0d0510",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, border: "2px solid #1e0838",
          }}>
            💬
          </Box>
        </Box>

        {/* Badge */}
        <Badge
          variant="dot" color="violet" size="sm"
          style={{
            background: "rgba(109,40,217,0.14)",
            border: "1px solid rgba(167,139,250,0.28)",
            color: "#c084fc",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontSize: 10, fontWeight: 600,
            padding: "4px 12px",
          }}
        >
          Ready to connect
        </Badge>

        {/* Title */}
        <Text style={{
          fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1,
          background: "linear-gradient(140deg, #ffffff 0%, #e9d5ff 45%, #a78bfa 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Welcome to Chat App
        </Text>

        {/* Subtitle */}
        <Text size="sm" style={{ color: "rgba(196,167,255,0.45)", lineHeight: 1.75, maxWidth: 310 }}>
          Select a conversation from the sidebar or start a new chat to begin messaging.
        </Text>

        {/* Ornamental divider */}
        <Box style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
          <Box style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.35))" }}/>
          <Box style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed", opacity: 0.7 }}/>
          <Box style={{ width: 3, height: 3, borderRadius: "50%", background: "#a855f7", opacity: 0.5 }}/>
          <Box style={{ width: 5, height: 5, borderRadius: "50%", background: "#7c3aed", opacity: 0.7 }}/>
          <Box style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.35), transparent)" }}/>
        </Box>

        {/* CTA */}
        <Button
          onClick={() => navigate("/chat")}
          radius="xl" size="md" fullWidth
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 60%, #4c0984 100%)",
            border: "1px solid rgba(196,167,255,0.2)",
            fontWeight: 700, letterSpacing: "0.04em", fontSize: 14, height: 48,
            boxShadow: "0 0 28px rgba(124,58,237,0.45), 0 1px 0 rgba(255,255,255,0.1) inset",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            position: "relative", overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.boxShadow = "0 0 52px rgba(168,85,247,0.7), 0 1px 0 rgba(255,255,255,0.15) inset";
            b.style.transform = "translateY(-2px) scale(1.01)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.boxShadow = "0 0 28px rgba(124,58,237,0.45), 0 1px 0 rgba(255,255,255,0.1) inset";
            b.style.transform = "translateY(0) scale(1)";
          }}
        >
          Start New Chat
        </Button>

        {/* Secondary action */}
        <Text
          size="xs"
          style={{
            color: "rgba(167,139,250,0.4)",
            cursor: "pointer",
            transition: "color 0.2s",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(196,167,250,0.75)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(167,139,250,0.4)")}
        >
          No account needed · Instant messaging
        </Text>
      </Stack>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          from { opacity: 0.2; transform: scale(0.85); }
          to   { opacity: 0.7; transform: scale(1.3); }
        }
      `}</style>
    </Flex>
  );
};

export default App;