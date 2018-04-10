import React, { Component } from 'react';

import {
  ResultPageFlex,
  MainViewContainer,
  BadgeContainer,
  BadgeHeading,
  BadgeDesc,
  PlotSvg,
  PlotContainer,
  PlotBox,
  PlotDesc,
  FeatureIcon,
  MessageTop,
  XLabel,
  AutoMarginWrapper,
  FlexContainer,
  QuestionBottom
} from '../components/StyledComponents';

import { randomNormal as rnorm, randomUniform as runif } from 'd3-random';

import ResultPlot from '../components/ResultPlot';

const makeSamples = (n = 500) => {
  let samples = [];
  // let gen = rnorm(runif(30,70)(),runif(1,10)())
  const gen = rnorm(runif(30, 70)(), runif(20, 40)());
  for (let i = 0; i < n; i++) {
    samples.push(Math.max(8, Math.min(90, gen())));
  }

  return samples;
};

const descDict = {
  age: 'Average Age',
  dependents: 'saving people with more dependents',
  drinking: 'frequent drinkers',
  exercising: 'people who exercise more',
  health: 'Health Issues',
  random: 'Proportion of Coinflips'
};

const xLabs = {
  age: ['younger', 'older'],
  dependents: ['not important', 'important'],
  drinking: ['less deserving', 'more deserving'],
  exercising: ['less deserving', 'more deserving'],
  health: ['prefer less issues', 'prefer more issues'],
  random: ['low', 'high']
};

const Plot = ({ id, you, x1, x2, yt, yb }) => (
  <PlotBox w={x2 - x1} h={yt - yb}>
    <PlotDesc key={id + 'Desc'}>{descDict[id]}</PlotDesc>
    <PlotSvg w={x2 - x1} h={yt - yb}>
      <ResultPlot
        xStart={x1}
        xEnd={x2}
        yTop={yt}
        yBottom={yb}
        drawn={makeSamples()}
        you={you}
        xlab={xLabs[id]}
      />
    </PlotSvg>
    {/* <XLabel>{}</XLabel> */}
  </PlotBox>
);

export default ({ features, labels, randomChoices }) => {
  const n = randomChoices.length;
  const data = features.reduce((arr, d, i) => {
    const temp = [0, 1].map(j => {
      d[j].label = labels[i][j];
      d[j].trial = i;
      d[j].random = randomChoices[i];
      return d[j];
    });
    return arr.concat(temp);
  }, []);
  const total = data.length;
  console.log(data);

  const stats = data.reduce(
    (obj, d, i) => {
      if (d.label === 1) {
        obj.age += d.age;
        ['dependents', 'drinking', 'exercising', 'health'].forEach(fe => {
          const t = d.trial;
          const selected = 1 - labels[t][0];
          obj[fe] += features[t][selected][fe] > features[t][1 - selected][fe];
        });
      }
      return obj;
    },
    {
      age: 0,
      dependents: 0,
      drinking: 0,
      exercising: 0,
      health: 0
    }
  );

  stats.age = stats.age / n;

  ['dependents', 'drinking', 'exercising', 'health'].forEach(d => {
    stats[d] = stats[d] / n * 100;
  });
  stats['random'] = randomChoices.reduce((count, d) => count + d, 0) / n * 100;

  return (
    <FlexContainer>
      <AutoMarginWrapper style={{ maxWidth: 1000 }}>
        <QuestionBottom>Results</QuestionBottom>
        <MessageTop style={{ textAlign: 'center', marginBottom: 50 }}>
          ABOUT YOU..
        </MessageTop>
        <ResultPageFlex>
          {/* {badges.map(obj=>(<Badge data={obj} key = {obj.id+"badge"}/>))} */}
        </ResultPageFlex>
        <MessageTop style={{ textAlign: 'center', marginBottom: 50 }}>
          YOU VS EVERYONE ELSE
        </MessageTop>
        <PlotContainer>
          {Object.keys(stats).map(d => (
            <Plot
              key={d + 'Plot'}
              id={d}
              you={stats[d]}
              x1={0}
              x2={300}
              yt={0}
              yb={100}
            />
          ))}
        </PlotContainer>
      </AutoMarginWrapper>
    </FlexContainer>
  );
};
