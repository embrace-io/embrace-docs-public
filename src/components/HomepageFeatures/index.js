import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Android',
    Svg: require('@site/static/images/android.svg').default,
    description: (<>Add Embrace to your Android project.</>),
    link: 'android/',
  },
  {
    title: 'iOS',
    Svg: require('@site/static/images/ios.svg').default,
    description: (<>Add Embrace to your iOS project.</>),
    link: 'ios/',
  },
  {
    title: 'React Native',
    Svg: require('@site/static/images/react-native.svg').default,
    description: (<>Add Embrace to your React Native project.</>),
    link: 'react-native/',
  },
  {
    title: 'Unity',
    Svg: require('@site/static/images/unity.svg').default,
    description: (<>Add Embrace to your Unity project.</>),
    link: 'unity/',
  },
  {
    title: 'Flutter',
    Svg: require('@site/static/images/flutter.svg').default,
    description: (<>Add Embrace to your Flutter project.</>),
    link: 'flutter/',
  },
  {
    title: 'API',
    Svg: require('@site/static/images/api.svg').default,
    description: (<>Build custom integrations with Embrace API.</>),
    link: 'embrace-api/',
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}><Svg className={styles.featureSvg} role="img" /></a>
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