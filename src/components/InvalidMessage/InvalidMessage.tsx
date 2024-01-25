import React from "react";
import * as Styled from "./InvalidMessage.styled";

function InvalidMessage({ message }: { message: string }) {
  return (
    <React.Fragment>
      {message.length > 0 ? (
        <Styled.Wrapper>
          <ErrorIcon />
          <span>{message}</span>
        </Styled.Wrapper>
      ) : null}
    </React.Fragment>
  );
}

function ErrorIcon() {
  return <span className="material-icons">error</span>;
}

export default InvalidMessage;

// function onTrigger(event) {
//   var _lastTriggerEvent;

//   var shouldScheduleClickHide = false;

//   if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
//     return;
//   }

//   var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
//   lastTriggerEvent = event;
//   currentTarget = event.currentTarget;
//   handleAriaExpandedAttribute();

//   if (!instance.state.isVisible && isMouseEvent(event)) {
//     // If scrolling, `mouseenter` events can be fired if the cursor lands
//     // over a new target, but `mousemove` events don't get fired. This
//     // causes interactive tooltips to get stuck open until the cursor is
//     // moved
//     mouseMoveListeners.forEach(function (listener) {
//       return listener(event);
//     });
//   } // Toggle show/hide when clicking click-triggered tooltips

//   if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
//     shouldScheduleClickHide = true;
//   } else {
//     scheduleShow(event);
//   }

//   if (event.type === 'click') {
//     isVisibleFromClick = !shouldScheduleClickHide;
//   }

//   if (shouldScheduleClickHide && !wasFocused) {
//     scheduleHide(event);
//   }
// }
