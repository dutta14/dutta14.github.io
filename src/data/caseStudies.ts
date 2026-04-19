import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'alexa-hands-free',
    title: 'Alexa Hands-Free',
    subtitle: 'Shipping the first hands-free Alexa experience on Android in India',
    image: '/img/alexa-handsfree.png',
    role: 'Software Engineer 2 / Technical Lead',
    company: 'Amazon',
    year: '2018 - 2020',
    impact: '5M+ users in under a year',
    sections: [
      {
        heading: 'The problem',
        body: 'Amazon wanted Alexa to work hands-free on Android phones in India. Not through the Alexa app, not with a button press, but always listening, always ready, the way it works on an Echo. The problem is that phones are not Echos. They have battery constraints, thermal limits, other apps competing for the microphone, and an operating system that actively kills background processes to save resources. Nobody had shipped this at scale on Android before.',
      },
      {
        heading: 'The architecture',
        body: 'The solution required two apps talking to each other through IPC. The first app lived close to the chipset, built by the hardware partner (Qualcomm or MediaTek depending on the device). It ran a lightweight wake-word detection model on the DSP, a low-power processor that could listen continuously without draining the battery. When it heard "Alexa," it triggered an interrupt, woke the main application processor, and sent an IPC signal to the second app: the actual Alexa client.\n\nThe Alexa client then took over. It captured the audio stream from the chipset app, packaged it, and sent it to AVS (Alexa Voice Service) in the cloud for speech recognition and response. The audio handoff between the two apps was the hardest part. You had a circular buffer on the chipset side that needed to include a few hundred milliseconds of audio before the wake word, so the recognition model would not clip the beginning of what the user said. The timing had to be precise. Too slow and you lost the first word. Too aggressive and you sent garbage audio upstream.',
      },
      {
        heading: 'The hard decisions',
        body: 'We had to choose between two IPC mechanisms: AIDL (Android Interface Definition Language) and a custom socket-based protocol the chipset team had already built. AIDL was cleaner and better supported by Android, but it added latency on the audio path that we could not afford. The custom protocol was faster but fragile, undocumented, and maintained by a team in a different timezone. I chose the custom protocol for the audio stream and AIDL for the control signals. It was messy but it worked.\n\nThe other hard call was how to handle network quality. India has patchy mobile connectivity, and streaming audio to AVS in real time requires a stable connection. We built a local buffering layer that could hold up to four seconds of audio and replay it when the connection recovered. It was not elegant. It shipped.',
      },
      {
        heading: 'Coordination',
        body: 'This was a three-party integration: Amazon (us), the chipset vendor, and the OEM. Each had their own release cycle, their own QA process, their own definition of "ready." I ran weekly syncs across all three, maintained a shared bug tracker, and built a compatibility test suite that could run on any device in under ten minutes. The test suite is what made the program scale from one device to twelve.',
      },
      {
        heading: 'The result',
        body: 'We shipped the first hands-free Alexa experience on Android in India. It reached 5M+ customers in under a year. The wake-word detection ran at under 2% battery drain per hour. The audio handoff latency was under 200ms. The program expanded to twelve device partners across India and Southeast Asia. It was the first time I built something that millions of people used without knowing my name, which is a specific feeling that I did not expect.',
      },
    ],
  },
  {
    slug: 'voice-assistant-outlook',
    title: 'Voice Assistant in Outlook',
    subtitle: 'Building one of the first production LLM features inside Microsoft 365',
    image: '/img/semantic-machines.png',
    role: 'Principal Software Engineering Manager',
    company: 'Microsoft',
    year: '2020 - 2022',
    impact: 'Foundation for M365 Copilot',
    sections: [
      {
        heading: 'The problem',
        body: 'Microsoft acquired Semantic Machines in 2019, a Berkeley-based startup that had built a conversational AI engine capable of multi-turn dialogue. The technology was impressive in research demos. The question was whether it could work inside a production app used by hundreds of millions of people. My team was asked to build that integration: a voice assistant inside Outlook that could compose emails, search calendars, and navigate the inbox through natural language.',
      },
      {
        heading: 'What we built',
        body: 'The assistant was a voice-first interface embedded in Outlook mobile. You could say "schedule a meeting with Jim tomorrow at 2" and it would find Jim in your contacts, check both calendars, create the invite, and ask you to confirm. You could say "read my latest email from the product team" and it would find it, read the subject and first paragraph, and ask if you wanted to reply.\n\nUnder the hood, the Semantic Machines engine parsed the utterance into a structured intent, resolved entities against Microsoft Graph (contacts, calendar, mail), executed the action through Outlook APIs, and generated a natural language response. The multi-turn capability meant it could remember context: "move it to 3 instead" worked without re-specifying the meeting.',
      },
      {
        heading: 'The hard part',
        body: 'Latency. The language model was large and slow. A round trip from utterance to response took 3-4 seconds in early builds, which made the experience feel broken. Voice interfaces have a tolerance window of about 1.5 seconds before people assume it did not work and try again. We spent two months optimizing the pipeline: caching entity resolution, pre-loading user context at session start, and moving parts of the intent parsing to a smaller on-device model.\n\nThe other challenge was error handling. When a language model gets it wrong, it gets it wrong confidently. If you said "send the report to Sarah" and there were three Sarahs in your contacts, the model would sometimes pick one without asking. We built a disambiguation layer that forced clarification when confidence was below a threshold, which made the experience slower but significantly more trustworthy.',
      },
      {
        heading: 'What it became',
        body: 'The voice assistant shipped as a feature in Outlook mobile and was used by early adopters inside Microsoft before a broader rollout. More importantly, the integration patterns we built, the Graph entity resolution, the multi-turn context management, the response generation pipeline, became the foundation for what is now M365 Copilot. When the company decided to go all-in on AI in late 2022, the infrastructure was already there because we had built it two years earlier for a voice assistant that most people never heard of.',
      },
    ],
  },
  {
    slug: 'm365-copilot',
    title: 'Microsoft 365 Copilot',
    subtitle: 'Shipping AI chat experiences across Outlook, Teams, and Office',
    image: '/img/m365-copilot.png',
    role: 'Principal Software Engineering Manager',
    company: 'Microsoft',
    year: '2022 - Present',
    impact: 'Enterprise platform, 400M+ seats',
    sections: [
      {
        heading: 'The context',
        body: 'In late 2022, the world saw what large language models could do. Inside Microsoft, we had been circling this for two years. The voice assistant work, the Semantic Machines integration, the Graph APIs, all of it had been building toward something we could not quite name until the company named it: Copilot.\n\nThe shift was fast. Roadmaps changed. Features that had been deprioritized suddenly had executive sponsors. The thing we had been building in relative quiet became the name on the keynote. My team was asked to ship Copilot chat experiences across Outlook, Teams, and Office.',
      },
      {
        heading: 'What my team builds',
        body: 'We own the Copilot chat surface in M365 apps. When a user opens Copilot in Outlook and asks "summarize my unread emails" or "draft a reply to the budget thread," that interaction flows through our code. The chat UI, the message rendering, the streaming response display, the session management, the navigation between conversations, all of it.\n\nThe current focus areas are navigation pane improvements (making it easier to find and resume past Copilot conversations), session retrieval (loading conversation history reliably across devices), and session search (letting users search through their past Copilot interactions the same way they search email).',
      },
      {
        heading: 'The scale challenge',
        body: 'M365 Copilot sits on a platform with 400M+ seats. Enterprise customers have compliance requirements, accessibility standards, localization needs, and IT admin controls that consumer products do not. Every feature ships behind a feature flag, goes through a ring-based rollout (internal, then early adopters, then broad), and must work in sovereign clouds with data residency constraints.\n\nPerformance matters differently at this scale. A 200ms regression in chat load time generates thousands of support tickets. A rendering bug in RTL languages affects entire regions. We measure everything: time to first token, message render latency, session restore time, interaction success rate.',
      },
      {
        heading: 'What I do',
        body: 'I set the technical direction, run the team, and work across the organization to unblock the work. That means I am in architecture reviews on Monday, sprint planning on Tuesday, a partner team sync on Wednesday, a customer escalation on Thursday, and a hiring debrief on Friday. The job is context-switching at a pace that would have overwhelmed me five years ago.\n\nThe part I find most interesting is the gap between what the model can do and what the product should do. The model can generate a five-paragraph email in two seconds. The question is whether it should, or whether a three-sentence draft with the right tone is more useful. Those product decisions, the ones where the technology is not the constraint but the judgment is, are where I spend most of my thinking time.',
      },
    ],
  },
];
