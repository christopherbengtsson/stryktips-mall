import styled from "styled-components";
import { Subtitle } from "../core/fonts";
import { isMobile } from "../../utils/device";

export function GameTitle({
  title,
  gameNumber,
}: {
  title: string;
  gameNumber: number;
}) {
  const mobile = isMobile();

  return (
    <Container>
      {!mobile && <GameNumber>{gameNumber}</GameNumber>}
      <Subtitle>{mobile ? `${gameNumber}. ${title}` : title}</Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const GameNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: rgb(0, 0, 255);
  color: white;
`;
