import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";

import { App } from "./my";

async function mockConsoleError() {
  const consoleMock = jest.spyOn(console, "error");
  consoleMock.mockImplementation(() => "에러 발생!");
  return consoleMock;
}

describe("Studying how do it work", () => {
  mockConsoleError();
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // test("라벨텍스트 클릭하기", async () => {
  //     render(<App />)

  //     userEvent.click(await screen.findByLabelText<HTMLInputElement>(`비밀번호`))

  //     expect(await screen.findByText(/비밀번호를 입력해주세요/)).toBeInTheDocument()
  // })

  test("클릭 시 input 값이 증가하는가", async () => {
    render(<App />);

    userEvent.click(await screen.findByTestId(1));
    userEvent.click(await screen.findByTestId(2));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(`비밀번호`)).value
    ).toHaveLength(1);

    userEvent.click(await screen.findByTestId(3));
    userEvent.click(await screen.findByTestId(4));
    userEvent.click(await screen.findByTestId(5));
    userEvent.click(await screen.findByTestId(6));

    expect(
      (await screen.findByLabelText<HTMLInputElement>(`비밀번호`)).value
    ).toHaveLength(5);
  });
  // test("확인 버튼 클릭시 텍스트 지우기", async () => {
  //     render(<App />)

  //     userEvent.click(await screen.findByLabelText<HTMLInputElement>(`비밀번호`))
  //     expect(await screen.queryByText(/Open/)).toBeInTheDocument

  //     userEvent.click(await screen.findByText("확인"));
  //     await delay(100);
  //     expect(await screen.queryByText(/Open/)).not.toBeInTheDocument
  // })
  // test("body click이 되나?", async () => {
  //     render(<App />)

  //     userEvent.click(document.body)
  //     await delay(100)
  //     expect(await screen.queryByText(/Hi There/)).toBeInTheDocument()
  // })
});

// function domrect(x, y, width, height) {
//     return {x, y, width, height, top: y, bottom: y + height, left: x, right: x + width} as unknown as domrect
// }

// // imagine you want to mock domrect for a certain element with data-testid="testid"
// const mockrect = domrect(0, 0, 150, 50)

// const mockboundingclientrects = () => {
//     const getboundingclientrect = htmlelement.prototype.getboundingclientrect;
//     htmlelement.prototype.getboundingclientrect = function() {
//         const elmt:htmlelement = this;
//         // implement here ways to differentiate elements you want to override getboundingclientrect for
//         // here we're looking for element with data-testid="testid"
//         if ((elmt.children?.[0] as htmlelement)?.dataset?.testid === 'testid') {
//             return mockrect
//         }
//         return getboundingclientrect.bind(this)()
//     }
// }
