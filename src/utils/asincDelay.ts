export const getDelay = async (delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};
