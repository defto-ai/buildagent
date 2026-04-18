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
      <div className="container">
        <div className={styles.sprintBadge}>Day 1 → Day 30 · Sprint 进行中</div>
        <Heading as="h1" className={clsx('hero__title', styles.sprintTitle)}>
          坤海 · AI Coding Agent 研究
        </Heading>
        <p className={clsx('hero__subtitle', styles.sprintSubtitle)}>
          30 天 sprint 中。
          <br />
          每天在 X 上拆一个 Claude Code / Codex / Cursor 的反直觉源码细节。
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="https://x.com/KunhaiY">
            → 关注我的 X：@KunhaiY
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
