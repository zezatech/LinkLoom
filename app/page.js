"use client";
import axios from "axios";
import { useState } from "react";
import LeftPanel from "./components/leftPanel";
import FormInputs from "./components/formInputs";
import ResultPage from "./components/resultPage";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [shortLink, setshortLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const zezalogo =
    "data:image/png;base64,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";
  const [qrImage, setqrImage] = useState(zezalogo);
  const { toast } = useToast();

  const resetForm = () => {
    setshortLink(null);
    setqrImage(zezalogo);
  };
  const makeshortLink = async (e, longLink) => {
    e.preventDefault();
    setIsLoading(true);
    toast({
      title: "Please wait...",
      description: "Short link with QR code is being generated.",
    });
    setshortLink("");
    axios
      .post("https://zezalinks.netlify.app/api/shortUrl", {
        fullLink: longLink,
      })
      .then((res) => {
        setIsLoading(false);
        toast({
          description: "ShortLink created successfully.",
        });
        setshortLink(window.origin + "/" + res.data.result.shortLink);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
  };

  const copyLink = (e) => {
    document.execCommand(shortLink);
    navigator.clipboard.writeText(shortLink);
    toast({
      description: "ShortLink copied successfully.",
    });
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <LeftPanel />
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {shortLink ? (
              <ResultPage
                resetForm={resetForm}
                shortLink={shortLink}
                copyLink={copyLink}
                qrImage={qrImage}
              />
            ) : (
              <FormInputs
                setqrImage={setqrImage}
                makeshortLink={makeshortLink}
                isLoading={isLoading}
              />
            )}
          </div>
        </main>
      </div>
      <img src="poweredby.svg" className="fixed bottom-5 right-5" />
    </section>
  );
}
