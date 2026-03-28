export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.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}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(errorText);
      throw new Error("API failed");
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: `data:image/png;base64,${base64}`
      })
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Image generation failed"
      })
    };
  }
}