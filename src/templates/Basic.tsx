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
    <div
      id="tweet-template"
      className="bg-base-100 w-[600px] h-[600px] flex flex-col justify-center px-14 items-start"
    >
      <div className="flex items-center gap-4">
        <img
          className="rounded-full w-14 h-14"
          src={data.avatar_url}
          alt={`${data.user_name} profile pic`}
        />

        <div>
          <h1 className="text-base-content text-xl font-bold -mb-1">
            {data.user_name}
          </h1>
          <p className="text-base-content/50">@{data.screen_name}</p>
        </div>
      </div>

      <p className="text-base-content text-xl whitespace-pre-line mt-6">
        {data.text}
      </p>
    </div>
  );
}

export default BasicTemplate;
