import React, { useState } from "react";
import API from "../api/api";

export default function FileAttachment() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = res.data; // { message, fileUrl, name, size, mimetype }

      // ✅ Add new file to list
      setUploadedFiles((prev) => [...prev, uploaded]);

      // Reset state
      setFile(null);
      e.target.reset(); // clear file input
    } catch (err) {
      console.error("❌ Upload Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        📎 File Attachments
      </h3>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />
        <button
          type="submit"
          disabled={uploading}
          className={`px-5 py-2 rounded text-white font-medium transition-colors ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-3">Uploaded Files</h4>
          <ul className="space-y-3">
            {uploadedFiles.map((f, idx) => (
              <li
                key={idx}
                className="p-4 bg-gray-50 rounded-lg flex justify-between items-center shadow-sm border"
              >
                <div>
                  <div className="font-medium text-gray-800">{f.name}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round(f.size / 1024)} KB • {f.mimetype}
                  </div>
                </div>
                <a
                  href={`http://localhost:4000${f.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
