import "react-native";
import React from "react";

import Services from "../app/services/services";

import renderer from "react-test-renderer";

test("Test format number is Equal", () => {
  let references = "1 000";
  expect(Services.formatNumber(1000)).toEqual(references);
});
