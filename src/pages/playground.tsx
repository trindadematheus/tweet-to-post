import dynamic from "next/dynamic";
import { Background, Controls, Panel } from "reactflow";
import { FormEvent, useRef, useState } from "react";
import { Tweet } from "react-tweet/api";
import axios from "axios";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";

// @ts-ignore
import getTweetId from "get-tweet-id";
import BasicTemplate from "@/templates/Basic";
import themes from "@/data/themes";

const ReactFlow = dynamic(() => import("reactflow"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const initialNodes = [
  {
    id: "node-1",
    type: "template",
    position: { x: 400, y: 200 },
    data: { value: 123 },
  },
];

function Playground() {
  const [tweetData, setTweetData] = useState<Tweet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTheme, setActiveTheme] = useState("light");

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
      html2canvas(document.getElementById("tweet-template")!, {
        useCORS: true,
      }).then(function (canvas) {
        const dataURL = canvas.toDataURL("image/png");

        downloadjs(
          dataURL,
          `tweet-to-image-${tweetData.id_str}.png`,
          "image/png"
        );

        toast.success("Image downloaded with success!");
      });
    }
  }

  const nodeTypes = {
    template: () => <BasicTemplate tweetData={tweetData} />,
  };

  return (
    <>
      <div className="h-screen w-full grid grid-cols-[400px,1fr]">
        <div className="left-panel bg-zinc-900 flex flex-col justify-between">
          <div>
            <div className="border-b-zinc-800 border-b-2 px-4 py-6">
              <h1 className="text-xl font-bold text-white">xpost</h1>
            </div>

            <div className="border-b-zinc-800 border-b-2 px-4 py-6">
              <form onSubmit={handleGetTweetData}>
                <div className="flex items-end gap-2">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Insert tweet URL</span>
                    </label>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Paste here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>

                  <button
                    className={`btn btn-primary disabled ${
                      isLoading && "btn-loading btn-disabled"
                    }`}
                  >
                    search
                  </button>
                </div>
              </form>
            </div>

            <div className="border-b-zinc-800 border-b-2 px-4 py-6">
              <h2 className="text-white mb-4">theme</h2>

              <div className="flex gap-2 flex-wrap">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    data-theme={theme}
                    data-tip={theme}
                    className="rounded-sm border-2 border-zinc-500 flex w-12 h-12 tooltip tooltip-bottom"
                    onClick={() => setActiveTheme(theme)}
                  >
                    <div className="bg-primary h-full w-6"></div>
                    <div className="bg-base-100 h-full w-6"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b-zinc-800 border-b-2 px-4 py-6">
              <h2 className="text-white">template</h2>
            </div>
          </div>

          <div className="px-4 py-8 border-t-zinc-800 border-t-2">
            <button
              type="button"
              onClick={handleDownload}
              className={`btn btn-block btn-accent ${
                !tweetData && "btn-disabled"
              }`}
            >
              download
            </button>
          </div>
        </div>

        <div data-theme={activeTheme} className="bg-zinc-900/50">
          <ReactFlow nodes={initialNodes} nodeTypes={nodeTypes} />
        </div>
      </div>
    </>
  );
}

export default Playground;
