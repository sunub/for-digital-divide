'use client';

import styled from 'styled-components';
import Device from './device';
import React from 'react';

const orders = [
  [0, 110, 220],
  [0, 110, -110],
  [0, -220, -110],
];

const labelInfo = orders.map((order, index) => ({
  id: `account-page-${index}`,
  order: order,
  index,
  position: 0,
}));

export default function UserPage() {
  const [labels, setLables] = React.useState(labelInfo);

  const increaseOrder = () => {
    setLables((prev) => {
      const newLabels = prev.map(({ order, id, position, index }) => {
        const newPosition = (position + 1) % 3;
        return { order, id, position: newPosition, index };
      });
      return newLabels;
    });
  };

  const decreaseOrder = () => {
    setLables((prev) => {
      const newLabels = prev.map(({ order, id, position, index }) => {
        const newPosition = position - 1 < 0 ? 2 : position - 1;
        return { order, id, position: newPosition, index };
      });
      return newLabels;
    });
  };

  return (
    <Device>
      <form>
        <Fieldset
          onClick={(e) => {
            const boxInfo = e.currentTarget.getBoundingClientRect();
            const centerX = Math.floor(boxInfo.width / 2);
            const currentX = e.clientX - boxInfo.left;
            if (centerX < currentX) increaseOrder();
            else if (centerX > currentX) decreaseOrder();
          }}
        >
          <legend>account page</legend>
          {labels.map(({ order, id, position }) => {
            return (
              <Label key={id} htmlFor={id} $x={order[position]}>
                {id}
                <input type="radio" id={id} name="account-page" value={id} />
              </Label>
            );
          })}
        </Fieldset>
      </form>
    </Device>
  );
}

const Fieldset = styled.fieldset`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--col-1) var(--col-2) var(--col-3);
  grid-template-rows: 1fr;
  gap: 16px;
  background-color: var(--color-bun);
`;

const Label = styled.label<{ $x: number }>`
  content: '';
  height: 5rem;
  background-color: aquamarine;
  transform: translate(${({ $x }) => $x}%, 0);
  translate: transform 0.5s ease-in-out;
  user-select: none;
`;

{
  /* <Label htmlFor="first-account-page">
            1
            <input
              type="radio"
              id="first-account-page"
              name="account-page"
              value={'first-page'}
            />
          </Label>
          <Label htmlFor="second-account-page">
            2
            <input
              type="radio"
              id="second-account-page"
              name="account-page"
              value={'second-page'}
              defaultChecked
            />
          </Label>
          <Label htmlFor="third-account-page">
            <input
              type="radio"
              id="third-account-page"
              name="account-page"
              value={'third-page'}
            />
          </Label> */
}
