import React from "react";
import styled from "styled-components";

const SVG_HTMLS = [
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="1"><g>\n    <rect></rect>\n    <polygon fill-rule="nonzero" points="10.4541016 25 10.4541016 6.6601562 10.3955078 6.6601562 4.7998047 10.5566406 4.7998047 7.9052734 10.4248047 3.8623047 13.0029297 3.8623047 13.0029297 25"></polygon>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="2"><g>\n    <rect></rect>\n    <path d="M3.0932617,9.9707031 C3.0932617,6.2646484 6.1401367,3.5107422 10.2124023,3.5107422 C14.1235352,3.5107422 16.8188477,6.1767578 16.8188477,9.3847656 C16.8188477,11.7138672 15.7495117,13.4570312 11.8676758,17.4414062 L6.8432617,22.5976562 L6.8432617,22.65625 L17.1704102,22.65625 L17.1704102,25 L3.2250977,25 L3.2250977,23.1835938 L10.6665039,15.4199219 C13.5229492,12.4462891 14.1821289,11.3037109 14.1821289,9.5458984 C14.1821289,7.4658203 12.6293945,5.8105469 10.2124023,5.8105469 C7.6049805,5.8105469 5.6420898,7.5976562 5.6420898,9.9707031 L3.0932617,9.9707031 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="3"><g>\n    <rect></rect>\n    <path d="M7.1435547,15.2001953 L7.1435547,12.9736328 L9.6777344,12.9736328 C12.1972656,12.9736328 13.9550781,11.4208984 13.9550781,9.3115234 C13.9550781,7.2167969 12.6367188,5.7958984 9.9267578,5.7958984 C7.4365234,5.7958984 5.5908203,7.1142578 5.4296875,9.3994141 L2.8955078,9.3994141 C3.1884766,5.8105469 5.9716797,3.5107422 9.9267578,3.5107422 C14.1601562,3.5107422 16.6064453,5.9423828 16.6064453,8.9599609 C16.6064453,11.5820312 14.7753906,13.3837891 12.1240234,13.9404297 L12.1240234,13.9990234 C15.2001953,14.2626953 17.2949219,16.1816406 17.2949219,19.1845703 C17.2949219,22.8173828 14.1015625,25.3515625 9.9560547,25.3515625 C5.5761719,25.3515625 2.6611328,22.9052734 2.4707031,19.4042969 L5.0048828,19.4042969 C5.1660156,21.6455078 7.1435547,23.0664062 9.9560547,23.0664062 C12.7392578,23.0664062 14.5996094,21.484375 14.6142578,19.2724609 C14.6289062,16.6650391 12.7685547,15.2001953 9.7949219,15.2001953 L7.1435547,15.2001953 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="4"><g>\n    <rect></rect>\n    <path d="M12.6953125,25 L12.6953125,20.6054688 L2.0751953,20.6054688 L2.0751953,18.2177734 C3.8769531,14.8779297 6.3525391,11.0253906 11.3476562,3.8623047 L15.2441406,3.8623047 L15.2441406,18.2910156 L18.2324219,18.2910156 L18.2324219,20.6054688 L15.2441406,20.6054688 L15.2441406,25 L12.6953125,25 Z M4.6826172,18.2324219 L4.6826172,18.2910156 L12.6953125,18.2910156 L12.6953125,6.0595703 L12.6513672,6.0595703 C8.6523438,11.7724609 6.3525391,15.3027344 4.6826172,18.2324219 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="5"><g>\n    <rect></rect>\n    <path d="M10.2050781,25.3515625 C6.1621094,25.3515625 3.1738281,22.8320312 2.9541016,19.2285156 L5.546875,19.2285156 C5.78125,21.484375 7.7001953,23.0371094 10.234375,23.0371094 C13.1054688,23.0371094 15.0976562,21.0449219 15.0976562,18.203125 C15.0976562,15.4052734 13.0908203,13.3984375 10.2783203,13.3984375 C8.2714844,13.3984375 6.6601562,14.21875 5.6787109,15.9179688 L3.3496094,15.9179688 L4.4335938,3.8623047 L16.5332031,3.8623047 L16.5332031,6.2060547 L6.6015625,6.2060547 L5.8837891,13.3105469 L5.9423828,13.3105469 C6.9384766,11.8896484 8.6962891,11.1279297 10.7470703,11.1279297 C14.8046875,11.1279297 17.734375,14.0722656 17.734375,18.1298828 C17.734375,22.3779297 14.6142578,25.3515625 10.2050781,25.3515625 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="6"><g>\n    <rect></rect>\n    <path d="M10.3808594,25.3662109 C6.484375,25.3662109 2.3535156,22.65625 2.3535156,14.7900391 C2.3535156,7.6708984 5.3857422,3.4960938 10.5566406,3.4960938 C14.1455078,3.4960938 16.9140625,5.5908203 17.5732422,8.828125 L14.8925781,8.828125 C14.2773438,6.9238281 12.6953125,5.8251953 10.5273438,5.8251953 C6.9970703,5.8251953 4.9902344,8.9599609 4.9023438,14.5849609 L4.9462891,14.5849609 C5.8105469,12.6806641 7.9785156,11.1572266 10.8496094,11.1572266 C14.8779297,11.1572266 17.8662109,14.1308594 17.8662109,18.1445312 C17.8662109,22.3193359 14.7167969,25.3662109 10.3808594,25.3662109 Z M10.3515625,23.0224609 C13.046875,23.0224609 15.1855469,20.8984375 15.1855469,18.2324219 C15.1855469,15.4638672 13.1933594,13.4716797 10.3955078,13.4716797 C7.5976562,13.4716797 5.5322266,15.4638672 5.5322266,18.1591797 C5.5322266,20.8691406 7.6416016,23.0224609 10.3515625,23.0224609 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="7"><g>\n    <rect></rect>\n    <polygon fill-rule="nonzero" points="4.7265625 25 14.2919922 6.2646484 14.2919922 6.2060547 2.9101562 6.2060547 2.9101562 3.8623047 16.8994141 3.8623047 16.8994141 6.3085938 7.4951172 25"></polygon>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="8"><g>\n    <rect></rect>\n    <path d="M9.9926758,25.3515625 C5.5249023,25.3515625 2.331543,22.8173828 2.331543,19.2871094 C2.331543,16.6503906 4.1479492,14.4824219 6.8725586,13.8525391 L6.8725586,13.7939453 C4.543457,13.0761719 3.0932617,11.2890625 3.0932617,9.0625 C3.0932617,5.8691406 6.0229492,3.5107422 9.9926758,3.5107422 C13.9916992,3.5107422 16.8774414,5.8544922 16.8774414,9.0771484 C16.8774414,11.2744141 15.456543,13.046875 13.112793,13.7939453 L13.112793,13.8525391 C15.8520508,14.4970703 17.668457,16.6650391 17.668457,19.2871094 C17.668457,22.8320312 14.4750977,25.3515625 9.9926758,25.3515625 Z M9.9926758,23.0517578 C12.9077148,23.0517578 14.9731445,21.3964844 14.9731445,19.0966797 C14.9731445,16.7675781 12.9077148,15.1269531 9.9926758,15.1269531 C7.0922852,15.1269531 5.012207,16.7822266 5.012207,19.0966797 C5.012207,21.3964844 7.0922852,23.0517578 9.9926758,23.0517578 Z M9.9926758,12.8125 C12.4975586,12.8125 14.2700195,11.3623047 14.2700195,9.3115234 C14.2700195,7.2314453 12.512207,5.78125 9.9926758,5.78125 C7.4731445,5.78125 5.715332,7.2460938 5.715332,9.3115234 C5.715332,11.3623047 7.4731445,12.8125 9.9926758,12.8125 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="9"><g>\n    <rect></rect>\n    <path d="M9.4580078,25.3515625 C5.8105469,25.3515625 2.9833984,23.2714844 2.3681641,20.0927734 L5.0488281,20.0927734 C5.6347656,22.0410156 7.2900391,23.0517578 9.4873047,23.0517578 C13.0761719,23.0517578 15.0244141,19.8583984 15.0976562,14.2480469 L15.0537109,14.2480469 C14.1601562,16.3427734 11.8457031,17.7050781 9.1503906,17.7050781 C5.1220703,17.7050781 2.1337891,14.7314453 2.1337891,10.7177734 C2.1337891,6.5429688 5.2832031,3.4960938 9.6191406,3.4960938 C13.3984375,3.4960938 17.6464844,6.0595703 17.6464844,14.0722656 C17.6464844,21.1914062 14.6289062,25.3515625 9.4580078,25.3515625 Z M9.6044922,15.390625 C12.4023438,15.390625 14.4824219,13.3984375 14.4824219,10.703125 C14.4824219,7.9931641 12.3730469,5.8691406 9.6484375,5.8691406 C6.9384766,5.8691406 4.7998047,7.9785156 4.7998047,10.6298828 C4.7998047,13.3837891 6.8359375,15.390625 9.6044922,15.390625 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="0"><g>\n    <rect></rect>\n    <path d="M10.0146484,25.3515625 C5.078125,25.3515625 2.2216797,21.1035156 2.2216797,14.4238281 C2.2216797,7.8027344 5.1074219,3.5107422 10.0146484,3.5107422 C14.921875,3.5107422 17.7783203,7.7734375 17.7783203,14.4091797 C17.7783203,21.0888672 14.9365234,25.3515625 10.0146484,25.3515625 Z M10.0146484,23.0517578 C13.3105469,23.0517578 15.1269531,19.6972656 15.1269531,14.4238281 C15.1269531,9.2236328 13.28125,5.8251953 10.0146484,5.8251953 C6.7480469,5.8251953 4.8730469,9.2529297 4.8730469,14.4091797 C4.8730469,19.6826172 6.7041016,23.0517578 10.0146484,23.0517578 Z" fill-rule="nonzero"></path>\n</g></svg>',
  '<svg width="24" height="24" viewBox="0 0 24 24" data-testid="shuffle"><path fill-rule="evenodd" d="M20.967 12.362a1.2 1.2 0 00-1.388.976 7.698 7.698 0 01-7.601 6.378c-4.254 0-7.715-3.461-7.715-7.716 0-4.254 3.461-7.715 7.715-7.715 1.934 0 3.753.714 5.175 2.004l-.992.992a.99.99 0 00.549 1.68l4.212.65a.99.99 0 001.129-1.131l-.649-4.211a.991.991 0 00-1.68-.55l-.872.873a10.044 10.044 0 00-6.872-2.707C6.401 1.885 1.863 6.423 1.863 12c0 5.578 4.538 10.115 10.115 10.115 4.928 0 9.118-3.518 9.965-8.365a1.2 1.2 0 00-.976-1.388"/></svg>',
  '<svg width="20" height="28" viewBox="0 0 20 28" data-testid="blank"><g>\n    <rect></rect>\n</g></svg>',
];

