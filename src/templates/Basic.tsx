import { useMemo } from "react";
import { Tweet } from "react-tweet/api";

type BasicTemplateProps = {
  tweetData: Tweet | null;
};

function BasicTemplate({ tweetData }: BasicTemplateProps) {
  const data = useMemo(() => {
    if (tweetData) {
      return {
        avatar_url: tweetData.user.profile_image_url_https,
        user_name: tweetData.user.name,
        screen_name: tweetData.user.screen_name,
        text: tweetData.text,
      };
    } else {
      return {
        avatar_url: "/blank-avatar.webp",
        user_name: "John Doe",
        screen_name: "johndoe",
        text: "Insert Tweet URL on Input",
      };
    }
  }, [tweetData]);

  return (
    <div>
      <div
        id="tweet-template"
        className="bg-black w-[600px] h-[600px] flex flex-col justify-center px-20 items-start"
      >
        <div className="flex items-center gap-4">
          <img
            className="rounded-full w-14 h-14"
            src={data.avatar_url}
            alt={`${data.user_name} profile pic`}
          />

          <div>
            <h1 className="text-zinc-300 text-xl font-bold -mb-1">{data.user_name}</h1>
            <p className="text-zinc-500">@{data.screen_name}</p>
          </div>
        </div>

        <p className="text-zinc-200 text-xl mt-6">{data.text}</p>
      </div>
    </div>
  );
}

export default BasicTemplate;
