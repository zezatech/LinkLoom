import dynamic from "next/dynamic";

const ReactQr = dynamic(() => import("react-awesome-qr"), {
  ssr: false,
});
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Download, Copy, RefreshCw, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
      <div className="flex flex-col space-y-2  items-center justify-between">
        <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
          Scan this QR code to visit your link.
        </h4>
        <ReactQr
          id="imageQR"
          text={shortLink}
          size={300}
          dotScale={0.5}
          correctLevel={3}
          bgSrc={qrImage}
          logoScale={0.3}
        />
        <Button className="w-full" onClick={() => downloadImage()}>
          <Download className="mr-2 h-5 w-5" />
          Download QR code
        </Button>
      </div>

      <div className="flex flex-row pt-10 justify-center items-center space-x-5">
        <Separator className="w-28 md:w-52" />
        <span>Or</span>
        <Separator className="w-28 md:w-52" />
      </div>
      <div className="grid w-full items-center pt-12">
        <Label className="pb-2" htmlFor="email">
          Shorten Link
        </Label>
        <div className="flex flex-col md:flex-row items-stretch space-y-2 md:space-y-0  md:items-center justify-around space-x-2 w-full">
          <div className="relative w-full flex flex-row">
            <Input type="email" value={shortLink} disabled />
            <Copy
              onClick={(e) => copyLink(e)}
              className="absolute h-4 w-4 right-0 mt-3 mr-2 cursor-pointer"
            />
          </div>
          <Button asChild>
            <Link href={`${shortLink}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Link
            </Link>
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Do want to shorten another link ?
        <Button onClick={() => resetForm()} variant="link">
          Click here
        </Button>
      </p>
    </div>
  );
}
