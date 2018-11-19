export default ({ activity }) => {
  const count = activity.length;
  const time = activity
    .map(a => a.endTime - a.startTime)
    .reduce((a, c) => a + c, 0);

  return (
    <dl>
      <dt>かぶり回数</dt>
      <dd>{count}</dd>
      <dt>かぶり時間 (ms)</dt>
      <dd>{time}</dd>
    </dl>
  );
};
