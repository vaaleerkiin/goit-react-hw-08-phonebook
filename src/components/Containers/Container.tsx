import React from "react";

import { Container } from "components/Containers/Container.styled";
export const Containers: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => <Container>{children}</Container>;
