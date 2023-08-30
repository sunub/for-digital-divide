import React from "react";

function usePrevious<T>(value: T) {
	const ref = React.useRef<T>();

	if (ref.current) {
		ref.current = value;
	}

	return ref.current;
}
