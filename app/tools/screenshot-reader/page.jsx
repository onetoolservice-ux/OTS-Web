      const langMap = {
            eng: "eng",
              hin: "hin",
                mar: "mar",
                  tam: "tam",
                    tel: "tel",
                      kan: "kan",
                        ben: "ben",
                          guj: "guj",




                    };

                    const loadHistoryItem = (item) => {
                      setText(item.text || "");
                    };

                const copyToClipboard = async () => {
                      await navigator.clipboard.writeText(text || "");
                        alert("Copied");
                };

                const downloadTxt = () => {
                      const blob = new Blob([text], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                            a.href = url;
                              a.download = "extracted.txt";
                                a.click();
                                  URL.revokeObjectURL(url);
                };

                const cleanText = (raw) => {
                      let t = raw.replace(/\r/g, "").replace(/\n{2,}/g, "\n").trim();
                        t = t.replace(/[ \t]{2,}/g, " ");
                          t = t.replace(/\.([A-Za-z])/g, ". $1");
                            return t;
                };

                const preprocessImage = async (threshold = 0) => {
                      if (!imageURL) return null;
                        const img = new Image();
                          img.crossOrigin = "anonymous";
                            img.src = imageURL;

                              await new Promise((res, rej) => {
                                    img.onload = res;
                                        img.onerror = rej;
                              });

                                const canvas = canvasRef.current || document.createElement("canvas");
                                  canvas.width = img.naturalWidth;
                                    canvas.height = img.naturalHeight;

                                      const ctx = canvas.getContext("2d");
                                        ctx.drawImage(img, 0, 0);

                                          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                            const data = imageData.data;

                                              for (let i = 0; i < data.length; i += 4) {
                                                    const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
                                                        const g = threshold > 0 ? (gray > threshold ? 255 : 0) : gray;
                                                            data[i] = data[i+1] = data[i+2] = g;
                                              }

                                                ctx.putImageData(imageData, 0, 0);


                                                    return canvas.toDataURL("image/png");
                                          };

                                          const runOCR = async (opts = { threshold: 0, clean: true }) => {
                                              if (!imageURL) return alert("Select an image first.");
                                              setWorking(true);
                                                setText("");
                                                setProgress(0);

                                                  try {
                                                    const { createWorker } = await import("tesseract.js");

                                                      const worker = createWorker({
                                                            logger: (m) => m.progress && setProgress(Math.round(m.progress * 100)),
                                                      });

                                                        await worker.load();
                                                          const lang = langMap[language] || "eng";
                                                            await worker.loadLanguage(lang);
                                                              await worker.initialize(lang);

                                                                const processed = await preprocessImage(opts.threshold);
                                                                  const { data } = await worker.recognize(processed);
                                                                    let extracted = data.text || "";

                                                                      if (opts.clean) extracted = cleanText(extracted);

                                                                        setText(extracted);

                                                                          setHistory((h) => [
                                                                                { id: Date.now(), text: extracted, date: new Date().toISOString() },
                                                                                  ...h,
                                                                          ]);

                                                                            await worker.terminate();
                                                                              setProgress(100);
                                                  } catch (err) {
                                                    setText("OCR failed: " + err.message);
                                                  } finally {
                                                    setWorking(false);
                                                  }
                                          };
export default function ScreenshotReaderPage() {
  "use client";

"use client";
import { useState } from "react";
import { useRef, useEffect } from "react";

export default function ScreenshotReader() {
  const [imageURL, setImageURL] = useState(null);
  const [text, setText] = useState("");
  const [working, setWorking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("eng");
  const [history, setHistory] = useState([]);
  const fileRef = useRef(null);
  const canvasRef = useRef(null);

  const HISTORY_KEY = "OTS_OCR_HISTORY_V1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
          if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);
      const [working, setWorking] = useState(false);
    const [progress, setProgress] = useState(0);
      const [language, setLanguage] = useState("eng");

        const handleFile = (e) => {
        const file = e.target.files?.[0];
            if (!file) return;
            setImageURL(URL.createObjectURL(file));
            setText("");
                setProgress(0);
        };

      const handleDrop = (e) => {
        e.preventDefault();
            const file = e.dataTransfer?.files?.[0];
            if (!file) return;
            setImageURL(URL.createObjectURL(file));
                setText("");
                setProgress(0);
      };

        const handleDragOver = (e) => e.preventDefault();

          return (
            <div className="p-6 max-w-5xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold">OCR Pro — Screenshot to Text</h1>
                <p className="text-gray-600">
                Upload, paste, or drag images. Extract text using AI-enhanced OCR.
                  </p>

                    {/* Upload + Drop Zone */}
                      <div
                          onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              className="border-2 border-dashed rounded-lg p-6 bg-white flex flex-col items-center gap-3 text-center"
                                >
                                    <input
                                      type="file"
                                            accept="image/*,application/pdf"
                                              onChange={handleFile}
                                                className="mb-2"
                                                    />
                                                        <p className="text-gray-500">
                                                          Drag & Drop screenshot or PDF here
                                                              </p>
                                                                </div>

                                                                  {/* Image Preview */}
                                                                    <div className="border rounded p-4 bg-white h-72 flex items-center justify-center">
                                                                    {imageURL ? (
                                                                          <img src={imageURL} className="max-h-64 object-contain" />
                                                                    ) : (
                                                                          <span className="text-gray-400">No image selected</span>
                                                                    )}
                                                                      </div>

                                                                        {/* Controls */}
                                                                          <div className="flex gap-3 items-center">
                                                                              <select
                                                                                value={language}
                                                                                      onChange={(e) => setLanguage(e.target.value)}
                                                                                        className="border p-2 rounded"
                                                                                            >
                                                                                              <option value="eng">English</option>
                                                                                                <option value="hin">Hindi</option>
                                                                                                      <option value="ben">Bengali</option>
                                                                                                        <option value="guj">Gujarati</option>
                                                                                                          <option value="tam">Tamil</option>
                                                                                                                <option value="tel">Telugu</option>
                                                                                                                  <option value="kan">Kannada</option>
                                                                                                                    <option value="mar">Marathi</option>
                                                                                                                        </select>

                                                                                                                            <button
                                                                                                                              className="px-4 py-2 bg-blue-600 text-white rounded"
                                                                                                                                disabled={working}
                                                                                                                                    >
                                                                                                                                      Start OCR (Next chunk will add logic)
                                                                                                                                          </button>
                                                                                                                                            </div>

                                                                                                                                              <div className="text-sm text-gray-500">Progress: {progress}%</div>

                                                                                                                                                {/* Output */}
                                                                                                                                                  <textarea
                                                                                                                                                      value={text}
                                                                                                                                                      onChange={(e) => setText(e.target.value)}
                                                                                                                                                          rows={10}
                                                                                                                                                              className="w-full border p-3 bg-white text-black rounded"
                                                                                                                                                                />
                                                                                                                                                                </div>
          );
}
                            ) : (
                                  <span className="text-gray-400">No image selected</span>
                            )}
                              </div>
                              </div>
      );
}
