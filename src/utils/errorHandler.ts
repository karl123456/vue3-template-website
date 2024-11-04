const errors = new Set();
export const errorHandler = (error: Error) => {
  // 减少重复错误消息提醒
  const text = error.message;
  if (text && !errors.has(text)) {
    errors.add(text);
    console.error(text);
    setTimeout(() => {
      errors.delete(text);
    }, 3000);
  }
};
