import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroBadge}>Curso em português · Produção real</div>
        <Heading as="h1" className={styles.heroTitle}>
          De engenheiro de software<br />a engenheiro de IA
        </Heading>
        <p className={styles.heroSubtitle}>
          20 módulos progressivos cobrindo LLMs, backend com FastAPI, frontend em React
          e operação em produção — do fundamento ao LLMOps.
        </p>
        <div className={styles.heroButtons}>
          <Link className={clsx('button button--lg', styles.btnPrimary)} to="/docs/intro">
            Começar o curso →
          </Link>
          <Link className={clsx('button button--lg', styles.btnSecondary)} to="/docs/backend/08-fastapi-ai-backend/">
            Ver módulos
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsBar() {
  const stats = [
    {value: '20', label: 'módulos'},
    {value: '3', label: 'trilhas'},
    {value: 'GPT-4o', label: 'modelo principal'},
    {value: 'prod-ready', label: 'padrões reais'},
  ];
  return (
    <div className={styles.statsBar}>
      {stats.map((s) => (
        <div key={s.label} className={styles.statItem}>
          <span className={styles.statValue}>{s.value}</span>
          <span className={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const TRACKS = [
  {
    emoji: '🧠',
    title: 'Núcleo',
    subtitle: 'Módulos 01–07',
    description:
      'Fundamentos de IA, integração com LLMs, engenharia de prompts, RAG, avaliação, segurança e arquitetura de sistemas.',
    items: [
      'AI Fundamentals',
      'LLM API Integration',
      'Prompt Engineering',
      'Embeddings & RAG',
      'LLM Evaluation',
      'AI Safety & Governance',
      'AI Architecture',
    ],
    href: '/docs/intro',
    accent: 'core' as const,
  },
  {
    emoji: '⚙️',
    title: 'Backend',
    subtitle: 'Módulos 08–16',
    description:
      'FastAPI, contexto e memória, tool calling, persistência, filas async, cache Redis, observabilidade e LLMOps.',
    items: [
      'FastAPI AI Backend',
      'Context & Memory',
      'Tool Calling',
      'Persistence & Context',
      'Pub/Sub Async',
      'Redis Performance',
      'OTel + Datadog',
      'LLMOps Lifecycle',
      'Operational Security',
    ],
    href: '/docs/backend/08-fastapi-ai-backend/',
    accent: 'backend' as const,
  },
  {
    emoji: '🖥️',
    title: 'Frontend',
    subtitle: 'Módulos 17–20',
    description:
      'React com IA, UX de qualidade, integração via SSE e polling, e telemetria orientada à experiência do usuário.',
    items: [
      'React AI Frontend',
      'AI UX Quality',
      'Frontend Integration',
      'Experience Telemetry',
    ],
    href: '/docs/frontend/17-react-ai-frontend/',
    accent: 'frontend' as const,
  },
];

function TracksSection() {
  return (
    <section className={styles.tracksSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Três trilhas, uma stack completa
        </Heading>
        <p className={styles.sectionSubtitle}>
          Do conceito ao deploy — em Python, FastAPI e React.
        </p>
        <div className={styles.tracksGrid}>
          {TRACKS.map((track) => (
            <Link
              key={track.title}
              to={track.href}
              className={clsx(styles.trackCard, styles[`track_${track.accent}`])}>
              <div className={styles.trackEmoji}>{track.emoji}</div>
              <div className={styles.trackMeta}>
                <span className={styles.trackSubtitle}>{track.subtitle}</span>
                <Heading as="h3" className={styles.trackTitle}>
                  {track.title}
                </Heading>
              </div>
              <p className={styles.trackDescription}>{track.description}</p>
              <ul className={styles.trackList}>
                {track.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className={styles.trackCta}>Ver trilha →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const STACK = [
  'Python 3.11+', 'FastAPI', 'Pydantic v2', 'OpenAI GPT-4o',
  'pgvector', 'Redis', 'OpenTelemetry', 'Datadog',
  'GCP Pub/Sub', 'React', 'TypeScript', 'SSE',
];

function StackSection() {
  return (
    <section className={styles.stackSection}>
      <div className="container">
        <p className={styles.stackLabel}>Stack do curso</p>
        <div className={styles.stackGrid}>
          {STACK.map((tech) => (
            <span key={tech} className={styles.stackBadge}>{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI Engineering Course"
      description="20 módulos cobrindo LLMs, FastAPI, React e operação em produção. Do fundamento ao LLMOps.">
      <Hero />
      <StatsBar />
      <TracksSection />
      <StackSection />
    </Layout>
  );
}
