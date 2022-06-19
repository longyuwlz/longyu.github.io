import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '技术博客',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
		用文字来记录技术成长的过程，站在过去的努力之上。
      </>
    ),
  },
  {
    title: '随笔',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
		所谓的想写什么就写什么，就是随笔啦~
      </>
    ),
  },
  {
    title: '阅读',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        读书笔记
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
