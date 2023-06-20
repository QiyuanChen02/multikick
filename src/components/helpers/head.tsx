import NextHead from "next/head";

type HeadType = {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
};

/** Displays the head for each page. Includes open graph tags. @see https://ogp.me/ */
const Head: React.FC<HeadType> = ({
    title = "",
    description = "",
    url = "",
    image = "",
}) => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />

            <meta property="og:type" content="website" />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </NextHead>
    );
};

export default Head;
