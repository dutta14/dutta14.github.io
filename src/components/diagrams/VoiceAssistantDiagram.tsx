const VoiceAssistantDiagram = () => (
  <figure className="diagram-wrap" role="group" aria-label="Architecture diagram: task-oriented dialogue pipeline">
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-labelledby="diagram-voice-title diagram-voice-desc"
    >
      <title id="diagram-voice-title">
        Task-oriented dialogue pipeline with multi-turn context and entity
        resolution.
      </title>
      <desc id="diagram-voice-desc">
        Five processing stages flow left to right: Voice Input sends an
        utterance to the NLU Engine (confidence scoring), which passes intent
        and slots to the Entity Resolver (user data graph), then resolved
        entities to the Action Engine, and finally an action result to the
        Response Generator. A dashed follow-up arc loops back from the Response
        Generator to Voice Input for multi-turn conversation. Below, a Dialogue
        State node exchanges context with the NLU Engine and cached lookups
        with the Entity Resolver.
      </desc>

      <defs>
        <marker
          id="voice-arrow-muted"
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
          id="voice-arrow-accent"
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

      {/* ── Node 1: Voice Input ── */}
      <g className="diagram-node">
        <rect
          x="20"
          y="80"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="80"
          y="110"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Voice Input
        </text>
      </g>

      {/* ── Node 2: NLU Engine ── */}
      <g className="diagram-node">
        <rect
          x="160"
          y="80"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="220"
          y="110"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          NLU Engine
        </text>
      </g>
      {/* Annotation */}
      <text
        x="220"
        y="146"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        Confidence scoring
      </text>

      {/* ── Node 3: Entity Resolver ── */}
      <g className="diagram-node">
        <rect
          x="300"
          y="80"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="360"
          y="104"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          <tspan x="360" dy="0">Entity</tspan>
          <tspan x="360" dy="15">Resolver</tspan>
        </text>
      </g>
      {/* Annotation */}
      <text
        x="360"
        y="146"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fill="var(--text-muted)"
      >
        User data graph
      </text>

      {/* ── Node 4: Action Engine ── */}
      <g className="diagram-node">
        <rect
          x="440"
          y="80"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="500"
          y="110"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Action Engine
        </text>
      </g>

      {/* ── Node 5: Response Generator ── */}
      <g className="diagram-node">
        <rect
          x="580"
          y="80"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="640"
          y="104"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          <tspan x="640" dy="0">Response</tspan>
          <tspan x="640" dy="15">Generator</tspan>
        </text>
      </g>

      {/* ── Node 6: Dialogue State ── */}
      <g className="diagram-node">
        <rect
          x="230"
          y="220"
          width="120"
          height="52"
          rx="6"
          fill="var(--surface)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />
        <text
          x="290"
          y="250"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="var(--text-dark)"
        >
          Dialogue State
        </text>
      </g>

      {/* ── Connections ── */}

      {/* 1. Voice Input → NLU Engine: "Utterance" */}
      <line
        x1="140"
        y1="106"
        x2="160"
        y2="106"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="150"
        y="98"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Utterance
      </text>

      {/* 2. NLU Engine → Entity Resolver: "Intent + slots" */}
      <line
        x1="280"
        y1="106"
        x2="300"
        y2="106"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="290"
        y="98"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Intent + slots
      </text>

      {/* 3. Entity Resolver → Action Engine: "Resolved entities" */}
      <line
        x1="420"
        y1="106"
        x2="440"
        y2="106"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="430"
        y="98"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Resolved entities
      </text>

      {/* 4. Action Engine → Response Generator: "Action result" */}
      <line
        x1="560"
        y1="106"
        x2="580"
        y2="106"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="570"
        y="98"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Action result
      </text>

      {/* 5. Response Generator → Voice Input: "Follow-up" — dashed arc */}
      <path
        d="M 640 132 Q 360 310 80 132"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="360"
        y="240"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Multi-turn
      </text>

      {/* 6. NLU Engine ↔ Dialogue State: "Context" — dashed bidirectional */}
      <line
        x1="238"
        y1="132"
        x2="268"
        y2="220"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#voice-arrow-muted)"
      />
      <line
        x1="280"
        y1="220"
        x2="250"
        y2="132"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="238"
        y="178"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Context
      </text>

      {/* 7. Entity Resolver ↔ Dialogue State: "Cached lookups" — dashed bidirectional */}
      <line
        x1="342"
        y1="132"
        x2="312"
        y2="220"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#voice-arrow-muted)"
      />
      <line
        x1="300"
        y1="220"
        x2="330"
        y2="132"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#voice-arrow-muted)"
      />
      <text
        x="346"
        y="178"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        fill="var(--text-muted)"
      >
        Cached lookups
      </text>
    </svg>
    <figcaption className="diagram-caption">
      <strong>Fig 2.</strong> Task-oriented dialogue pipeline with multi-turn
      context and entity resolution.
    </figcaption>
  </figure>
);

export default VoiceAssistantDiagram;
