import { useState } from "react";
import QRCode from "qrcode";

const GenerateQrCode = () => {
  const [link, setLink] = useState("");
  const [qrColor, setQrColor] = useState("#111827");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logo, setLogo] = useState("");
  const [qrCodes, setQrCodes] = useState([]);

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const generateQR = async () => {
    if (!link.trim()) return;

    try {
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, link.trim(), {
        width: 500,
        margin: 4,
        errorCorrectionLevel: "H",
        color: {
          dark: qrColor,
          light: backgroundColor,
        },
      });

      if (logo) {
        const logoImage = new Image();
        await new Promise((resolve, reject) => {
          logoImage.onload = resolve;
          logoImage.onerror = reject;
          logoImage.src = logo;
        });

        const context = canvas.getContext("2d");
        const logoSize = canvas.width * 0.22;
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;
        const padding = logoSize * 0.12;

        context.fillStyle = backgroundColor;
        context.fillRect(
          logoX - padding,
          logoY - padding,
          logoSize + padding * 2,
          logoSize + padding * 2,
        );
        context.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
      }

      const qrDataUrl = canvas.toDataURL("image/png");
      setQrCodes((currentQrCodes) => [
        ...currentQrCodes,
        { link: link.trim(), qrDataUrl },
      ]);
      setLink("");
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 p-4">
      <div className="flex w-full max-w-xl flex-col gap-4 rounded-lg border p-4">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter a URL, text, or phone number"
          className="border p-2 rounded w-64"
        />
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            QR color
            <input
              type="color"
              value={qrColor}
              onChange={(event) => setQrColor(event.target.value)}
              aria-label="QR code color"
            />
          </label>
          <label className="flex items-center gap-2">
            Background
            <input
              type="color"
              value={backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)}
              aria-label="QR code background color"
            />
          </label>
          <label className="cursor-pointer rounded border px-3 py-2">
            Add image
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="sr-only"
            />
          </label>
          {logo && (
            <button type="button" onClick={() => setLogo("")} className="text-sm underline">
              Remove image
            </button>
          )}
        </div>
        <button
          onClick={generateQR}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Generate
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {qrCodes.map((qr, index) => (
          <div key={index} className="flex flex-col items-center border p-4 rounded-lg">
            <img src={qr.qrDataUrl} alt={`QR Code ${index + 1}`} className="h-40 w-40" />
            <a
              href={qr.qrDataUrl}
              download={`qrcode-${index}.png`}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GenerateQrCode;