export function ThrowError() {
  throw Error("에러 발생!");
}

const Button = styled.button`
  & > svg {
    cursor: none;
    pointer-events: none;
  }
`;

export function App() {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      const curr = inputRef.current.value + "1";
      inputRef.current.value = curr;
    }
  };

  return (
    <form>
      <label htmlFor="password-input">비밀번호</label>
      <input
        ref={inputRef}
        type="password"
        id="password-input"
        name="password-input"
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      {SVG_HTMLS.map((svg, i) => {
        return (
          <button
            key={i}
            className="insert"
            onClick={(e) => {
              handleClick(e);
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        );
      })}
    </form>
  );
}
// function OtherComponent() {
//     const [isClick, setClick] = React.useState(false);

//     return (<div>
//         <label htmlFor="비밀번호 확인">
//             비밀번호
//         </label>
//         <input
//             onClick={() => {
//                 const curr = document.querySelector("#insert-string-confirm") as HTMLElement
//                 curr.innerHTML = "Open"
//                 setClick(true);
//             }}
//             aria-label="비밀번호 확인"
//         />
//         <span id="insert-string-confirm" />
//         {
//             isClick ? <button
//                 id="confirm-button"
//                 onClick={() => {
//                     const curr = document.querySelector("#insert-string") as HTMLElement
//                     curr.innerHTML = ""
//                 }}
//             >
//                 확인
//             </button>
//                 : null
//         }
//     </div>)
// }
