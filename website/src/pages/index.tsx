import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function SprintHero() {
  return (
    <header className={clsx('hero', styles.heroBanner, styles.sprintHero)}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={clsx('container', styles.sprintContainer)}>
        <div className={styles.sprintBadge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          <span>Day 1 → Day 30 · Sprint 进行中</span>
        </div>

        <Heading as="h1" className={clsx('hero__title', styles.sprintTitle)}>
          <span className={styles.titleAccent}>坤海</span>
          <span className={styles.titleDivider}>·</span>
          <span>AI Coding Agent 研究</span>
        </Heading>

        <p className={clsx('hero__subtitle', styles.sprintSubtitle)}>
          30 天 sprint 中。每天在 X 上拆一个{' '}
          <code className={styles.kw}>Claude Code</code> /{' '}
          <code className={styles.kw}>Codex</code> /{' '}
          <code className={styles.kw}>Cursor</code> 的反直觉源码细节。
        </p>

        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.ctaPrimary)}
            to="https://x.com/KunhaiY">
            <span className={styles.ctaIcon} aria-hidden="true" />
            关注我的 X · @KunhaiY
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.ctaSecondary)}
            to="https://github.com/defto-ai/buildagent">
            GitHub
          </Link>
        </div>

        <p className={styles.sprintNote}>（Day 30 后这里会有更多内容）</p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} · 坤海 · AI Coding Agent 研究`}
      description="坤海 · AI Coding Agent 研究 · 30 天 sprint：每天在 X 上拆一个 Claude Code / Codex / Cursor 的反直觉源码细节。">
      <SprintHero />
      {/*
        Sprint 期间首页内容暂时隐藏，Day 30 后恢复。
        <main>
          <HomepageFeatures />
        </main>
      */}
    </Layout>
  );
}
