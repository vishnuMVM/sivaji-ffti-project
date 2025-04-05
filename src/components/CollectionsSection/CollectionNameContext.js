import React from "react";

const CollectionNameContext = React.createContext({
  collectionname: "",
   changeCollectionName: () => {},
});

export default CollectionNameContext;
