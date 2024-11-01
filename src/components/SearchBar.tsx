import React, { useCallback, useState } from "react";
import { DEFAULT_ENGINE, SEARCH_ENGINES } from "../utils/consts";
import TextInputButton from "./TextInputButton";
import BubbleSelector from "./BubbleSelector";
import Card, { CardComponentProps } from "./Card";

const IMAGE_SIZE = { width: 25, height: 25 };

const SearchBar: React.FC<CardComponentProps> = ({ id, close }) => {
  const [searchEngine, setSearchEngine] = useState(DEFAULT_ENGINE);

  const search = useCallback(
    (query: string) => {
      const engine = SEARCH_ENGINES[searchEngine];
      window.location.href = `${engine.url}${query}`;
    },
    [searchEngine]
  );

  return (
    <Card id={id} title="search" close={close}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextInputButton
          placeholder="search..."
          onEnter={(value: string) => {
            search(value);
          }}
        />

        <BubbleSelector
          value={searchEngine}
          onChange={setSearchEngine}
          style={{ marginTop: 8 }}
          options={Object.entries(SEARCH_ENGINES).map(([id, engine]) => ({
            id,
            image: (props) => <img {...props} src={engine.logo} />,
          }))}
          imageSize={IMAGE_SIZE}
        />
      </div>
    </Card>
  );
};

export default SearchBar;
