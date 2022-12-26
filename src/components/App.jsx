import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Box } from './Box/Box';

export const App = () => {
  const [good, setGoodFeedback] = useState(0);
  const [neutral, setNeutralFeedback] = useState(0);
  const [bad, setBadFeedback] = useState(0);

  const onCountFeedback = e => {
    const typeFeedback = e.target.textContent.toLowerCase();
    switch (typeFeedback) {
      case "good":
        setGoodFeedback(prevState => prevState + 1);
        break;
      case "neutral":
        setNeutralFeedback(prevState => prevState + 1);
        break;
      case "bad":
        setBadFeedback(prevState => prevState + 1);
        break;     
      default:
        break;
    };
  };

  const countTotalFeedback = () => {
    let total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = total => {
    if (total !== 0) return Math.floor((good / total) * 100);
    return 0;
  };

  const countTotal = countTotalFeedback();
  const percentPositiveFeedback = countPositiveFeedbackPercentage(countTotal);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={onCountFeedback}
        />
      </Section>
      {countTotal !== 0 ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotal}
            positivePercentage={percentPositiveFeedback}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Box>
  );
}
