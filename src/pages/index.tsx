import { FormEvent, useRef, useState } from "react";
import { Tweet } from "react-tweet/api";
import axios from "axios";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";

// @ts-ignore
import getTweetId from "get-tweet-id";

export default function Home() {
  const [tweetData, setTweetData] = useState<Tweet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  async function handleGetTweetData(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (inputRef.current) {
      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `/api/generate-tweet-image/${getTweetId(inputRef.current.value)}`
        );

        setTweetData(data.data);
        inputRef.current.value = "";
      } catch (error) {
        toast.error("Oops, try again!");
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleDownload() {
    if (imageRef && tweetData) {
      html2canvas(document.getElementById("image")!, { useCORS: true }).then(
        function (canvas) {
          const dataURL = canvas.toDataURL("image/png");

          downloadjs(
            dataURL,
            `tweet-to-image-${tweetData.id_str}.png`,
            "image/png"
          );

          toast.success("Image downloaded with success!");
        }
      );
    }
  }

  return (
    <>
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold pt-8 text-white">Tweet to Post</h1>

        <form className="mb-12 pt-4" onSubmit={handleGetTweetData}>
          <div className="flex items-end gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Tweet URL</span>
              </label>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <button
              className={`btn btn-primary ${isLoading && "loading disabled"}`}
            >
              Generate
            </button>
          </div>
        </form>

        {tweetData && (
          <div>
            <div
              ref={imageRef}
              id="image"
              className="bg-black w-[600px] h-[600px] flex flex-col justify-center px-20 items-start"
            >
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-14 h-14"
                  src={tweetData.user.profile_image_url_https}
                  alt={`${tweetData.user.name} profile pic`}
                />

                <div>
                  <h1 className="text-white">{tweetData.user.name}</h1>
                  <p className="text-slate-400">
                    @{tweetData.user.screen_name}
                  </p>
                </div>
              </div>

              <p className="text-slate-200 mt-6">{tweetData.text}</p>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="btn btn-accent mt-4"
            >
              download
            </button>
          </div>
        )}
      </div>
    </>
  );
}
