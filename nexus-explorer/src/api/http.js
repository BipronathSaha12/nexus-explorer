export const get = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
       throw new Error('There is nothing here');
    }
    throw new Error('Network response was not ok');
  }
  return response.json();
};
