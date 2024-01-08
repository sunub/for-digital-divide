"use client";

import React from "react";
import * as Styled from "./AccountCard.style";
import useToggle from "@/hooks/use-toggle";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccountCardHelper from "./AccountCard.helper";

let iteration = 0;

function AccountCard({ pagetrigger }: { pagetrigger: boolean }) {
  const draggableRef = React.useRef<HTMLDivElement>(null);
  const [isMoving, toggleIsMoving] = useToggle(false);
  const [startOffset, setStartOffset] = React.useState<number>(0);
  const [accountBuffer, setAccountBuffer] = React.useState<any[]>([
    {
      name: "1",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      ref: React.useRef<HTMLDivElement>(null),
    },
    {
      name: "2",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      ref: React.useRef<HTMLDivElement>(null),
    },
    {
      name: "3",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      ref: React.useRef<HTMLDivElement>(null),
    },
  ]);

  React.useEffect(() => {
    gsap.registerPlugin(Draggable, ScrollTrigger);
    // gsap.set(".card-items", { xPercent: -30 });
    // const playhead = { offset: 0 };

    // const cards: any[] = gsap.utils.toArray(".card-items");
    // const spacing = 0.1;
    // const animateFunc = (element: gsap.TweenTarget) => {
    //   const tl = gsap.timeline();
    //   tl.fromTo(
    //     element,
    //     { xPercent: 30 },
    //     { xPercent: -30, duration: 1, ease: "none", immediateRender: false }
    //   );
    //   return tl;
    // };

    // const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    // const snapTime = gsap.utils.snap(spacing);
    // const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    // const scrub = gsap.to(playhead, {
    //   offset: 0,
    //   onUpdate() {
    //     seamlessLoop.time(wrapTime(playhead.offset));
    //   },
    //   duration: 0.5,
    //   ease: "power3",
    //   paused: true,
    // });

    // const trigger = ScrollTrigger.create({
    //   start: 0,
    //   end: "+=1000",
    //   onUpdate(self) {
    //     let scroll = self.scroll();
    //     if (scroll > self.end - 1) {
    //       wrap(1, 2);
    //     } else if (scroll < 1 && self.direction < 0) {
    //       wrap(-1, self.end - 2);
    //     } else {
    //       scrub.vars.offset =
    //         (iteration + self.progress) * seamlessLoop.duration();
    //       scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
    //     }
    //   },
    //   trigger: ".root-items-wrapper",
    // });
    // const wrap = (iterationDelta: number, scrollTo: number) => {
    //   iteration += iterationDelta;
    //   trigger.scroll(scrollTo);
    //   trigger.update();
    // };

    // const progressToScroll = (progress: number) => {
    //   return gsap.utils.clamp(
    //     1,
    //     trigger.end - 1,
    //     gsap.utils.wrap(0, 1, progress) * trigger.end
    //   );
    // };

    // Draggable.create(draggableRef.current, {
    //   type: "x",
    //   trigger: ".card-items-wrapper",

    //   onPress() {
    //     this.startOffset = scrub.vars.offset;
    //   },
    //   onDrag() {
    //     scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
    //     scrub.invalidate().restart();
    //   },
    //   onDragEnd() {
    //     scrollToOffset(scrub.vars.offset);
    //   },
    // });

    // ScrollTrigger.addEventListener("scrollEnd", () =>
    //   scrollToOffset(scrub.vars.offset)
    // );

    // function buildSeamlessLoop(
    //   items: any[],
    //   spacing: number,
    //   animateFunc: (element: gsap.TweenTarget) => gsap.core.Timeline
    // ) {
    //   let rawSequence = gsap.timeline({ paused: true });
    //   let seamlessLoop = gsap.timeline({
    //     paused: true,
    //     repeat: -1,
    //     onRepeat() {
    //       this._time === this._dur && (this._tTime += this._dur - 0.01);
    //     },
    //     onReverseComplete() {
    //       this.totalTime(this.rawTime() + this.duration() * 100);
    //     },
    //   });

    //   let cycleDuration = spacing * items.length;
    //   let dur;
    //   items
    //     .concat(items)
    //     .concat(items)
    //     .forEach((item, i) => {
    //       let anim = animateFunc(items[i % items.length]);
    //       rawSequence.add(anim, i * spacing);
    //       dur || (dur = anim.duration());
    //     });

    //   seamlessLoop.fromTo(
    //     rawSequence,
    //     { time: cycleDuration + dur / 2 },
    //     {
    //       time: "+=" + cycleDuration,
    //       duration: cycleDuration,
    //       ease: "none",
    //     }
    //   );

    //   return seamlessLoop;
    // }

    // function scrollToOffset(offset: number) {
    //   let snappedTime = snapTime(offset);
    //   const progress =
    //     (snappedTime - seamlessLoop.duration() * iteration) /
    //     seamlessLoop.duration();
    //   const scroll = progressToScroll(progress);
    //   if (progress >= 1 || progress < 0) {
    //     return wrap(Math.floor(progress), scroll);
    //   }
    //   trigger.scroll(scroll);
    // }
  }, [pagetrigger]);

  return (
    <Styled.RootWrapper>
      <Styled.Wrapper className="root-items-wrapper">
        <Styled.CardWrapper className="card-items-wrapper">
          {accountBuffer.map((account, i) => (
            <Styled.Card
              className="card-items"
              key={`${i}th-account-card`}
              ref={account.ref}
            >
              <header>
                <h3>{account.name}</h3>
                <span>{account.accountNumber}</span>
              </header>
              <main>{account.price}</main>
              <button>입금</button>
            </Styled.Card>
          ))}
        </Styled.CardWrapper>
      </Styled.Wrapper>
      <div
        ref={draggableRef}
        className="drag-proxy"
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
      />
    </Styled.RootWrapper>
  );
}

export default AccountCard;
