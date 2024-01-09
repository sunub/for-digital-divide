// 반복 애니메이션을 위한 애니메이션 기능 중 이동되는 인덱스 중 가장 가까운 인덱스를 반환하는 함수이다.

// tl.duration()은 실행될 gsap의 총 애니메이션 시간을 반환한다.
// 위의 값이 wrap로 주어지는 이유는 전체 duration이 애니메이션이 실행될 수 있는 최대 시간이기 때문이다.
function closetIndex(setCurrent) {
  let index = getClosetIndex(times, tl.time(), tl.duration());
  if (setCurrent) {
  }
  return index;
}

function getClosetIndex(items, currValue, wrap) {
  let i = items.length;
  let closet = 1e10;

  let diff;
  while (i--) {
    diff = Math.abs(items[i] - currValue);
    if (diff > wrap / 2) {
      diff = wrap - diff;
    }
    if (diff < closet) {
      closet = diff;
      index = i;
    }
  }
  return index;
}
