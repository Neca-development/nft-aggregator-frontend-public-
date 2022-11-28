import { useEffect, useState } from "react";

type TextParserOptions = {
  contentFrom?: "twitter" | "discord";
  renderAs: "p" | "div";
  className?: string;
};

export default function useTextParser(
  content: string,
  { contentFrom, renderAs, className }: TextParserOptions
) {
  const [result, setResult] = useState("");

  const replaceLinks = (input: string) => {
    let res = input;
    const normalLinksReg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    res = res.replace(normalLinksReg, "<a href='$1$2' target='_blank' rel='noreferrer'>$1$2</a>");

    // replace [label](link) to <a href=link>label</a>
    const squareLinksReg = /\[(.*?)\]\(<a href='(.*?)?'.+?\)/g;
    res = res.replace(squareLinksReg, "<a href='$2' target='_blank' rel='noreferrer'>$1</a> ");
    return res;
  };

  const replaceBreaks = (input: string) => {
    const withNlBreaks = input.replace(/\n/g, "<br />");
    const withDoubleNlDiscordBreaks = withNlBreaks.replace(/(,,)/g, "<br /><br />");
    const withOneLineDiscordBreaks = withDoubleNlDiscordBreaks.replace(/(,\b)/g, "<br />");
    return withOneLineDiscordBreaks;
  };

  const convertTwitterNameToLink = (input: string) => {
    const nameReg = /(@(\w+))/g;
    return input.replace(
      nameReg,
      "<a href='https://twitter.com/$2' target='_blank' rel='noreferrer'>$1</a>"
    );
  };

  const convertTwitterHashtagToLink = (input: string) => {
    const hashtagReg = /(#(\w+))/g;
    return input.replace(
      hashtagReg,
      "<a href='https://twitter.com/hashtag/$2?src=hashtag_click' target='_blank' rel='noreferrer'>$1</a>"
    );
  };

  useEffect(() => {
    let res = "";
    res = replaceBreaks(content);
    res = replaceLinks(res);
    if (contentFrom === "twitter") {
      res = convertTwitterNameToLink(res);
      res = convertTwitterHashtagToLink(res);
    }
    setResult(res);
  }, [content, contentFrom]);

  switch (renderAs) {
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: result }} className={className}></p>;
    case "div":
      return <div dangerouslySetInnerHTML={{ __html: result }} className={className}></div>;
  }
}
