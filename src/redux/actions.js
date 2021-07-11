export const likeMuffin = (muffinId) => ({
  type: "muffins/like",
  payload: { id: muffinId },
});
