import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
};

export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
