import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Info } from "lucide-react";
import Demo from "@/lib/imgcropper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FormInputs({ makeshortLink, setqrImage, isLoading }) {
  const [longLink, setlongLink] = useState("");
  const [open, setOpen] = useState(false);
  const [currentImage, setcurrentImage] = useState(null);
  const setqrcodeImage = (file) => {
    setqrImage(URL.createObjectURL(file[0]));
    if (file) {
      setcurrentImage(URL.createObjectURL(file[0]));
      setOpen(true);
    }
  };

  const setCroppedImage = (img) => {
    setqrImage(img);
    setOpen(false);
  };
  return (
    <>
      <form action="#" className="mt-8 grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <Label htmlFor="picture">Enter your brand URL/ link</Label>

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please crop image in square</DialogTitle>
            <DialogDescription>
              <Demo currentImage={currentImage} croppedImg={setCroppedImage} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
