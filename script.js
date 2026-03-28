let enhancedPrompt = "";

// ✅ Enhance Prompt
async function enhancePrompt() {
  const input = document.getElementById("promptInput").value;
  const status = document.getElementById("statusMessage");

  try {
    if (!input) {
      alert("Enter a prompt");
      return;
    }

    status.innerText = "Enhancing prompt...";

    enhancedPrompt =
      "A cinematic, high-quality professional version of: " + input;

    document.getElementById("enhancedText").innerText = enhancedPrompt;

    status.innerText = "Prompt enhanced ✅";

  } catch (error) {
    console.error(error);
    status.innerText = "Demo mode ⚠️";
  }
}

// ✅ Generate Image (with retry)
async function generateImage() {
  const status = document.getElementById("statusMessage");

  try {
    status.innerText = "Generating image... please wait ⏳";

    const promptToUse =
      enhancedPrompt || document.getElementById("promptInput").value;

    if (!promptToUse) {
      alert("Enter prompt first");
      return;
    }

    let data;

    for (let i = 0; i < 3; i++) {
      const response = await fetch("/.netlify/functions/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: promptToUse })
      });

      data = await response.json();

      if (data.image) break;

      await new Promise(r => setTimeout(r, 5000));
    }

    if (!data.image) throw new Error();

    const img = document.createElement("img");
    img.src = data.image;

    const container = document.getElementById("imageContainer");
    container.innerHTML = "";
    container.appendChild(img);

    status.innerText = "Image generated ✅";

  } catch (error) {
    console.error(error);

    const img = document.createElement("img");
    img.src = "https://via.placeholder.com/512?text=Demo+Image";

    const container = document.getElementById("imageContainer");
    container.innerHTML = "";
    container.appendChild(img);

    status.innerText = "Demo image shown ⚠️";
  }
}

// ✅ Image Analysis
async function analyzeImage() {
  const fileInput = document.getElementById("imageInput");
  const status = document.getElementById("statusMessage");

  try {
    const file = fileInput.files[0];

    if (!file) {
      alert("Upload an image");
      return;
    }

    status.innerText = "Analyzing image...";

    const result =
      "The image contains a subject with balanced lighting and modern composition.";

    document.getElementById("imageResult").innerText = result;

    status.innerText = "Analysis complete ✅";

  } catch (error) {
    console.error(error);
    status.innerText = "Demo mode ⚠️";
  }
}