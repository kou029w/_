export default ({ activity }) => {
  const leftActivity = activity.filter(a => a.ch === "l"),
    rightActivity = activity.filter(a => a.ch === "r");
  const [l, r] = [leftActivity, rightActivity].map(activity => {
    return activity
      .map(a => a.endTime - a.startTime)
      .reduce((a, c) => a + c, 0);
  });
  const sum = l + r;

  return (
    <dl>
      <dt>会話時間 (ms)</dt>
      <dd>{sum}</dd>
      <dt>会話の割合</dt>
      <dd>
        左 <meter value={l / sum}>{l / sum}</meter> 右
      </dd>
    </dl>
  );
};
