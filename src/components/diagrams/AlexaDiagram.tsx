const AlexaDiagram = () => (
  <figure className="diagram-wrap" role="group" aria-label="Architecture diagram: on-device voice activation pipeline">
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-labelledby="diagram-alexa-title diagram-alexa-desc"
    >
      <title id="diagram-alexa-title">
        On-device voice activation pipeline from DSP wake-word detection
        through cloud speech processing.
      </title>
      <desc id="diagram-alexa-desc">
        The pipeline flows left to right across two groups. On-device: DSP
        Engine (always-on at ~1 mA) sends a wake interrupt to Audio Buffer
        (pre-roll capture), which streams PCM to the IPC Bridge (dual-channel).
        The IPC Bridge forwards audio over a socket and control via binder to
        the Voice Client. Cloud: the Voice Client sends an HTTP/2 stream to
        Cloud ASR, which returns a response with TTS back to the Voice Client.
      </desc>

      <defs>
        <marker
          id="alexa-arrow-muted"
          viewBox="0 0 10 8"
          refX="9"
          refY="4"
          markerWidth="8"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,4 L0,8 L2,4 Z" fill="var(--text-muted)" />
        </marker>
        <marker
          id="alexa-arrow-accent"
          viewBox="0 0 10 8"
          refX="9"
          refY="4"
          markerWidth="8"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,4 L0,8 L2,4 Z" fill="var(--secondary)" />
        </marker>
      </defs>

      {/* ── On-Device group ── */}
      <g className="diagram-group">
        <rect
          x="20"
          y="30"
          width="480"
          height="280"
          rx="8"
          fill="none"
          stroke="var(--border-color-subtle)"
          strokeWidth="1"
          strokeDasharray="8 4"
        />
        <text
          x="32"
          y="46"
          fontFamily="var(--font-sans)"
          fontSize="10"
          fontWeight="600"
          fill="var(--text-muted)"
          letterSpacing="0.08em"
        >
          ON-DEVICE
        </text>
      </g>

      {/* ── Cloud group ── */}
      <g className="diagram-group">
        <rect
          x="524"
          y="30"
          width="176"
          height="280"
          rx="8"
          fill="none"
          stroke="var(--border-color-subtle)"
          strokeWidth="1"
          strokeDasharray="8 4"
        />
        <text
          x="536"
          y="46"
          fontFamily="var(--font-sans)"
          fontSize="10"
          fontWeight="600"
          fill="var(--text-muted)"
          letterSpacing="0.08em"
        >
          CLOUD
        </text>
      </g>

      {/* ── Node 1: DSP Engine ── */}
      <g className="diagram-node">
        <rect
          x="44"
          y="100"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="104"
          y="130"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          DSP Engine
        </text>
      </g>
      {/* Annotation */}
      <text
        x="104"
        y="166"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        ~1mA always-on
      </text>

      {/* ── Node 2: Audio Buffer ── */}
      <g className="diagram-node">
        <rect
          x="192"
          y="100"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="252"
          y="130"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Audio Buffer
        </text>
      </g>
      {/* Annotation */}
      <text
        x="252"
        y="166"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        Pre-roll capture
      </text>

      {/* ── Node 3: IPC Bridge ── */}
      <g className="diagram-node">
        <rect
          x="340"
          y="100"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="400"
          y="130"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          IPC Bridge
        </text>
      </g>
      {/* Annotation */}
      <text
        x="400"
        y="166"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        Dual-channel
      </text>

      {/* ── Node 4: Voice Client ── */}
      <g className="diagram-node">
        <rect
          x="44"
          y="210"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="104"
          y="240"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Voice Client
        </text>
      </g>

      {/* ── Node 5: Cloud ASR ── */}
      <g className="diagram-node">
        <rect
          x="552"
          y="100"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="612"
          y="130"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Cloud ASR
        </text>
      </g>

      {/* ── Connections ── */}

      {/* 1. DSP Engine → Audio Buffer: "Wake interrupt" */}
      <line
        x1="164"
        y1="126"
        x2="192"
        y2="126"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#alexa-arrow-muted)"
      />
      <text
        x="178"
        y="118"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Wake interrupt
      </text>

      {/* 2. Audio Buffer → IPC Bridge: "PCM stream" */}
      <line
        x1="312"
        y1="126"
        x2="340"
        y2="126"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#alexa-arrow-muted)"
      />
      <text
        x="326"
        y="118"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        PCM stream
      </text>

      {/* 3. IPC Bridge → Voice Client: "Audio (socket)" — thick teal */}
      <path
        d="M 400 152 L 400 200 L 164 200 L 164 210"
        fill="none"
        stroke="var(--secondary)"
        strokeWidth="2.5"
        markerEnd="url(#alexa-arrow-accent)"
      />
      <text
        x="282"
        y="194"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--secondary)"
      >
        Audio (socket)
      </text>

      {/* 4. IPC Bridge → Voice Client: "Control (binder)" — dashed */}
      <path
        d="M 420 152 L 420 220 L 164 220 L 144 220 L 144 210"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text
        x="282"
        y="232"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Control (binder)
      </text>

      {/* 5. Voice Client → Cloud ASR: "HTTP/2 stream" */}
      <path
        d="M 164 236 L 480 236 L 480 152 L 552 152 L 552 140"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#alexa-arrow-muted)"
      />
      <text
        x="320"
        y="250"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        HTTP/2 stream
      </text>

      {/* 6. Cloud ASR → Voice Client: "Response + TTS" */}
      <path
        d="M 612 152 L 612 270 L 104 270 L 104 262"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#alexa-arrow-muted)"
      />
      <text
        x="360"
        y="284"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Response + TTS
      </text>
    </svg>
    <figcaption className="diagram-caption">
      <strong>Fig 1.</strong> On-device voice activation pipeline from DSP
      wake-word detection through cloud processing.
    </figcaption>
  </figure>
);

export default AlexaDiagram;
