'use client';

import styled from 'styled-components';
import Device from './device';
import React from 'react';
import { Button } from '@/components/ui/status-button';

const orders = [
  [0, 104.4, 208.8],
  [0, 104.4, -104.4],
  [0, -208.8, -104.4],
];
export default function UserPage() {
  const [index, setIndex] = React.useState(0);
  const fieldRef = React.useRef<HTMLFieldSetElement>(null);
  const labelRefs = Array.from({ length: 3 }, () =>
    React.useRef<HTMLLabelElement>(null),
  );
  const increaseOrder = () => setIndex(() => (index + 1) % 3);
  const decreaseOrder = () => setIndex(() => (index - 1 < 0 ? 2 : index - 1));

  return (
    <Device>
      <h1 className="text-xl font-bold">Account Page</h1>
      <form className="relative grid place-items-center">
        <Fieldset
          ref={fieldRef}
          onClick={(e) => {
            e.preventDefault();
            if (!fieldRef.current || !labelRefs[0].current) return;
            const labelBox = labelRefs[0].current.getBoundingClientRect();
            const labelWidth = labelBox.width;

            const box = fieldRef.current.getBoundingClientRect();
            const centerX = Math.floor(box.width / 2);

            const left = centerX - Math.floor(labelWidth / 2);
            const right = centerX + Math.floor(labelWidth / 2);
            if (e.clientX < left) {
              decreaseOrder();
              labelRefs.map((ref, i) => {
                if (i === index) {
                  ref.current?.setAttribute('style', 'z-index: 3');
                } else {
                  ref.current?.setAttribute('style', 'z-index: 1');
                }
              });
            } else if (e.clientX > right) {
              increaseOrder();
              labelRefs.map((ref, i) => {
                if (i === index) {
                  ref.current?.setAttribute('style', 'z-index: 3');
                } else {
                  ref.current?.setAttribute('style', 'z-index: 1');
                }
              });
            }
          }}
        >
          <Label
            htmlFor="first-account"
            ref={labelRefs[0]}
            $x={orders[0][index]}
          >
            <div></div>
            <input
              id="first-account"
              type="radio"
              name="account-card"
              value={'first-account'}
            />
          </Label>
          <Label
            htmlFor="seconde-account"
            ref={labelRefs[1]}
            $x={orders[1][index]}
          >
            <div className="p-3">
              <div className="flex flex-col justify-end gap-1 align-middle">
                <span className="text-sm font-bold">통장이름</span>
                <span className="text-sm">123-456-789</span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-m font-bold">7,1000원</h1>
                <Button size={'pill'}>이체</Button>
              </div>
            </div>
            <input
              id="seconde-account"
              type="radio"
              name="account-card"
              value={'seconde-account'}
              className="w-0 h-0 select-none"
            />
          </Label>
          <Label
            htmlFor="third-account"
            ref={labelRefs[2]}
            $x={orders[2][index]}
          >
            2
            <input
              id="third-account"
              type="radio"
              name="account-card"
              value={'third-account'}
            />
          </Label>
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

  position: absolute;
  top: 0px;
`;

const Label = styled.label<{ $x: number }>`
  display: grid;
  grid: [label] 1fr / [label] 1fr;
  width: 70cqw;
  height: 10rem;
  border-radius: 17px;
  box-shadow:
    0.6px 0.7px 2.7px rgba(0, 0, 0, 0.019),
    1.4px 1.7px 6.2px rgba(0, 0, 0, 0.028),
    2.5px 2.9px 10.7px rgba(0, 0, 0, 0.034),
    4px 4.6px 17px rgba(0, 0, 0, 0.04),
    6.2px 7.1px 26.3px rgba(0, 0, 0, 0.046),
    9.6px 11.2px 41px rgba(0, 0, 0, 0.052),
    16px 18.5px 68.1px rgba(0, 0, 0, 0.061),
    32px 37px 136px rgba(0, 0, 0, 0.08);

  user-select: none;
  background-color: var(--color-background);
  transform: translate(${({ $x }) => $x}%, 0);
  transition: transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;
