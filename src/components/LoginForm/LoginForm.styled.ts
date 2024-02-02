"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  display: grid;
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;
`;

export const Form = styled.form`
  display: grid;
  justify-items: center;
  grid-template-rows: [system-status] 3.5rem [primary-nav] 3rem [primary-header] 4rem [main] auto [footer] 4rem [system-gesture] 3rem;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  grid-area: primary-header / fullbleed;
`;

export const MainWrapper = styled.div`
  grid-area: main / main-start / footer / main-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FooterWrapper = styled.div`
  display: grid;
  width: 75cqw;
  grid-area: footer / fullbleed;
`;

// import "./styles.css";
// import { useState, useEffect } from "react";
// import { useAnimate, stagger } from "framer-motion";
// import { MenuToggle } from "./MenuToggle";
// import { Menu } from "./Menu";

// function useMenuAnimation(isOpen: boolean) {
//   const [scope, animate] = useAnimate();

//   useEffect(() => {
//     const menuAnimations = isOpen
//       ? [
//           [
//             "nav",
//             { transform: "translateX(0%)" },
//             { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
//           ],
//           [
//             "li",
//             { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
//             { delay: stagger(0.05), at: "-0.1" }
//           ]
//         ]
//       : [
//           [
//             "li",
//             { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
//             { delay: stagger(0.05, { from: "last" }), at: "<" }
//           ],
//           ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
//         ];

//     animate([
//       [
//         "path.top",
//         { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
//         { at: "<" }
//       ],
//       ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
//       [
//         "path.bottom",
//         { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
//         { at: "<" }
//       ],
//       ...menuAnimations
//     ]);
//   }, [isOpen]);

//   return scope;
// }

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   const scope = useMenuAnimation(isOpen);

//   return (
//     <div ref={scope}>
//           <nav className="menu">
//            <ul>
//              <li>Portfolio</li>
//              <li>About</li>
//              <li>Contact</li>
//              <li>Search</li>
//            </ul>
//          </nav>
//       <MenuToggle toggle={() => setIsOpen(!isOpen)} />
//     </div>
//   );
// }
