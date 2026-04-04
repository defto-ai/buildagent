import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '对比学习',
    icon: '🔍',
    description: (
      <>
        通过对比 Claude Code (TypeScript) 和 Codex (Rust) 两个 50 万行生产级项目，
        理解设计权衡，学习最佳实践。
      </>
    ),
  },
  {
    title: '15 个设计模式',
    icon: '📐',
    description: (
      <>
        提炼可复用的工程模式：多轮循环、工具调度、自动压缩、权限系统、成本控制等，
        直接应用到你的项目中。
      </>
    ),
  },
  {
    title: '完整代码示例',
    icon: '💻',
    description: (
      <>
        从最小可用 Agent (100 行) 到生产级实现，提供 TypeScript、Rust、Python 三种语言的完整示例。
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
