import React from "react";
import { Card, CardContent } from "@material-ui/core";

const InfoBox = ({ title, plus, total, hideTotal, active, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoCard pointer ${active && "activeInfo__box"}`}
    >
      <CardContent>
        <h1 className="infoCard__title">{title}</h1>
        <h2 className="infoCard__plus">{plus}</h2>
        <h3 className="infoCard__total">
          {total} {hideTotal ? "/Million" : "Total"}
        </h3>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
