import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FormInputs({ makeshortLink, setqrImage, isLoading }) {
  const [longLink, setlongLink] = useState("");
  const setqrcodeImage = (file) => {
    setqrImage(URL.createObjectURL(file[0]));
  };
  return (
    <>
      <form action="#" className="mt-8 grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <Label htmlFor="picture">Enter link to shorten</Label>

          <Input
            type="text"
            className="focus-border"
            value={longLink}
            onChange={(e) => setlongLink(e.target.value)}
          />
        </div>
        <div className="col-span-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">
              Brand logo (choose image with square dimension)
            </Label>
            <Input
              onChange={(e) => setqrcodeImage(e.target.files)}
              id="picture"
              accept="image/*"
              type="file"
            />
          </div>
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              disabled={longLink ? false : true}
              onClick={(e) => makeshortLink(e, longLink)}
            >
              Make it short
            </Button>
          )}
        </div>
      </form>
      <Alert className="absolute bottom-16 grid w-full max-w-sm lg:max-w-xl items-center gap-1.5">
        <Info className="w-5 h-5" />
        <AlertTitle>Brand QR</AlertTitle>
        <AlertDescription>
          You can create customized QR code by uploading your brand logo.
        </AlertDescription>
      </Alert>
    </>
  );
}
