import styled from "styled-components";

export function GameTitle({
  title,
  gameNumber,
}: {
  title: string;
  gameNumber: number;
}) {
  return (
    <Container>
      <GameNumber>{gameNumber}</GameNumber>
      <h3>{title}</h3>
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
  font-weight: bolder;
`;
