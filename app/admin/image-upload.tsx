"use client";

import Image from "next/image";
import { createContext, useContext, useState } from "react";

export const UploadContext = createContext<(busy: boolean) => void>(() => {});

export default function ImageUpload({ value, onChange }: {
  value?: string;
  onChange: (url: string) => void;
}) {
  const setBusy = useContext(UploadContext);
  const [message, setMessage] = useState("");

  async function upload(file: File) {
    if (!["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"].includes(file.type)) {
      setMessage("Choose a JPG, PNG, WebP, GIF, or AVIF image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024 || file.size === 0) {
      setMessage("Choose an image smaller than 10 MB.");
      return;
    }
    setBusy(true);
    setMessage("Uploading image…");
    try {
      const response = await fetch("/api/admin/images", { method: "POST", signal: AbortSignal.timeout(15000) });
      const signed = await response.json();
      if (!response.ok) throw new Error(signed.error || "Could not authorize upload.");
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", signed.apiKey);
      form.append("signature", signed.signature);
      for (const [key, value] of Object.entries(signed.params)) form.append(key, String(value));
      const result = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(signed.cloudName)}/image/upload`, {
        method: "POST", body: form, signal: AbortSignal.timeout(120000),
      });
      const image = await result.json();
      if (!result.ok || typeof image.secure_url !== "string") throw new Error("Upload failed. Please try again.");
      onChange(image.secure_url);
      setMessage("Image uploaded. Save changes to publish it.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="admin-field wide">
    <label>
      <span>Gallery image (up to 10 MB)</span>
      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (file) void upload(file);
      }} />
    </label>
    {value ? <>
      <Image src={value} alt="Gallery image preview" width={360} height={240} unoptimized className="admin-image-preview" />
      <button type="button" className="admin-add" onClick={() => { onChange(""); setMessage("Image removed. Save changes to publish."); }}>Remove image</button>
    </> : null}
    <p role="status">{message}</p>
  </div>;
}
