import ReactQr from "react-awesome-qr";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Download, Copy, RefreshCw, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ResultPage({
  shortLink,
  copyLink,
  qrImage,
  resetForm,
}) {
  const downloadImage = () => {
    // Get the reference to the image element using its id
    var imageElement = document.querySelector('img[alt="qr"]');

    // Check if the element exists before trying to access its src attribute
    if (imageElement) {
      const downloadLink = document.createElement("a");
      downloadLink.href = imageElement.src;
      downloadLink.download = "brand-QR.jpg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error('Image element with id "hello" not found.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <ReactQr
          id="imageQR"
          text={shortLink}
          size={300}
          dotScale={0.5}
          correctLevel={3}
          bgSrc={qrImage}
          logoScale={0.3}
        />
        <div className="flex flex-col items-center justify-center gap-y-10">
          <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
            Scan this QR code to visit your link.
          </h4>
          <Button onClick={() => downloadImage()}>
            <Download className="mr-2 h-4 w-4" />
            Download QR code
          </Button>
        </div>
      </div>

      <div className="grid w-full items-center pt-12">
        <Label className="pb-2" htmlFor="email">
          Shorten Link
        </Label>
        <Input type="text" value={shortLink} disabled />
      </div>
      <div className="flex flex-col md:flex-row items-stretch space-y-2 md:space-y-0  md:items-center justify-around pt-3 w-full">
        <Button onClick={(e) => copyLink(e)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Link
        </Button>

        <Button asChild>
          <Link href={`${shortLink}`}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Link
          </Link>
        </Button>

        <Button variant="secondary" onClick={() => resetForm()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New
        </Button>
      </div>
    </div>
  );
}
