import React, { useState } from "react";
import HexacoChart from "./HexacoChart";
import chroma from "chroma-js";

type HexacoChartProps = Parameters<typeof HexacoChart>[0];
const invalidUrlMessage =
  "Invalid url, make sure you're using your result page's url, it should have a \"hexaco\" parameter.";

const HexacoForm: React.FC = () => {
  const [baseColor, setBaseColor] = useState(chroma.random().hex("rgb"));
  const [user, setUser] = useState("");
  const [hexacoUrl, setHexacoUrl] = useState("");
  const [chartArgs, setChartArgs] = useState<HexacoChartProps>();

  const onBaseColorChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setBaseColor(e.target.value);
  };

  const onUserChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const onHexacoUrlChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setHexacoUrl(e.target.value);
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    submitEvent
  ) => {
    submitEvent.preventDefault();
    const url = new URL(hexacoUrl);
    const hexacoParam = url.searchParams.get("hexaco");
    const hexacoArray = hexacoParam?.split(",");

    const iParam = url.searchParams.get("i0");
    if (!hexacoArray || hexacoArray.length != 6 || !iParam) {
      alert(invalidUrlMessage);
      return;
    }

    const i = parseFloat(iParam);
    const [h, e, x, a, c, o] = hexacoArray.map(parseFloat);

    setChartArgs({ baseColor, h, e, x, a, c, o, i, datasetName: user });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div id="hexaco-form">
          <div className="input-container">
            <label htmlFor="color">Pick your favorite color</label>
            <input
              name="color"
              id="color"
              type="color"
              value={baseColor}
              onChange={onBaseColorChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="user">What's your name?</label>
            <input
              type="text"
              required
              minLength={2}
              name="user"
              id="user"
              placeholder="your name"
              value={user}
              onChange={onUserChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="hexaco-url">
              Paste your result's page url here
            </label>
            <input
              type="url"
              required
              name="hexaco-url"
              id="hexaco-url"
              placeholder="https://survey.ucalgary.ca/"
              value={hexacoUrl}
              onChange={onHexacoUrlChange}
            />
          </div>
          <button type="submit">Visualize</button>
        </div>
      </form>
      {chartArgs && <HexacoChart {...chartArgs} />}
    </>
  );
};

export default HexacoForm;
