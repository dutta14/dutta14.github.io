const CopilotDiagram = () => (
  <figure className="diagram-wrap" role="group" aria-label="Architecture diagram: chat surface with session management">
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-labelledby="diagram-copilot-title diagram-copilot-desc"
    >
      <title id="diagram-copilot-title">
        Chat surface architecture with session management, streaming rendering,
        and progressive rollout.
      </title>
      <desc id="diagram-copilot-desc">
        Two groups: Client-Side UI contains Nav Pane and Chat Canvas; Backend
        Services contains Session Service and Orchestration API. Nav Pane
        requests session lists from Session Service and receives session
        metadata, then loads a session into Chat Canvas. Session Service also
        delivers message history to Chat Canvas. Chat Canvas sends user
        messages to the Orchestration API and receives a token stream via SSE.
        Chat Canvas persists messages back to Session Service. A Config Gate
        at the bottom provides feature flags to Nav Pane and ring gates (Ring
        0 through Ring 4) to Chat Canvas for progressive rollout.
      </desc>

      <defs>
        <marker
          id="copilot-arrow-muted"
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
          id="copilot-arrow-accent"
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

      {/* ── Client-Side UI group ── */}
      <g className="diagram-group">
        <rect
          x="20"
          y="30"
          width="340"
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
          CLIENT-SIDE UI
        </text>
      </g>

      {/* ── Backend Services group ── */}
      <g className="diagram-group">
        <rect
          x="384"
          y="30"
          width="316"
          height="280"
          rx="8"
          fill="none"
          stroke="var(--border-color-subtle)"
          strokeWidth="1"
          strokeDasharray="8 4"
        />
        <text
          x="396"
          y="46"
          fontFamily="var(--font-sans)"
          fontSize="10"
          fontWeight="600"
          fill="var(--text-muted)"
          letterSpacing="0.08em"
        >
          BACKEND SERVICES
        </text>
      </g>

      {/* ── Node 1: Nav Pane ── */}
      <g className="diagram-node">
        <rect
          x="44"
          y="80"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="104"
          y="110"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Nav Pane
        </text>
      </g>

      {/* ── Node 2: Chat Canvas (wide: 180px) ── */}
      <g className="diagram-node">
        <rect
          x="44"
          y="168"
          width="180"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="134"
          y="198"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Chat Canvas
        </text>
      </g>

      {/* ── Node 3: Session Service ── */}
      <g className="diagram-node">
        <rect
          x="420"
          y="80"
          width="140"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="490"
          y="104"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          <tspan x="490" dy="0">Session</tspan>
          <tspan x="490" dy="15">Service</tspan>
        </text>
      </g>

      {/* ── Node 4: Orchestration API (wide: 140px) ── */}
      <g className="diagram-node">
        <rect
          x="420"
          y="168"
          width="140"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="490"
          y="192"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          <tspan x="490" dy="0">Orchestration</tspan>
          <tspan x="490" dy="15">API</tspan>
        </text>
      </g>
      {/* Annotation */}
      <text
        x="490"
        y="234"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        Time to first token
      </text>

      {/* ── Node 5: Config Gate (wider: 140px, shorter: 44px) ── */}
      <g className="diagram-node">
        <rect
          x="290"
          y="350"
          width="140"
          height="44"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="360"
          y="376"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Config Gate
        </text>
      </g>
      {/* Annotation */}
      <text
        x="360"
        y="408"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        {'Ring 0 \u2192 Ring 4'}
      </text>

      {/* ── Connections ── */}

      {/* 1. Nav Pane → Session Service: "List sessions" */}
      <line
        x1="164"
        y1="100"
        x2="420"
        y2="100"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="292"
        y="92"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        List sessions
      </text>

      {/* 2. Session Service → Nav Pane: "Session metadata" (return, offset) */}
      <line
        x1="420"
        y1="116"
        x2="164"
        y2="116"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="292"
        y="128"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Session metadata
      </text>

      {/* 3. Nav Pane → Chat Canvas: "Load session" */}
      <line
        x1="104"
        y1="132"
        x2="104"
        y2="168"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="92"
        y="155"
        textAnchor="end"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Load session
      </text>

      {/* 4. Session Service → Chat Canvas: "Message history" */}
      <path
        d="M 490 132 L 490 152 L 160 152 L 160 168"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="326"
        y="148"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Message history
      </text>

      {/* 5. Chat Canvas → Orchestration API: "User message" */}
      <line
        x1="224"
        y1="188"
        x2="420"
        y2="188"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="322"
        y="180"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        User message
      </text>

      {/* 6. Orchestration API → Chat Canvas: "Token stream (SSE)" — thick teal */}
      <line
        x1="420"
        y1="202"
        x2="224"
        y2="202"
        stroke="var(--secondary)"
        strokeWidth="2.5"
        markerEnd="url(#copilot-arrow-accent)"
      />
      <text
        x="322"
        y="216"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--secondary)"
      >
        Token stream (SSE)
      </text>

      {/* 7. Chat Canvas → Session Service: "Persist messages" — dashed */}
      <path
        d="M 224 178 L 290 178 L 290 256 L 490 256 L 490 220"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="390"
        y="270"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Persist messages
      </text>

      {/* 8. Config Gate → Nav Pane: "Feature flags" — dashed */}
      <path
        d="M 310 350 L 104 350 L 104 270"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="190"
        y="342"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Feature flags
      </text>

      {/* 9. Config Gate → Chat Canvas: "Ring gates" — dashed */}
      <path
        d="M 340 350 L 178 350 L 178 270"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#copilot-arrow-muted)"
      />
      <text
        x="260"
        y="342"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Ring gates
      </text>
    </svg>
    <figcaption className="diagram-caption">
      <strong>Fig 3.</strong> Chat surface architecture with session management,
      streaming rendering, and progressive rollout.
    </figcaption>
  </figure>
);

export default CopilotDiagram;
