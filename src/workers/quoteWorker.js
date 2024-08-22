onmessage = async (e) => {
  const { url, key } = e.data;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": key,
      },
    });

    if (!response.ok) {
      postMessage({ error: response.status });
      throw new Error(`Response status: ${response.status}`);
    }

    const quote = await response.json();
    postMessage(quote);
  } catch (error) {
    postMessage({ error });
    throw new Error(`Error happened. ${error}`);
  }
};
