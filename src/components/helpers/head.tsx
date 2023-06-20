import NextHead from "next/head";

/** Meta Tags Generated with https://metatags.io */
const Head: React.FC = () => {
    return (
        <NextHead>
            <title>MultiKick</title>
            <link rel="icon" href="/img/favicon.ico" />
            <meta name="title" content="MultiKick" />
            <meta
                name="description"
                content="Watch the hottest kick streams at the same time with MultiKick!"
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://multikick.vercel.app/" />
            <meta property="og:title" content="MultiKick" />
            <meta
                property="og:description"
                content="Watch the hottest kick streams at the same time with MultiKick!"
            />
            <meta
                property="og:image"
                content="https://multikick.vercel.app/img/kicklogofull.svg"
            />

            <meta property="twitter:card" content="summary_large_image" />
            <meta
                property="twitter:url"
                content="https://multikick.vercel.app/"
            />
            <meta property="twitter:title" content="MultiKick" />
            <meta
                property="twitter:description"
                content="Watch the hottest kick streams at the same time with MultiKick!"
            />
            <meta
                property="twitter:image"
                content="https://multikick.vercel.app/img/kicklogofull.svg"
            />
        </NextHead>
    );
};

export default Head;
