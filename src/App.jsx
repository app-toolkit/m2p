/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import "markdown-to-poster/dist/style.css";
import {
  Md2Poster,
  Md2PosterContent,
  Md2PosterHeader,
  Md2PosterFooter,
} from "markdown-to-poster";

import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState(
    `# Markdown Poster

> \`Markdown Poster\` is a tool that allows you to create elegant graphic posters using Markdown. 🌟

![](https://picsum.photos/600/300)

## Main features:

1. Convert Markdown to **graphic posters**
2. **Customize** text themes, backgrounds, and font sizes
3. Copy images to \`clipboard\` or \`download as PNG images\`
4. What you see is what you get
5. Free
6. Supports API calls, just register to get a free token.

## You can use it for:

1. Creating *briefings*
2. Creating *social media share images*
3. Creating *article posters*
4. Anything you want...
---
    `
  );

  const [theme, setTheme] = useState("SpringGradientWave");
  const [sizeType, setSizeType] = useState("desktop");
  const [ratioType, setRatioType] = useState("auto");
  const [loading, setLoading] = useState(false);
  const posterRef = useRef(null);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleSelectChange = (event) => {
    setTheme(event.target.value);
  };

  const handleSizeTypeChange = (event) => {
    setSizeType(event.target.value);
  };

  const handleRatioTypeChange = (event) => {
    setRatioType(event.target.value);
  };

  const downloadImageFromBlob = (blob, filename) => {
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const blob = await posterRef.current.handleCopy();
      downloadImageFromBlob(blob, "output.png");
    } catch (error) {
      console.error("handleCopy 出错:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gradient-to-r from-indigo-400 to-cyan-400  py-8 space-y-6"
      style={{ height: "100vh" }}
    >
      <Loading show={loading} />
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Markdown To Poster
      </h1>

      <div className="w-4/5 h-[90vh] flex border bg-white shadow-lg mx-auto">
        <div className="w-1/2 p-4 border-r">
          <div className="flex items-center justify-end space-x-4 p-4">
            <select
              className="border border-gray-300 rounded p-2"
              onChange={handleSelectChange}
              value={theme}
            >
              <option value="SpringGradientWave">SpringGradientWave</option>
              <option value="blue">blue</option>
              <option value="pink">pink</option>
              <option value="purple">purple</option>
              <option value="green">green</option>
              <option value="yellow">yellow</option>
              <option value="gray">gray</option>
              <option value="red">red</option>
              <option value="indigo">indigo</option>
            </select>
            <select
              className="border border-gray-300 rounded p-2"
              onChange={handleSizeTypeChange}
              value={sizeType}
            >
              <option value="desktop">desktop</option>
              <option value="mobile">mobile</option>
            </select>
            <select
              className="border border-gray-300 rounded p-2"
              onChange={handleRatioTypeChange}
              value={ratioType}
            >
              <option value="auto">auto</option>
              <option value="16/9">16/9</option>
              <option value="1/1">1/1</option>
              <option value="4/3">4/3</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleButtonClick}
            >
              Download
            </button>
          </div>
          <textarea
            className="w-full h-[80vh] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your Docker commands here..."
            id="dockerInput"
            value={markdown}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-lg font-semibold mb-4">Poster Preview</h2>

          <div
            id="preview"
            className="w-full h-[80vh] p-2 border rounded bg-gray-100 overflow-auto"
          >
            <Md2Poster
              className="!max-w-none"
              theme={theme}
              ref={posterRef}
              size={sizeType}
              aspectRatio={ratioType}
            >
              <Md2PosterHeader></Md2PosterHeader>
              <Md2PosterContent>{markdown}</Md2PosterContent>
              <Md2PosterFooter>Powered by toolkit.trumandu.top</Md2PosterFooter>
            </Md2Poster>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
