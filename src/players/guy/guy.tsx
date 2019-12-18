import * as React from "react";

import "./guy.css";

const Guy: React.FC<{ imageUrl: string }> = ({ imageUrl }) => <img src={imageUrl} alt="you" className="guy" />

export default Guy;
