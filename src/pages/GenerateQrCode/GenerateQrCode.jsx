import { useState } from "react";
import QRCode from "qrcode";

const GenerateQrCode = () => {
  const [link, setLink] = useState("");
  const [qrCodes, setQrCodes] = useState([]);

  const generateQR = async () => {
    if (!link.trim()) return;
    try {
      const qrDataUrl = await QRCode.toDataURL(link, { width: 300, height: 300 });
      setQrCodes([...qrCodes, { link, qrDataUrl }]);
      setLink(""); //Clear field after creation
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <main className="flex flex-col items-center p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter your link"
          className="border p-2 rounded w-64"
        />
        <button
          onClick={generateQR}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate ➡
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        {qrCodes.map((qr, index) => (
          <div key={index} className="flex flex-col items-center border p-4 rounded-lg">
            <img src={qr.qrDataUrl} alt={`QR Code ${index}`} className="w-40 h-40" />
            <a
              href={qr.qrDataUrl}
              download={`qrcode-${index}.png`}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Download ⬇
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GenerateQrCode;